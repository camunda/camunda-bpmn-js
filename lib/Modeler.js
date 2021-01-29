import inherits from 'inherits';

import Modeler from 'bpmn-js/lib/Modeler';

import paletteModule from './features/palette';

import contextPadModule from './features/context-pad';

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
  contextPadModule,
  paletteModule,
  propertiesPanelModule,
  propertiesProviderModule,
  zeebeModdleExtension
];

ZeebeModeler.prototype._modules = [].concat(
  ZeebeModeler.prototype._zeebeModules,
  Modeler.prototype._modules
);