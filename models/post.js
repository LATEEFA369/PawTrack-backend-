const mongoose = require('mongoose');

// Comment schema
const commentSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true
    },
    author: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User' 
    }
  },
  { timestamps: true }
);

// Post schema
const postSchema = new mongoose.Schema(
  {
    species: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["Lost", "Found", "Adoption"],
    },
    location: {
      type: String,
      required: true,
    },
    details: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Unknown"],
      required: true,
    },
    contact: {
      type: String,
      required: true,
    },
    breed: {
      type: String,
    },
    age: {
      type: Number,
    },
    author: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User'  
    },
    comments: [commentSchema]  
  },
  { timestamps: true }
);

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
