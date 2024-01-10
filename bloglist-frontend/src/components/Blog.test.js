import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('<Blog /> only renders title and author, but not the URL or number of likes by default', () => {
  const blog = {
    title: 'New blog',
    author: 'New author',
    url: 'https://newblog.com/',
    user: '1',
    likes: 15
  }

  const user = {
    username: 'test',
    name: 'test',
    password: '12345'
  }

  const { container } = render(<Blog blog={blog} user={user} />)

  const blogInfo = container.querySelector('.blogInfo')

  expect(blogInfo).toHaveTextContent('New blog')
  expect(blogInfo).toHaveTextContent('New author')

  const blogDetails = container.querySelector('.blogDetails')
  expect(blogDetails).toHaveStyle('display: none')
})

test('<Blog /> shows the URL and number of likes when the button controlling the shown details has been clicked', async () => {
  const blog = {
    title: 'New blog',
    author: 'New author',
    url: 'https://newblog.com/',
    user: '1',
    likes: 15
  }

  const user = {
    username: 'test',
    name: 'test',
    password: '12345'
  }

  const { container } = render(<Blog blog={blog} user={user} />)

  const userEv = userEvent.setup()
  const button = screen.getByText('view')
  await userEv.click(button)

  const div = container.querySelector('.blogDetails')
  expect(div).not.toHaveStyle('display: none')
})

test('<Blog /> calls event handler twice when clicking the like button twice', async () => {
  const blog = {
    title: 'New blog',
    author: 'New author',
    url: 'https://newblog.com/',
    user: '1',
    likes: 15
  }

  const user = {
    username: 'test',
    name: 'test',
    password: '12345'
  }

  const updateBlog = jest.fn()

  render(<Blog blog={blog} user={user} updateBlog={updateBlog} />)

  const userEv = userEvent.setup()
  const button = screen.getByText('like')
  await userEv.click(button)
  await userEv.click(button)

  expect(updateBlog.mock.calls).toHaveLength(2)
})
