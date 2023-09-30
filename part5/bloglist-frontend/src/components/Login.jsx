import { useState } from 'react'
import loginService from '../services/login'
import PropTypes from 'prop-types'

const Login = ({handleLogin }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleUsernameChange = ({ target }) => {
        setUsername(target.value)
    }

    const handlePasswordChange = ({ target }) => {
        setPassword(target.value)
    }

    const handleSubmit = async (event) => {
        //console.log("logging in with", username, password)
        event.preventDefault()
        setUsername('')
        setPassword('')
        handleLogin(username, password)
        /*
        try {
            const user = await loginService.login({ username, password })
            handleUser(user)
            setUsername('')
            setPassword('')
            handleMessage(null)
            window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user)) 
        }
        catch (exception) {
            handleMessage('wrong username or password','error')
        }       */
    }
    
    return (
        <div>
            <h2>Log in</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username
                        <input
                            type="text"
                            name="Username"
                            value={username}
                            onChange={handleUsernameChange}
                        />
                    </label>
                </div>
                <div>
                    <label>Password
                        <input
                            type="password"
                            name="Password"
                            value={password}
                            onChange={handlePasswordChange}
                        />
                    </label>
                </div>
                <input type="submit" value="Log in"/>
            </form>
        </div>
    )
}
Login.propTypes = {
    handleUser: PropTypes.func.isRequired,
    handleMessage: PropTypes.func
}

export default Login
