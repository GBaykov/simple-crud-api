import http, { IncomingMessage, ServerResponse } from 'node:http';
import { config } from 'dotenv';
config();

import { serverStarter } from './api';

const PORT = process.env.PORT;

const server = http.createServer(serverStarter);

server.listen(PORT, () => {
  console.log(`Server is running on PORT  ${PORT}`);
});
