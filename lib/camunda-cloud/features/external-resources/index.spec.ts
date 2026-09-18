import type { PopupMenuEntry } from 'diagram-js/lib/features/popup-menu/PopupMenuProvider';

import {
  isExternalResourcePopupMenuEntry,
  type ExternalResourceDescriptor,
  type ExternalResourcePopupMenuEntry
} from './index';

declare const entry: PopupMenuEntry;

if (isExternalResourcePopupMenuEntry(entry)) {
  const externalResourceEntry: ExternalResourcePopupMenuEntry = entry;
  const descriptor: ExternalResourceDescriptor = externalResourceEntry.resource;
  const type: string = descriptor.type;
  const id: string = descriptor.id;
}
