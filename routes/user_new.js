const express = require('express');
const router = express.Router();
const getFlash = require('../util/get_flash.js');


router.get('/new', (req, res, next) => {
  res.render('user_new', {
    title: 'サインアップ',
    message: getFlash(req)
  });
});


module.exports = router;
