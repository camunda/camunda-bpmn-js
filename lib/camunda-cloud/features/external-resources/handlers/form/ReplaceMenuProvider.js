import { replaceElement } from './replaceElement.js';
import { searchTerms } from './searchTerms.js';
import { BaseReplaceMenuProvider } from '../util/BaseReplaceMenuProvider.js';

export class ReplaceMenuProvider extends BaseReplaceMenuProvider {
  static $inject = [
    'injector'
  ];

  constructor(injector) {
    super(injector, {
      resourceType: 'form',
      groupName: 'Forms',
      className: 'bpmn-icon-user-task',
      replaceElement,
      search: searchTerms
    });
  }
}
