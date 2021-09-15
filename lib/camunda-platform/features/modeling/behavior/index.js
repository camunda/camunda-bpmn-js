import DeleteErrorEventDefinitionBehavior from './DeleteErrorEventDefinitionBehavior';
import DeleteRetryTimeCycleBehavior from './DeleteRetryTimeCycleBehavior';
import UpdateCamundaExclusiveBehavior from './UpdateCamundaExclusiveBehavior';
import UpdateInputOutputBehavior from './UpdateInputOutputBehavior';
import UpdateResultVariableBehavior from './UpdateResultVariableBehavior';
import UserTaskFormsBehavior from './UserTaskFormsBehavior';
import UserTaskGeneratedFormsBehavior from './UserTaskGeneratedFormsBehavior';

export default {
  __init__: [
    'deleteErrorEventDefinitionBehavior',
    'deleteRetryTimeCycleBehavior',
    'updateCamundaExclusiveBehavior',
    'updateResultVariableBehavior',
    'updateInputOutputBehavior',
    'userTaskFormsBehavior',
    'userTaskGeneratedFormsBehavior'
  ],
  deleteErrorEventDefinitionBehavior: [ 'type', DeleteErrorEventDefinitionBehavior ],
  deleteRetryTimeCycleBehavior: [ 'type', DeleteRetryTimeCycleBehavior ],
  updateCamundaExclusiveBehavior: [ 'type', UpdateCamundaExclusiveBehavior ],
  updateResultVariableBehavior: [ 'type', UpdateResultVariableBehavior ],
  updateInputOutputBehavior: [ 'type', UpdateInputOutputBehavior ],
  userTaskFormsBehavior: [ 'type', UserTaskFormsBehavior ],
  userTaskGeneratedFormsBehavior: [ 'type', UserTaskGeneratedFormsBehavior ]
};
