import { likeBlog, removeBlog } from '../reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import Comment from './Comment'
import {
    Button,
    Container,
    ListGroup,
    ListGroupItem,
    Stack,
} from 'react-bootstrap'

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

    const handleLikeBlog = async (blog) => {
        const updatedBlog = {
            ...blog,
            likes: blog.likes + 1,
        }
        dispatch(likeBlog(updatedBlog))
    }

    if (!blog) {
        return <Navigate to="/" replace={true} />
    }

    return (
        <Container>
            <h2>
                {blog.title} - {blog.author}
            </h2>
            <div>
                <a href={blog.url}>{blog.url}</a>
            </div>
            <div>
                {blog.likes} likes{' '}
                <Button
                    variant="warning"
                    like-button=""
                    onClick={() => handleLikeBlog(blog)}
                >
                    Like
                </Button>{' '}
            </div>
            <div>Added by {blog.user.name ?? blog.user.username}</div>
            {user.username === blog.user.username && (
                <Button
                    remove-button=""
                    variant="danger"
                    onClick={() => handleDeleteBlog(blog)}
                >
                    Remove
                </Button>
            )}
            <Comment blog={blog} />
            <ListGroup>
                {blog.comments.map((comment) => (
                    <ListGroupItem>{comment}</ListGroupItem>
                ))}
            </ListGroup>
        </Container>
    )
}

export default Blog
