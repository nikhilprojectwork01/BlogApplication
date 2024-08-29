const mongoose = require('mongoose');
const Blog = require("../Model/BlogSchema.js");
const Comment = require("../Model/CommentSchema.js");


module.exports.blogmain = async (req, res) => {
  let data = await Blog.find().populate("Owner")
  res.render("Main.ejs", { data })
}
module.exports.blogShow = async (req, res) => {
  let { id } = req.params;
  let data = await Blog.findById(`${id}`).populate({ path: "Comment", populate: { path: "Owner" } }).populate("Owner");
  res.render("Show.ejs", { data });
}
module.exports.new = (req, res) => {
  res.render("new.ejs");
}
module.exports.newPost = async (req, res) => {
  let url = req.file.path;
  let filename = req.file.filename
  let newpost = new Blog(req.body.Blog);
  newpost.Owner = req.user._id;
  newpost.image = url;
  await newpost.save();
  req.flash("success", "New Post Created")
  res.redirect("/Blog");
}
module.exports.showEdit = async (req, res) => {
  let { id } = req.params;
  let data = await Blog.findById(`${id}`);
  res.render("edit.ejs", { data });
}
module.exports.UpdateEdit = async (req, res) => {
  let { id } = req.params;
  let url = req.file.path;
  let data = await Blog.findByIdAndUpdate(`${id}`, { ...req.body.Blog });
  data.image = url;
  await data.save();
  req.flash("success", "Updated  Successfully");
  res.redirect(`/Blog/${id}/show`);
}
module.exports.Distroy = async (req, res) => {
  let { id } = req.params;
  let data = await Blog.findByIdAndDelete(`${id}`);
  req.flash("error", "Deleted Successfully");
  res.redirect("/Blog");
}
module.exports.comment = async (req, res) => {
  let { id } = req.params;
  let data = await Blog.findById(`${id}`);
  let newComment = new Comment(req.body.Comment);
  data.Comment.push(newComment);
  newComment.Owner = req.user._id;
  await newComment.save();
  await data.save();
  res.redirect(`/Blog/${id}/show`);
}
module.exports.DeleteComment = async (req, res) => {
  let { commentid, blogid } = req.params;
  await Comment.findByIdAndDelete(`${commentid}`);
  await Blog.findByIdAndUpdate(blogid, { $pull: { Comment: commentid } });
  res.redirect(`/Blog/${blogid}/show`);
}


module.exports.userdata = async (req, res) => {
  let data = await Blog.find({ Owner: { $in: [req.user._id] } }).populate("Owner");
  res.render("User.ejs", { data });
}