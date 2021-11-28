const http = require('http');
const PORT = process.env.PORT || 3000
const url = require('url');
const { v4: uid } = require('uuid');

let db = [];

const server = http.createServer((req, res) => {

  if(req.url === '/person' || req.url === '/person/'){
    try{

      if (req.method === 'GET') {
        res.writeHead(200, {
         'Content-Type': 'application/json' 
         })   
       res.end(JSON.stringify(db))
     } 
     else if (req.method === 'POST') {
       const body = [];
 
 
       req.on('data', data => {
         body.push(Buffer.from(data))
       })
 
       req.on('end', () => {
         const newPerson = JSON.parse(body.toString())
         
         if(!newPerson.name || !newPerson.age || !newPerson.hobbies) {
           res.writeHead(404)
           res.write('Error: incorrect properties. Person mast have age, name, hobbies')
           res.end()
         } else {
           newPerson.id = uid()
           db.push(newPerson)
           res.end(JSON.stringify(newPerson))
         }
       })
     } else {
       throw new Error('no such method on "/person" request')
     }
    }catch(err){
      res.writeHead(500)
      const textErr = err.text || 'Error: While "/person" request smt wrong.';
      res.write(textErr)
      res.end()
    }

  } else if(req.url.split('/').length == 3 && req.url.split('/')[1]=='person') {
    //сдулать проверку на URL
 

    if (req.method === 'GET') {
      const id = req.url.split('/')[2];
      //const uidVal = uidValidator(id);
      if(uidValidator(id) === false){
        res.writeHead(400)
        res.write('Error:your ID is not UUID')
        res.end()
      } else{
        // res.writeHead(200, {
        //   'Content-Type': 'application/json' 
        // })   
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
      
    } else if (req.method === 'PUT') {
      const body = [];
      const id = req.url.split('/')[2];
      if(uidValidator(id) === false){
        res.writeHead(400)
        res.write('Error:your ID is not UUID')
        res.end()
      } else{
        // res.writeHead(200, {
        //   'Content-Type': 'application/json' 
        // })   

         const person = idSearch(id, db);
         if(person[0] === 404){
          res.writeHead(404)
          res.write('Error:cannot find person whis such ID')
          res.end()
        } else { 
        req.on('data', data => {
          body.push(Buffer.from(data))
        })
  
        req.on('end', () => {
          const newPerson = JSON.parse(body.toString())
          
          if(!newPerson.name || !newPerson.age || !newPerson.hobbies) {
            res.writeHead(404)
            res.write('Error: incorrect properties. Person mast have age, name, hobbies')
            res.end()
          } else {
            newPerson.id = id;
            const index = db.findIndex(obj => obj == person[1])
            db.splice(index, 1, newPerson);
            res.writeHead(200)
            res.end(JSON.stringify(newPerson))
         }
        
        })
      }
      
      }
      
    } else if (req.method === "DELETE") {
      const id = req.url.split('/')[2];
      if(uidValidator(id) === false){
        res.writeHead(400)
        res.write('Error:your ID is not UUID')
        res.end()
      } else{
        // res.writeHead(200, {
        //   'Content-Type': 'application/json' 
        // })   
        const person = idSearch(id, db);
        if(person[0] === 404){
          res.writeHead(404)
          res.write('Error:cannot find person whis such ID')
          res.end()
        } else {
          const index = db.findIndex(obj => obj == person[1])
          db.splice(index, 1);
          res.writeHead(204)
          res.end()
        }
      }
    }
  } else if(req.url == '/' ){
res.writeHead(200)
res.write('Server is running')
res.end()
  } else {
    res.writeHead(404)
res.write('Error: request on non-existing resourse')
res.end()
  }
})

server.listen(PORT, () => {
  console.log(`Server is running...`)
})
 

function uidValidator(uid){
if(uid.split('-').length !== 5) {
  return false;
}
  const regexp = /^[0-9a-f]{8}-?[0-9a-f]{4}-?[1-5][0-9a-f]{3}-?[89ab][0-9a-f]{3}-?[0-9a-f]{12}$/i
  if(regexp.test(uid) === false) return false;
  else return true;
}

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
