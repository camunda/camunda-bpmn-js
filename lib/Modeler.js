import inherits from 'inherits';

import Modeler from 'bpmn-js/lib/Modeler';

import PaletteModule from './features/palette';


/**
 *
 * @param {Object} options
 */
export default function ZeebeModeler(options) {
  Modeler.call(this, options);
}

inherits(ZeebeModeler, Modeler);

ZeebeModeler.prototype._zeebeModules = [
  PaletteModule
];

ZeebeModeler.prototype._modules = [].concat(
  ZeebeModeler.prototype._zeebeModules,
  Modeler.prototype._modules
);