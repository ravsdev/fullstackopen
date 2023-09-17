import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import blogService from './services/blogs'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Toggable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const blogFormRef = useRef()

  useEffect(() => {
    (async () => {
      const blogList = await blogService.getAll();
      setBlogs(sortBlogs(blogList));
    })()
  }, [])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedBlogappUser')

    if (loggedUser) {
      const userJSON = JSON.parse(loggedUser)
      setUser(userJSON)
      blogService.setToken(userJSON.token)
    }

  }, [])

  const sortBlogs = (blogs) =>{
    const sortBlogs = [...blogs]
    sortBlogs.sort((a,b)=>b.likes-a.likes)
    return sortBlogs
  }

  const handleUser = (user) => {
    setUser(user)
    blogService.setToken(user.token)
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    blogService.setToken(null)
  }

  const handleMessage = (message) => {
    setMessage(message)
    setTimeout(() => setMessage(null), 2000)
  }

  const handleCreateBlog = (blog) => {
    setBlogs(sortBlogs(blogs.concat({
      ...blog, user: {
        name: user.name
      }
    })))
  }

  const handleLikeButton = async (blog)=>{
    await blogService.update(blog.id,{
      likes: blog.likes+1
    })

    const blogIndex = blogs.findIndex((el)=>el.id===blog.id)
    const updateBlogs = [...blogs]
    updateBlogs.at(blogIndex).likes+=1
    setBlogs(sortBlogs(updateBlogs))
  }

  if (user === null) return <>
    <Notification message={message} />
    <Login handleUser={handleUser} handleMessage={handleMessage} />
  </>

  return (
    <div>
      <h2>Blogs</h2>
      <Notification message={message} />
      <p>{user.name} logged in <button onClick={handleLogout}>Log out</button></p>
      <Togglable buttonLabel="New Note" ref={blogFormRef}>
        <BlogForm token={user.token} handleCreateBlog={handleCreateBlog} handleMessage={handleMessage} toggleRef={blogFormRef} />
      </Togglable>

      <br />
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} handleLikeButton={handleLikeButton}/>
      )}
    </div>
  )
}

export default App