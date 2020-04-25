const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodayParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const router = require('./router');



//app setup 
const app = express();
app.use(morgan('combined'));
app.use(bodayParser.json({type: '*/*'}));
app.use(cors());

router(app);

//db setup
mongoose.connect('mongodb://localhost/auth', {useNewUrlParser: true})

const connection = mongoose.connection;
connection.on('connected', () => console.log('DB connected'));


//server setup
const port = process.env.port || 9000;
const server =  http.createServer(app);
server.listen(port, () => console.log(`Server listening at port: ${port}`));
