import { useState, useEffect } from 'react';

const initialState = {
    stats: {
        farming: 1.65,
        woodcutting: 1.63,
       /* construction: 1.24,
        cooking: 1.11,
        digging: 1.0,
        agility: 1.3,
        combat: 1.05*/
    },
    player: {
        time: "08:33",
        health: 62.7,
        maxHealth: 100,
        regen: 6.69,
    },
    inventory: [
        { name: "Berry", amount: 7, max: 10, time: "1.8s" },
        { name: "Cooked fish", amount: 6, max: 10, time: "1.1s" },
        { name: "Wood", amount: 5, max: 10, time: "-" },
        { name: "Raw fish", amount: 8, max: 10, time: "-" },
    ],
    actionQueue: [
        { id: 1, action: "Fight cave spider" },
        { id: 2, action: "Gather berries" },
        { id: 3, action: "Cook fish" },
        { id: 4, action: "Catch fish" },
        { id: 5, action: "Gather berries" },
    ],
};

const IdleGame = () => {
    const [state, setState] = useState(initialState);


    const removeAction = (id) => {
        setState((prev) => ({
            ...prev,
            actionQueue: prev.actionQueue.filter((a) => a.id !== id),
        }));
    };


    return (
        <div className="p-4 bg-gray-900 text-white">
            {/* Stats */}
            <div className="grid grid-cols-7 gap-2 mb-4">
                {Object.entries(state.stats).map(([key, value]) => (
                    <div key={key} className="bg-gray-700 p-2 rounded text-center">
                        {key.charAt(0).toUpperCase() + key.slice(1)} × {value}
                    </div>
                ))}
            </div>


            {/* Player Info */}
            <div className="flex justify-between bg-gray-800 p-2 mb-4 rounded">
                <div>⏱ {state.player.time}</div>
                <div>❤️ {state.player.health.toFixed(1)} / {state.player.maxHealth}</div>
                <div>➕ {state.player.regen}</div>
            </div>


            <div className="grid grid-cols-3 gap-4">
                {/* Jobs */}
                <div className="bg-gray-800 p-4 rounded">
                    <h2 className="font-bold mb-2">Jobs</h2>
                    {"Gather berries, Catch fish, Cook fish, Dig stone".split(", ").map(
                        (job, idx) => (
                            <button
                                key={idx}
                                className="block w-full bg-gray-600 hover:bg-gray-500 mb-2 p-2 rounded"
                            >
                                {job}
                            </button>
                        )
                    )}
                </div>


                {/* Inventory */}
                <div className="bg-gray-800 p-4 rounded">
                    <h2 className="font-bold mb-2">Inventory</h2>
                    <table className="w-full text-left text-sm">
                        <thead>
                        <tr>
                            <th>Item</th>
                            <th>Amount</th>
                            <th>Time</th>
                        </tr>
                        </thead>
                        <tbody>
                        {state.inventory.map((item, idx) => (
                            <tr key={idx}>
                                <td>{item.name}</td>
                                <td>
                                    {item.amount} / {item.max}
                                </td>
                                <td>{item.time}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>


                {/* Action Queue */}
                <div className="bg-gray-800 p-4 rounded">
                    <h2 className="font-bold mb-2">Action queue</h2>
                    <ul>
                        {state.actionQueue.map((a, idx) => (
                            <li
                                key={a.id}
                                className="flex justify-between items-center mb-2 bg-gray-700 p-2 rounded"
                            >
                                <span>
                                {idx + 1}. {a.action}
                                </span>
                                <button
                                    className="text-red-400 hover:text-red-200"
                                    onClick={() => removeAction(a.id)}
                                >
                                    ✖
                                </button>
                            </li>
                        ))}
                    </ul>
                    <button className="bg-green-600 hover:bg-green-500 w-full p-2 rounded">
                        ▶ Running
                    </button>
                </div>
            </div>
        </div>
    );
}

export default IdleGame;