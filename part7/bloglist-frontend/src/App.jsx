import Blog from './components/Blog'
import Login from './components/Login'
import Notification from './components/Notification'
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom'
import Users from './components/Users'
import User from './components/User'
import BlogList from './components/BlogList'
import { useDispatch, useSelector } from 'react-redux'
import { initializeUser } from './reducers/loginReducer'
import { useEffect } from 'react'
import NavMenu from './components/NavMenu'

const Root = () => {
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch()

    useEffect(() => {
        const loggedUser = window.localStorage.getItem('loggedBlogappUser')

        if (loggedUser) {
            const userJSON = JSON.parse(loggedUser)
            dispatch(initializeUser(userJSON))
        }
    }, [])

    return (
        <div>
            {!user ? (
                <Login />
            ) : (
                <>
                    <NavMenu />
                    <h1>Blogs</h1>
                    <Notification />
                    <Outlet />
                </>
            )}
        </div>
    )
}

const router = createBrowserRouter([
    {
        Component: Root,
        children: [
            { path: '/', Component: BlogList },
            { path: '/users', Component: Users },
            { path: '/users/:id', Component: User },
            { path: '/blogs', Component: BlogList },
            { path: '/blogs/:id', Component: Blog },
        ],
    },
    { path: '*', Component: Root },
])

export default function App() {
    return <RouterProvider router={router} />
}
