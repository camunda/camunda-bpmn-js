import inherits from 'inherits-browser';

import BaseViewer from '../base/NavigatedViewer';

import { commonModdleExtensions } from './util/commonModules';


/**
 *
 * @param {Object} options
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
