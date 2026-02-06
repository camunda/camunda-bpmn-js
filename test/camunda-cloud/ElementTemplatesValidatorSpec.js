import { expect } from 'chai';

import { CloudElementTemplatesValidator } from 'lib/camunda-cloud/ElementTemplatesValidator';


describe('camunda-cloud - ElementTemplatesValidator', function() {

  [
    'addAll',
    'add',
    'getErrors',
    'getValidTemplates',
    'isSchemaValid',
  ].forEach(function(method) {
    it(`should export ${method}`, function() {

      // given
      const validator = new CloudElementTemplatesValidator();

      // then
      expect(validator[method]).to.exist;
    });
  });

});
