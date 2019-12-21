import React, { useMemo } from 'react';
import { SPRITE_SIZE, PLAYER_MOVEMENT_SPEED } from '../../../config/constansts';

import './sprite.css'

const Sprite = ({ position, spriteSheet, spriteLocation }) => {
  const [x, y] = position;
  const className = useMemo(
    () => {
      const classGrid = [['first', 'second'],['second', 'first']];
      return classGrid[(x/SPRITE_SIZE) % 2][(y/SPRITE_SIZE) % 2]
    }, 
    [x, y]
  );
  
  return (
    <div style={{
      position: 'absolute',
      top: y - (SPRITE_SIZE / 3.5),
      left: x,
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