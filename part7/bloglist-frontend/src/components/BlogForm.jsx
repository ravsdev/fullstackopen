import { useRef, useState } from 'react'
import Togglable from './Toggable'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { createBlog } from '../reducers/blogReducer'

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
            blogFormRef.current.toggleVisibility()
            dispatch(
                setNotification(
                    `a new blog ${newBlog.title} by ${newBlog.author} was added`,
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
            <h2>Create new blog</h2>
            <form onSubmit={handleNewBlog}>
                <div>
                    <label>
                        Title
                        <input
                            type="text"
                            name="title"
                            placeholder="title"
                            value={title}
                            onChange={handleTitleChange}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Author
                        <input
                            type="text"
                            name="author"
                            placeholder="author"
                            value={author}
                            onChange={handleAuthorChange}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        URL
                        <input
                            //type="url"
                            type="text"
                            name="url"
                            placeholder="url"
                            value={url}
                            onChange={handleUrlChange}
                        />
                    </label>
                </div>
                <input id="create-blog" type="submit" value="Create" />
            </form>
        </Togglable>
    )
}
export default BlogForm
