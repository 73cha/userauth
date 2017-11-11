const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;
const User = require('../models/index.js')['user'];
const setFlash = require('../util/set_flash.js');
const flashMessage = {
  existUser: '既に同じ名前のユーザーが存在します。',
  createUser: 'ユーザー登録を完了してログインしました。',
  failCreateUser: 'ユーザーの登録に失敗しました。'
};


router.post('/', (req, res, next) => {
  bcrypt.hash(req.body.password, saltRounds)
  .then((hash) => {
    if (!hash) {
      return Promise.reject();
    }

    User.create({
      name: req.body.name,
      password_hash: hash
    })
    .then((user) => {
      setFlash(req, flashMessage.createUser);

      req.login(user, (err) => {
        if (err) {
          return next();
        }

        res.redirect('/mypage');
      });
    })
    .catch((err) => {
      console.log(err)

      setFlash(req, flashMessage.existUser);
      res.redirect('/users/new');
    });
  })
  .catch((err) => {
      console.log(err)

      setFlash(req, flashMessage.failCreateUser);
      res.redirect('/users/new');
  });
});


module.exports = router;
