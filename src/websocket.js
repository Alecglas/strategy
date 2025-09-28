import io from 'socket.io-client'

const url = import.meta.env.DEV ? 'localhost:8443' : 'https://alecglascock.com'
let socket = io(url);

export default socket;