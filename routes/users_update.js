const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;
const User = require('../models/index.js')['user'];
const setFlash = require('../util/set_flash.js');
const getFlash = require('../util/get_flash.js');
const flashMessage = {
  existUser: '既に同じ名前のユーザーが存在します。',
  changeUsername: 'ユーザー名を変更しました。',
  changePassword: 'パスワードを変更しました。',
  successUpdate: 'ユーザー情報を更新しました。',
  failUpdate: 'ユーザー情報の更新に失敗しました。'
};


router.post('/:id', (req, res, next) => {
  const userName = req.body.name;
  const password = req.body.password;

  User.findById(req.params.id)
  .then((user) => {
    // 探してきたユーザーの名前と入力された名前が違う場合に更新
    // 同じだった場合は、探してきたユーザーを返すだけ
    if (userName !== user.get('name')) {
      user.set('name', userName);

      return user.save()
      .then((user) => {
        setFlash(req, 'is-success', flashMessage.changeUsername);
        return user;
      })
      .catch((err) => {
        console.log(err);

        setFlash(req, 'is-danger', flashMessage.existUser);
      });
    } else {
      return user;
    }
  })
  .then((user) => {
    // パスワードが入力されていないならリダイレクトするだけ
    // 入力されている場合に更新
    if (password.length === 0) {
      res.redirect(`/users/edit/${req.params.id}`);
    } else { 
      return bcrypt.hash(password, saltRounds)
      .then((hash) => {
        user.set('password_hash', hash);

        return user.save()
        .then(() => {
          // ユーザーを更新して無ければパスワード更新のフラッシュをセット
          if (!getFlash(req)) {
            setFlash(req, 'is-success', flashMessage.changePassword);
          // ユーザーを更新していたら両方更新なので、更新のフラッシュをセット
          } else {
            setFlash(req, 'is-success', flashMessage.successUpdate);
          }
          res.redirect(`/users/edit/${req.params.id}`);
        })
        .catch((err) => {
          console.log(err);

          setFlash(req, 'is-danger', flashMessage.failUpdate);
        });
      })
    }
  })
  .catch((err) => {
    console.log(err);

    res.redirect(`/users/edit/${req.params.id}`);
  });
});


module.exports = router;
