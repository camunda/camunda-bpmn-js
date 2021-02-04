import inherits from 'inherits';

import BpmnModeler from 'bpmn-js/lib/Modeler';

import minimapModule from 'diagram-js-minimap';

import diagramOriginModule from 'diagram-js-origin';
import alignToOriginModule from '@bpmn-io/align-to-origin';

import executableFixModule from 'bpmn-js-executable-fix';

import signavioCompatModule from 'bpmn-js-signavio-compat';

import disableCollapsedSubprocessModule from 'bpmn-js-disable-collapsed-subprocess';

import propertiesPanelModule from 'bpmn-js-properties-panel';
import propertiesProviderModule from 'bpmn-js-properties-panel/lib/provider/bpmn';

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
  signavioCompatModule,
  disableCollapsedSubprocessModule,
  propertiesPanelModule,
  propertiesProviderModule
];

Modeler.prototype._modules = [].concat(
  BpmnModeler.prototype._modules,
  Modeler.prototype._extensionModules
);