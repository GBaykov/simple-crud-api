const http = require('http');
const { v4: uid } = require('uuid');

let db = [
  {
    name:"Gleb",
    age:22,
    hobbies: 'js'
  }
]

const server = http.createServer((req, res) => {
  
  if (req.method === 'GET') {
    res.writeHead(200, {
      'Content-Type': 'application/json' 
    })
    if(req.url === '/person') {
      res.end(JSON.stringify(db))
    } 

  } else if (req.method === 'POST') {
    const body = []
    res.writeHead(201, {
      'Content-Type': 'application/json' //; charset=utf-8
    })
    if(req.url === '/person'){
      req.on('data', data => {
        body.push(Buffer.from(data))
      })
      req.on('end', () => {
        const newPerson = JSON.parse(body.toString())
        
        if(!newPerson.name || !newPerson.age || !newPerson.hobbies) {
          res.writeHead(404)
          res.end('Error:incorrect properties')
        } else {
          newPerson.id = uid()
          db.push(newPerson)
          res.end(JSON.stringify(newPerson))
        }
      })
    } 
   
    // req.on('end', () => {
    //   const message = body.toString().split('=')[1]

    //   res.end(`
    //     <h1>Ваше сообщение: ${message}</h1>
    //   `)
    // })
  }
})

server.listen(5000, () => {
  console.log('Server is running...')
})