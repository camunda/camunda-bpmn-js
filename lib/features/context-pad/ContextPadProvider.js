import {
  forEach
} from 'min-dash';

import {
  CONTEXT_PAD_ENTRIES as availableActions
} from './ContextPadOptions';

const LOW_PRIORITY = 500;

export default class ContextPadProvider {

  constructor(config, injector, contextPad, contextPadProvider) {

    contextPadProvider.autoPlace = undefined;

    if (config.autoPlace !== false) {
      contextPadProvider.autoPlace = injector.get('autoPlace', false);
    }

    contextPad.registerProvider(LOW_PRIORITY, this);
  }

  getContextPadEntries(element) {

    return function(entries) {

      forEach(entries, function(entry, key) {
        if (!availableActions.includes(key)) {
          delete entries[key];
        }
      });

      return entries;
    };

  }
}

ContextPadProvider.$inject = [
  'config',
  'injector',
  'contextPad',
  'contextPadProvider'
];
