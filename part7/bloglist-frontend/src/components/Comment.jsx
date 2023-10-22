import { useState } from 'react'
import { commentBlog } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'

const Comment = () => {
    const [comment, setComment] = useState('')
    const dispatch = useDispatch()

    const handleCommentChange = (event) => {
        setComment(event.target.value)
    }

    const handleSubmitComment = (event) => {
        event.preventDefault()
        const updatedBlog = {
            ...blog,
            comments: blog.likes + 1,
        }
        dispatch(commentBlog(updatedBlog))
    }

    return (
        <>
            <h3>Comments</h3>
            <form onSubmit={handleSubmitComment}>
                <input
                    type="text"
                    name="comment"
                    placeholder="comment"
                    value={comment}
                    onChange={handleCommentChange}
                />
                <input type="submit" value="Add comment" />
            </form>
        </>
    )
}

export default Comment
