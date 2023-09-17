import { useState } from "react";
import blogService from '../services/blogs';

const BlogForm = ({handleMessage,handleCreateBlog,toggleRef}) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [url, setUrl] = useState('');
    
    const handleTitleChange = ({ target }) => {
        setTitle(target.value)
    }

    const handleAuthorChange = ({ target }) => {
        setAuthor(target.value)
    }

    const handleUrlChange = ({ target }) => {
        setUrl(target.value)
    }

    const handleNewBlog = async (event) =>{
        event.preventDefault()
        try {
            const blog = await blogService.create({ title, author, url })
            handleCreateBlog(blog)
            setTitle('')
            setAuthor('')
            setUrl('')
            toggleRef.current.toggleVisibility()
            handleMessage(`a new blog ${title} by ${author} was added`)
        }
        catch (exception) {
            handleMessage('Error creating adding a new blog')
        }
    }

    return (<div>
        <h2>Create new blog</h2>
        <form onSubmit={handleNewBlog}>
            <div>
                <label>Title
                    <input
                        type="text"
                        name="title"
                        value={title}
                        onChange={handleTitleChange}
                    />
                </label>
            </div>
            <div>
                <label>Author
                    <input
                        type="text"
                        name="author"
                        value={author}
                        onChange={handleAuthorChange}
                    />
                </label>
            </div>
            <div>
                <label>URL
                    <input
                        //type="url"
                        type="text"
                        name="url"
                        value={url}
                        onChange={handleUrlChange}
                    />
                </label>
            </div>
            <input type="submit" value="Create"/>
        </form>
    </div>)
}
export default BlogForm