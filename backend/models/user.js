const mongoose = require('mongoose')
const { Schema, model } = mongoose

const userSchema = new Schema({
  username: String,
  password: String,
  friends : [String],
  posts : [{
    image: String,
    comments: [{type : Map, of : String}],
    timestamp : Number
  }]
})

const User = model('User', userSchema)

module.exports = User