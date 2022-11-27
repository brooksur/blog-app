const express = require('express')
const cors = require('cors')
const { randomBytes } = require('crypto')
const axios = require('axios')

const app = express()
app.use(express.json())
app.use(cors())

const commentsByPostId = {}

app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id])
})

app.post('/posts/:id/comments', async (req, res) => {
  const comment = {
    postId: req.params.id,
    commentId: randomBytes(4).toString('hex'),
    content: req.body.content
  }

  const comments = commentsByPostId[comment.postId] || []

  comments.push(comment)

  commentsByPostId[comment.postId] = comments

  await axios.post('http://localhost:4005/events', {
    type: 'CREATED:COMMENT',
    data: comment
  })

  return res.status(201).send(comments)
})

app.post('/events', async (req, res) => {
  console.log('Received event', req.body)
  return res.send({ status: 'OK' })
})

app.listen('4001', () => {
  console.log('Listening on port 4001...')
})
