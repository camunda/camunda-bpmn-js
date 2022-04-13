import inherits from 'inherits';

import BaseViewer from '../base/NavigatedViewer';

import iconRendererModule from '@bpmn-io/element-templates-icons-renderer';

import drilldownModule from './features/drilldown';

import zeebeModdle from 'zeebe-bpmn-moddle/resources/zeebe.json';


/**
 *
 * @param {Object} options
 */
export default function NavigatedViewer(options = {}) {

  options = {
    ...options,
    moddleExtensions: {
      zeebe: zeebeModdle,
      ...options.moddleExtensions
    }
  };

  BaseViewer.call(this, options);
}

inherits(NavigatedViewer, BaseViewer);

NavigatedViewer.prototype._camundaCloudModules = [
  drilldownModule,
  iconRendererModule
];

NavigatedViewer.prototype._modules = [].concat(
  BaseViewer.prototype._modules,
  NavigatedViewer.prototype._camundaCloudModules
);
