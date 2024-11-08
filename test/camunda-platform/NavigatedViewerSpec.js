import TestContainer from 'mocha-test-container-support';

import {
  clearBpmnJS,
  setBpmnJS,
  insertCSS
} from 'test/TestHelper';


import Viewer from 'lib/camunda-platform/NavigatedViewer';

import simpleXml from 'test/fixtures/simple.bpmn';

var singleStart = window.__env__ && window.__env__.SINGLE_START === 'camunda-platform-navigated-viewer';

insertCSS('test.css', `
  .test-content-container {
    display: flex;
    flex-direction: row;
  }

  .modeler-container,
  .properties-container {
    height: 100%;
  }

  .modeler-container {
    width: 100%;
  }

  .properties-container {
    border-left: 1px solid #ccc;
    background: #f8f8f8;
    overflow: auto;
  }

  .properties-container:empty {
    display: none;
  }

  .properties-container .bpp-properties-panel {
    padding-bottom: 70px;
    min-height: 100%;
  }
`);

describe('<CamundaPlatformNavigatedViewer>', function() {

  // CI (windows) takes its time
  this.timeout(5000);

  var modelerContainer;

  var viewer;

  beforeEach(function() {
    modelerContainer = document.createElement('div');
    modelerContainer.classList.add('modeler-container');

    const container = TestContainer.get(this);

    container.appendChild(modelerContainer);
  });

  function createViewer(xml) {

    clearBpmnJS();

    viewer = new Viewer({
      container: modelerContainer
    });

    setBpmnJS(viewer);

    return viewer.importXML(xml).then(function(result) {
      return { error: null, warnings: result.warnings, modeler: viewer };
    }).catch(function(err) {
      return { error: err, warnings: err.warnings, modeler: viewer };
    });
  }

  (singleStart ? it.only : it)('should import simple process', function() {
    return createViewer(simpleXml).then(function(result) {

      expect(result.error).not.to.exist;
    });
  });


  it('should inject camunda moddle descriptors', function() {

    // when
    return createViewer(simpleXml).then(function(result) {
      var moddle = viewer.get('moddle');

      // then
      expect(moddle.getPackage('camunda')).to.exist;
    });

  });

});
