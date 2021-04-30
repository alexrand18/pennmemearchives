const express = require('express')

const router = express.Router()
const Post = require('../models/post')
const User = require('../models/user')
const isAuthenticated = require('../middlewares/isAuthenticated')
const axios = require('axios')

router.get('/getMemes', async (req, res, next) => {
    const { data } = await axios.get('https://api.imgflip.com/get_memes')
    const memes = data.data.memes
    res.send(memes)
})


router.post('/makeMeme', isAuthenticated, async (req, res, next) => {
  const {id, box_array, caption} = req.body
  let urlParam = ''
  box_array.forEach((box, idx) => {
    Object.keys(box).forEach((key) => {
      urlParam+=`boxes[${idx}][${key}]=${box[key]}&`
    })
  })
  const {data} = await axios.post(`https://api.imgflip.com/caption_image?username=alexrand2018&password=alexrand2018&template_id=${id}&text0=&text1=&${urlParam}`)
  if (data.success === true) {
    Post.create({author : req.session.username , image : data.data.url , timestamp : Date.now(), caption : caption}, (err, data) => {
      if (err) next(new Error('Error adding post'))
      else res.send(data)
    })
  }
})

router.get('/loggedInUser', (req, res) => {
    if (req.session.username) res.send(req.session.username)
    else res.send('not logged in')
})

router.get('/getMyMemes', isAuthenticated, (req,res, next) => {
    Post.aggregate([{$match :{ author : req.session.username}}, {$sort: {timestamp : -1}}], (err , data) => {
      if (err) next(new Error('Could not get your memes in DB'))
      else res.send(data)
    })
})

router.get('/getMyFriendsMemes' , isAuthenticated, async(req, res, next) => {
  Post.aggregate([{$match : {author : {$in : req.session.friends}}}, {$sort : {timestamp : -1}}], (err, data) => {
    if (err) {
      console.log(err)
      next(new Error('Could not get your friends memes in DB'))
    }
    else res.send(data)
  })
})

router.post('/getUsersWithPref', isAuthenticated, async (req, res, next) => {
  const {search} = req.body
  const regExpress = `^${search}`
  console.log(regExpress)
  console.log(req.body)
  User.aggregate([{$match : {username : {$regex : regExpress}}}], (err , data) => {
    if (err) next(new Error('Could not get the users in DB'))
    else {
      const matches = []
      const friendsSet = new Set()
      console.log(`the friends are ${req.session.friends}`)
      req.session.friends.forEach((friend) => {
        console.log(`friend i is ${friend}`)
        friendsSet.add(friend)
      })
      data.forEach((match) => {
        if (friendsSet.has(match.username)) matches.push({...match, friended : 1})
        else matches.push({...match, friended : 0})
      })
      res.send(matches)
    }
  })
})

router.post('/followUser', isAuthenticated, (req, res, next) => {
    const { username } = req.body
    User.updateOne({username : req.session.username} , {$push : {friends : username}}, (err, data) => {
      if (err) next(new Error('Could  not add friend to the DB'))
      else {
        req.session.friends.push(username)
        res.send('added')
      }
    })
})

router.post('/addComment', isAuthenticated, (req, res, next) => {
  const {_id , comment } = req.body
  Post.updateOne({_id : _id }, {$push : {comments : {text : comment, author : req.session.username, timestamp : Date.now()}}}, (err, data) => {
    if (err) next(new Error('Could  not add comment to the DB'))
    else {
      res.send(req.session.username)
    }
  })
})

router.post('/isFriend', isAuthenticated, (req, res, next) => {
  const { user } = req.body
  res.send(req.session.friends.includes(user))
})

 

module.exports = router