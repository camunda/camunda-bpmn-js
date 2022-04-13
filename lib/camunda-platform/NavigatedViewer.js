import inherits from 'inherits';

import BaseViewer from '../base/NavigatedViewer';

import camundaModdle from 'camunda-bpmn-moddle/resources/camunda.json';


/**
 *
 * @param {Object} options
 */
export default function NavigatedViewer(options = {}) {

  options = {
    ...options,
    moddleExtensions: {
      camunda: camundaModdle,
      ...options.moddleExtensions
    }
  };

  BaseViewer.call(this, options);
}

inherits(NavigatedViewer, BaseViewer);
