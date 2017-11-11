const express = require('express');
const router = express.Router();
const setFlash = require('../util/set_flash.js');
const flashMessage = 'ログアウトしました';


router.get('/delete', (req, res, next) => {
  setFlash(req, flashMessage);
  req.logout();
  res.redirect('/');
});


module.exports = router;
