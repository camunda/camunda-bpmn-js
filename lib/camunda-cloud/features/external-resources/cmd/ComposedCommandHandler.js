/**
 * Copyright Camunda Services GmbH and/or licensed to Camunda Services GmbH
 * under one or more contributor license agreements. See the NOTICE file
 * distributed with this work for additional information regarding copyright
 * ownership.
 *
 * Camunda licenses this file to you under the MIT; you may not use this file
 * except in compliance with the MIT License.
 */

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
