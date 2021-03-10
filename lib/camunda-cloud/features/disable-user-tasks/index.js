import DisableUserTasks from './DisableUserTasks';

export default {
  __init__: [ 'disableUserTasks' ],
  disableUserTasks: [ 'type', DisableUserTasks ],

  // disable user task modeling behaviors
  formDefinitionBehavior: [ 'value', null ]
};
