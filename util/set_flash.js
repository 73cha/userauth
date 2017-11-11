module.exports = (req, state, message) => {
  return req.flash('data', {
    state: state,
    message: message
  });
};
