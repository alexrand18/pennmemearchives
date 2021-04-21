const express = require('express')
const cookieSession = require('cookie-session')
const path = require('path')
const http = require('http')
const accountRouter = require('./routes/account')
const apiRouter = require('./routes/api')

const app = express()
const port = process.env.PORT || 3000
const server = http.createServer(app)



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