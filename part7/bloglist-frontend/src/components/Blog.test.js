import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

describe('<Blog />', () => {
    let container
    const blog = {
        title: 'Blog Title',
        author: 'The author',
        url: 'https://someplace.com',
        likes: 0,
        user: {
            username: 'test',
        },
    }
    const user = {
        username: 'test',
    }
    const mockHandler = jest.fn()

    beforeEach(() => {
        container = render(
            <Blog blog={blog} user={user} handleLikeButton={mockHandler} />
        ).container
    })

    test('shows only the blog title and the author', () => {
        screen.getByText('Blog Title The author')
        const div = container.querySelector('.togglableContent')
        expect(div).toBe(null)
    })

    test('URL and likes are shown when press the "Show" button', async () => {
        const user = userEvent.setup()
        const button = screen.getByText('Show')

        await user.click(button)

        screen.getByText(`URL: ${blog.url}`)
        screen.getByText(`Likes: ${blog.likes}`)
    })

    test('the event handler is called twice if the like button is clicked twice', async () => {
        const user = userEvent.setup()
        const showButton = screen.getByText('Show')

        await user.click(showButton)
        const likeButton = screen.getByText('Like')
        await user.click(likeButton)
        await user.click(likeButton)

        expect(mockHandler.mock.calls).toHaveLength(2)
    })
})
