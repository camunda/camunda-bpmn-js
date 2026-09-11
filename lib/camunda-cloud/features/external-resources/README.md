# external-resources

Define available resources and create linked elements right away in BPMN editor.

## Usage

Import the library and include it in `additionalModules`.
Then, register a resources provider to pass the resources to the handlers.

## Principles

* The module is extensible. You can pass any resources, and define handlers for them.
  You can also override the default handlers.
* User is in control. Unlike in element templates, the user can still decide to override any properties set in the handler. The built-in resource handlers are merely helpers to create standard BPMN elements.

## Popup menu metadata

The default handlers add a `resource` descriptor to every external-resource
create, append, and replace entry:

```js
{
  type: 'form',
  id: 'invoiceForm'
}
```

The descriptor contains only the resource type and its stable identifier.
Custom resource types can expose an `id` property to add the same descriptor.

`isExternalResourcePopupMenuEntry(entry)` narrows a generic popup entry to an
`ExternalResourcePopupMenuEntry`, so typed consumers can access
`entry.resource.type` and `entry.resource.id` without a cast.
