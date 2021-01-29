import eventDefinitionHelper from 'bpmn-js-properties-panel/lib/helper/EventDefinitionHelper';

import error from 'bpmn-js-properties-panel/lib/provider/bpmn/parts/implementation/ErrorEventDefinition';

export default function(group, element, bpmnFactory, translate) {

  const errorEventDefinition = eventDefinitionHelper.getErrorEventDefinition(element);

  if (errorEventDefinition) {
    error(group, element, bpmnFactory, errorEventDefinition, translate);
  }

}
