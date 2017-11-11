module.exports = (req, message) => {
  return req.flash('message', message);
};
