import {useContext, useEffect, useState} from 'react'
import {Navigate, useNavigate} from "react-router-dom";
import {useSocket} from "./useSocket.js";
import UserContext from "./UserContext.jsx";

function PageHeader() {
    const { user, updateUser } = useContext(UserContext)
    const navigate = useNavigate()
    const [open, setOpen] = useState(false)
    const [editName, setEditName] = useState(false)
    const { socket, counter, incrementCounter, changeName } = useSocket()

    const handleClick = () => {
        incrementCounter()
    }

    const handleLogout = (e) => {
        close();
    };

    const handleNameChange = (e) => {
        const name = e.target[0].value
        e.preventDefault();

        if(name) {
            setEditName(false);
            changeName(name)
            updateUser(name)
        }
    }

    const close = () => {
        setOpen(false);
    }

    const renderUsername = () => {
        console.log("USER", user)
        if(editName) {
            return (
                <form
                    onSubmit={handleNameChange}
                >
                    <div className="mr-2 font-bold text-white bg-gray-600">
                        <input autoFocus className="w-30" />
                    </div>
                </form>
            )
        } else {
            return (
                <span className="mr-2 font-bold text-white">{user}</span>
            )
        }
    }

    return (
        <div className="fixed top-0 left-0 right-0 h-16 bg-gray-800 flex items-center justify-between px-4 z-50">
            <div/>

            <div className="absolute left-1/2 transform -translate-x-1/2 font-bold text-white">
                <button onClick={handleClick}>{counter}</button>
            </div>

            <div className="flex items-center relative">
                {renderUsername()}
                <div
                    onClick={() => setOpen(!open)}
                    className="cursor-pointer"
                >
                    ⚙️
                </div>

                {open && (
                    <div
                        className="absolute top-full right-0 mt-2 bg-gray-700 rounded shadow-lg overflow-hidden z-50 min-w-[150px] cursor-pointer">
                        {user && (
                            <div
                                className="w-full text-left px-4 py-2 text-white hover:bg-gray-600"
                                onClick={() => {
                                    setEditName(!editName)
                                    setOpen(false)
                                    focus()
                                }}
                            >
                                Change Name
                            </div>
                        )}
                        {user && (
                            <div
                                className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-600"
                                onClick={handleLogout}
                            >
                                Log Out
                            </div>
                        )}
                        <div
                            className="w-full text-left px-4 py-2 text-white hover:bg-gray-600"
                            onClick={close}
                        >
                            Close
                        </div>
                    </div>
                )}
            </div>
        </div>

    )
}

export default PageHeader;
