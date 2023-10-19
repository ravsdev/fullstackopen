import { useDispatch, useSelector } from 'react-redux'
import BlogForm from './BlogForm'
import { useEffect } from 'react'
import { initializeBlogs } from '../reducers/blogReducer'
import Blog from './Blog'
import { Link } from 'react-router-dom'

const BlogList = () => {
    const dispatch = useDispatch()
    const blogs = useSelector((state) => state.blog)

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5,
    }

    useEffect(() => {
        dispatch(initializeBlogs())
    }, [])

    return (
        <>
            <BlogForm />
            <ul style={{ listStyle: 'none' }}>
                {blogs.map((blog) => (
                    <li style={blogStyle} key={blog.id}>
                        <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                    </li>
                ))}
            </ul>
        </>
    )
}

export default BlogList
