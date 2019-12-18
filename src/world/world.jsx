import React from 'react';
import { Map } from '../map/map';
import { Player } from '../player/player';
import { MAP_HEIGHT, MAP_WIDTH } from '../config/constansts';

import { tiles } from '../data/maps/1';
import { store } from '../config/store';


const World = () => {
  store.dispatch({
    type: 'ADD_TILES',
    payload: { 
      tiles 
    },
  });

  return(
    <div style={{
      margin: '10px auto',
      position: 'relative',
      width: `${MAP_WIDTH}px`,
      height: `${MAP_HEIGHT}px`,
    }}>
      <Player/>
      <Map/>
    </div>
  )
};

export { 
  World
};