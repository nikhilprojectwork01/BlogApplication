const mongoose = require('mongoose');
const Comment = require("./CommentSchema.js");
const User = require("./User.js");
const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true
  },
  image: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now()
  },
  Comment: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment"
    }
  ],
  Owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});

BlogSchema.post("findOneAndDelete", async (data) => {
  if (data.Comment.length) {
    await Comment.deleteMany({ _id: { $in: data.Comment } });
  }
});

const Blog = mongoose.model("Blog", BlogSchema);
module.exports = Blog;