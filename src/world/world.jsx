import React from 'react';
import { connect } from 'react-redux';
import { Map } from '../map/map';
import { Player } from '../player/player';

import { tiles } from '../data/maps/1';
import { store } from '../config/store';
import { SPRITE_SIZE, PLAYER_MOVEMENT_SPEED } from '../config/constansts';
import { NpcPositioner } from '../npc/npc';


// TODO decouple world from viewportal.
// World will be used to display more than just the game...
const setupMap = (world) => {

  const size = {
    height: tiles.length * SPRITE_SIZE,
    width: tiles[0].length * SPRITE_SIZE,
  };

  store.dispatch({
    type: 'ADD_TILES',
    payload: { 
      tiles,
      size,
    },
  });

  return world;
}


const World = setupMap(({position}) => (
  <div style={{
    margin: '10px auto',
    position: 'relative',
    height: '600px',
    width: '1000px',
    overflow: 'hidden',
    backgroundColor: '#123415'
  }}>
    <div style={{
      height: '100%',
      width: '100%',
      position: "absolute",
      top: (300 - position[1]) - (SPRITE_SIZE / 2),
      left: (500 - position[0]) - (SPRITE_SIZE / 2),
      transition: `top ${PLAYER_MOVEMENT_SPEED}ms linear,
                   left ${PLAYER_MOVEMENT_SPEED}ms linear`,
    }}>
      <Player />
      <Map />
      <NpcPositioner />
    </div>
  </div>
));

const mapStateToProps = (state) => {
  return {
    ...state.player,
  }
}

const WorldTest = connect(mapStateToProps)(World); 

export { 
  WorldTest as World
};