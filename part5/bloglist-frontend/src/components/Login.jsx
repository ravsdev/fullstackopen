import { useState } from "react"
import loginService from '../services/login';

const Login = ({handleUser, handleMessage }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = ({ target }) => {
        setUsername(target.value)
    }

    const handlePasswordChange = ({ target }) => {
        setPassword(target.value)
    }

    const handleLogin = async (event) => {
        //console.log("logging in with", username, password)
        event.preventDefault()
        try {
            const user = await loginService.login({ username, password })
            handleUser(user)
            setUsername('')
            setPassword('')
            handleMessage(null)
            window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user)) 
        }
        catch (exception) {
            handleMessage('wrong username or password')
        }       
    }
    
    return (
        <div>
            <h2>Log in</h2>
            <form onSubmit={handleLogin}>
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

export default Login
