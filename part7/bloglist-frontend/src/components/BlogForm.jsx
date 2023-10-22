import { useRef, useState } from 'react'
import Togglable from './Toggable'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { createBlog } from '../reducers/blogReducer'
import { Button, Card, Form } from 'react-bootstrap'

const BlogForm = () => {
    const blogFormRef = useRef()
    const dispatch = useDispatch()
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleTitleChange = ({ target }) => {
        setTitle(target.value)
    }

    const handleAuthorChange = ({ target }) => {
        setAuthor(target.value)
    }

    const handleUrlChange = ({ target }) => {
        setUrl(target.value)
    }

    const handleNewBlog = async (event) => {
        event.preventDefault()

        try {
            const blog = { title, author, url }
            const newBlog = dispatch(createBlog(blog))
            dispatch(
                setNotification(
                    `a new blog ${title} by ${author} was added`,
                    '',
                    5
                )
            )
            setTitle('')
            setAuthor('')
            setUrl('')
        } catch (exception) {
            dispatch(
                setNotification('Error creating adding a new blog', 'error', 5)
            )
        }
    }

    return (
        <Togglable buttonLabel="New Blog" ref={blogFormRef}>
            <Card>
                <Card.Body>
                    <Card.Title>Create new blog</Card.Title>
                    <Form onSubmit={handleNewBlog}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                name="title"
                                placeholder="Blog's title"
                                value={title}
                                onChange={handleTitleChange}
                            />
                        </Form.Group>

                        <Form.Group
                            className="mb-3"
                            controlId="formBasicPassword"
                        >
                            <Form.Label>Author</Form.Label>
                            <Form.Control
                                type="text"
                                name="author"
                                placeholder="Blog's author"
                                value={author}
                                onChange={handleAuthorChange}
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="formBasicPassword"
                        >
                            <Form.Label>URL</Form.Label>
                            <Form.Control
                                type="url"
                                name="url"
                                placeholder="Blog's URL"
                                value={url}
                                onChange={handleUrlChange}
                            />
                        </Form.Group>
                        <Button
                            variant="success"
                            id="create-blog"
                            type="submit"
                        >
                            Create
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Togglable>
    )
}
export default BlogForm
