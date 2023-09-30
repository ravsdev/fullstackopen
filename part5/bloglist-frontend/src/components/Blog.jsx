import { useState } from 'react'

const Blog = ({ blog, handleLikeButton, user, handleDeleteBlog }) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  
  return (
    <div style={blogStyle} className='blog'>
      <span>{blog.title} {blog.author}</span>
      <button onClick={() => setVisible(!visible)}>{visible?'Hide':'Show'}</button>
      {visible &&
        <div className='togglableContent'>
          <div>URL: {blog.url}</div>
          <div><span data-like>Likes: {blog.likes}</span> <button like-button='' onClick={()=>handleLikeButton(blog)}>Like</button></div>
          <div>User: {blog.user.name}</div>
          {user.username === blog.user.username && <button remove-button='' onClick={()=>handleDeleteBlog(blog)}>Remove</button>}
        </div>}
    </div>
  )

}

export default Blog