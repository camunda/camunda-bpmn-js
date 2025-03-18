import {
  forEach
} from 'min-dash';

import { ComposedCommandHandler } from './ComposedCommandHandler.js';

const HANDLERS = {
  'external-resources.composed-command': ComposedCommandHandler
};


export default function CommandInitializer(eventBus, commandStack) {

  eventBus.on('diagram.init', function() {
    forEach(HANDLERS, function(handler, id) {
      commandStack.registerHandler(id, handler);
    });
  });
}

CommandInitializer.$inject = [ 'eventBus', 'commandStack' ];
