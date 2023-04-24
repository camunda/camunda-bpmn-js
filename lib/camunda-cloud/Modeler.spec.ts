import Modeler from "./Modeler";

import { testViewer } from "../camunda-platform/Viewer.spec";

const viewer = new Modeler({
  container: document.createElement('div'),
  position: 'absolute',
  width: 100,
  height: 100,
  additionalModules: [],
  moddleExtensions: {}
});

testViewer(viewer);