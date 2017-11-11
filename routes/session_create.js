const express = require('express');
const router = express.Router();
const passport = require('passport');


router.post('/new',
  passport.authenticate('local', {
    failureRedirect: '/session/new'
  }), (req, res) => {
    res.redirect('/mypage');
  }
);


module.exports = router;
