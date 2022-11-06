const express = require('express')
const cors = require('cors')
const { randomBytes } = require('crypto')

const app = express()
app.use(express.json())
app.use(cors())

const commentsByPostId = {}

app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id])
})

app.post('/posts/:id/comments', (req, res) => {
  const postId = req.params.id
  const commentId = randomBytes(4).toString('hex')
  const content = req.body.content
  const comments = commentsByPostId[postId] || []
  comments.push({
    commentId,
    content
  })
  commentsByPostId[postId] = comments
  return res.status(201).send(comments)
})

app.listen('4001', () => {
  console.log('Listening on port 4001...')
})
