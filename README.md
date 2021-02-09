# camunda-bpmn-js

[![CI](https://github.com/camunda/camunda-bpmn-js/workflows/CI/badge.svg)](https://github.com/camunda/camunda-bpmn-js/actions?query=workflow%3ACI)


Embeddable Camunda modeling distributions based on [bpmn-js](https://github.com/bpmn-io/bpmn-js). 

## Usage

This project is designed to deliver different BPMN modeling distributions. Instead of creating custom Modeler implementations based on [bpmn-js](https://github.com/bpmn-io/bpmn-js), choose one of the existing packages to mirror the modeling experience of [Camunda's modeling](https://github.com/camunda/camunda-modeler/) products.

Use a pre-packaged distribution

```html
<link rel="stylesheet" href="https://unpkg.com/camunda-bpmn-js@0.1.0/dist/assets/camunda-platform-modeler.css" />

<script src="https://unpkg.com/camunda-bpmn-js@0.1.0/dist/camunda-platform-modeler.development.js"></script>
```

or install it via npm

```js
import BpmnModeler from 'camunda-bpmn-js/lib/camunda-platform/Modeler';

import 'camunda-bpmn-js/dist/assets/camunda-platform-modeler.css';
```

into your web-application.

```js
var bpmnModeler = new BpmnModeler({
  container: '#canvas',
  propertiesPanel: {
    parent: '#properties'
  }
});

try {

  await bpmnModeler.importXML(someDiagram);

  console.log('success!');
  viewer.get('canvas').zoom('fit-viewport');
} catch (err) {

  console.error('something went wrong:', err);
}
```


Checkout [the docs](./docs/DISTRIBUTIONS.md) to learn more about the available distributions.
## Build and Run


Prepare the project by installing all dependencies:

```sh
npm install
```

Then, depending on your use-case, you may run any of the following commands:

```sh
# build the library and run all tests
npm run all

# spin up a single local camunda platform modeler instance
npm run start:platform

# run the full development setup
npm run dev
```

## Related

camunda-bpmn-js builds on top of a few powerful tools:

* [bpmn-js](https://github.com/bpmn-io/bpmn-js): View and edit BPMN 2.0 diagrams in the browser
* [diagram-js](https://github.com/bpmn-io/diagram-js): Diagram rendering and editing toolkit

## License

MIT

Uses [bpmn-js](https://github.com/bpmn-io/bpmn-js) licensed under the bpmn.io license.