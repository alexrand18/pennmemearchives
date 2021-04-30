const express = require('express')
const cookieSession = require('cookie-session')
const path = require('path')
const http = require('http')
const accountRouter = require('./routes/account')
const apiRouter = require('./routes/api')
const socketIo = require('socket.io')
const mongoose = require('mongoose')

const app = express()
const port = process.env.PORT || 3000
const server = http.createServer(app)
const io = socketIo(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
})

io.on('connection', socket => {
  socket.on('addNewMeme', meme => {
    io.emit('getNewMeme', meme)
  })
  /*socket.on('answeredQuestion', info => {
    io.emit('getNewAnswer', info)
  })*/
  socket.on('disconnect', () => console.log('disconnected'))
})

const MONGO_URI = process.env.MONGODB_URI || 'mongodb+srv://ahr18:ahr18@cluster0.bq2wq.mongodb.net/Meme?retryWrites=true&w=majority'
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })

app.use(express.json())
app.use(express.static('dist'))
app.use(cookieSession({
  name: 'session',
  keys: ['ALEXRAND123456789'],
}))

app.use((err, req, res, next) => {
  res.status(500).send('Something broke!')
})

app.use('/account', accountRouter)
app.use('/api', apiRouter)

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'))
})

app.get('/favicon.ico', (req, res) => {
  res.status(404).send()
})

server.listen(port, () => {
  console.log(`Listening on port ${port}`)
})