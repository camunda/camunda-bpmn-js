
function testImport(BpmnModeler, done) {

  var container = document.createElement('div');
  container.style.height = '500px';
  container.style.border = 'solid 1px #666';

  document.body.appendChild(container);

  get('/base/test/fixtures/diagram.bpmn', function(err, text) {

    if (err) {
      return done(err);
    }

    var modeler = new BpmnModeler({ container: container });

    modeler.importXML(text, function(err, warnings) {
      return done(err, warnings, modeler);
    });
  });

}

function get(url, done) {
  var httpRequest = new XMLHttpRequest();

  if (!httpRequest) {
    return done(new Error('cannot create XMLHttpRequest'));
  }

  httpRequest.onreadystatechange = checkDone;
  httpRequest.open('GET', url);
  httpRequest.send();

  function checkDone() {
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
      if (httpRequest.status === 200) {
        return done(null, httpRequest.responseText);
      } else {
        return done(new Error('status = ' + httpRequest.status), null, httpRequest);
      }
    }
  }
}

window.testImport = testImport;