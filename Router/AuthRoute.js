const express = require("express");
const router = express.Router();
const Auth = require("../Controller/Authentication.js");
const passport = require("passport");


router.get("/Singup", Auth.show);
router.post("/Singup", Auth.Credential);
router.get("/Login", Auth.Login);
router.post("/login", passport.authenticate("local", { failureRedirect: "/Authentication/Login", failureFlash: true }), Auth.loginCredential);
router.get("/Logout", Auth.Logout);





module.exports = router; 