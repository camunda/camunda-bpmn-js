import inherits from 'inherits';

import BaseViewer from '../base/Viewer';

import { commonModdleExtensions } from './util/commonModules';

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
