import { useState } from "react"
import blogService from '../services/blogs'

const Blog = ({ blog, handleLikeButton }) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  
  return (
    <div style={blogStyle}>
      {blog.title} {blog.author} <button onClick={() => setVisible(!visible)}>{visible?'Hide':'Show'}</button>
      {visible &&
        <div>
          <div>URL: {blog.url}</div>
          <div>Likes: {blog.likes} <button onClick={()=>handleLikeButton(blog)}>Like</button></div>
          <div>User: {blog.user.name}</div>
          <button>Remove</button>
        </div>}
    </div>
  )

}

export default Blog