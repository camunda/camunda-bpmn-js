import CreateZeebeBoundaryEventBehavior from './CreateZeebeBoundaryEventBehavior';
import CreateZeebeCallActivityBehavior from './CreateZeebeCallActivityBehavior';
import UpdatePropagateAllChildVariablesBehavior from './UpdatePropagateAllChildVariablesBehavior';


export default {
  __init__: [
    'createZeebeBoundaryEventBehavior',
    'createZeebeCallActivityBehavior',
    'updatePropagateAllChildVariablesBehavior'
  ],
  createZeebeBoundaryEventBehavior: [ 'type', CreateZeebeBoundaryEventBehavior ],
  createZeebeCallActivityBehavior: [ 'type', CreateZeebeCallActivityBehavior ],
  updatePropagateAllChildVariablesBehavior: [ 'type', UpdatePropagateAllChildVariablesBehavior ]
};
