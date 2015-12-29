/**
 * Created by irfan.maulana on 12/27/2015.
 * Generate by Express Generator in WebStorm IDE v.10.0.4
 */

const API_FILE_PATH = "./services/api/";

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index_route = require('./routes/index');
var usertype_api = require(API_FILE_PATH + 'usertype_api');
var user_api = require(API_FILE_PATH + 'user_api');
var bookcategory_api = require(API_FILE_PATH + 'bookcategory_api');
var book_api = require(API_FILE_PATH + 'book_api');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index_route);
app.use('/api/usertypes', usertype_api);
app.use('/api/users', user_api);
app.use('/api/bookcategories', bookcategory_api);
app.use('/api/books', book_api);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
