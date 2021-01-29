import inherits from 'inherits';

import NavigatedViewer from 'bpmn-js/lib/NavigatedViewer';


/**
 *
 * @param {Object} options
 */
export default function ZeebeNavigatedViewer(options) {
  NavigatedViewer.call(this, options);
}

inherits(ZeebeNavigatedViewer, NavigatedViewer);


ZeebeNavigatedViewer.prototype._modules = [
  NavigatedViewer.prototype._modules
];