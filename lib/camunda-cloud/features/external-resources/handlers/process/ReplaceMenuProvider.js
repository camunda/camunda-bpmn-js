import { replaceElement } from './replaceElement.js';
import { searchTerms } from './searchTerms.js';
import { BaseReplaceMenuProvider } from '../util/BaseReplaceMenuProvider.js';

export class ReplaceMenuProvider extends BaseReplaceMenuProvider {
  static $inject = [
    'injector'
  ];

  constructor(injector) {
    super(injector, {
      resourceType: 'bpmnProcess',
      groupName: 'Processes',
      className: 'bpmn-icon-call-activity',
      replaceElement: (element, resource, injector) => replaceElement(element, resource, injector),
      search: searchTerms
    });
  }
}
