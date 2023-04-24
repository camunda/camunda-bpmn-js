import inherits from 'inherits-browser';

import BpmnModeler from 'bpmn-js/lib/Modeler';

import minimapModule from 'diagram-js-minimap';

import gridModule from 'diagram-js-grid';
import diagramOriginModule from 'diagram-js-origin';
import alignToOriginModule from '@bpmn-io/align-to-origin';

import executableFixModule from 'bpmn-js-executable-fix';

import {
  BpmnPropertiesPanelModule as propertiesPanelModule,
  BpmnPropertiesProviderModule as bpmnPropertiesProviderModule
} from 'bpmn-js-properties-panel';

/**
 * @typedef {import('bpmn-js/lib/BaseViewer').BaseViewerOptions} BaseViewerOptions
 *
 * @typedef {import('didi').ModuleDeclaration} ModuleDeclaration
 */

/**
 *
 * @param {BaseViewerOptions} options
 */
export default function Modeler(options = {}) {
  BpmnModeler.call(this, options);
}

inherits(Modeler, BpmnModeler);

/**
 * @param { {
 *  disableAdjustOrigin?: boolean;
 *  disableGrid?: boolean;
 * } } [options]
 *
 * @returns {ModuleDeclaration[]}
 */
Modeler.prototype.getModules = function(options = {}) {
  const modules = BpmnModeler.prototype.getModules.call(this, options);

  return [
    ...modules,
    options.disableAdjustOrigin
      ? diagramOriginModule
      : alignToOriginModule,
    options.disableGrid
      ? {}
      : gridModule
  ];
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