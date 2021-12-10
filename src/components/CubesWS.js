import React, { useEffect, useState } from 'react';
import CubesField from './CubesField';
import CubesHeader from './CubesHeader';
// import Data from './Data.js';
import openSocket from 'socket.io-client';
const socket = openSocket('https://agtalks.herokuapp.com/');

function CubesWS() {
    const [cubesList, setCubesList] = useState([]);
    const [playerCube, setPlayerCube] = useState({
        id: Math.random(),
        type: 'skeleton',
        x: 200,
        y: 200
    });

    useEffect(() => {
        socket.emit('addCube', playerCube);

        socket.on('addCube', onSocketAddCube);
        socket.on('removeCube', onSocketRemoveCube);
        socket.on('changeCube', onSocketChangeCube);

        function onSocketAddCube(msg) {
            setCubesList(cubesList => [...cubesList, msg]);
        }

        function onSocketRemoveCube(id) {
            setCubesList(cubesList => cubesList.filter(item => item.id !== id));
        }

        function onSocketChangeCube(changedCube) {
            setCubesList(cubesList => {
                return cubesList.map(item => {
                    return item.id !== changedCube.id ? item : {
                        ...item,
                        ...changedCube
                    };
                })
            })
        }
    }, [playerCube]);

    function onFieldClick(e) {
        const rect = e.target.getBoundingClientRect();

        onCubeChange({
            id: playerCube.id,
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        });
    }

    function onCubeChange(changedCube) {
        const newCube = {...playerCube, ...changedCube};
        setPlayerCube(newCube);

        socket.emit('changeCube', newCube);
    }

    return(
        <div className='cubes'>
            <CubesHeader cube={playerCube} onCubeChange={onCubeChange}/>
            <CubesField list={cubesList} selectedCube={playerCube} onClick={onFieldClick}/>
        </div>
    )
}

export default CubesWS;