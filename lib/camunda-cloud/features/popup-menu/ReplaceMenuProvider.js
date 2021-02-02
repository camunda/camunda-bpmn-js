import {
  forEach
} from 'min-dash';

import {
  isEventSubProcess
} from 'bpmn-js/lib/util/DiUtil';

import {
  isAny
} from 'bpmn-js/lib/features/modeling/util/ModelingUtil';

import {
  REPLACE_OPTIONS as availableReplaceElements,
  HEADER_OPTIONS as availableHeaderEntries
} from './ReplaceOptions';

export default class ReplaceMenuProvider {

  constructor(popupMenu) {
    popupMenu.registerProvider('bpmn-replace', this);
  }

  getPopupMenuHeaderEntries(element) {

    return function(entries) {
      let headerEntries = {};

      if (
        isAny(element, [
          'bpmn:Task',
          'bpmn:ReceiveTask',
          'bpmn:ServiceTask',
          'bpmn:SubProcess',
          'bpmn:CallActivity'
        ]) && !isEventSubProcess(element)
      ) {

        forEach(entries, function(entry, key) {
          if (availableHeaderEntries.includes(key)) {
            headerEntries = {
              ...headerEntries,
              [key]: entry
            };
          }
        });

      }

      entries = headerEntries;

      return entries;
    };
  }

  getPopupMenuEntries(element) {
    return function(entries) {

      forEach(entries, function(entry, key) {
        if (!availableReplaceElements.includes(key)) {
          delete entries[key];
        }
      });

      return entries;
    };
  }
}

ReplaceMenuProvider.$inject = [
  'popupMenu'
];