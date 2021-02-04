describe('camunda-platform-modeler', function() {

  it('should expose globals', function() {

    var BpmnModeler = window.BpmnModeler;

    // then
    expect(BpmnModeler).to.exist;
    expect(new BpmnModeler()).to.exist;
  });


  it('should import initial diagram', function(done) {

    var BpmnModeler = window.BpmnModeler;

    // then
    /* global testImport */
    testImport(BpmnModeler, done);
  });

});