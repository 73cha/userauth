const Strategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/index.js')['user'];
const setFlash = require('../util/set_flash.js');
const flashMessage = {
  loginSuccess: 'ログインしました。',
  incorrectPassword: 'パスワードが正しくありません。',
  worngUsername: 'ユーザー名が間違っています。'
};


module.exports = (() => {
  return new Strategy({
    usernameField: 'name',
    passReqToCallback: true
  },
  (req, name, password, callback) => {
    User.findOne({
      where: { name: name }
    })
    .then((res) => {
      console.log(res);
      let user;

      try {
        user = res.dataValues;
      } catch (err) {
        return Promise.reject(err);
      }

      return user;
    })
    .then((user) => {
      bcrypt.compare(password, user.password_hash, (err, res) => {
        if (err) {
          return callback(err);
        }

        if (!res) {
          return  callback(null, false, setFlash(req, 'is-danger', flashMessage.incorrectPassword))
        }

        return callback(null, user, setFlash(req, 'is-success', flashMessage.loginSuccess));
      });
    })
    .catch((err) => {
      console.log(err);

      return callback(null, false, setFlash(req, 'is-danger', flashMessage.worngUsername));
    });
  });
})();
