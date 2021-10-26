const mongoose = require('mongoose');

const date = new Date();
// const formattedCurrentDate = `${date.getMonth()}/${date.getDay()}/${date.getFullYear()}`;

const postSchema = mongoose.Schema({
  title: String,
  content: String,
  likes: {
    default: 0,
    type: Number,
  },
  dislikes: {
    default: 0,
    type: Number,
  },
  links: {
    default: [],
    type: Array,
  },
  dateCreated: {
    default: date,
    type: Date,
  },
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
