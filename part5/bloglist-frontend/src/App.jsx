import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'

import Login from './components/Login'
import blogService from './services/blogs'
import loginService from './services/login'

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
      const blogList = await blogService.getAll()
      setBlogs(sortBlogs(blogList))
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

  const sortBlogs = (blogs) => {
    const sortBlogs = [...blogs]
    sortBlogs.sort((a, b) => b.likes - a.likes)
    return sortBlogs
  }

  const handleLogin = async (username, password) => {

    try {
      const user = await loginService.login({ username, password })
      setUser(user)
      blogService.setToken(user.token)
      handleMessage(null)
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
    }
    catch (exception) {
      handleMessage('wrong username or password', 'error')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    blogService.setToken(null)
  }

  const handleMessage = (message = '', style = '') => {
    setMessage({
      text: message,
      style: style
    })
    setTimeout(() => setMessage(null), 2000)
  }

  const handleCreateBlog = async (blog) => {
    const { title, author, url } = blog
    try {
      const blog = await blogService.create({ title, author, url })

      setBlogs(sortBlogs(blogs.concat({
        ...blog, user: {
          username: user.username,
          name: user.name
        }
      })))
      blogFormRef.current.toggleVisibility()
      handleMessage(`a new blog ${blog.title} by ${blog.author} was added`)
    }
    catch (exception) {
      handleMessage('Error creating adding a new blog')
    }

  }

  const handleDeleteBlog = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      try {
        await blogService.remove(blog.id)
        const blogsCopy = [...blogs]
        const index = blogs.findIndex(el => el.id === blog.id)
        blogsCopy.splice(index, 1)
        setBlogs(sortBlogs(blogsCopy))
      } catch (error) {
        handleMessage(`error removing blog: ${blog.title}`)
      }
    }

  }
  const handleLikeButton = async (blog) => {
    await blogService.update(blog.id, {
      likes: blog.likes + 1
    })

    const blogIndex = blogs.findIndex((el) => el.id === blog.id)
    const updateBlogs = [...blogs]
    updateBlogs.at(blogIndex).likes += 1
    setBlogs(sortBlogs(updateBlogs))
  }

  if (user === null) return <>
    <Notification message={message} />
    <Login handleLogin={handleLogin} />
  </>

  return (
    <div>
      <h2>Blogs</h2>
      <Notification message={message} />
      <p>{user.name} logged in <button onClick={handleLogout}>Log out</button></p>
      <Togglable buttonLabel='New Blog' ref={blogFormRef}>
        <BlogForm token={user.token} handleCreateBlog={handleCreateBlog} handleMessage={handleMessage} toggleRef={blogFormRef} />
      </Togglable>

      <br />
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} handleDeleteBlog={handleDeleteBlog} handleLikeButton={handleLikeButton} user={user} />
      )}
    </div>
  )
}

export default App