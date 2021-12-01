import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import { store } from '../config/store';
import { SPRITE_SIZE } from '../config/constansts';

const getColor = (number) => {
    switch(number) {
        case 1:
            return 'purple';
        case 5: 
            return 'black';
        case 0:
            return 'none';
    }
}

const toggleWall = (tiles, size, x, y, type) => {

    tiles[y][x] = tiles[y][x] === type ? 0 : type;

    store.dispatch({
        type: 'ADD_TILES',
        payload: { 
          tiles: [...tiles],
          size: {...size},
        },
      });
    
}
const recreateMapArrays = (width, height) => {
    const tiles = []

    for(let i = 0; i < height; i++) {
        const row = [];

        for (let j = 0; j < width; j++) {
            row.push(0);
        }

        tiles.push(row);
    }

    store.dispatch({
        type: 'ADD_TILES',
        payload: { 
            tiles: [...tiles],
            size: {
                height: height * SPRITE_SIZE,
                width: width * SPRITE_SIZE,
            },
        },
    });
}

const MapCoordinatesEditor = ({tiles, size}) => {
    const [width, setWidth] = useState(size.width / SPRITE_SIZE);
    const [height, setHeight] = useState(size.height / SPRITE_SIZE);
    const [visible, setVisible] = useState(false);
    const [object, setObject] = useState(5);


    return <>
        <ul style={{
            position: "fixed",
            top: 10,
            left: 10,
            color: 'white',
            fontSize: 10,
            zIndex: 100
        }}>
            <li><span>Map Editor:</span><input type="checkbox" onClick={() => setVisible(!visible)} value={visible}/></li>
            <li>
                <span>Placement type:</span>
                <select value={object} onChange={e => setObject(e.currentTarget.value)}>
                    <option value={5}>Wall</option>
                    <option value={1}>Spawn</option>
                </select>
            </li>
            <li>
                <span>width:</span>
                <input 
                    onChange={e => setWidth(e.currentTarget.value)} 
                    value={width} 
                    onBlur={() =>recreateMapArrays(width, height)} /> 
            </li>
            <li>
                <span>height:</span>
                <input onChange={e => setHeight(e.currentTarget.value)} 
                value={height} 
                onBlur={() =>recreateMapArrays(width, height)} />
            </li>
        </ul>
        <div style={{
            width: `${size.width}px`,
            height: `${size.height}px`,
            position: 'absolute',
            top: 0,
            left: 0,
        }}>
            {tiles.map((row, y) =>  {
                if (!visible) {
                    return;
                }
                return <div style={{display: 'flex'}}>
                    {row.map((t, x) => 
                        <div 
                            style={{
                                background: getColor(t),
                                opacity: 0.5,
                                height: SPRITE_SIZE, 
                                width: SPRITE_SIZE, 
                                textAlign: 'center',
                                border: '1px dotted black',
                                boxSizing: 'border-box'
                            }} 
                            onClick={() => toggleWall(tiles, size, x,y, object)}>
                        </div>)}
                </div>
            })}
        </div>
    </>
}

const mapStateToProps = ({map}) => ({
    ...map,
});

const MapEditor = connect(mapStateToProps)(MapCoordinatesEditor)

export {
    MapEditor
}