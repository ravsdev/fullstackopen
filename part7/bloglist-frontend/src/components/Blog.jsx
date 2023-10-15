import { useState } from 'react'
import { updateBlog, removeBlog } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'

const Blog = ({ blog, user }) => {
    const [visible, setVisible] = useState(false)
    const dispatch = useDispatch()

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5,
    }

    const handleDeleteBlog = async (blog) => {
        if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
            try {
                dispatch(removeBlog(blog.id))
                dispatch(setNotification(`Blog: ${blog.title} removed`, '', 5))
            } catch (error) {
                dispatch(
                    setNotification(
                        `error removing blog: ${blog.title}`,
                        'error',
                        5
                    )
                )
            }
        }
    }

    return (
        <div style={blogStyle} className="blog">
            <span>
                {blog.title} {blog.author}
            </span>
            <button onClick={() => setVisible(!visible)}>
                {visible ? 'Hide' : 'Show'}
            </button>
            {visible && (
                <div className="togglableContent">
                    <div>URL: {blog.url}</div>
                    <div>
                        <span data-like>Likes: {blog.likes}</span>{' '}
                        <button
                            like-button=""
                            onClick={() => dispatch(updateBlog(blog))}
                        >
                            Like
                        </button>
                    </div>
                    <div>User: {blog.user.name ?? blog.user.username}</div>
                    {user.username === blog.user.username && (
                        <button remove-button="" onClick={()=>handleDeleteBlog(blog)}>
                            Remove
                        </button>
                    )}
                </div>
            )}
        </div>
    )
}

export default Blog
