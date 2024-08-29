const isLooegIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.flash("error", "You Must Be Login Before Creating Post");
    res.redirect("/Authentication/Login");
  }
  else {
    next();
  }
}

module.exports = isLooegIn;
