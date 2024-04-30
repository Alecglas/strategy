import { useState, useEffect } from 'react';
import {Rect, Circle, Layer, Stage} from 'react-konva';
import socket from './websocket.js'

const Game = () => {

    return (
        <>
            <Stage width={800} height={600}>
                <Layer>
                    <Rect x={0} y={0} width={800} height={600} fill="#333" />
                    <Circle x={200} y={200} radius={10} fill="#fff" />
                </Layer>
            </Stage>
        </>
    );
};

export default Game;