const express = require('express');
const router = express.Router();
const getFlash = require('../util/get_flash.js');


router.get('/', (req, res, next) => {
  res.render('index', {
    title: 'ようこそ',
    message: getFlash(req),// ログアウトのflash
    user: req.user
  });
});


module.exports = router;
