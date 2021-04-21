const mongoose = require('mongoose')

const { Schema, model } = mongoose

const postSchema = new Schema({
  author: String,
  image: String,
  comments: [{type : Map, of : String}],
  timestamp: Number
})

const Post = model('Post', postSchema)

module.exports = Post