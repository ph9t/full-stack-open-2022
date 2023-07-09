import { useState, useEffect } from 'react'
import Blog from './components/Blog'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedOnBlogAppUser')

    if (loggedUser) {
      const user = JSON.parse(loggedUser)

      setUser(user)
    }
  }, [])

  const handleLogin = async e => {
    e.preventDefault()

    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem('loggedOnBlogAppUser', JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log('ERROR', exception.response.data.error)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedOnBlogAppUser')
    setUser(null)
  }

  if (user === null) {
    return (
      <>
        <h2>login in to application</h2>
        <form onSubmit={handleLogin}>
          <div>
            username{' '}
            <input
              type='text'
              onChange={({ target }) => setUsername(target.value)}
              value={username}
            />
          </div>
          <div>
            password{' '}
            <input
              type='password'
              onChange={({ target }) => setPassword(target.value)}
              value={password}
            />
          </div>
          <button type='submit'>login</button>
        </form>
      </>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <p>
        {user.name || user.username} logged in{' '}
        <button onClick={handleLogout}>logout</button>
      </p>
      {blogs.map(blog => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )
}

export default App
