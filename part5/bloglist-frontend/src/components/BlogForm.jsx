import { useState } from 'react'

import blogService from '../services/blogs'

const BlogForm = ({ setBlogs, notify, blogFormRef }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = async e => {
    e.preventDefault()

    try {
      const savedBlog = await blogService.create({ title, author, url })
      setBlogs(prevState => prevState.concat(savedBlog))

      notify(
        `a new blog ${savedBlog.title} by ${savedBlog.author} added`,
        'success'
      )

      blogFormRef.current.toggleVisibility()

      setTitle('')
      setAuthor('')
      setUrl('')
    } catch (exception) {
      notify(exception.response.data.error, 'error')
    }
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          title:
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:{' '}
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:{' '}
          <input value={url} onChange={({ target }) => setUrl(target.value)} />
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default BlogForm
