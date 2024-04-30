import {useContext, useEffect, useState} from 'react'
import socket from './websocket.js'
import UserContext from "./UserContext.jsx";

function Chat() {
    const { user } = useContext(UserContext);
    const [currentMessage, setCurrentMessage] = useState('');

    return (
        <div className="chatBox">
            <div>test</div>
            <div className="messageBox">
                <label>
                    <input type="text" name="username" value={currentMessage}
                           onChange={e => setCurrentMessage(e.target.value)}/>
                </label>
            </div>
        </div>
    )
}

export default Chat;