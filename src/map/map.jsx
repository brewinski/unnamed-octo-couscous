import React from 'react';
import { connect } from 'react-redux';

import { SPRITE_SIZE, MAP_HEIGHT, MAP_WIDTH } from '../config/constansts';

import './map.css';

const getTileSprite = (type) => {
  switch (type) {
    case 0:
      return 'grass';
    case 5:
      return 'rock';
    case 6:
      return 'tree';
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

const MapBlock = ({tiles}) => (
  <div
    style={{
      width: `${MAP_WIDTH}px`,
      height: `${MAP_HEIGHT}px`,
    }}>
    {
      tiles.map(row => <MapRow tiles={row} />)
    }
  </div>
);

const mapStateToProps = (state) => ({
  tiles: state.map.tiles,
});

const Map = connect(mapStateToProps)(MapBlock);

export {
  Map
};
