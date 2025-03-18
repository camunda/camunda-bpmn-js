import { getBusinessObject, is } from 'bpmn-js/lib/util/ModelUtil';

/**
 * @typedef {{
*   type: 'dmnDecision',
*   name: string,
*   decisionId: string
* }} Decision
*/

/**
 * @param {import('diagram-js/lib/model').Element} element
 * @param {Decision} resource
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
    const replacedElement = bpmnReplace.replaceElement(element, { type: 'bpmn:BusinessRuleTask' });
    modeling.updateProperties(replacedElement, {
      name: resource.name
    });

    const bo = getBusinessObject(replacedElement);

    const extensionElements = bo.get('extensionElements');

    if (!extensionElements) {
      modeling.updateProperties(replacedElement, {
        extensionElements: bpmnFactory.create('bpmn:ExtensionElements', {
          values: [
            createCalledDecision(resource, bpmnFactory)
          ]
        })
      });

      return;
    }

    const calledDecision = getCalledDecision(replacedElement);

    if (!calledDecision) {
      modeling.updateModdleProperties(replacedElement, extensionElements, {
        values: [
          ...extensionElements.values,
          createCalledDecision(resource, bpmnFactory)
        ]
      });

      return;
    }

    modeling.updateModdleProperties(replacedElement, calledDecision, {
      decisionId: resource.decisionId
    });
  }
}

function getCalledDecision(element) {
  return element.businessObject?.extensionElements?.values.find(value => is(value, 'zeebe:CalledDecision'));
}

function createCalledDecision(resource, bpmnFactory) {
  return bpmnFactory.create('zeebe:CalledDecision', {
    decisionId: resource.decisionId
  });
}
