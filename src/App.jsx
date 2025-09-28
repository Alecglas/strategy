import {useContext, useEffect, useState} from 'react'
import './App.css'
import Login from './Login'
import PageHeader from './PageHeader'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import PrivateRoute from "./PrivateRoute";
import Game from "./Game";
import IdleGame from "./IdleGame/IdleGame.jsx"
import socket from "./websocket";
import UserContext from "./UserContext.jsx";
import Chat from "./Chat.jsx";
import Sidebar from "./Sidebar.jsx";

function App() {
    const { user, updateUser } = useContext(UserContext);

    useEffect(() => {
        let username = localStorage.getItem('username')
        if(username !== null) {
            updateUser(username)
            socket.emit('changeName', username)
        } else {
            updateUser(null)
        }
    }, [])

    socket.on('name', (username) => {
        localStorage.setItem('username', username)
        updateUser(username)
    })

    return (
            <Router>
                <PageHeader/>
                <Sidebar/>
                <Chat/>
                <div className="flex justify-center bg-gray-700 pr-84 pl-84 pt-20 h-full min-h-screen w-full">
                    <Routes>
                        <Route path="/" exact element={<Game/>} />
                        <Route path="/idle" element={<IdleGame/>} />
                        <Route path="/game" element={
                                <PrivateRoute>
                                    <Game/>
                                </PrivateRoute>
                            }
                        />
                        <Route path="*" element={<Navigate to="/"/>}/>
                    </Routes>
                </div>
            </Router>
    )
}

export default App
