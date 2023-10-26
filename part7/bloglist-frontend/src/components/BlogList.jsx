import { useDispatch, useSelector } from 'react-redux'
import BlogForm from './BlogForm'
import { useEffect } from 'react'
import { initializeBlogs } from '../reducers/blogReducer'
import { Link } from 'react-router-dom'
import { Container, ListGroup, Row, Stack } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const BlogList = () => {
    const dispatch = useDispatch()
    const blogs = useSelector((state) => state.blog)

    useEffect(() => {
        dispatch(initializeBlogs())
    }, [])

    return (
        <Stack gap={3}>
            <h2>Blog List</h2>
            <BlogForm />
            <ListGroup>
                {blogs.map((blog) => (
                    <LinkContainer key={blog.id} to={`/blogs/${blog.id}`}>
                        <ListGroup.Item action>{blog.title}</ListGroup.Item>
                    </LinkContainer>
                    // <ListGroup.Item key={blog.id}>
                    //     <Link to={`/blogs/${blog.id}`}></Link>
                    // </ListGroup.Item>
                ))}
            </ListGroup>
        </Stack>
    )
}

export default BlogList
