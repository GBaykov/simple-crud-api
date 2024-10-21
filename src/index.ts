import http, { IncomingMessage, ServerResponse } from 'node:http';
import { config } from 'dotenv';
config();
import { v4 as uuid } from 'uuid';
import DB from './DB/DB';
import { User } from './types/user';
import { isUid } from './utils/isUid';

const PORT = process.env.PORT;

const server = http.createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });

    if (req.url === '/api/users') {
      try {
        if (req.method === 'GET') {
          res.writeHead(200, {
            'Content-Type': 'application/json',
          });
          res.end(JSON.stringify(DB));
        } else if (req.method === 'POST') {
          // const body: Array<Buffer> = [];
          let body = '';

          req.on('data', (data) => {
            // body.push(Buffer.from(data));
            body += data;
          });

          req.on('end', () => {
            const newUser: User = JSON.parse(body.toString());
            if (!newUser.username || !newUser.age || !newUser.hobbies) {
              res.writeHead(404);
              res.write(
                'Error: incorrect properties. Person mast have age, username, hobbies',
              );
              res.end();
            } else {
              res.writeHead(201, {
                'Content-Type': 'application/json',
              });
              newUser.id = uuid();
              DB.push(newUser);

              res.end(JSON.stringify(newUser));
            }
          });
        } else {
          throw new Error('no such method on "/person" request');
        }
      } catch (err) {
        // const error = err as
        // res.writeHead(500)
        const textErr = 'Error: While "/person" request smt wrong.';
        res.write(textErr);
        res.end();
      } finally {
      }
    } else if (req.url && req.url.match(/^\/api\/users\/[\w-]+$/)) {
      if (req.method === 'GET') {
        const id = req.url.split('/')[3];
        if (isUid(id) === false) {
          res.writeHead(400);
          res.write('Error:your ID is not UUID');
          res.end();
        }
        const user = DB.find((item) => item.id === id);
        if (user) {
          res.writeHead(200);
          res.end(JSON.stringify(user));
        } else {
          res.writeHead(404);
          res.write('Error:cannot find person whis such ID');
          res.end();
        }
      } else if (req.method === 'PUT') {
        const id = req.url.split('/')[3];
        if (isUid(id) === false) {
          res.writeHead(400);
          res.write('Error:your ID is not UUID');
          res.end();
        }
        const user = DB.find((item) => item.id === id);

        // const body: Array<Buffer> = [];
        let body = '';

        req.on('data', (data) => {
          body += data;
          // body.push(Buffer.from(data))
        });

        req.on('end', () => {
          const newUser: User = JSON.parse(body.toString());
          if (!newUser.username || !newUser.age || !newUser.hobbies) {
            res.writeHead(404);
            res.write(
              'Error: incorrect properties. Person mast have age, username, hobbies',
            );
            res.end();
          } else {
            if (user) {
              newUser.id = id;
              const index = DB.indexOf(user);
              DB.splice(index, 1, newUser);
              res.writeHead(200);
              res.end(JSON.stringify(newUser));
            } else {
              res.writeHead(404);
              res.write('Error:cannot find person whis such ID');
              res.end();
            }
          }
        });
      } else if (req.method === 'DELETE') {
        const id = req.url.split('/')[3];
        if (isUid(id) === false) {
          res.writeHead(400);
          res.write('Error:your ID is not UUID');
          res.end();
        }
        const user = DB.find((item) => item.id === id);
        if (user) {
          const index = DB.indexOf(user);
          DB.splice(index, 1);
          res.writeHead(204);
          res.end();
        } else {
          res.writeHead(404);
          res.write('Error:cannot find person whis such ID');
          res.end();
        }
      }
    }

    // res.end(
    //   JSON.stringify({
    //     data: 'server on res.end!',
    //   })
    // );
  },
);

server.listen(PORT, () => {
  console.log(`Server is running on PORT  ${PORT}`);
});
