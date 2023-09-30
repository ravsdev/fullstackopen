import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

describe('<BlogForm />',()=>{
    let blogTitle
    let blogAuthor
    let blogURL
    let submitBtn

    const newBlog = {
        title: 'new Blog',
        author: 'new Author',
        url: 'https://someurl.com'
    }

    test('that the form calls the event handler it received as props with the right details when a new blog is created', async ()=>{
        const handleCreateBlog = jest.fn()
        const user = userEvent.setup()

        render(<BlogForm handleCreateBlog={handleCreateBlog}/>)

        blogTitle = screen.getByRole('textbox',{
            name: /title/i
        })

        blogAuthor = screen.getByRole('textbox',{
            name: /author/i
        })

        blogURL = screen.getByRole('textbox',{
            name: /url/i
        })

        submitBtn = screen.getByText('Create')

        await user.type(blogTitle,`${newBlog.title}`)
        await user.type(blogAuthor,`${newBlog.author}`)
        await user.type(blogURL,`${newBlog.url}`)

        await user.click(submitBtn)

        expect(handleCreateBlog).toHaveBeenCalledTimes(1)
        expect(handleCreateBlog.mock.calls[0][0].title).toBe(newBlog.title)
        expect(handleCreateBlog.mock.calls[0][0].author).toBe(newBlog.author)
        expect(handleCreateBlog.mock.calls[0][0].url).toBe(newBlog.url)    
    })
})