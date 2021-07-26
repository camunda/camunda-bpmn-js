import DeleteErrorEventDefinitionBehavior from './DeleteErrorEventDefinitionBehavior';
import DeleteRetryTimeCycleBehavior from './DeleteRetryTimeCycleBehavior';
import UpdateCamundaExclusiveBehavior from './UpdateCamundaExclusiveBehavior';
import UpdateResultVariableBehavior from './UpdateResultVariableBehavior';

export default {
  __init__: [
    'deleteErrorEventDefinitionBehavior',
    'deleteRetryTimeCycleBehavior',
    'updateCamundaExclusiveBehavior',
    'updateResultVariableBehavior'
  ],
  deleteErrorEventDefinitionBehavior: [ 'type', DeleteErrorEventDefinitionBehavior ],
  deleteRetryTimeCycleBehavior: [ 'type', DeleteRetryTimeCycleBehavior ],
  updateCamundaExclusiveBehavior: [ 'type', UpdateCamundaExclusiveBehavior ],
  updateResultVariableBehavior: [ 'type', UpdateResultVariableBehavior ]
};
