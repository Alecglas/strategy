import { useEffect, useState } from 'react'
import './App.css'
import io from 'socket.io-client'

const url = import.meta.env.DEV ? 'localhost:8443' : 'https://alecglascock.com'

const socket = io(url)

function App() {
    const [count, setCount] = useState(0)

    useEffect(() => {
        console.log(import.meta.env)
        socket.on('gameState', (data) => {
            console.log(data)
            setCount(data.counter)
        })
    }, [])

    const handleClick = () => {
        socket.emit('increment', 1)
    }


    return (
    <>
      <div className="card">
        <button onClick={handleClick}>
          count is {count}
        </button>
      </div>
    </>
    )
}

export default App
