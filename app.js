// ENV
require('dotenv').config();

// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var config = require("./config");
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var morgan = require('morgan');

var app = express();
var port = process.env.PORT || 3000;

// Middlewares
// bodyParser는 미들웨어이기 때문에 라우터보다 항상 위에 있도록
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

// set the secret key variable for jwt
app.set('jwt-secret', config.secret);

// index page, just for testing
app.get('/', (req, res) => {
  res.send('Hello JWT');
});

// Database
// Node.js 의 native Promise 사용
mongoose.Promise = global.Promise;
// MD 접속
mongoose.connect(config.mongoUri);
var db = mongoose.connection;
db.once('open', function(){
  console.log('DB connected!');
});
db.on('error', console.error);

// Main
app.listen(config.port, function(){
  console.log("Server listening on port %d", config.port);
});

//Router
//기본으로 index.js를 찾기 때문에
//require(".routes/index.js")라고 명시해주지 않았음
// var routes = require("./routes")(app, pool);

var usercontroller = require('./routes/usercontroller');
app.use('/users', usercontroller);

module.exports = app;
