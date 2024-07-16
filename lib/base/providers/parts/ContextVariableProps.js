import { html } from 'htm/preact';
import { FeelEntry, isFeelEntryEdited } from '@bpmn-io/properties-panel';
import { useService } from 'bpmn-js-properties-panel';

export default function(element) {
  return [
    {
      id: 'contextVariable',
      element,
      component: ContextVariable,
      isEdited: isFeelEntryEdited
    }
  ];
}

function ContextVariable(props) {
  const { element, id } = props;

  const modeling = useService('modeling');
  const translate = useService('translate');
  const debounce = useService('debounceInput');

  const getValue = () => element.businessObject.contextVariable || '';

  const setValue = value => modeling.updateProperties(element, {
    contextVariable: value
  });

  return html`<${FeelEntry}
    id=${id}
    feel="required"
    element=${element}
    label=${translate('Variable value')}
    getValue=${getValue}
    setValue=${setValue}
    debounce=${debounce}
  />`;
}
