const express = require('express');
const router = express.Router();
const User = require('../models/index.js')['user'];
const setFlash = require('../util/set_flash.js');
const flashMessage = {
  sucessWithdrawal: '退会しました。ご利用、ありがとうございました。',
  failWithdrawal: '退会処理に失敗しました。',
  notFoundUser: '退会するユーザーが見つかりませんでした。'
};


router.get('/:id', (req, res, next) => {
  User.findById(req.params.id)
  .then((user) => {
    user.destroy()
    .then((deleted) => {
      console.log(deleted);

      setFlash(req, 'is-success', flashMessage.sucessWithdrawal);
      // ログアウトさせないと、Passportがセッションを
      // 維持しようとしてセッションIDからユーザーを探してくるため
      // エラーになってしまう
      req.logOut();
      res.redirect('/');
    })
    .catch((err) => {
      console.log(err);

      setFlash(req, 'is-danger', flashMessage.failWithdrawal);
      res.redirect('/mypage');
    });
  })
  .catch((err) => {
    console.log(err);

    setFlash(req, 'is-danger', flashMessage.notFoundUser);
    res.redirect('/mypage');
  });
});


module.exports = router;
