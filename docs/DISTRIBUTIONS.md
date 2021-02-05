# Distributions

This document lists and describes all available distributions.

## Base Modeler

This delivers the basic BPMN modeling experience of the [Camunda Modeler](https://github.com/camunda/camunda-modeler/), without any process engine specific behaviors. 

This includes a set of extension modules, as follows

  * [diagram-js-minimap](https://github.com/bpmn-io/diagram-js-minimap) - A minimap for diagram-js
  * [diagram-js-origin](https://github.com/bpmn-io/diagram-js-origin) - A point of origin cross and contour for diagram-js (disabled as default)
  * [@bpmn-io/align-to-origin](https://github.com/bpmn-io/align-to-origin) - Nicely align your diagrams to the coordinate origin (enabled as default)
  * [bpmn-js-executable-fix](https://github.com/bpmn-io/bpmn-js-executable-fix) - bpmn-js extension which makes sure that `isExecutable` is set on `bpmn:Process`
  * [bpmn-js-signavio-compat](https://github.com/bpmn-io/bpmn-js-signavio-compat) - Interoperate with Signavio exported diagrams
  * [bpmn-js-disable-collapsed-subprocess](https://github.com/bpmn-io/bpmn-js-disable-collapsed-subprocess) - A bpmn-js extension which disables modeling collapsed subprocess via replace menu
  * [bpmn-js-properties-panel](https://github.com/bpmn-io/bpmn-js-properties-panel) - A properties panel extension for bpmn-js that adds the ability to edit technical properties
  * a generic [BPMN properties provider](https://github.com/bpmn-io/bpmn-js-properties-panel/tree/master/lib/provider/bpmn)

Install and import the Modeler via npm to include it in your application.

```js
import BpmnModeler from 'camunda-bpmn-js/lib/base/Modeler';

import 'camunda-bpmn-js/dist/assets/base-modeler.css';

var bpmnModeler = new BpmnModeler({
  container: '#canvas',
  propertiesPanel: {
    parent: '#properties'
  }
});
```

## Camunda Platform Modeler

This delivers a distribution to mirror the modeling experience of the Camunda Modeler to work on the Camunda Platform. 

The Modeler includes all extensions provided by the [base distribution](#base-modeler). To provide the Camunda Platform specific properties, it includes additionally:

  * [camunda-bpmn-moddle](https://github.com/camunda/camunda-bpmn-moddle) - Camunda moddle extensions for BPMN 2.0
  * a Camunda specific [BPMN properties provider](https://github.com/bpmn-io/bpmn-js-properties-panel/tree/master/lib/provider/camunda)

```js
import BpmnModeler from 'camunda-bpmn-js/lib/camunda-platform/Modeler';

import 'camunda-bpmn-js/dist/assets/camunda-platform-modeler.css';

var bpmnModeler = new BpmnModeler({
  container: '#canvas',
  propertiesPanel: {
    parent: '#properties'
  }
});
```

## Camunda Cloud Modeler

This delivers a distribution to mirror the modeling experience of the Camunda Modeler to work on Camunda Cloud. It provides all modeling extensions that were previously part of the [Zeebe Modeler](https://github.com/zeebe-io/zeebe-modeler) application.

The Modeler includes all extensions provided by the [base distribution](#base-modeler). To provide the Camunda Cloud specific properties, it includes additionally:

  * [zeebe-bpmn-moddle](https://github.com/zeebe-io/zeebe-bpmn-moddle) - Zeebe moddle extensions for BPMN 2.0
  * a Zeebe specific [BPMN properties provider](https://github.com/camunda/camunda-bpmn-js/tree/main/lib/camunda-cloud/features/properties-provider)
  * several Zeebe specific [modeling controls and behaviors](https://github.com/camunda/camunda-bpmn-js/tree/main/lib/camunda-cloud/features)

```js
import BpmnModeler from 'camunda-bpmn-js/lib/camunda-cloud/Modeler';

import 'camunda-bpmn-js/dist/assets/camunda-cloud-modeler.css';

var bpmnModeler = new BpmnModeler({
  container: '#canvas',
  propertiesPanel: {
    parent: '#properties'
  }
});
```

## Build your own

By design, bpmn-js applications are easy to extend. Therefore it's possible to build your own Modeler out of the provided packages.

Refer to the [bpmn-js-examples](https://github.com/bpmn-io/bpmn-js-examples) directory to get some inspiration.