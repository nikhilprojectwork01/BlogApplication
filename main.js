require('dotenv').config()
const express = require("express");
const port = process.env.PORT;
const app = express();
const path = require("path");
const flash = require('connect-flash');
app.use(flash());
var methodOverride = require('method-override')
app.use(methodOverride('_method'))
app.set("viewengine", "ejs");
app.set("views", path.join(__dirname, "/views"));
const ejsMate = require('ejs-mate');
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, "/Public/css")));
app.use(express.static(path.join(__dirname, "/Public/java")));
app.use(express.urlencoded({ extended: true }));
const BlogRoute = require("./Router/Blog.js")
const AuthRoute = require("./Router/AuthRoute.js");
// Cloud Establishment
const multer = require('multer')
const { storage } = require("./Cloud_Config.js");
// Establish  connection with the database  
const mongoose = require('mongoose');
main().then(() => {
  console.log("Connection Establish with the mongdb");
}).catch(err => console.log(err));
async function main() {
  await mongoose.connect(process.env.MONGO_URL)
}

//session storing 
const session = require('express-session');
const MongoStore = require('connect-mongo');
const store = MongoStore.create({
  mongoUrl: process.env.MONGO_URL,
  crypto: {
    secret: process.env.SECRET
  },
  touchAfter: 24 * 3600
});
store.on("error", () => {
  console.log("Error in Mongo Session store ", err)
})
app.use(session({
  store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 10 * 24 * 60 * 60 * 1000,
    maxAge: 10 * 24 * 60 * 60 * 1000,
    httpOnly: true
  }
}));

// Authentication Part 
const passport = require("passport");
const localStrategy = require("passport-local");
const User = require("./Model/User.js");
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());






app.use((req, res, next) => {
  res.locals.message = req.flash("success");
  res.locals.error = req.flash("error")
  res.locals.Curruser = req.user;
  next();
})



const Blog = require("./Model/BlogSchema.js");
const Comment = require("./Model/CommentSchema.js");

app.get("/home", (req, res) => {
  res.render("Home.ejs");
})
app.get("/carrier", (req, res) => {
  res.render("carrier.ejs")
})

app.use("/Blog", BlogRoute);
app.use("/Authentication", AuthRoute);











app.listen(port, () => {
  console.log(`Connection Establish with the port ${port}`)
})


app.use((err, req, res, next) => {
  let { status = 500, message = "Internal Serer error" } = err;
  res.status(status).send(message);
});
