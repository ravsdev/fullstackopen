import { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { setUser, userLogout } from './reducers/userReducer'

import Blog from './components/Blog'
import Login from './components/Login'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'

const App = () => {
    const dispatch = useDispatch()
    const blogs = useSelector((state) => state.blog)
    const user = useSelector((state) => state.user)

    useEffect(() => {
        dispatch(initializeBlogs())
    }, [])

    useEffect(() => {
        const loggedUser = window.localStorage.getItem('loggedBlogappUser')

        if (loggedUser) {
            const userJSON = JSON.parse(loggedUser)
            dispatch(setUser(userJSON))
        }
    }, [])

    return (
        <div>
            <h2>Blogs</h2>
            <Notification />
            {user === null ? (
                <Login />
            ) : (
                <div>
                    <p>
                        {user.name} logged in{' '}
                        <button onClick={() => dispatch(userLogout())}>
                            Log out
                        </button>
                    </p>
                    <BlogForm />
                    <br />
                    {blogs.map((blog) => (
                        <Blog key={blog.id} blog={blog} user={user} />
                    ))}
                </div>
            )}
        </div>
    )
}

export default App
