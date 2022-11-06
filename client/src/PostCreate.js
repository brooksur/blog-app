import React, { useState } from 'react'
import axios from 'axios'

const PostCreate = () => {
  const [title, setTitle] = useState('')

  const onSubmit = async e => {
    e.preventDefault()
    await axios.post('http://localhost:4000/posts', { title })
    setTitle('')
  }

  return (
    <div>
      <form>
        <div className="form-group">
          <label>Title</label>
          <input
            className="form-control"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </div>
        <button onClick={onSubmit}>Submit</button>
      </form>
    </div>
  )
}

export default PostCreate