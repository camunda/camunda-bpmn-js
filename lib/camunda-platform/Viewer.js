import inherits from 'inherits';

import BaseViewer from '../base/Viewer';

import camundaModdle from 'camunda-bpmn-moddle/resources/camunda.json';

/**
 *
 * @param {Object} options
 */
export default function Viewer(options = {}) {

  options = {
    ...options,
    moddleExtensions: {
      camunda: camundaModdle,
      ...options.moddleExtensions
    }
  };

  BaseViewer.call(this, options);
}

inherits(Viewer, BaseViewer);
