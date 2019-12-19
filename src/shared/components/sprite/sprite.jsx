import React, { useMemo } from 'react';
import { SPRITE_SIZE, PLAYER_MOVEMENT_SPEED } from '../../../config/constansts';

import './sprite.css'

const Sprite = ({ position, spriteSheet, spriteLocation }) => {
  const className = useMemo(
    () => {
      const classGrid = [['first', 'second'],['second', 'first']];
      return classGrid[(position[0]/SPRITE_SIZE) % 2][(position[1]/SPRITE_SIZE) % 2]
    }, 
    [position[0], position[1]]
  );
  
  return (
    <div style={{
      position: 'absolute',
      top: position[1] - (SPRITE_SIZE / 3.5),
      left: position[0],
      width: `${SPRITE_SIZE}px`,
      height: `${SPRITE_SIZE}px`,
      background: `url('${spriteSheet}')`,
      backgroundPosition: spriteLocation,
      transition: `top ${PLAYER_MOVEMENT_SPEED}ms linear,
                  left ${PLAYER_MOVEMENT_SPEED}ms linear`,
      animationDuration: `${PLAYER_MOVEMENT_SPEED}ms`,
      animationTimingFunction: `steps(${4})`,
      animationIterationCount: 1,
    }}
    className={className}/>
  )
};

export {
  Sprite
};