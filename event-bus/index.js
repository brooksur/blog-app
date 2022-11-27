const express = require('express')
const axios = require('axios')

const app = express()

app.use(express.json())

app.post('/events', async (req, res) => {
  const event = req.body
  console.log(event)

  try {
    await Promise.all([
      // axios.post('http://localhost:4000/events', event),
      // axios.post('http://localhost:4001/events', event),
      // axios.post('http://localhost:4002/events', event)
    ])
  } catch (error) {
    return res
      .status(500)
      .send({ status: 'Server Error', content: error.message })
  }

  return res.send({
    status: 'OK',
    content: 'Event was successfully communicated'
  })
})

app.listen(4005, () => {
  console.log('Listening on port 4005...')
})
