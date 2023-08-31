
async function testImport(BpmnModeler, done) {

  var container = document.createElement('div');
  container.style.height = '500px';
  container.style.border = 'solid 1px #666';

  document.body.appendChild(container);

  const response = await fetch('/base/test/fixtures/diagram.bpmn');

  if (!response.ok) {
    throw new Error('failed to fetch diagram');
  }

  const text = await response.text();

  var modeler = new BpmnModeler({ container: container });

  return modeler.importXML(text);
}

window.testImport = testImport;