const express = require('express')

const router = express.Router()
const Post = require('../models/post')
const isAuthenticated = require('../middlewares/isAuthenticated')
const axios = require('axios')

router.get('/posts', isAuthenticated, async (req, res, next) => {
    const { author } = req.body
    Post.find({author}, (err, data) => {
    if (err) next(new Error('Could not get the questions in DB'))
    else res.send(data)
  })
})

router.get('/getMemes', async (req, res, next) => {
    const { data } = await axios.get('https://api.imgflip.com/get_memes')
    const memes = data.data.memes
    console.log(memes)
    res.send(memes)
})

router.post('/makeMeme', async (req, res, next) => {
  const {id, font, box_array} = req.body
  let urlParam = ''
  console.log(req.body)
  box_array.forEach((box, idx) => {
    Object.keys(box).forEach((key) => {
      urlParam+=`boxes[${idx}][${key}]=${box[key]}&`
    })
  })
  const {data} = await axios.post(`https://api.imgflip.com/caption_image?username=alexrand2018&password=alexrand2018&template_id=${id}&text0=&text1=&${urlParam}`)
  console.log(data)
  if (data.success === true) {
    //TODO update db 
    console.log('here')
    Post.create({author : req.session.username , image : data.data.url , timestamp : Date.now()}, (err, data) => {
      console.log(err)
      console.log(data)
      if (err) next(new Error('Error adding post'))
      else res.send('success')
    })
  }
})
 

/*router.post('/post/add', isAuthenticated, async (req, res, next) => {
  const { questionText } = req.body
  Question.create({ author: req.session.username, questionText }, (err, data) => {
    if (err) next(new Error('Error adding questions'))
    else res.send(data)
  })
})

router.post('/questions/answer', isAuthenticated, async (req, res, next) => {
  const { _id, answer } = req.body
  Question.updateOne({ _id }, { answer }, (err, data) => {
    if (err) next(new Error('Error answering the question'))
    else {
      const { nModified } = data
      if (nModified === 0) next(new Error('This question doesnt exist'))
      else res.send(`The question with id = ${_id} now has the answer ${answer}`)
    }
  })
})

router.get('/loggedIn', async (req, res) => {
  res.send(req.session.username)
})*/

module.exports = router