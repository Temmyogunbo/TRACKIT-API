import http from 'http';
import dotenv from 'dotenv';

// route
import { routes } from './routes';

dotenv.config();

const mongoose = require('mongoose');

const port = parseInt(process.env.PORT, 10);
console.log(process.env.NODE_ENV)


if (process.env.NODE_ENV === 'development') {
  mongoose.connect('mongodb://127.0.0.1:27017/issues');
} else if (process.env.NODE_ENV === 'production') {
  mongoose.connect(`mongodb+srv://temmyogunbo:${process.env.MONGODB_ATLAS_PW}@temmyogunb-vqhsp.mongodb.net/issues?retryWrites=true`);
};
const db = mongoose.connection;
db.on('error', () => process.stdout.write('A database error occured'));


const server = http.createServer((request, response) => {
  process.stdout
    .write(`\n[${request.method}]  ${response.statusCode}   ${request.url}`);
  routes(request, response);
});

server.listen(
  port,
  () => process.stdout.write(`\nServer running on port ${port}`),
);
