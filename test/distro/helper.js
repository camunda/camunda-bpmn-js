
function distroTest(BpmnJS) {

  it('should expose globals', function() {

    if (!BpmnJS) {
      throw new Error('global not bound');
    }
  });


  it('should import initial diagram', async function() {

    var container = document.createElement('div');
    container.style.height = '500px';
    container.style.border = 'solid 1px #666';

    document.body.appendChild(container);

    const response = await fetch('/base/test/fixtures/diagram.bpmn');

    if (!response.ok) {
      throw new Error('failed to fetch diagram');
    }

    const text = await response.text();

    var bpmnJs = new BpmnJS({ container: container });

    return bpmnJs.importXML(text);
  });

}


window.distroTest = distroTest;