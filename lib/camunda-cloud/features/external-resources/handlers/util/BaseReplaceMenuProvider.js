import {
  is
} from 'bpmn-js/lib/util/ModelUtil';

import {
  isArray
} from 'min-dash';

/**
 * @typedef {object} Config
 * @property {string} resourceType
 * @property {string} className
 * @property {string} groupName
 * @property {Function} replaceElement
 * @property {string} [search]
 */

export class BaseReplaceMenuProvider {

  /**
   *
   * @param {import('didi').Injector} injector
   * @param {Config} config
   */
  constructor(injector, config) {

    this._injector = injector;
    this._popupMenu = injector.get('popupMenu');
    this._rules = injector.get('rules');
    this._translate = injector.get('translate');
    this._resources = injector.get('resources');

    this._popupMenu.registerProvider('bpmn-replace', this);

    this._config = config;
  }


  /**
   * @param {PopupMenuTarget} element
   *
   * @return {PopupMenuEntries}
   */
  getPopupMenuEntries(element) {
    const rules = this._rules;

    if (isArray(element) || !rules.allowed('shape.replace', { element })) {
      return {};
    }

    if (!is(element, 'bpmn:Activity')) {
      return {};
    }

    const {
      resourceType,
      className,
      groupName,
      replaceElement,
      search
    } = this._config;

    const resources = this._resources.filter(r => r.type === resourceType);
    const entries = {};

    resources.forEach((resource, index) => {
      const replace = () => replaceElement(element, resource, this._injector);
      entries[`resources-replace-${resourceType}-${index}`] = {
        label: resource.name,
        action: replace,
        group: {
          id: groupName.toLowerCase(),
          name: this._translate(groupName)
        },
        className,
        search
      };
    });

    return entries;
  }
}
