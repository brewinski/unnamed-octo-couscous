import React from 'react';
import { connect } from 'react-redux';
import { Map } from '../map/map';
import { Player } from '../player/player';
import {MapEditor} from '../map/map-editor';
import { ReactJoystick } from '../controls/joystick';

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
    margin: '0px auto',
    position: 'relative',
    height: '100vh',
    width: '100vw',
    overflow: 'hidden',
    backgroundColor: '#002000'
  }}>
    <div style={{
      height: '100%',
      width: '100%',
      position: "absolute",
      top: ((window.innerHeight / 2) - position[1]) - (SPRITE_SIZE / 2),
      left: ((window.innerWidth / 2) - position[0]) - (SPRITE_SIZE / 2),
      transition: `top ${PLAYER_MOVEMENT_SPEED}ms linear,
                   left ${PLAYER_MOVEMENT_SPEED}ms linear`,
    }}>
      <Player />
      <Map />
      <NpcPositioner />
      <MapEditor />
      <ReactJoystick />
    </div>
  </div>
));

const mapStateToProps = (state) => ({...state.player});


const WorldTest = connect(mapStateToProps)(World); 

export { 
  WorldTest as World
};