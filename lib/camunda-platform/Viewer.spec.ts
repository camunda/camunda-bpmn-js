import { ImportXMLError } from 'bpmn-js/lib/BaseViewer';

import Viewer from './Viewer';

export function testViewer(viewer: Viewer) {
  viewer.attachTo(document.createElement('div'));

  viewer.detach();
  
  viewer.clear();
  
  viewer.destroy();
  
  viewer.importXML('xml', (err: ImportXMLError, warnings: string[]) => {
    console.log(err.warnings);
    console.log(warnings);
  });
  
  const definitions = viewer.getDefinitions();
  
  viewer.importDefinitions(definitions, (err: ImportXMLError, warnings: string[]) => {
    console.log(err.warnings);
    console.log(warnings);
  });
}

const viewer = new Viewer({
  container: document.createElement('div'),
  position: 'absolute',
  width: 100,
  height: 100,
  additionalModules: [],
  moddleExtensions: {}
});

testViewer(viewer);
