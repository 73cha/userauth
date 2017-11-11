const express = require('express');
const router = express.Router();
const getFlash = require('../util/get_flash.js');


router.get('/', (req, res, next) => {
  res.render('session_new', {
    title: 'ログイン',
    flash: getFlash(req)
  });
});


module.exports = router;
