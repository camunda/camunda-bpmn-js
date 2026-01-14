/**
 * @typedef {import('didi').Injector} Injector
 * @typedef {import('bpmn-js/lib/model/Types').ModdleElement} ModdleElement
 * @typedef {import('diagram-js/lib/features/popup-menu/PopupMenuProvider').PopupMenuEntries} PopupMenuEntries
 */

/**
 * @typedef {object} Config
 * @property {string} resourceType
 * @property {string} className
 * @property {string} groupName
 * @property {(resource: any, injector: Injector) => ModdleElement} createElement
 * @property {string} [search]
 */

export class BaseAppendMenuProvider {

  /**
   * @param {import('didi').Injector} injector
   * @param {Config} config
   */
  constructor(injector, config) {
    this._injector = injector;
    this._elementFactory = injector.get('elementFactory');
    this._bpmnFactory = injector.get('bpmnFactory');
    this._popupMenu = injector.get('popupMenu');
    this._create = injector.get('create');
    this._autoPlace = injector.get('autoPlace');
    this._rules = injector.get('rules');
    this._translate = injector.get('translate');
    this._resources = injector.get('resources');

    this._config = config;

    this._register();
  }

  _register() {
    this._popupMenu.registerProvider('bpmn-append', this);
  };

  /**
   * @param {ModdleElement} element
   *
   * @returns {PopupMenuEntries}
   */
  getPopupMenuEntries(element) {
    const rules = this._rules;

    if (!rules.allowed('shape.append', { element: element })) {
      return [];
    }

    const {
      resourceType,
      groupName,
      createElement,
      ...additionalConfig
    } = this._config;

    const resources = this._resources.filter(r => r.type === resourceType);
    const entries = {};

    resources.forEach((resource, index) => {
      const getTarget = () => createElement(resource, this._injector);
      entries[`resources-append-${resourceType}-${index}`] = {
        label: resource.name,
        action: this._createEntryAction(element, getTarget),
        group: {
          id: groupName.toLowerCase(),
          name: this._translate(groupName)
        },
        ...additionalConfig
      };
    });

    return entries;
  };

  _createEntryAction(element, targetFactory) {
    const elementFactory = this._elementFactory;
    const autoPlace = this._autoPlace;
    const create = this._create;

    const createElement = () => {
      const businessObject = targetFactory();

      return elementFactory.createShape({
        type: businessObject.$type,
        businessObject: businessObject
      });
    };

    const autoPlaceElement = () => {
      const newElement = createElement();
      autoPlace.append(element, newElement);
    };

    const manualPlaceElement = (event) => {
      const newElement = createElement();
      return create.start(event, newElement, {
        source: element
      });
    };

    return {
      click: autoPlaceElement,
      dragstart: manualPlaceElement
    };
  }
}
