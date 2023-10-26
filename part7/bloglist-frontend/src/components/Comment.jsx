import { useState } from 'react'
import { commentBlog } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'
import { Button, Col, Form, Row } from 'react-bootstrap'

const Comment = ({ blog }) => {
    const [comment, setComment] = useState('')
    const dispatch = useDispatch()

    const handleCommentChange = (event) => {
        setComment(event.target.value)
    }

    const handleSubmitComment = (event) => {
        event.preventDefault()
        const updatedBlog = {
            ...blog,
            comments: [...blog.comments, comment],
        }
        dispatch(commentBlog(updatedBlog))
    }

    return (
        <>
            <h3>Comments</h3>
            <Form onSubmit={handleSubmitComment}>
                <Row className="align-items-center">
                    <Col xs="auto">
                        <Form.Label htmlFor="inlineFormInput" visuallyHidden>
                            Name
                        </Form.Label>
                        <Form.Control
                            className="mb-2"
                            id="comment"
                            name="comment"
                            placeholder="comment"
                            value={comment}
                            onChange={handleCommentChange}
                        />
                    </Col>
                    <Col xs="auto">
                        <Button type="submit" className="mb-2">
                            Add comment
                        </Button>
                    </Col>
                </Row>
            </Form>
        </>
    )
}

export default Comment
