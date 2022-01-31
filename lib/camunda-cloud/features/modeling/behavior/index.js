import CleanUpBusinessRuleTaskBehavior from './CleanUpBusinessRuleTaskBehavior';
import CreateZeebeBoundaryEventBehavior from './CreateZeebeBoundaryEventBehavior';
import CreateZeebeCallActivityBehavior from './CreateZeebeCallActivityBehavior';
import FormDefinitionBehavior from './FormDefinitionBehavior';
import RemoveAssignmentDefinitionBehavior from './RemoveAssignmentDefinitionBehavior';
import UpdatePropagateAllChildVariablesBehavior from './UpdatePropagateAllChildVariablesBehavior';


export default {
  __init__: [
    'cleanUpBusinessRuleTaskBehavior',
    'createZeebeBoundaryEventBehavior',
    'createZeebeCallActivityBehavior',
    'formDefinitionBehavior',
    'removeAssignmentDefinitionBehavior',
    'updatePropagateAllChildVariablesBehavior'
  ],
  cleanUpBusinessRuleTaskBehavior: [ 'type', CleanUpBusinessRuleTaskBehavior ],
  createZeebeBoundaryEventBehavior: [ 'type', CreateZeebeBoundaryEventBehavior ],
  createZeebeCallActivityBehavior: [ 'type', CreateZeebeCallActivityBehavior ],
  formDefinitionBehavior: [ 'type', FormDefinitionBehavior ],
  removeAssignmentDefinitionBehavior: [ 'type', RemoveAssignmentDefinitionBehavior ],
  updatePropagateAllChildVariablesBehavior: [ 'type', UpdatePropagateAllChildVariablesBehavior ]
};
