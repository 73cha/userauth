module.exports = (req) => {
  try {
    return req.session.flash.data.shift();
  } catch (err) {
    // console.log(err);
    return false;
  }
};
