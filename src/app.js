/**
 * Created by irfan.maulana on 12/27/2015.
 * Generate by Express Generator in WebStorm IDE v.10.0.4
 */

const ROUTE_FILE_PATH = "./backend/routes/";
const ROUTE_POSTFIX = "-route";
const API_PUBLIC_PATH = "/api/";

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index_route = require(ROUTE_FILE_PATH + 'index' + ROUTE_POSTFIX);
var usertype_api = require(ROUTE_FILE_PATH + 'usertype' + ROUTE_POSTFIX);
var user_api = require(ROUTE_FILE_PATH + 'user' + ROUTE_POSTFIX);
var bookcategory_api = require(ROUTE_FILE_PATH + 'bookcategory' + ROUTE_POSTFIX);
var book_api = require(ROUTE_FILE_PATH + 'book' + ROUTE_POSTFIX);
var transaction_api = require(ROUTE_FILE_PATH + 'transaction' + ROUTE_POSTFIX);

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'frontend/views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /static
//app.use(favicon(path.join(__dirname, 'static', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'frontend/static')));

app.use('/', index_route);
app.use(API_PUBLIC_PATH + 'usertypes', usertype_api);
app.use(API_PUBLIC_PATH + 'users', user_api);
app.use(API_PUBLIC_PATH + 'bookcategories', bookcategory_api);
app.use(API_PUBLIC_PATH + 'books', book_api);
app.use(API_PUBLIC_PATH + 'transactions', transaction_api);

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
