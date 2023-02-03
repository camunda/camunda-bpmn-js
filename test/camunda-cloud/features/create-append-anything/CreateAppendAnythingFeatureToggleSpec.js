import {
  inject,
  getBpmnJS,
  bootstrapCamundaCloudModeler
} from 'test/TestHelper';

import diagramXML from '../../../fixtures/simple.bpmn';

import ConnectorsExtensionModule from 'bpmn-js-connectors-extension';
import createAppendAnything from 'lib/camunda-cloud/features/create-append-anything';


describe('<CreateAppendAnythingFeatureToggle>', function() {

  describe('default', function() {

    beforeEach(bootstrapCamundaCloudModeler(diagramXML, {
      additionalModules: [ ConnectorsExtensionModule, createAppendAnything ]
    }));


    it('should render append anything', inject(function(elementRegistry, contextPad) {

      var startEvent = elementRegistry.get('StartEvent_1');

      openPopup(startEvent);

      const appendEntry = contextPad.getEntries(startEvent)['append'];
      expect(appendEntry).to.exist;
    }));


    it('should render create anything', inject(function(palette) {

      const createEntry = palette.getEntries()['create'];
      expect(createEntry).to.exist;
    }));

  });


  describe('appendAnything = false', function() {

    beforeEach(bootstrapCamundaCloudModeler(diagramXML, {
      additionalModules: [ ConnectorsExtensionModule, createAppendAnything ],
      connectorsExtension: {
        appendAnything: false
      }
    }));


    it('should not render append anything', inject(function(elementRegistry, contextPad) {

      var startEvent = elementRegistry.get('StartEvent_1');

      openPopup(startEvent);

      const appendEntry = contextPad.getEntries(startEvent)['append'];
      expect(appendEntry).to.not.exist;
    }));


    it('should not render create anything', inject(function(palette) {

      const createEntry = palette.getEntries()['create'];
      expect(createEntry).to.not.exist;
    }));

  });

});


// helpers ////////////

function openPopup(element, offset) {
  offset = offset || 100;

  getBpmnJS().invoke(function(popupMenu) {
    popupMenu.open(element, 'bpmn-replace', {
      x: element.x, y: element.y
    });

  });
}