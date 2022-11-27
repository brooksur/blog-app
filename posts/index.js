const express = require('express')
const cors = require('cors')
const { randomBytes } = require('crypto')
const axios = require('axios')

const app = express()
app.use(express.json())
app.use(cors())

const posts = {}

app.get('/posts', (req, res) => {
  res.send(posts)
})

app.post('/posts', async (req, res) => {
  const post = {
    id: randomBytes(4).toString('hex'),
    title: req.body.title
  }

  posts[post.id] = post

  await axios.post('http://localhost:4005/events', {
    type: 'CREATED:POST',
    data: post
  })

  return res.status(201).send(post)
})

app.post('/events', async (req, res) => {
  console.log('Received event', req.body)
  return res.send({ status: 'OK' })
})

app.listen(4000, () => {
  console.log('Listening on port 4000...')
})
