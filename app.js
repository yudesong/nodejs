var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
var ejs = require("ejs");
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('.html',ejs.__express);

//mongo setup
var mongo = require("mongodb");
var monk = require("monk");
var db = monk("localhost:27017/users");
var collection = db.get("usercollection");
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.get("/addUser",users.addUser);
app.post("/addUser",users.doAddUser(collection));
app.post("/doLogin",routes.login(db,collection));
app.use("/delUser",users.delUser(collection));
app.post("/editUser",users.editUser(collection));
app.get("/user",users.user(collection));
app.post("/findUser",users.findUser(collection));




//app.get("/addUser",users.addUser(collection));
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
