const mongoose = require('mongoose');
const User = require("./User.js");
const CommentSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now()
  },
  Owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});
const Comment = mongoose.model("Comment", CommentSchema);
module.exports = Comment;