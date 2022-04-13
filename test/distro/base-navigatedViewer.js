describe('base-navigatedViewer', function() {

  it('should expose globals', function() {

    var BpmnNavigatedViewer = window.BpmnNavigatedViewer;

    // then
    expect(BpmnNavigatedViewer).to.exist;
    expect(new BpmnNavigatedViewer()).to.exist;
  });


  it('should import initial diagram', function(done) {

    var BpmnNavigatedViewer = window.BpmnNavigatedViewer;

    // then
    /* global testImport */
    testImport(BpmnNavigatedViewer, done);
  });

});