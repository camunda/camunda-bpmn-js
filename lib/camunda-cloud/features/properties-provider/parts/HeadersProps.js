import properties from './implementation/Headers';

import elementHelper from 'bpmn-js-properties-panel/lib/helper/ElementHelper';

import cmdHelper from 'bpmn-js-properties-panel/lib/helper/CmdHelper';

import {
  isAny
} from 'bpmn-js/lib/features/modeling/util/ModelingUtil';

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
  return isAny(element, [
    'bpmn:ServiceTask',
    'bpmn:UserTask'
  ]);
}
