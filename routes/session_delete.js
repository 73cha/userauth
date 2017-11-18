const express = require('express');
const router = express.Router();
const setFlash = require('../util/set_flash.js');
const flashMessage = 'ログアウトしました。';


router.get('/', (req, res, next) => {
  setFlash(req, 'is-success', flashMessage);
  req.logout();
  res.redirect('/');
});


module.exports = router;
