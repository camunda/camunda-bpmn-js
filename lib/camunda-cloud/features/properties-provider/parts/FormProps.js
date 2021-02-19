import {
  isAny
} from 'bpmn-js/lib/features/modeling/util/ModelingUtil';

import formDefinition from './implementation/FormDefinition';

export default function(group, element, bpmnFactory, translate) {

  if (!isAny(element, [ 'bpmn:UserTask' ])) {
    return;
  }

  group.entries = group.entries.concat(formDefinition(element, bpmnFactory, translate));
}