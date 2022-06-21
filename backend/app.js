const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");
const logger = require('morgan');

const indexRouter = require('./routes/index');
const loginRouter = require('./routes/login');
const sessionRouter = require('./routes/newSession');
const payloadRouter = require('./routes/terraPayload');
const dataRouter = require('./routes/getUserData');
const mongoRouter = require('./routes/getFromMongo');
const terraIdRouter = require('./routes/getTerraId');
const providersRouter = require('./routes/getUserProviders');

const cors = require('cors');
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(cors());
app.use(logger('dev'));
app.use(express.json({ limit: '25MB' }));

//app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({limit: '25mb'}));
app.use(express.urlencoded({ extended: true, limit: '25mb' }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/newSession', sessionRouter);
app.use('/terraPayload', payloadRouter);
app.use('/getData', dataRouter);
app.use('/data', mongoRouter);
app.use('/getTerraId', terraIdRouter);
app.use('/userProviders', providersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  console.log('In Error Handler');
  console.log(err);
  console.log(req.body);
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


// MONGO MONGO 

const { MongoClient, ServerApiVersion } = require('mongodb');
const fs = require('fs');
const credentials = '../keys/mongo.pem'
global.mongoClient = new MongoClient('mongodb+srv://cluster0.skkxj.mongodb.net/myFirstDatabase?authSource=%24external&authMechanism=MONGODB-X509&retryWrites=true&w=majority', {
    sslKey: credentials,
    sslCert: credentials,
    serverApi: ServerApiVersion.v1
  });

global.usersDB;
global.wearableDB;
mongoClient.connect((err,client) => {

  if(err) throw err;

  db = client.db("Terra");
  userDB = db.collection("users");
  wearableDB = db.collection("wearable_data");

  console.log("Mongo Connected");

});


global.dataRequest = [];
// 0 - Nothing going on rn
// 1 - Processing
// 2 - Process fulfilled
// 3 - Error of somesort

global.authError = [];


module.exports = app;
