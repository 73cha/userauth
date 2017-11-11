module.exports = (req) => {
  try {
    return req.session.flash.message.shift();
  } catch (err) {
    console.log(err);
    return false;
  }
};
