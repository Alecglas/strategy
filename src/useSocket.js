import {useContext, useEffect, useState} from 'react';
import socket from './websocket';
import UserContext from "./UserContext.jsx";


export function useSocket() {
    const [counter, setCounter] = useState(0);
    const [connected, setConnected] = useState(false);
    const { user, updateUser } = useContext(UserContext)

    useEffect(() => {
        const counterHandler = ({ counter }) => {
            setCounter(counter);
        }
        const nameHandler = (name) => {
            localStorage.setItem('username', name)
            updateUser(name)
        }
        const handleConnect = () => setConnected(true);
        const handleDisconnect = () => setConnected(false);

        socket.on('name', nameHandler);
        socket.on('gameState', counterHandler);
        socket.on('connect', handleConnect);
        socket.on('disconnect', handleDisconnect);

        return () => {
            socket.off('name', nameHandler);
            socket.off('gameState', counterHandler);
            socket.off('connect', handleConnect);
            socket.off('disconnect', handleDisconnect);
        };
    }, []);

    const incrementCounter = () => {
        socket.emit('increment', 1)
    }

    const changeName = (name) => {
        socket.emit('changeName', name);
    }

    return { socket, connected, counter, user, incrementCounter, changeName };
}
