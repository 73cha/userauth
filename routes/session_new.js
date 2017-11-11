const express = require('express');
const router = express.Router();
const getFlash = require('../util/get_flash.js');


router.get('/new', (req, res, next) => {
  res.render('session_new', {
    title: 'ログイン',
    message: getFlash(req)
  });
});


module.exports = router;
