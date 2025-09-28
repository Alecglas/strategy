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
        navigate('/')
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
        if(editName) {
            return (
                <form
                    onSubmit={handleNameChange}
                >
                    <div className="username">
                        <input/>
                    </div>
                </form>
            )
        } else {
            return (
                <div className="username">
                    {user}
                </div>
            )
        }
    }

    return (
        <>
            <div className="header">
                <div className="header-left"></div>
                <div className="header-center">
                    <button onClick={handleClick}>
                        {counter}
                    </button>
                </div>
                <div className="header-right">
                    {renderUsername()}
                    <button
                        onClick={() => setOpen(!open)}
                        className="settings"
                    >
                        ⚙️
                    </button>

                    {open && (
                        <div className="dropdown">
                            { user && (
                                <button
                                    className="dropdown-item"
                                    onClick={() => setEditName(!editName)}
                                >
                                    Change Name
                                </button>
                            )}
                            { user && (
                            <button
                                className="dropdown-item"
                                style={{color: "red"}}
                                onClick={handleLogout}
                            >
                                Log Out
                            </button>
                            )}
                            <button
                                className="dropdown-item"
                                onClick={close}
                            >
                                Close
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default PageHeader;
