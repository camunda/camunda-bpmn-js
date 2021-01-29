import {
  getBusinessObject
} from 'bpmn-js/lib/util/ModelUtil';

import multiInstanceLoopCharacteristics from './implementation/MultiInstanceLoopCharacteristics';

export default function(group, element, bpmnFactory, translate) {

  if (!ensureMultiInstanceSupported(element)) {
    return;
  }

  group.entries = group.entries.concat(multiInstanceLoopCharacteristics(element, bpmnFactory, translate));
}

// helpers //////////////

function getLoopCharacteristics(element) {
  const bo = getBusinessObject(element);
  return bo.loopCharacteristics;
}

function ensureMultiInstanceSupported(element) {
  return !!getLoopCharacteristics(element);
}
