import UpdateCamundaExclusiveBehavior from './UpdateCamundaExclusiveBehavior';
import DeleteRetryTimeCycleBehavior from './DeleteRetryTimeCycleBehavior';


export default {
  __init__: [
    'updateCamundaExclusiveBehavior',
    'deleteRetryTimeCycleBehavior'
  ],
  updateCamundaExclusiveBehavior: [ 'type', UpdateCamundaExclusiveBehavior ],
  deleteRetryTimeCycleBehavior: [ 'type', DeleteRetryTimeCycleBehavior ]
};
