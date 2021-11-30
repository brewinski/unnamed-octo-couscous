import React from 'react';
import { connect } from 'react-redux';
import { SPRITE_SIZE, CURRENT_WORLD } from '../config/constansts';

import './map.css';

const getTileSprite = (type) => {
  switch (type) {
    case 0:
      return 'grass';
    case 5:
      return 'rock';
    case 6:
      return 'tree';
    default:
      return 'grass';
  }
}

const MapTile = ({ tile }) => (
  <div 
    className={`tile ${getTileSprite(tile)}`}
    style={{
      height: SPRITE_SIZE,
      width: SPRITE_SIZE,
    }}>
  </div>
);

const MapRow = ({ tiles }) => (
  <div 
    className="row"
    style={{
      height: SPRITE_SIZE,
    }}>
    {tiles.map(tile => <MapTile tile={tile} />)}
  </div>
);

const MapBlock = ({tiles, size}) => (
  <div
    style={{
      width: `${size.width}px`,
      height: `${size.height}px`,
      background: `url(${CURRENT_WORLD})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover'
    }}>
    {
      tiles.map(row => <MapRow tiles={row} />)
    }
  </div>
);

const mapStateToProps = ({map}) => ({
  ...map,
});

const Map = connect(mapStateToProps)(MapBlock);

export {
  Map
};
