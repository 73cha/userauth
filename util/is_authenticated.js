const setFlash = require('../util/set_flash.js');
const flashMessage = 'ログインしてください';


module.exports = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    setFlash(req, 'is-danger', flashMessage)
    res.redirect('/session/new');
  }
};
