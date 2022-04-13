import inherits from 'inherits';

import BaseViewer from '../base/Viewer';

import iconRendererModule from '@bpmn-io/element-templates-icons-renderer';

import drilldownModule from './features/drilldown';

import zeebeModdle from 'zeebe-bpmn-moddle/resources/zeebe.json';


/**
 *
 * @param {Object} options
 */
export default function Viewer(options = {}) {

  options = {
    ...options,
    moddleExtensions: {
      zeebe: zeebeModdle,
      ...options.moddleExtensions
    }
  };

  BaseViewer.call(this, options);
}

inherits(Viewer, BaseViewer);

Viewer.prototype._camundaCloudModules = [
  drilldownModule,
  iconRendererModule
];

Viewer.prototype._modules = [].concat(
  BaseViewer.prototype._modules,
  Viewer.prototype._camundaCloudModules
);
