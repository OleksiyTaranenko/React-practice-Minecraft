// import React, { useState } from 'react';
// import CubesField from './CubesField.js';
// import CubesHeader from './CubesHeader.js';
// import Data from './Data.js';

// function Cubes() {
//     const [cubesList, setCubesList] = useState(Data);
//     const [selectedCube, setSelectedCube] = useState({});

//     function onCubeClick(cube) {
//         console.log(cube);
//         setSelectedCube(cube);
//     }

//     function onCubeChange(changedCube) {
//         console.log(changedCube)

//         const newList = cubesList.map(item => {
//             return item.id !== changedCube.id ? item : {
//                 ...item,
//                 ...changedCube
//             }
//         });

//         setCubesList(newList);
//         setSelectedCube(newList.find(item => item.id === changedCube.id))
//     }

//     function onFieldClick(e) {
//         if (!selectedCube.id) return;
//         const rec = e.target.getBoundingClientRect();
//         console.log(rec);

//         onCubeChange({
//             id: selectedCube.id,
//             x: e.clientX - rec.left,
//             y: e.clientY - rec.top
//         });
//     }

//     return(
//         <div className='cubes'>
//             <CubesHeader cube={selectedCube} onCubeChange={onCubeChange}/>
//             <CubesField list={cubesList} onCubeClick={onCubeClick} onClick={onFieldClick}/>
//         </div>
//     )
// }

// export default Cubes;