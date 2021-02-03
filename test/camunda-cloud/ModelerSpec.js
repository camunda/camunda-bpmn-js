import TestContainer from 'mocha-test-container-support';

import {
  clearBpmnJS,
  setBpmnJS
} from '../TestHelper';

import Modeler from '../../lib/camunda-cloud/Modeler';

import simpleXml from '../fixtures/simple.bpmn';

var singleStart = window.__env__ && window.__env__.SINGLE_START === 'camunda-cloud-modeler';


describe('<CamundaCloudModeler>', function() {

  var container;

  var modeler;

  beforeEach(function() {
    container = TestContainer.get(this);
  });

  function createModeler(xml) {

    clearBpmnJS();

    modeler = new Modeler({
      container: container,
      keyboard: {
        bindTo: document
      }
    });

    setBpmnJS(modeler);

    return modeler.importXML(xml).then(function(result) {
      return { error: null, warnings: result.warnings, modeler: modeler };
    }).catch(function(err) {
      return { error: err, warnings: err.warnings, modeler: modeler };
    });
  }

  (singleStart ? it.only : it)('should import simple process', function() {
    return createModeler(simpleXml).then(function(result) {

      expect(result.error).not.to.exist;
    });
  });


  it('should inject mandatory modules', function() {

    // when
    return createModeler(simpleXml).then(function(result) {

      var modeler = result.modeler;

      // then
      expect(modeler.get('zeebePaletteProvider')).to.exist;
      expect(modeler.get('zeebeContextPadProvider')).to.exist;
      expect(modeler.get('zeebeReplaceMenuProvider')).to.exist;
      expect(modeler.get('bpmnRules')).to.exist;
      expect(modeler.get('createZeebeBoundaryEventBehavior')).to.exist;
      expect(modeler.get('createZeebeCallActivityBehavior')).to.exist;
      expect(modeler.get('updatePropagateAllChildVariablesBehavior')).to.exist;
      expect(modeler.get('zeebeModdleExtension')).to.exist;
    });

  });


  it('should inject zeebe moddle descriptors', function() {

    // when
    return createModeler(simpleXml).then(function(result) {

      var modeler = result.modeler,
          moddle = modeler.get('moddle');

      // then
      expect(moddle.getPackage('zeebe')).to.exist;
    });

  });

});