import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const BlogForm = ({ blogFormRef }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const dispatch = useDispatch()

  const addBlog = async (event) => {
    event.preventDefault()

    blogFormRef.current.toggleVisibility()
    dispatch(createBlog({ title, author, url }))

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h3>create new</h3>

      <Form onSubmit={addBlog}>
        <Form.Group className="mb-3">
          <Form.Label>title:</Form.Label>
          <Form.Control
            type="text"
            value={title}
            name="Title"
            id="title"
            onChange={({ target }) => setTitle(target.value)}
            placeholder="write title here"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>author:</Form.Label>
          <Form.Control
            type="text"
            value={author}
            name="Author"
            id="author"
            onChange={({ target }) => setAuthor(target.value)}
            placeholder="write author here"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>url:</Form.Label>
          <Form.Control
            type="text"
            value={url}
            name="Url"
            id="url"
            onChange={({ target }) => setUrl(target.value)}
            placeholder="write url here"
          />
        </Form.Group>

        <Button className="mb-3" variant="primary" type="submit" id="create-button">
          create
        </Button>
      </Form>
    </div>
  )
}

export default BlogForm
