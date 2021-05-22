const postLogin = function (req, res, next) {
  const uuid = req.cookies.uuid;
  if (!uuid) {
    res.redirect('/health-insurance/');
  } else {
    next();
  }
  // next();
}

module.exports = postLogin;