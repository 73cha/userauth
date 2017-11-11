const express = require('express');
const router = express.Router();
const getFlash = require('../util/get_flash.js');


router.get('/', (req, res, next) => {
  res.render('mypage', {
    title: 'マイページ',
    message: getFlash(req),
    user: req.user
  });
});


module.exports = router;
