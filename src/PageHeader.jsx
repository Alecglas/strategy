import {useContext, useEffect, useState} from 'react'
import socket from './websocket.js'
import UserContext from "./UserContext.jsx";

function PageHeader() {
    const { user } = useContext(UserContext)
    const [count, setCount] = useState(0)

    useEffect(() => {
        socket.on('gameState', (data) => {
            setCount(data.counter)
        })
    }, [])

    const handleClick = () => {
        socket.emit('increment', 1)
    }

    return (
        <>
            <div className="header">
                <div className="header-left"></div>
                <div className="header-center">
                    <button onClick={handleClick}>
                        {count}
                    </button>
                </div>
                <div className="header-right">
                    {user}
                </div>
            </div>
        </>
    )
}

export default PageHeader;
