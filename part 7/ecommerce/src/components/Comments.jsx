import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createComment } from '../reducers/blogReducer'
import { notify } from '../reducers/notificationReducer'

const Comments = ({ blog }) => {
  const dispatch = useDispatch()
  const [comment, setComment] = useState('')
  const onSubmit = async (event) => {
    try {
      event.preventDefault()
      await dispatch(createComment(blog, comment))
      dispatch(notify('Added a comment successfully', 'success', 5000))
      setComment('')
    } catch (err) {
      notify('Could not add a comment', 'error', 5000)
    }
  }

  return (
    <div>
      <br></br>
      <form onSubmit={onSubmit} style={{ display: 'flex', alignContent: 'center' }}>
        <div>
          <TextField
            label="comment"
            size="small"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        <Button variant="contained" color="primary" type="submit" style={{ height: '40px' }}>
          send
        </Button>
      </form>

      <h3>comments</h3>
      <ul>
        {blog.comments.map((comment, idx) => (
          <li key={idx}>{comment}</li>
        ))}
      </ul>
    </div>
  )
}

export default Comments
