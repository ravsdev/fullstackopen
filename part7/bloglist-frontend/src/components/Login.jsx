import { useState } from 'react'
import loginService from '../services/login'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { userLogin } from '../reducers/userReducer'

const Login = () => {
    const dispatch = useDispatch()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleUsernameChange = ({ target }) => {
        setUsername(target.value)
    }

    const handlePasswordChange = ({ target }) => {
        setPassword(target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        setUsername('')
        setPassword('')
        dispatch(userLogin(username, password))
    }

    return (
        <div>
            <h2>Log in</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Username
                        <input
                            type="text"
                            name="Username"
                            value={username}
                            onChange={handleUsernameChange}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Password
                        <input
                            type="password"
                            name="Password"
                            value={password}
                            onChange={handlePasswordChange}
                        />
                    </label>
                </div>
                <input type="submit" value="Log in" />
            </form>
        </div>
    )
}

export default Login
