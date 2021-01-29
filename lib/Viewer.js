import inherits from 'inherits';

import Viewer from 'bpmn-js/lib/Viewer';


/**
 *
 * @param {Object} options
 */
export default function ZeebeViewer(options) {
  Viewer.call(this, options);
}

inherits(ZeebeViewer, Viewer);

ZeebeViewer.prototype._zeebeModules = [];

ZeebeViewer.prototype._modules = [].concat(
  ZeebeViewer.prototype._zeebeModules,
  Viewer.prototype._modules
);