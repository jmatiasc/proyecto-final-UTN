var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const dotenv = require('dotenv');
const session = require('express-session');
const { verifyAdmin,verifyUser} = require('./middlewares/auth');



dotenv.config();
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const noticiasRouter = require('./routes/noticias');
const adminRouter = require('./routes/admin/administrador');
const userRouter = require('./routes/admin/usuarios');
const noticiaAdminRouter = require('./routes/admin/noticias');
const login = require('./routes/login');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret : 'callSession',
  cookie : {maxAge: null},
  resave: true,
  saveUninitialized : false
}))

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/noticias', noticiasRouter);
app.use('/administrador',verifyAdmin, adminRouter);
app.use('/usuario',verifyUser, userRouter);
app.use('/adminNoticia',verifyUser, noticiaAdminRouter);
app.use('/login', login);

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

module.exports = app;
