import React from 'react';
import { connect } from 'react-redux';
import { handleNpcMovement } from './npc-movement';
import { handleMovement } from './remotePlayerMovement';

import { Sprite } from '../shared/components/sprite/sprite';

const NpcGroup = ({npcList}) => (
  <>
    {npcList.map(npc => <Sprite {...npc} />)}
  </>
);

const mapStateToProps = (state) => ({
  ...state.npcs
});

const NpcPositioner = connect(mapStateToProps)(handleMovement(NpcGroup));

export {
  NpcPositioner
}