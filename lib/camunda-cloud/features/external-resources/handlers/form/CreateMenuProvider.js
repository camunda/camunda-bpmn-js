import { createElement } from './createElement.js';
import { searchTerms } from './searchTerms.js';
import { BaseCreateMenuProvider } from '../util/BaseCreateMenuProvider.js';

export class CreateMenuProvider extends BaseCreateMenuProvider {
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
