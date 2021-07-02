import inherits from 'inherits';

import { has } from 'min-dash';

import BaseModeler from '../base/Modeler';

import modelingModule from './features/modeling';

import paletteModule from './features/palette';

import contextPadModule from './features/context-pad';

import popupMenuModule from './features/popup-menu';

import rulesModule from './features/rules';

import {
  BpmnPropertiesPanelModule as propertiesPanelModule,
  BpmnPropertiesProviderModule as bpmnPropertiesProviderModule,
  ZeebePropertiesProviderModule as zeebePropertiesProviderModule
} from '@bpmn-io/bpmn-properties-panel';

import zeebeModdle from 'zeebe-bpmn-moddle/resources/zeebe.json';

import zeebeModdleExtension from 'zeebe-bpmn-moddle/lib';


/**
 *
 * @param {Object} options
 */
export default function Modeler(options = {}) {

  options = {
    ...options,
    moddleExtensions: {
      zeebe: zeebeModdle,
      ...options.moddleExtensions
    }
  };

  BaseModeler.call(this, options);
}

inherits(Modeler, BaseModeler);

Modeler.prototype._camundaCloudModules = [
  modelingModule,
  contextPadModule,
  paletteModule,
  popupMenuModule,
  rulesModule,
  propertiesPanelModule,
  bpmnPropertiesProviderModule,
  zeebePropertiesProviderModule,
  zeebeModdleExtension
];

Modeler.prototype._modules = [].concat(
  excludeOldModules(BaseModeler.prototype._modules),
  Modeler.prototype._camundaCloudModules
);


// helper ///////////////////////////

// exclude old properties panel + provider coming from camunda-bpmn-js
function excludeOldModules(modules) {
  return modules.filter(m => !has(m, 'propertiesPanel') && !has(m, 'propertiesProvider'));
}
