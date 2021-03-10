import {
  filter
} from 'min-dash';

const REPLACE_WITH_USER_TASKS = 'replace-with-user-task';

const FORMS_TAB = 'forms';

const LOW_PRIORITY = 500;

export default class DisableUserTasks {
  constructor(popupMenu, propertiesPanel) {
    popupMenu.registerProvider('bpmn-replace', LOW_PRIORITY, this);
    propertiesPanel.registerProvider(LOW_PRIORITY, this);
  }

  // (1) disable replace option
  getPopupMenuEntries(element) {
    return function(entries) {
      delete entries[REPLACE_WITH_USER_TASKS];
      return entries;
    };
  }

  // (2) disable properties provider entries
  getTabs(element) {
    return function(entries) {
      return filter(entries, function(tab) {
        return tab.id !== FORMS_TAB;
      });
    };
  }
}

DisableUserTasks.$inject = [ 'popupMenu', 'propertiesPanel' ];