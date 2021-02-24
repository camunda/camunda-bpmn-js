import CreateZeebeBoundaryEventBehavior from './CreateZeebeBoundaryEventBehavior';
import CreateZeebeCallActivityBehavior from './CreateZeebeCallActivityBehavior';
import UpdatePropagateAllChildVariablesBehavior from './UpdatePropagateAllChildVariablesBehavior';
import FormDefinitionBehavior from './FormDefinitionBehavior';


export default {
  __init__: [
    'createZeebeBoundaryEventBehavior',
    'createZeebeCallActivityBehavior',
    'updatePropagateAllChildVariablesBehavior',
    'formDefinitionBehavior'
  ],
  createZeebeBoundaryEventBehavior: [ 'type', CreateZeebeBoundaryEventBehavior ],
  createZeebeCallActivityBehavior: [ 'type', CreateZeebeCallActivityBehavior ],
  updatePropagateAllChildVariablesBehavior: [ 'type', UpdatePropagateAllChildVariablesBehavior ],
  formDefinitionBehavior: [ 'type', FormDefinitionBehavior ]
};
