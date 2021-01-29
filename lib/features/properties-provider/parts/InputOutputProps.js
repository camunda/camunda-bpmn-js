import inputOutput from './implementation/InputOutput';

export default function(group, element, bpmnFactory, translate, options) {

  const inputOutputEntry = inputOutput(element, bpmnFactory, translate, options);

  group.entries = group.entries.concat(inputOutputEntry.entries);
}
