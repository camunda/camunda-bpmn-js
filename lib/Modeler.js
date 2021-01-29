import inherits from 'inherits';

import Modeler from 'bpmn-js/lib/Modeler';

import minimapModule from 'diagram-js-minimap';


import modelingModule from './features/modeling';

import paletteModule from './features/palette';

import contextPadModule from './features/context-pad';

import popupMenuModule from './features/popup-menu';

import rulesModule from './features/rules';

import propertiesPanelModule from 'bpmn-js-properties-panel';

import propertiesProviderModule from './features/properties-provider';

import zeebeModdle from 'zeebe-bpmn-moddle/resources/zeebe';

import zeebeModdleExtension from 'zeebe-bpmn-moddle/lib';


/**
 *
 * @param {Object} options
 */
export default function ZeebeModeler(options) {

  options = {
    ...options,
    moddleExtensions: {
      zeebe: zeebeModdle,
      ...options.moddleExtensions
    }
  };

  Modeler.call(this, options);
}

inherits(ZeebeModeler, Modeler);

ZeebeModeler.prototype._zeebeModules = [
  minimapModule,
  modelingModule,
  contextPadModule,
  paletteModule,
  popupMenuModule,
  rulesModule,
  propertiesPanelModule,
  propertiesProviderModule,
  zeebeModdleExtension
];

ZeebeModeler.prototype._modules = [].concat(
  Modeler.prototype._modules,
  ZeebeModeler.prototype._zeebeModules
);