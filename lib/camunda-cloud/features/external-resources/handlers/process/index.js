import { CreateMenuProvider } from './CreateMenuProvider';
import { AppendMenuProvider } from './AppendMenuProvider';
import { ReplaceMenuProvider } from './ReplaceMenuProvider';

export const ProcessHandlerModule = {
  __init__: [
    'resources.processHandler.create',
    'resources.processHandler.append',
    'resources.processHandler.replace'
  ],
  'resources.processHandler.create': [ 'type', CreateMenuProvider ],
  'resources.processHandler.append': [ 'type', AppendMenuProvider ],
  'resources.processHandler.replace': [ 'type', ReplaceMenuProvider ]
};
