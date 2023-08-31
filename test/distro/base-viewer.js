describe('base-viewer', function() {

  it('should expose globals', function() {

    var BpmnViewer = window.BpmnViewer;

    // then
    expect(BpmnViewer).to.exist;
    expect(new BpmnViewer()).to.exist;
  });


  it('should import initial diagram', function() {

    var BpmnViewer = window.BpmnViewer;

    // then
    /* global testImport */
    return testImport(BpmnViewer);
  });

});