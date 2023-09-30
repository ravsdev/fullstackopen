import { useState } from 'react'

const BlogForm = ({handleCreateBlog}) => {
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

    const handleNewBlog = async (event) =>{
        event.preventDefault()
        handleCreateBlog({
            title: title,
            author: author,
            url: url
        })
        setTitle('')
        setAuthor('')
        setUrl('')
    }

    return (<div>
        <h2>Create new blog</h2>
        <form onSubmit={handleNewBlog}>
            <div>
                <label>Title
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
                <label>Author
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
                <label>URL
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
            <input id="create-blog" type="submit" value="Create"/>
        </form>
    </div>)
}
export default BlogForm