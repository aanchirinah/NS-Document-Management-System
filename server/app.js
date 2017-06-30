import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';
import routes from './routes';


// Set up the express app
const app = express();

// Log requests to the console.
app.use(logger('dev'));
app.use(express.static('lib/public'));

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Cross Origin access
app.use(cors());


// Making the server know that we have added routes
routes(app);


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../lib/public/index.html'));
});

app.get('/', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Welcome to the NSDMS API Server');
});


export default app;
