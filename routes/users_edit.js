const express = require('express');
const router = express.Router();
const getFlash = require('../util/get_flash.js');


router.get('/:id', (req, res, next) => {
  res.render('users_edit', {
    title: 'ユーザー情報編集',
    flash: getFlash(req),
    user: req.user
  });
});


module.exports = router;
