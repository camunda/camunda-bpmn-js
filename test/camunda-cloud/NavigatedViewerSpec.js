import TestContainer from 'mocha-test-container-support';

import {
  clearBpmnJS,
  setBpmnJS,
  insertCSS
} from 'test/TestHelper';

import {
  debounce
} from 'min-dash';

import NavigatedViewer from 'lib/camunda-cloud/NavigatedViewer';

import simpleXml from 'test/fixtures/simple.bpmn';

var singleStart = window.__env__ && window.__env__.SINGLE_START === 'camunda-cloud-navigated-viewer';

insertCSS('test-panel.css', `
  .test-content-container {
    display: flex;
    flex-direction: row;
  }

  .canvas {
    flex: 1;
    position: relative;
  }

  .canvas, .properties {
    overflow-y: auto;
  }

  .properties {
    font-family: sans-serif;
    position: relative;
    flex: none;
    height: 100%;
    width: 250px;
    border-left: solid 1px #cccccc;
  }
`);

describe('<CamundaCloudNavigatedViewer>', function() {

  // CI (windows) takes its time
  this.timeout(5000);

  var modelerContainer;

  var modeler;

  beforeEach(function() {
    modelerContainer = document.createElement('div');
    modelerContainer.classList.add('canvas');

    const container = TestContainer.get(this);

    container.appendChild(modelerContainer);
  });

  function createViewer(xml) {

    clearBpmnJS();

    modeler = new NavigatedViewer({
      container: modelerContainer,
      keyboard: {
        bindTo: document
      }
    });

    singleStart && modeler.on('commandStack.changed', debounce(function() {
      modeler.saveXML({ format: true }).then(function(result) {
        console.log(result.xml);
      });
    }, 500));

    setBpmnJS(modeler);

    return modeler.importXML(xml).then(function(result) {
      return { error: null, warnings: result.warnings, modeler: modeler };
    }).catch(function(err) {
      return { error: err, warnings: err.warnings, modeler: modeler };
    });
  }

  (singleStart ? it.only : it)('should import simple process', function() {
    return createViewer(simpleXml).then(function(result) {

      expect(result.error).not.to.exist;
    });
  });


  it('should inject mandatory modules', function() {

    // when
    return createViewer(simpleXml).then(function(result) {

      var modeler = result.modeler;

      // then
      expect(modeler.get('elementTemplatesIconsRenderer')).to.exist;
    });

  });


  it('should inject zeebe moddle descriptors', function() {

    // when
    return createViewer(simpleXml).then(function(result) {

      var modeler = result.modeler,
          moddle = modeler.get('moddle');

      // then
      expect(moddle.getPackage('zeebe')).to.exist;
    });

  });

});
