import inherits from 'inherits';

import BpmnModeler from 'bpmn-js/lib/Modeler';

import minimapModule from 'diagram-js-minimap';

import diagramOriginModule from 'diagram-js-origin';
import alignToOriginModule from '@bpmn-io/align-to-origin';

import executableFixModule from 'bpmn-js-executable-fix';

import {
  BpmnPropertiesPanelModule as propertiesPanelModule,
  BpmnPropertiesProviderModule as bpmnPropertiesProviderModule
} from 'bpmn-js-properties-panel';

/**
 *
 * @param {Object} options
 */
export default function Modeler(options = {}) {

  this._injectOriginModule(options);

  BpmnModeler.call(this, options);
}

inherits(Modeler, BpmnModeler);

Modeler.prototype._injectOriginModule = function(options) {
  this._modules = [].concat(
    this._modules,
    (options && options.disableAdjustOrigin ? diagramOriginModule : alignToOriginModule)
  );
};

Modeler.prototype._extensionModules = [
  minimapModule,
  executableFixModule,
  propertiesPanelModule,
  bpmnPropertiesProviderModule
];

Modeler.prototype._modules = [].concat(
  BpmnModeler.prototype._modules,
  Modeler.prototype._extensionModules
);