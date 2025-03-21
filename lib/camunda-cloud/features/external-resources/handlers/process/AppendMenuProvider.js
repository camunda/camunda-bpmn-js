import { createElement } from './createElement.js';
import { searchTerms } from './searchTerms.js';
import { BaseAppendMenuProvider } from '../util/BaseAppendMenuProvider.js';

export class AppendMenuProvider extends BaseAppendMenuProvider {
  static $inject = [
    'injector'
  ];

  constructor(injector) {
    super(injector, {
      resourceType: 'bpmnProcess',
      groupName: 'Processes',
      className: 'bpmn-icon-call-activity',
      createElement: (resource, bpmnFactory) => createElement(resource, bpmnFactory),
      search: searchTerms
    });
  }
}
