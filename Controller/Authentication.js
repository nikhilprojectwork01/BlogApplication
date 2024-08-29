const User = require("../Model/User.js");
const passport = require("passport");
module.exports.show = (req, res) => {
  res.render("Signup.ejs");
}

module.exports.Credential = async (req, res) => {
  try {
    let { username, email, password } = req.body;
    let data1 = new User({ username, email });
    let info = await User.register(data1, password);
    req.login(info, (err) => {
      if (err) {
        next(err);
      }
      else {
        req.flash("Success", "User Register Successfully");
        res.redirect("/Blog");
      }
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/Authentication/Singup");
  }
}

module.exports.Login = (req, res) => {
  res.render("Login.ejs");
}

module.exports.loginCredential = async (req, res) => {
  req.flash("success", "You LoggedIn SuccessFully ");
  res.redirect("/Blog");
}


module.exports.Logout = (req, res) => {
  req.logOut((err) => {
    if (err) {
      next(err);
    }
    else {
      req.flash("success", "You Logout Successfully Enjoy!");
      res.redirect("/Home");
    }
  })
}