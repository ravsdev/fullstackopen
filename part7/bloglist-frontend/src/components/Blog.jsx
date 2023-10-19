import { useState } from 'react'
import { updateBlog, removeBlog } from '../reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { useNavigate, useParams } from 'react-router-dom'

const Blog = () => {
    const user = useSelector((state) => state.user)
    const { id } = useParams()
    const blog = useSelector((state) =>
        state.blog.find((blog) => blog.id === id)
    )
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleDeleteBlog = async (blog) => {
        if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
            try {
                dispatch(removeBlog(blog.id))
                dispatch(setNotification(`Blog: ${blog.title} removed`, '', 5))
                navigate('/', { replace: true })
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

    if (!blog) {
        navigate('/', { replace: true })
        //return <Navigate to="/" replace={true} />
    }

    return (
        <div>
            <h2>
                {blog.title} - {blog.author}
            </h2>
            <div>
                <a href={blog.url}>{blog.url}</a>
            </div>
            <div>
                {blog.likes} likes{' '}
                <button
                    like-button=""
                    onClick={() => dispatch(updateBlog(blog))}
                >
                    Like
                </button>{' '}
            </div>
            <div>Added by {blog.user.name ?? blog.user.username}</div>
            {user.username === blog.user.username && (
                <button remove-button="" onClick={() => handleDeleteBlog(blog)}>
                    Remove
                </button>
            )}
        </div>
    )
}

export default Blog
