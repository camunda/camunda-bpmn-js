import { is } from 'bpmn-js/lib/util/ModelUtil';

export function getExtensionElements(bo, type) {
  let elements = [];
  const extensionElements = bo.get('extensionElements');

  if (typeof extensionElements !== 'undefined') {
    const extensionValues = extensionElements.get('values');
    if (typeof extensionValues !== 'undefined') {
      elements = extensionValues.filter(function(value) {
        return is(value, type);
      });
    }
  }

  return elements;
}
