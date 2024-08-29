const express = require("express");
const router = express.Router();
const blog = require("../Controller/Blog.js");
const multer = require('multer')
const { storage } = require("../Cloud_Config.js");
const upload = multer({ storage });
const isLooegIn = require("../middleware/isloggedin.js");
router.get("", blog.blogmain)
router.get("/:id/show", blog.blogShow)
router.get("/new", isLooegIn, blog.new);
router.post("/new", upload.single('Blog[image]'), blog.newPost);
router.post("/Comment/:id", blog.comment)
router.get("/Edit/:id", isLooegIn, blog.showEdit);
router.patch("/new/:id/edit", isLooegIn, upload.single('Blog[image]'), blog.UpdateEdit);
router.delete("/:id/delete", isLooegIn, blog.Distroy);
router.delete("/:commentid/delete/:blogid", blog.DeleteComment);
router.get("/asset", blog.userdata);
module.exports = router; 