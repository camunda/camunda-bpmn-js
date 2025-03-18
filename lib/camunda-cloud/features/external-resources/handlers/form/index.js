import { CreateMenuProvider } from './CreateMenuProvider';
import { AppendMenuProvider } from './AppendMenuProvider';
import { ReplaceMenuProvider } from './ReplaceMenuProvider';

export const FormHandlerModule = {
  __init__: [
    'resources.formHandler.create',
    'resources.formHandler.append',
    'resources.formHandler.replace'
  ],
  'resources.formHandler.create': [ 'type', CreateMenuProvider ],
  'resources.formHandler.append': [ 'type', AppendMenuProvider ],
  'resources.formHandler.replace': [ 'type', ReplaceMenuProvider ]
};
