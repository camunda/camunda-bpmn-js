import inherits from 'inherits-browser';

import BaseViewer from '../base/Viewer';

import { commonModdleExtensions, commonModules } from './util/commonModules';


/**
 *
 * @param {Object} options
 */
export default function Viewer(options = {}) {

  options = {
    ...options,
    moddleExtensions: {
      ...commonModdleExtensions,
      ...options.moddleExtensions
    }
  };

  BaseViewer.call(this, options);
}

inherits(Viewer, BaseViewer);

Viewer.prototype._camundaCloudModules = [
  ...commonModules
];

Viewer.prototype._modules = [].concat(
  BaseViewer.prototype._modules,
  Viewer.prototype._camundaCloudModules
);
