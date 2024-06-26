import {useContext, useEffect, useState} from 'react'
import socket from './websocket.js'
import {Navigate, useNavigate} from "react-router-dom";
import UserContext from "./UserContext.jsx";




function Login() {
    const { user } = useContext(UserContext);
    const navigate = useNavigate()
    const [username, setUsername] = useState('')

    if (user) {
        return <Navigate to="/game" />
    }

    const handleLogin = () => {
        socket.emit('setUsername',  username)
        socket.on('login', (username) => {
            navigate('/game')
        })
    }

    return (
        <div className="login">
            <label>
                Name: <input type="text" name="username" value={username} onChange={e => setUsername(e.target.value)} />
            </label>
            <div className="card">
                <button onClick={handleLogin}>
                    Join Room
                </button>
            </div>
        </div>
    )
}

export default Login;
