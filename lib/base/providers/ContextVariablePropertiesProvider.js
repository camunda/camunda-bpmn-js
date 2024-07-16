import contextVariableProps from './parts/ContextVariableProps';

import { is } from 'bpmn-js/lib/util/ModelUtil';

const LOW_PRIORITY = 500;

/**
 * Provider for exposing context variable groups in the diagram element properties panel.
 * @param {PropertiesPanel} propertiesPanel
 * @param {Function} translate
 */
export default function contextVariablePropertiesProvider(propertiesPanel, translate) {

  this.getGroups = function(element) {
    return function(groups) {
      if (is(element, 'bpmn:UserTask')) {
        groups.push(createcontextVariableGroup(element, translate));
      }
      return groups;
    };
  };

  // Register this provider with a low priority to load after the default BPMN properties.
  propertiesPanel.registerProvider(LOW_PRIORITY, this);
}

contextVariablePropertiesProvider.$inject = [ 'propertiesPanel', 'translate' ];

function createcontextVariableGroup(element, translate) {
  const contextVariableGroup = {
    id: 'contextVariable',
    label: translate('Context Variable'),
    entries: contextVariableProps(element),
    tooltip: translate('Defines an expression which will display as an identifier on your task')
  };

  return contextVariableGroup;
}
