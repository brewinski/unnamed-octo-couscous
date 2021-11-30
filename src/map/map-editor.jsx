import React, {useState} from 'react';
import { connect } from 'react-redux';
import { store } from '../config/store';
import { SPRITE_SIZE } from '../config/constansts';



const toggleWall = (tiles, size, x, y) => {

    tiles[y][x] = tiles[y][x] === 0 ? 5 : 0;

    store.dispatch({
        type: 'ADD_TILES',
        payload: { 
          tiles: [...tiles],
          size: {...size},
        },
      });
    
}

const recreateMapArrays = (height, width) => {
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


    return <ul style={{
        position: "fixed",
        top: 10,
        left: 10,
        color: 'white'
    }}>
        <li><input type="checkbox" onClick={() => setVisible(!visible)} value={visible}/></li>
        <li><span>width:</span><input onChange={e => setWidth(e.currentTarget.value)} value={width} onBlur={() =>recreateMapArrays(width, height)} /> <span>height:</span><input onChange={e => setHeight(e.currentTarget.value)} value={height} onBlur={() =>recreateMapArrays(width, height)} /></li>
        {tiles.map((row, y) =>  {
            if (!visible) {
                return;
            }
            return <li>[
                {row.map((t, x) => <span style={{color: t === 0 ? 'white':'red' }} onClick={() => toggleWall(tiles, size, x,y)}>{t},</span>)}
            ],</li>
        })}
    </ul>
}

const mapStateToProps = ({map}) => ({
    ...map,
});

const MapEditor = connect(mapStateToProps)(MapCoordinatesEditor)

export {
    MapEditor
}