import { useMatch } from 'react-router-dom'
import { useState, useEffect } from 'react'
import userService from '../services/users'

const User = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    userService.getAll().then((users) => setUsers(users))
  }, [])

  const match = useMatch('/users/:id')
  const user = match ? users.find((user) => user.id === match.params.id) : null

  if (!user) return null

  if (user.blogs.length === 0) return <p>{user.name} not yet added blogs</p>

  return (
    <div>
      <h3>{user.name}</h3>
      <p>added blogs</p>
      {user.blogs.map((blog) => (
        <li key={blog.id}>{blog.title}</li>
      ))}
    </div>
  )
}

export default User
