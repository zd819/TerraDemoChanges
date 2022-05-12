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
const dataRouter = require('./routes/getData');
const autoDataRouter = require('./routes/autoData');

const cors = require('cors');
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/newSession', sessionRouter);
app.use('/terraPayload', payloadRouter);
app.use('/getData', dataRouter);
app.use('/autoData', autoDataRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  console.log('in error handler');
  console.log(err);
  console.log(req);
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
const mongoClient = new MongoClient('mongodb+srv://cluster0.skkxj.mongodb.net/myFirstDatabase?authSource=%24external&authMechanism=MONGODB-X509&retryWrites=true&w=majority', {
    sslKey: credentials,
    sslCert: credentials,
    serverApi: ServerApiVersion.v1
  });

// async function run() {
//   try {
//     await client.connect();
//     const database = client.db("Terra");
//     const collection = database.collection("users");
//     const docCount = await collection.countDocuments({});
//     console.log(docCount);
//     // perform actions using client
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// 
// run().catch(console.dir);

global.db;
global.usersDB;

mongoClient.connect((err) => {
    
    if(err) {
        conslotchange.log(err);
        throw err;
    }

    db = mongoClient.db("Terra");
    usersDB = db.collections("users");

    console.log("Data Base Connected");


});




module.exports = app;
