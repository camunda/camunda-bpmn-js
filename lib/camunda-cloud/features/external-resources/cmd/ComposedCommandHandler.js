/**
 * Command handler to compose multiple commands into a single command.
 * It allows to use facades like `BpmnReplace` and `Modeling` while retaining
 * single undo/redo feature.
 */
export class ComposedCommandHandler {
  constructor(commandStack) {
    this._commandStack = commandStack;
  }

  preExecute(context) {
    context.command();
  }
}

ComposedCommandHandler.$inject = [ 'commandStack' ];
