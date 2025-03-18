import { CreateMenuProvider } from './CreateMenuProvider';
import { AppendMenuProvider } from './AppendMenuProvider';
import { ReplaceMenuProvider } from './ReplaceMenuProvider';

export const DecisionHandlerModule = {
  __init__: [
    'resources.decisionHandler.create',
    'resources.decisionHandler.append',
    'resources.decisionHandler.replace'
  ],
  'resources.decisionHandler.create': [ 'type', CreateMenuProvider ],
  'resources.decisionHandler.append': [ 'type', AppendMenuProvider ],
  'resources.decisionHandler.replace': [ 'type', ReplaceMenuProvider ]
};
