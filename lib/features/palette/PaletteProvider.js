import {
  forEach
} from 'min-dash';

import { PALETTE_OPTIONS as availableActions } from './PaletteOptions';

const LOW_PRIORITY = 500;
export default function PaletteProvider(palette) {
  palette.registerProvider(LOW_PRIORITY, this);
}

PaletteProvider.prototype.getPaletteEntries = function(element) {
  return function(entries) {

    forEach(entries, function(entry, key) {
      if (!availableActions.includes(key)) {
        delete entries[key];
      }
    });

    return entries;
  };
};

PaletteProvider.$inject = [
  'palette'
];
