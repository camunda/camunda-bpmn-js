import inherits from 'inherits-browser';

import BaseViewer from '../base/NavigatedViewer';

import { commonModdleExtensions, commonModules } from './util/commonModules';

/**
 * @typedef {import('bpmn-js/lib/BaseViewer').BaseViewerOptions} BaseViewerOptions
 */

/**
 * @param {BaseViewerOptions} options
 */
export default function NavigatedViewer(options = {}) {

  options = {
    ...options,
    moddleExtensions: {
      ...commonModdleExtensions,
      ...options.moddleExtensions
    }
  };

  BaseViewer.call(this, options);
}

inherits(NavigatedViewer, BaseViewer);

NavigatedViewer.prototype._camundaCloudModules = [
  ...commonModules
];

NavigatedViewer.prototype._modules = [].concat(
  BaseViewer.prototype._modules,
  NavigatedViewer.prototype._camundaCloudModules
);
