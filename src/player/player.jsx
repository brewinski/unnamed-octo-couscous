import handleMovement from './movement';
import { connect } from 'react-redux';
import { Sprite } from '../shared/components/sprite/sprite';

const mapStateToProps = ({player}) => ({
  ...player,
});

const Player = connect(mapStateToProps)(handleMovement(Sprite));

export {
  Player
} 
