import {useContext, useEffect, useState} from 'react'
import socket from './websocket.js'
import UserContext from "./UserContext.jsx";

function Chat() {
    const { user } = useContext(UserContext);
    const [currentMessage, setCurrentMessage] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        socket.on('newMessage', (message) => {
            console.log("messages", message, messages)
            setMessages((_messages) => [..._messages, message])
            console.log(messages)
            if(messages.length > 5){
                messages.shift()
            }
        })
    }, [])

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            socket.emit("sendMessage", { message: currentMessage })
            setCurrentMessage('')
        }
    }

    return (
        <div className="chatBox">
            <label className="messageBox">
                <textarea onKeyDown={handleKeyDown} className="messageBox" type="text" name="username"
                          value={currentMessage}
                          onChange={e => setCurrentMessage(e.target.value)}/>
            </label>
            {messages.toReversed().map((message, i) => (
                <div className="chatMessage" key={i}>{message}</div>
            ))}
        </div>
    )
}

export default Chat;