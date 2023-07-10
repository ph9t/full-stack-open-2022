import { useState } from 'react'

import BlogLikes from './BlogLikes'

import blogService from '../services/blogs'

const Blog = ({ blog, setBlogs, currentUser }) => {
  const [showFull, setShowFull] = useState(false)

  console.log(blog)

  const borderStyle = {
    borderStyle: 'solid',
    borderColor: 'black',
    borderRadius: 5,
    margin: 3,
    padding: 5,
  }

  const showFullStyle = { display: showFull ? '' : 'none' }

  const handleRemove = async () => {
    const continueDelete = window.confirm(
      `Remove blog ${blog.title} by ${blog.author}?`
    )

    if (!continueDelete) return

    await blogService.remove(blog.id)
    setBlogs(prevState => prevState.filter(b => b.id !== blog.id))
  }

  return (
    <div style={borderStyle}>
      {blog.title} {blog.author}{' '}
      <button onClick={() => setShowFull(!showFull)}>
        {showFull ? 'hide' : 'view'}
      </button>
      <div style={showFullStyle}>
        <div>{blog.url}</div>
        <div>
          <BlogLikes blog={blog} setBlogs={setBlogs} />
        </div>
        <div>{blog.user.name || blog.user.username}</div>
        {blog.user.username === currentUser && (
          <button onClick={handleRemove}>remove</button>
        )}
      </div>
    </div>
  )
}

export default Blog
