import * as replaceOptions from 'bpmn-js/lib/features/replace/ReplaceOptions';

const ALL_OPTIONS = Object.values(replaceOptions).flat();

export function getReplaceOptions() {
  return ALL_OPTIONS;
}