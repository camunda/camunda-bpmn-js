/**
 * @typedef {object} Config
 * @property {string} resourceType
 * @property {string} className
 * @property {string} groupName
 * @property {Function} createElement
 * @property {string} [search]
 */

export class BaseCreateMenuProvider {

  /**
   *
   * @param {import('didi').Injector} injector
   * @param {Config} config
   */
  constructor(injector, config) {
    this._elementFactory = injector.get('elementFactory');
    this._bpmnFactory = injector.get('bpmnFactory');
    this._popupMenu = injector.get('popupMenu');
    this._create = injector.get('create');
    this._autoPlace = injector.get('autoPlace');
    this._mouse = injector.get('mouse');
    this._translate = injector.get('translate');
    this._resources = injector.get('resources');

    injector.get('popupMenu').registerProvider('bpmn-create', this);

    this._config = config;
  }

  getPopupMenuEntries() {
    const {
      resourceType,
      className,
      groupName,
      createElement,
      search
    } = this._config;

    const resources = this._resources.filter(r => r.type === resourceType);
    const entries = {};

    resources.forEach((resource, index) => {
      const getTarget = () => createElement(resource, this._bpmnFactory);
      entries[`resources-create-${resourceType}-${index}`] = {
        label: resource.name,
        action: this._createEntryAction(getTarget),
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

  _createEntryAction(getTarget) {
    const create = this._create;
    const mouse = this._mouse;
    const popupMenu = this._popupMenu;
    const elementFactory = this._elementFactory;

    return (event) => {
      popupMenu.close();

      const businessObject = getTarget();
      const element = elementFactory.createShape({
        type: businessObject.$type,
        businessObject: businessObject
      });

      // use last mouse event if triggered via keyboard
      if (event instanceof KeyboardEvent) {
        event = mouse.getLastMoveEvent();
      }

      return create.start(event, element);
    };
  }
}
