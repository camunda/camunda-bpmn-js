import NavigatedViewer from "./NavigatedViewer";

import { testViewer } from "../camunda-platform/Viewer.spec";

const viewer = new NavigatedViewer({
  container: document.createElement('div'),
  position: 'absolute',
  width: 100,
  height: 100,
  additionalModules: [],
  moddleExtensions: {}
});

testViewer(viewer);