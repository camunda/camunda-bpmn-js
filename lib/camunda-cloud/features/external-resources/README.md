# external-resources

Define available resources and create linked elements right away in BPMN editor.

## Usage

Import the library and include it in `additionalModules`.
Then, register a resources provider to pass the resources to the handlers.

## Principles

* The module is extensible. You can pass any resources, and define handlers for them.
You can also override the default handlers.
* User is in control. Unlike in element templates, the user can still decide to override any properties set in the handler. The built-in resource handlers are merely helpers to create standard BPMN elements.
