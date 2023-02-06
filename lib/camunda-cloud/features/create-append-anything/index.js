import ElementTemplatesAppendProvider from './ElementTemplatesAppendProvider';
import ElementTemplatesCreateProvider from './ElementTemplatesCreateProvider';

export default {
  __init__: [
    'elementTemplatesAppendProvider',
    'elementTemplatesCreateProvider'
  ],
  elementTemplatesAppendProvider: [ 'type', ElementTemplatesAppendProvider ],
  elementTemplatesCreateProvider: [ 'type', ElementTemplatesCreateProvider ]
};