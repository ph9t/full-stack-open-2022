import blogService from '../services/blogs'

const BlogLikes = ({ blog, setBlogs }) => {
  const handleClick = async () => {
    const updatedBlog = {
      ...blog,
      user: blog.user.id,
      likes: blog.likes + 1,
    }
    const returnedBlog = await blogService.update(blog.id, updatedBlog)

    setBlogs(prevState =>
      prevState.map(b => (b.id === returnedBlog.id ? returnedBlog : b))
    )
  }

  return (
    <div>
      likes {blog.likes}
      <button onClick={handleClick}>like</button>
    </div>
  )
}

export default BlogLikes
