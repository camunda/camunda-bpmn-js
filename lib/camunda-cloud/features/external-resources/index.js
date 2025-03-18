import { Resources } from './Resources.js';
import { ResourceLoader } from './ResourceLoader.js';

import { ProcessHandlerModule } from './handlers/process/index.js';
import { DecisionHandlerModule } from './handlers/decision/index.js';
import { FormHandlerModule } from './handlers/form/index.js';

import cmdModule from './cmd/index.js';

export const ResourcesModule = {
  __init__: [
    'resources.resourceLoader',
  ],
  'resources.resourceLoader': [ 'type', ResourceLoader ],
  'resources': [ 'type', Resources ],
};

export const DefaultHandlersModule = {
  __init__: [
    cmdModule
  ],
  __depends__: [
    DecisionHandlerModule,
    FormHandlerModule,
    ProcessHandlerModule
  ]
};
