import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('<BlogForm /> creates new blog and calls onSubmit', async () => {
  const addBlog = jest.fn()

  render(<BlogForm createBlog={addBlog} />)

  const user = userEvent.setup()
  const button = screen.getByText('create')
  const titleInput = screen.getByPlaceholderText('write title here')
  const authorInput = screen.getByPlaceholderText('write author here')
  const urlInput = screen.getByPlaceholderText('write url here')
  await user.type(titleInput, 'New blog')
  await user.type(authorInput, 'New author')
  await user.type(urlInput, 'https://newblog.com/')
  await user.click(button)

  expect(addBlog.mock.calls).toHaveLength(1)
  expect(addBlog.mock.calls[0][0].title).toBe('New blog')
  expect(addBlog.mock.calls[0][0].author).toBe('New author')
  expect(addBlog.mock.calls[0][0].url).toBe('https://newblog.com/')
})
