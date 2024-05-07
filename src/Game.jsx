import { useState, useEffect } from 'react';
import { Layer, Rect, Stage } from 'react-konva';
import { Noise } from 'noisejs';
import socket from './websocket.js'

const tileData = {
    "water": { "type": "water", "color": "#00f" },
    "sand": { "type": "sand", "color": "#f7d59c" }, // Example color for sand
    "grass": { "type": "grass", "color": "#8bc34a" } // Example color for grass
};

class Tile {
    constructor(type, color) {
        this.type = type;
        this.color = color;
    }
}

const WIDTH = 600;
const HEIGHT = 600;
const SQUARE_SIZE = 10;
const GRID_SIZE = HEIGHT/SQUARE_SIZE;
const NOISE = new Noise();

const Game = () => {
    const [grid, setGrid] = useState([[]])
    const [thresholdWater, setThresholdWater] = useState(-0.2);
    const [thresholdGrass, setThresholdGrass] = useState(0.1);
    const [noiseScale, setNoiseScale] = useState(0.1);

    const getTile = (noise) => {
        let type;
        if (noise <= thresholdWater) type = 'water';
        else if (noise >= thresholdGrass) type = 'grass';
        else type = 'sand';
        const data = tileData[type];
        return new Tile(data.type, data.color);
    };

    const getColor = (noise) => {
        let type;
        if (noise < thresholdWater) type = 'water';
        else if (noise > thresholdGrass) type = 'grass';
        else type = 'sand';
        const data = tileData[type].color;
        return data;
    }

    const generateGrid = () => {
        NOISE.seed(Math.random())
        const newGrid = [];
        for (let row = 0; row < GRID_SIZE; row++) {
            const line = []
            for (let col = 0; col < GRID_SIZE; col++) {
                //const tile = getTile(NOISE.perlin2(row * noiseScale, col * noiseScale));
                //line.push(tile)
                line.push(NOISE.perlin2(row * noiseScale, col * noiseScale))
            }
            newGrid.push(line)
        }
        setGrid(newGrid)
    }

    useEffect(() => {
        generateGrid()
    }, [])

    const renderGrid = () => {
        return grid.map((line, row) => (
            line.map((tile, col) => (
                <Rect
                    key={`${row}-${col}`}
                    x={col * SQUARE_SIZE}
                    y={row * SQUARE_SIZE}
                    width={SQUARE_SIZE}
                    height={SQUARE_SIZE}
                    fill={getColor(tile)}
                />
            ))
        ))
    };

    const handleChangeThresholdWater = (event) => {
        setThresholdWater(parseFloat(event.target.value));
    };

    const handleChangeThresholdGrass = (event) => {
        setThresholdGrass(parseFloat(event.target.value));
    };

    const handleChangeNoiseScale = (event) => {
        setNoiseScale(parseFloat(event.target.value));
    };


    return (
        <div className="Game">
            <Stage width={WIDTH} height={HEIGHT}>
                <Layer>
                    {renderGrid()}
                </Layer>
            </Stage>
            <div>
                <label htmlFor="thresholdWater">Threshold Water:</label>
                <input
                    type="range"
                    id="thresholdWater"
                    min="-0.7"
                    max="0"
                    step="0.01"
                    value={thresholdWater}
                    onChange={handleChangeThresholdWater}
                />
                <span>{thresholdWater}</span>
            </div>
            <div>
                <label htmlFor="thresholdGrass">Threshold Grass:</label>
                <input
                    type="range"
                    id="thresholdGrass"
                    min="0"
                    max=".7"
                    step="0.01"
                    value={thresholdGrass}
                    onChange={handleChangeThresholdGrass}
                />
                <span>{thresholdGrass}</span>
            </div>
            <div>
                <button onClick={generateGrid}>
                    Regenerate
                </button>
            </div>
        </div>
    );
};

export default Game;