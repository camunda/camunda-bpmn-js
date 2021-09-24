import properties from './implementation/Headers';

import elementHelper from 'bpmn-js-properties-panel/lib/helper/ElementHelper';

import cmdHelper from 'bpmn-js-properties-panel/lib/helper/CmdHelper';

import {
  is
} from 'bpmn-js/lib/util/ModelUtil';

import {
  isZeebeServiceTask
} from '../../../helper/ZeebeServiceTaskHelper.js';


export default function(group, element, bpmnFactory, translate) {

  if (!canHaveHeaders(element)) {
    return;
  }

  const propertiesEntry = properties(element, bpmnFactory, translate, {
    id: 'headers',
    modelProperties: [ 'key', 'value' ],
    labels: [ translate('Key'), translate('Value') ],

    getParent: function(element, node, bo) {
      return bo.extensionElements;
    },

    createParent: function(element, bo) {
      const parent = elementHelper.createElement('bpmn:ExtensionElements', { values: [] }, bo, bpmnFactory);
      const cmd = cmdHelper.updateBusinessObject(element, bo, { extensionElements: parent });
      return {
        cmd: cmd,
        parent: parent
      };
    }
  });

  if (propertiesEntry) {
    group.entries.push(propertiesEntry);
  }

}


// helpers ////////////////

function canHaveHeaders(element) {
  return is(element, 'bpmn:UserTask') || isZeebeServiceTask(element);
}
