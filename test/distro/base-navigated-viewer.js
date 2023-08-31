describe('base-navigated-viewer', function() {

  it('should expose globals', function() {

    var BpmnNavigatedViewer = window.BpmnNavigatedViewer;

    // then
    expect(BpmnNavigatedViewer).to.exist;
    expect(new BpmnNavigatedViewer()).to.exist;
  });


  it('should import initial diagram', function() {

    var BpmnNavigatedViewer = window.BpmnNavigatedViewer;

    // then
    /* global testImport */
    return testImport(BpmnNavigatedViewer);
  });

});