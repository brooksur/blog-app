const express = require('express')
const cors = require('cors')
const { randomBytes } = require('crypto')

const app = express()
app.use(express.json())
app.use(cors())

const posts = {}

app.get('/posts', (req, res) => {
  res.send(posts)
})

app.post('/posts', (req, res) => {
  console.log(res.body)
  const id = randomBytes(4).toString('hex')
  const { title } = req.body

  posts[id] = {
    id,
    title
  }

  res.status(201).send(posts[id])
})

app.listen(4000, () => {
  console.log('Listening on port 4000...')
})