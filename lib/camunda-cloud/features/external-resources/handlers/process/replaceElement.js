import { getBusinessObject, is } from 'bpmn-js/lib/util/ModelUtil';

/**
 * @typedef {{
 *   type: 'bpmnProcess',
 *   name: string,
 *   processId: string
 * }} CallActivity
 */

/**
 *
 * @param {import('diagram-js/lib/model').Element} element
 * @param {CallActivity} resource
 * @param {import('didi').Injector} injector
 */
export function replaceElement(element, resource, injector) {
  const bpmnFactory = injector.get('bpmnFactory'),
        bpmnReplace = injector.get('bpmnReplace'),
        modeling = injector.get('modeling'),
        commandStack = injector.get('commandStack');


  commandStack.execute('external-resources.composed-command', {
    command: replace
  });


  function replace() {
    const replacedElement = bpmnReplace.replaceElement(element, { type: 'bpmn:CallActivity' });
    modeling.updateProperties(replacedElement, {
      name: resource.name
    });

    const bo = getBusinessObject(replacedElement);

    const extensionElements = bo.get('extensionElements');

    if (!extensionElements) {
      modeling.updateProperties(replacedElement, {
        extensionElements: bpmnFactory.create('bpmn:ExtensionElements', {
          values: [
            createCalledElement(resource, bpmnFactory)
          ]
        })
      });

      return;
    }

    const calledElement = getCalledElement(replacedElement);

    if (!calledElement) {
      modeling.updateModdleProperties(replacedElement, extensionElements, {
        values: [
          ...extensionElements.values,
          createCalledElement(resource, bpmnFactory)
        ]
      });

      return;
    }

    modeling.updateModdleProperties(replacedElement, calledElement, {
      processId: resource.processId
    });
  }
}

function getCalledElement(element) {
  return element.businessObject?.extensionElements?.values.find(value => is(value, 'zeebe:CalledElement'));
}

function createCalledElement(resource, bpmnFactory) {
  return bpmnFactory.create('zeebe:CalledElement', {
    processId: resource.processId
  });
}
