import { createElement } from './createElement.js';
import { searchTerms } from './searchTerms.js';
import { BaseAppendMenuProvider } from '../util/BaseAppendMenuProvider.js';

export class AppendMenuProvider extends BaseAppendMenuProvider {
  static $inject = [
    'injector'
  ];

  constructor(injector) {
    super(injector, {
      resourceType: 'form',
      groupName: 'Forms',
      className: 'bpmn-icon-user-task',
      createElement: (resource, bpmnFactory) => createElement(resource, bpmnFactory),
      search: searchTerms
    });
  }
}
