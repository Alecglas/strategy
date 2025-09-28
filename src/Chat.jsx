import {useContext, useEffect, useState} from 'react'
import UserContext from "./UserContext.jsx";
import {useSocket} from "./useSocket.js";

function Chat() {
    const { user } = useContext(UserContext);
    const [currentMessage, setCurrentMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const { socket, connected } = useSocket();

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

    return connected && user && (
        <div className="fixed bottom-0 right-0 w-80 h-full bg-gray-900 flex flex-col rounded-tl-md">
            <div className="flex-1 overflow-y-auto p-2 flex flex-col-reverse text-white ">
                {messages
                    .slice()
                    .reverse()
                    .map((message, i) => (
                    <div key={i} className="text-left mb-1">
                        {message}
                    </div>
                ))}
            </div>


            <label className="w-full">
                <textarea
                    onKeyDown={handleKeyDown}
                    name="username"
                    value={currentMessage}
                    onChange={(e) => setCurrentMessage(e.target.value)}
                    rows={2}
                    className="w-full p-2 bg-gray-800 text-white resize-none border-t border-gray-700 focus:outline-none"
                />
            </label>
        </div>

    )
}

export default Chat;