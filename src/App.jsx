import { useEffect, useState } from 'react'
import './App.css'
import io from 'socket.io-client'

const socket = io('http://136.34.88.103:8080')

function App() {
    const [count, setCount] = useState(0)

    useEffect(() => {
        socket.on('gameState', (data) => {
            console.log(data)
            setCount(data.counter)
        })
    })

    const handleClick = () => {
        socket.emit('increment', 1)
    }


    return (
    <>
      <div>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={handleClick}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
    )
}

export default App
