const http = require('http');
const url = require('url');
const { v4: uid } = require('uuid');

let db = [
  {
    name:"Gleb",
    age:22,
    hobbies: 'js'
  }
]

const server = http.createServer((req, res) => {

  if(req.url === '/person' || req.url === '/person/'){
    if (req.method === 'GET') {
       res.writeHead(200, {
        'Content-Type': 'application/json' 
        })   
      res.end(JSON.stringify(db))

    } else if (req.method === 'POST') {
      const body = []
      res.writeHead(201, {
        'Content-Type': 'application/json' //; charset=utf-8
      })

      req.on('data', data => {
        body.push(Buffer.from(data))
      })
      req.on('end', () => {
        const newPerson = JSON.parse(body.toString())
        
        if(!newPerson.name || !newPerson.age || !newPerson.hobbies) {
          res.writeHead(404)
          res.write('Error:incorrect properties')
          res.end()
        } else {
          newPerson.id = uid()
          db.push(newPerson)
          res.end(JSON.stringify(newPerson))
        }
      })
    }
  }else{
    const id = req.url.split('/')[2];
    if (req.method === 'GET') {
      res.writeHead(200, {
        'Content-Type': 'application/json' 
      })   
      const person = idSearch(id, db);
      if(person[0] === 404){
        res.writeHead(404)
        res.write('Error:cannot find person whis such ID')
        res.end()
      } else {
        res.writeHead(200)
        res.end(JSON.stringify(person[1]))
      }
    }
  }
})

server.listen(5000, () => {
  console.log('Server is running...')
})


function idSearch(id, arr){
  let ob;
  for(let obj of arr) {
    if(obj.id == id){
      ob = obj;
      break;
    } 
  } 
  if(typeof ob == 'object'){
return [200, ob]
  } else {
    return [404]
  }
}