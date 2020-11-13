const express = require('express')
const bodyParser = require('body-parser')
const Pusher = require('pusher')
const cors = require('cors')
require('dotenv').config()
const shortId = require('shortid')
let mocks = require('./mocks')

const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const pusher = new Pusher({
  appId: process.env.PUSHER_APPID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: process.env.PUSHER_CLUSTER,
  encrypted: true
})

app.post('/animals', (req, res) => {
  // simulate actual db save with id and createdAt added
  const animal = {
    key: shortId.generate(),
    createdAt: new Date().toISOString(),
    ...req.body
  }
  mocks.push(animal) // like our db
  // trigger this update to our pushers listeners
  pusher.trigger('animal', 'new', animal)
  res.send(animal)
})

app.delete('/animals/:key', (req, res) => {
  const animal = mocks.find(emp => anim.key === req.params.key)
  mocks = mocks.filter(emp => anim.key !== animal.key)
  pusher.trigger('animal', 'deleted', animal)
  res.send(animal)
})

app.get('/animals', (req, res) => {
  res.send(mocks)
})

app.listen(process.env.PORT || 8080, () => console.log('Listening at 8080'))
