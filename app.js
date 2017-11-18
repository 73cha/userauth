const express = require('express');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const csrf = require('csurf')
const bodyParser = require('body-parser');
const User = require('./models/index')['user'];
const localStrategy = require('./passport/strategy.js');

const index = require('./routes/index.js');

const usersNew = require('./routes/users_new.js');
const usersEdit = require('./routes/users_edit.js');
const usersUpdate = require('./routes/users_update.js');
const usersCreate = require('./routes/users_create.js');
const usersDelete = require('./routes/users_delete.js');
const sessionNew = require('./routes/session_new.js');
const sessionCreate = require('./routes/session_create.js');
const sessionDelete = require('./routes/session_delete.js');
const mypage = require('./routes/mypage.js');

const isAuthenticated = require('./util/is_authenticated.js');
const csrfProtection = csrf({ cookie: true })

const app = express();


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


passport.use(localStrategy);

// user.idからセッションIDを生成・シリアライズ化
passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

// セッションを持続するために、シリアライズされてセッションID
// に保存されたuser.idをデシリアライズしてレコードを探してユーザーを特定する
passport.deserializeUser((id, cb) => {
  User.findById(id)
  .then((res) => {
    let user = res.dataValues;

    cb(null, user);
  })
  .catch((err) => {
    console.log(err);

    cb(err);
  });
});


//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: Math.random().toString(36).slice(-8),
  name: 'sessionId',
  resave: false,
  saveUninitialized: false
}));
app.use(flash());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());


app.use('/', index);
app.use('/session/new', csrfProtection, sessionNew);
app.use('/session', csrfProtection, sessionCreate);
app.use('/session/destroy', csrfProtection, sessionDelete);
app.use('/users/new', csrfProtection, usersNew);
app.use('/users', csrfProtection, usersCreate);
app.use('/users/edit', csrfProtection, isAuthenticated, usersEdit);
app.use('/users/update', csrfProtection, isAuthenticated, usersUpdate);
app.use('/users/destroy', csrfProtection, isAuthenticated, usersDelete);
app.use('/mypage', isAuthenticated, mypage);


app.use((req, res, next) => {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
