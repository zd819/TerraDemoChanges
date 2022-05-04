const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");
const logger = require('morgan');
const request = require('request');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const express = require('express');
const cors = require('cors');


// headers for widget containing our dev id and api key
const apiHeaders = {"dev-id": "imperial-Ktod24UiJ6", "x-api-key": "03deeabbca244792bfb01a0883a4293e9a32cc863de7f7924e95af4b14089c10"};

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
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.use('/login', (req, res) => {
  res.send({
    token: 'test123'
  });
});


// get a sessionId from terra for widget
app.post('/newSession', (req, res) =>{

  res.send(getSessionsId(req.body.userId));

});

function getSessionsId(userId){

  const options = {
    url: 'https://api.tryterra.co/v2/auth/generateWidgetSession',
    body:{reference_id: userId, language: 'EN'},
    method: 'POST',
    headers: apiHeaders
  };

  request(options, function (error,res){
    //we get back json obj of user id status and session id. return that to front end
    console.log(res.body);

    return res;
  });

};


app.post( '/terra_data', ( req, res ) => {
  console.log( 'received webhook', req.body );
  const terraPayload = req.body;
  
  console.log(terraPayload);

  res.sendStatus(200);
} );



module.exports = app;

//app.listen(8080, () => console.log('API is running on http://localhost:8080/login'));

