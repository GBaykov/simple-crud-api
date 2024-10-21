import http, { IncomingMessage, ServerResponse } from 'node:http';
import { config } from 'dotenv';
config();
import { v4 as uuid } from 'uuid';
import DB from './DB/DB';
import { User } from './types/user';
import { isUid } from './utils/isUid';
import { serverStarter } from './api';

const PORT = process.env.PORT;

const server = http.createServer(serverStarter);

server.listen(PORT, () => {
  console.log(`Server is running on PORT  ${PORT}`);
});
