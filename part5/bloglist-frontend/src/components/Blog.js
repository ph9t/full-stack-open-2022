import { useState } from 'react'

import BlogLikes from './BlogLikes'

const Blog = ({ blog, setBlogs }) => {
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
      </div>
    </div>
  )
}

export default Blog
