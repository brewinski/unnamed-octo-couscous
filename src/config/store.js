import { createStore, combineReducers } from 'redux';
import { playerReducer } from '../player/player-reducer';
import { mapReducer } from '../map/map-reducer';
import { npcReducer } from '../npc/npc-reducer';


const rootReducer = combineReducers({
  player: playerReducer,
  npcs: npcReducer,
  map: mapReducer,
});

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export {
  store
};