import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
        setBlogs(state, action) {
            return action.payload
        },
        addBlog(state, action) {
            state.push(action.payload)
        },
        modBlog(state, action) {
            const blogs = [...state]
            const updatedBlog = action.payload

            return blogs.map((blog) =>
                blog.id !== updatedBlog.id ? blog : updatedBlog
            )
        },
        delBlog(state, action) {
            const blogs = [...state]
            const id = action.payload

            return blogs.filter((blog) => blog.id !== id)
        },
        sortBlog(state, action) {
            const blogs = [...state]
            blogs.sort((a, b) => b.likes - a.likes)

            return blogs
        },
    },
})
export const { setBlogs, addBlog, modBlog, delBlog } = blogSlice.actions

export const initializeBlogs = () => {
    return async (dispatch) => {
        const blogs = await blogService.getAll()
        dispatch(setBlogs(blogs))
    }
}

export const createBlog = (blog) => {
    return async (dispatch) => {
        const { title, author, url } = blog
        const newBlog = await blogService.create({ title, author, url })
        dispatch(addBlog(newBlog))
    }
}

export const likeBlog = (blog) => {
    return async (dispatch) => {
        await blogService.update(blog.id, blog)
        dispatch(modBlog(blog))
    }
}

export const commentBlog = (blog) => {
    return async (dispatch) => {
        await blogService.postComment(blog.id, blog)
        dispatch(modBlog(blog))
    }
}

export const removeBlog = (id) => {
    return async (dispatch) => {
        await blogService.remove(id)
        dispatch(delBlog(id))
    }
}

export default blogSlice.reducer
