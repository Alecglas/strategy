
import {useSocket} from "./useSocket.js";

function Sidebar() {
    const { socket, connected } = useSocket();

    return (
        <div className="fixed bottom-0 left-0 w-80 h-full bg-gray-900 flex flex-col rounded-tl-md">

        </div>

    )
}

export default Sidebar;