import CleanUpBusinessRuleTaskBehavior from './CleanUpBusinessRuleTaskBehavior';
import CreateZeebeBoundaryEventBehavior from './CreateZeebeBoundaryEventBehavior';
import CreateZeebeCallActivityBehavior from './CreateZeebeCallActivityBehavior';
import UpdatePropagateAllChildVariablesBehavior from './UpdatePropagateAllChildVariablesBehavior';
import FormDefinitionBehavior from './FormDefinitionBehavior';


export default {
  __init__: [
    'cleanUpBusinessRuleTaskBehavior',
    'createZeebeBoundaryEventBehavior',
    'createZeebeCallActivityBehavior',
    'updatePropagateAllChildVariablesBehavior',
    'formDefinitionBehavior'
  ],
  cleanUpBusinessRuleTaskBehavior: [ 'type', CleanUpBusinessRuleTaskBehavior ],
  createZeebeBoundaryEventBehavior: [ 'type', CreateZeebeBoundaryEventBehavior ],
  createZeebeCallActivityBehavior: [ 'type', CreateZeebeCallActivityBehavior ],
  updatePropagateAllChildVariablesBehavior: [ 'type', UpdatePropagateAllChildVariablesBehavior ],
  formDefinitionBehavior: [ 'type', FormDefinitionBehavior ]
};
