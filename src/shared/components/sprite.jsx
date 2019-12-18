import React from 'react';
import { SPRITE_SIZE, PLAYER_MOVEMENT_SPEED } from '../../config/constansts';

const Sprite = ({position, spriteSheet, spriteLocation}) => (
  <div style={{
    position: 'absolute',
    top: position[1],
    left: position[0],
    width: `${SPRITE_SIZE}px`,
    height: `${SPRITE_SIZE}px`,
    background: `url('${spriteSheet}')`,
    backgroundPosition: spriteLocation,
    transition: `top ${PLAYER_MOVEMENT_SPEED}ms linear,
                 left ${PLAYER_MOVEMENT_SPEED}ms linear`,
  }}/>
);

export {
  Sprite
};