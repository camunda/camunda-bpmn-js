import DeleteRetryTimeCycleBehavior from './DeleteRetryTimeCycleBehavior';
import UpdateCamundaExclusiveBehavior from './UpdateCamundaExclusiveBehavior';
import UpdateResultVariableBehavior from './UpdateResultVariableBehavior';

export default {
  __init__: [
    'deleteRetryTimeCycleBehavior',
    'updateCamundaExclusiveBehavior',
    'updateResultVariableBehavior'
  ],
  deleteRetryTimeCycleBehavior: [ 'type', DeleteRetryTimeCycleBehavior ],
  updateCamundaExclusiveBehavior: [ 'type', UpdateCamundaExclusiveBehavior ],
  updateResultVariableBehavior: [ 'type', UpdateResultVariableBehavior ]
};
