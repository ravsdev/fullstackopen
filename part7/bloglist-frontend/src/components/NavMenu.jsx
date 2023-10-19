import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { userLogout } from '../reducers/loginReducer'

const NavMenu = () => {
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch()

    const padding = {
        padding: 5,
    }
    const handleLogout = () => {
        dispatch(userLogout())
    }

    return (
        <div>
            <Link style={padding} to="/blogs">
                Blogs
            </Link>
            <Link style={padding} to="/users">
                Users
            </Link>
            <span>
                {user.name} logged in{' '}
                <button onClick={handleLogout}>Log out</button>
            </span>
        </div>
    )
}

export default NavMenu
