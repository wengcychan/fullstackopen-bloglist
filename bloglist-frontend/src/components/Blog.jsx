import { useDispatch, useSelector } from 'react-redux'
import { addLikes, addComments } from '../reducers/blogReducer'
import { useMatch } from 'react-router-dom'
import { useState } from 'react'
import Button from 'react-bootstrap/Button'

const Blog = () => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)

  const [comment, setComment] = useState('')

  const match = useMatch('/blogs/:id')
  const blog = match ? blogs.find((blog) => blog.id === match.params.id) : null

  if (!blog) return null

  const handleUpdateLikes = () => {
    const newUpdatedObject = {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
      comments: blog.comments
    }
    dispatch(addLikes(newUpdatedObject, blog.id))
  }

  const handleUpdateComment = (event) => {
    event.preventDefault()
    const newUpdatedObject = {
      user: blog.user.id,
      likes: blog.likes,
      author: blog.author,
      title: blog.title,
      url: blog.url,
      comments: blog.comments.concat(comment)
    }
    dispatch(addComments(newUpdatedObject, blog.id))
    setComment('')
  }

  return (
    <div>
      <h3 className="mb-3">{blog.title}</h3>
      <div className="mb-4">
        <div className="mb-2">
          <a href={blog.url}>{blog.url}</a>
        </div>
        <div className="mb-1">
          <span>{blog.likes} likes </span>
          <Button variant="primary" size="sm" onClick={handleUpdateLikes}>
            like
          </Button>
        </div>
        <div>added by {blog.user.name}</div>
      </div>
      <div>
        <h4>Comments</h4>
        <form onSubmit={handleUpdateComment}>
          <input
            type="text"
            value={comment}
            className="me-1"
            onChange={({ target }) => setComment(target.value)}
          />
          <Button variant="primary" size="sm" type="submit">
            add comment
          </Button>
        </form>
        {blog.comments.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </div>
    </div>
  )
}

export default Blog
