# Changelog

All notable changes to [camunda-bpmn-js](https://github.com/camunda/camunda-bpmn-js) are documented here. We use [semantic versioning](http://semver.org/) for releases.

## Unreleased

___Note:__ Yet to be released changes appear here._

## 5.14.2

* `DEPS`: update to `@bpmn-io/variable-resolver@1.3.5`

### Key Changes in Properties Panel

* `FIX`: always return an instance of variables context in `getResultContext` ([bpmn-io/variable-resolver#58](https://github.com/bpmn-io/variable-resolver/pull/58))

## 5.14.1

* `DEPS`: update to `@bpmn-io/variable-resolver@1.3.5`

### Key Changes in Properties Panel

* `FIX`: do not try to find unresolved variables of a broken expression ([bpmn-io/variable-resolver#50](https://github.com/bpmn-io/variable-resolver/issues/50))

## 5.14.0

* `DEPS`: update to `@bpmn-io/variable-resolver@1.3.4`
* `DEPS`: update to `bpmn-js@18.7.0`
* `DEPS`: update to `diagram-js@15.4.0`
* `DEPS`: update to `bpmn-js-element-templates@2.14.0`
* `DEPS`: update to `camunda-bpmn-js-behaviors@1.11.2`

### Key Changes in Modeling

* `FEAT`: support disabled entries in popup menu ([bpmn-io/diagram-js#987](https://github.com/bpmn-io/diagram-js/pull/987))
* `FIX`: ensure popup menu keyboard navigation accounts for group order ([bpmn-io/diagram-js#989](https://github.com/bpmn-io/diagram-js/pull/989))
* `FIX`: revert `AdHocSubProcess#cancelRemainingInstances` default value removal ([bpmn-io/bpmn-moddle#132](https://github.com/bpmn-io/bpmn-moddle/pull/132))

### Key Changes in Properties Panel

* `FIX`: preserve variables with same name but different scopes ([bpmn-io/variable-resolver#56](https://github.com/bpmn-io/variable-resolver/pull/56))

### Key Changes in Element Templates

* `FEAT`: support `activeElementsCollection` property on `zeebe:adHoc` ([camunda/element-templates-json-schema#198](https://github.com/camunda/element-templates-json-schema/pull/198), [bpmn-io/bpmn-js-element-templates#186](https://github.com/bpmn-io/bpmn-js-element-templates/pull/186))
* `FEAT`: create sub-processes as expanded elements ([bpmn-io/bpmn-js-element-templates#185](https://github.com/bpmn-io/bpmn-js-element-templates/pull/185))
* `FEAT`: cache templates between linter plugin usages ([bpmn-io/bpmn-js-element-templates#179](https://github.com/bpmn-io/bpmn-js-element-templates/pull/179))

## 5.13.0

* `DEPS`: update to `@bpmn-io/properties-panel@3.33.0`
* `DEPS`: update to `bpmn-js-properties-panel@5.42.0`

### Key Changes in Properties Panel

* `FEAT`: support multiline feel strings in `camunda` dialect ([@bpmn-io/lezer-feel#2](https://github.com/bpmn-io/lezer-feel/pull/2))
* `FIX`: recognize unclosed feel string literal as syntax error ([nikku/lezer-feel#52](https://github.com/nikku/lezer-feel/pull/52))


## 5.12.0

* `DEPS`: update to `@bpmn-io/properties-panel@3.32.0`
* `DEPS`: update to `bpmn-js@18.6.3`
* `DEPS`: update to `bpmn-js-create-append-anything@1.0.1`
* `DEPS`: update to `bpmn-js-element-templates@2.11.0`
* `DEPS`: update to `bpmn-js-properties-panel@5.41.3`
* `DEPS`: update to `camunda-bpmn-js-behaviors@1.11.1`
* `DEPS`: update to `zeebe-bpmn-moddle@1.11.0`

### Key Changes in Modeling

* `FEAT`: clean up ad-hoc subprocess when implementation type is changed ([camunda/camunda-bpmn-js-behaviors#104](https://github.com/camunda/camunda-bpmn-js-behaviors/pull/104), [camunda/camunda-bpmn-js-behaviors#106](https://github.com/camunda/camunda-bpmn-js-behaviors/pull/106))
* `FIX`: `cancelRemainingInstances` of ad-hoc sub-processes is unset by default ([bpmn-io/bpmn-js-properties-panel#1148](https://github.com/bpmn-io/bpmn-js-properties-panel/pull/1148), [bpmn-io/bpmn-moddle#131](https://github.com/bpmn-io/bpmn-moddle/issues/131))
* `FIX`: trigger create mode if auto place of element with template not possible ([bpmn-io/bpmn-js-create-append-anything#56](https://github.com/bpmn-io/bpmn-js-create-append-anything/pull/56))

### Key Changes in Properties Panel

* `FEAT`: add output collection props for `bpmn:AdHocSubProcess` ([bpmn-io/bpmn-js-properties-panel#1143](https://github.com/bpmn-io/bpmn-js-properties-panel/pull/1143))
* `FEAT`: support job worker implementation of `bpmn:AdHocSubProcess` ([bpmn-io/bpmn-js-properties-panel#1144](https://github.com/bpmn-io/bpmn-js-properties-panel/pull/1144))

### Key Changes in Element Templates

* `FEAT`: support `zeebe:assignmentDefinition` binding ([bpmn-io/bpmn-js-element-templates#168](https://github.com/bpmn-io/bpmn-js-element-templates/pull/168))
* `FEAT`: support `zeebe:priorityDefinition` binding ([bpmn-io/bpmn-js-element-templates#171](https://github.com/bpmn-io/bpmn-js-element-templates/pull/171))
* `FEAT`: support `zeebe:taskSchedule` binding ([bpmn-io/bpmn-js-element-templates#173](https://github.com/bpmn-io/bpmn-js-element-templates/pull/173))
* `FEAT`: support `zeebe:adHoc` binding ([bpmn-io/bpmn-js-element-templates#175](https://github.com/bpmn-io/bpmn-js-element-templates/pull/175))
* `FIX`: use default values for displaying edited marker ([bpmn-io/bpmn-js-element-templates#170](https://github.com/bpmn-io/bpmn-js-element-templates/pull/170))

## 5.11.0

* `DEPS`: update to `@bpmn-io/properties-panel@3.31.0`
* `DEPS`: update to `bpmn-js-color-picker@0.7.2`
* `DEPS`: update to `bpmn-js-element-templates@2.8.0`
* `DEPS`: update to `camunda-bpmn-js-behaviors@1.10.2`
* `DEPS`: update to `bpmn-js-properties-panel@5.39.0`

### Key Changes in Properties Panel

* `FEAT`: set FEEL parser dialect to Camunda by default ([bpmn-io/bpmn-js-properties-panel#1128](https://github.com/bpmn-io/bpmn-js-properties-panel/pull/1128))
* `FEAT`: allow to provide custom FEEL popup
* `FEAT`: make list headers sticky ([bpmn-io/properties-panel#397](https://github.com/bpmn-io/properties-panel/pull/397))
* `FEAT`: support `creating` and `canceling` task listeners
* `FEAT`: update `camunda` built-ins
* `FIX`: correctly update condition entry
* `FIX`: report Camunda user task as default implementation ([bpmn-io/bpmn-js-properties-panel#1135](https://github.com/bpmn-io/bpmn-js-properties-panel/issues/1135))
* `FIX`: show tooltip on number fields
* `FIX`: remove `zeebe:versionTag` when setting tag to `undefined` ([#101](https://github.com/camunda/camunda-bpmn-js-behaviors/pull/101))
* `FIX`: handle participants when removing empty `zeebe:versionTag` ([#99](https://github.com/camunda/camunda-bpmn-js-behaviors/pull/99))

### Key Changes in Element Templates

* `FEAT`: support `bindingType` property ([bpmn-io/bpmn-js-element-templates#165](https://github.com/bpmn-io/bpmn-js-element-templates/pull/165))
* `FEAT`: support properties of type `bpmn:Expression` ([bpmn-io/bpmn-js-element-templates#161](https://github.com/bpmn-io/bpmn-js-element-templates/pull/161))
* `FEAT`: support `zeebe:formDefinition` binding property ([bpmn-io/bpmn-js-element-templates#158](https://github.com/bpmn-io/bpmn-js-element-templates/pull/158))
* `FEAT`: support `zeebe:calledDecision` binding property ([bpmn-io/bpmn-js-element-templates#155](https://github.com/bpmn-io/bpmn-js-element-templates/pull/155))
* `FEAT`: support `zeebe:scriptTask` binding property ([bpmn-io/bpmn-js-element-templates#156](https://github.com/bpmn-io/bpmn-js-element-templates/pull/156))
* `FIX`: correctly handle numeric conditions ([bpmn-io/bpmn-js-element-templates#69](https://github.com/bpmn-io/bpmn-js-element-templates/issues/69))
* `FIX`: keep groups closed when template is first applied ([bpmn-io/bpmn-js-element-templates#162](https://github.com/bpmn-io/bpmn-js-element-templates/pull/162))

## 5.10.0

* `DEPS`: update to `@bpmn-io/properties-panel@3.27.2`
* `DEPS`: update to `bpmn-js@18.6.2`
* `DEPS`: update to `bpmn-js-element-templates@2.6.0`
* `DEPS`: update to `bpmn-js-properties-panel@5.36.1`

### Key Changes in Modeling

* `FIX`: center task markers ([bpmn-io/bpmn-js#1995](https://github.com/bpmn-io/bpmn-js/issues/1995))

### Key Changes in Properties Panel

* `FEAT`: trim whitespace in text inputs ([bpmn-io/properties-panel#309](https://github.com/bpmn-io/properties-panel/issues/309), [bpmn-io/properties-panel#404](https://github.com/bpmn-io/properties-panel/issues/404))
* `FIX`: show literal values in FEEL suggestions
* `FIX`: add empty alt attribute for icons

### Key Changes in Element Templates

* `FEAT`: support `zeebe:userTask` binding property ([bpmn-js-element-templates#147](https://github.com/bpmn-io/bpmn-js-element-templates/pull/147))
* `FIX`: correctly reuse `bpmn:Message` properties when changing templates ([bpmn-io/bpmn-js-element-templates#154](https://github.com/bpmn-io/bpmn-js-element-templates/pull/154))

## 5.9.0

* `DEPS`: update to `camunda-bpmn-js-behaviors@1.10.0`

### Key Changes in Modeling

* `FEAT`: remove message ref when replacing with send task or throw event

## 5.8.0

* `DEPS`: update to `bpmn-js@18.6.1`
* `DEPS`: update to `bpmn-js-create-append-anything@1.0.0`
* `DEPS`: update to `diagram-js@15.3.0`
* `DEPS`: update to `min-dash@4.2.3`
* `DEPS`: update to `@bpmn-io/element-template-chooser@2.0.0`
* `DEPS`: update to `@bpmn-io/element-template-icon-renderer@1.0.0`

### Key Changes in Modeling

* `FEAT`: support searching through arrays in popup menu ([bpmn-io/diagram-js#970](https://github.com/bpmn-io/diagram-js/pull/970))
* `FEAT`: prioritize `search` over `description` when matching popup menu entries ([bpmn-io/diagram-js#963](https://github.com/bpmn-io/diagram-js/pull/963))
* `FEAT`: sort `search` terms across all keys ([bpmn-io/diagram-js#963](https://github.com/bpmn-io/diagram-js/pull/963))
* `FIX`: always select first search entry ([bpmn-io/diagram-js#967](https://github.com/bpmn-io/diagram-js/pull/967))
* `FIX`: copy error, escalation, message and signal references when copying elements ([bpmn-io/bpmn-js#2301](https://github.com/bpmn-io/bpmn-js/pull/2301))

### Key Changes in Element Templates

* `FEAT`: provide element template `keywords` to popup menu search ([bpmn-io/bpmn-js-create-append-anything#50](https://github.com/bpmn-io/bpmn-js-create-append-anything/pull/50))
* `FEAT`: render element template icons on sub-processes and call activities ([bpmn-io/element-template-icon-renderer#20](https://github.com/bpmn-io/element-template-icon-renderer/issues/20))

## 5.7.1

### Key Changes in Modeling

* `FIX`: use distinct groups for replacement with resource

## 5.7.0

* `DEPS`: update to `bpmn-js-properties-panel@5.35.0`
* `DEPS`: update to `@bpmn-io/properties-panel@3.26.4`
* `DEPS`: update to `bpmn-js@18.4.0`

### Key Changes in Modeling

* `FEAT`: add resources extension ([#405](https://github.com/camunda/camunda-bpmn-js/pull/405))
* `FEAT`: render collapsed event subprocess icons ([bpmn-io/bpmn-js#50](https://github.com/bpmn-io/bpmn-js/issues/50))

### Key Changes in Properties Panel

* `FEAT`: add ad-hoc subprocess completion support ([bpmn-io/bpmn-js-properties-panel](https://github.com/bpmn-io/bpmn-js-properties-panel/pull/1114))
* `FIX`: clarify wording for input/output groups ([bpmn-io/bpmn-js-properties-panel#1115](https://github.com/bpmn-io/bpmn-js-properties-panel/pull/1115))

## 5.6.2

* `DEPS`: update to `bpmn-js@18.3.2`

### Key Changes in Modeling

* `FIX`: remove default start event for ad-hoc subprocess ([bpmn-io/bpmn-js#2295](https://github.com/bpmn-io/bpmn-js/pull/2295))
* `FIX`: show modeling feedback error for data objects ([bpmn-io/bpmn-js#2290](https://github.com/bpmn-io/bpmn-js/pull/2290))

## 5.6.1

* `DEPS`: update to `bpmn-js@18.3.1`
* `DEPS`: update to `@bpmn-io/properties-panel@3.26.2`
* `DEPS`: update to `bpmn-js-properties-panel@5.31.1`
* `DEPS`: update to `bpmn-js-element-templates@2.5.3`

### Key Changes in Modeling

* `FIX`: move artifacts with local space tool ([bpmn-io/bpmn-js#2285](https://github.com/bpmn-io/bpmn-js/pull/2285))
* `FIX`: make tooltip persist when trying to copy from it ([bpmn-io/properties-panel#399](https://github.com/bpmn-io/properties-panel/pull/399))

### Key Changes in Element Templates

* `FIX`: keep documentation and execution listeners when template is removed ([bpmn-io/bpmn-js-element-templates#120](https://github.com/bpmn-io/bpmn-js-element-templates/pull/120))
* `FIX`: do not remove unrelated properties on linkedResource update ([bpmn-io/bpmn-js-element-templates#143](https://github.com/bpmn-io/bpmn-js-element-templates/pull/143))

## 5.6.0

* `DEPS`: update to `bpmn-js@18.3.0`

### Key Changes in Modeling

* `FEAT`: annotate popup menu entries with Camunda specific details ([#400](https://github.com/camunda/camunda-bpmn-js/pull/40))
* `FEAT`: allow to replace between variants of typed events ([bpmn-io/bpmn-js#2282](https://github.com/bpmn-io/bpmn-js/pull/2282))

## 5.5.1

* `DEPS`: update to `bpmn-js-element-templates@2.5.2`

### Key Changes in Element Templates

* `FIX`: make `feel` default value `static` for inputs and outputs ([#142](https://github.com/bpmn-io/bpmn-js-element-templates/pull/142))

#### Note

This release reverts the breaking changes introduced via [`bpmn-js-element-templates@2.5.1`](https://github.com/bpmn-io/bpmn-js-element-templates/blob/main/CHANGELOG.md#251). Any `feel` value out of the supported enum is allowed, but `static` is used if the property is missing.

## 5.5.0

* `DEPS`: update to `@bpmn-io/properties-panel@3.26.0`
* `DEPS`: update to `@bpmn-io/variable-resolver@1.3.3`
* `DEPS`: update to `bpmn-js@18.2.0`
* `DEPS`: update to `bpmn-js-create-append-anything@0.6.0`
* `DEPS`: update to `bpmn-js-element-templates@2.5.1`
* `DEPS`: update to `bpmn-js-properties-panel@5.31.1`
* `DEPS`: update to `camunda-bpmn-js-behaviors@1.9.1`
* `DEPS`: update to `zeebe-bpmn-moddle@1.9.0`

### Key Changes in Modeling

* `FEAT`: support ad-hoc subprocesses in replace menu ([bpmn-js#2276](https://github.com/bpmn-io/bpmn-js/pull/2276))
* `FEAT`: support ad-hoc subprocesses in create/append anything menu ([bpmn-js-create-append-anything#47](https://github.com/bpmn-io/bpmn-js-create-append-anything/pull/47))
* `FEAT`: support _Active elements_ properties for ad-hoc subprocesses ([bpmn-js-properties-panel#1105](https://github.com/bpmn-io/bpmn-js-properties-panel/pull/1105))
* `FEAT`: suggest latest Camunda FEEL built-ins ([bpmn-io/feel-editor#65](https://github.com/bpmn-io/feel-editor/pull/65))
* `FIX`: take scope into account when resolving variables ([bpmn-io/variable-resolver#43](https://github.com/bpmn-io/variable-resolver/pull/43))

### Key Changes in Element Templates

* `FEAT`: support binding type `zeebe:linkedResource` ([bpmn-js-element-templates#137](https://github.com/bpmn-io/bpmn-js-element-templates/issues/137))
* `FIX`: require `feel` to be `optional` or `static` for `Boolean` and `Number` inputs and outputs ([camunda/element-templates-json-schema#156](https://github.com/camunda/element-templates-json-schema/pull/156))

## 5.4.2

* `DEPS`: update to `bpmn-js@18.1.2`
* `DEPS`: update to `diagram-js@15.2.4`

### Key Changes in Modeling

* `FIX`: canvas `autoFocus` must explicitly be enabled ([bpmn-io/diagram-js#956](https://github.com/bpmn-io/diagram-js/pull/956))
* `FIX`: properly integrate `zoomscroll` with canvas focus ([bpmn-io/diagram-js#956](https://github.com/bpmn-io/diagram-js/pull/956))
* `FIX`: properly integrate `movecanvas` with canvas focus ([bpmn-io/diagram-js#956](https://github.com/bpmn-io/diagram-js/pull/956))

## 5.4.1

* `DEPS`: update to `@bpmn-io/variable-resolver@1.3.2`

### Key Changes in Properties Panel

* `FIX`: accept empty script expression without error ([bpmn-io/variable-resolver#42](https://github.com/bpmn-io/variable-resolver/pull/42))

## 5.4.0

* `DEPS`: update to `@bpmn-io/variable-resolver@1.3.1`
* `DEPS`: update to `bpmn-js-properties-panel@5.30.0`
* `DEPS`: update to `camunda-bpmn-js-behaviors@1.9.0`

### Key Changes in Properties Panel

* `FEAT`: rename task listener event types ([bpmn-io/bpmn-js-properties-panel#1098](https://github.com/bpmn-io/bpmn-js-properties-panel/pull/1098))
* `FIX`: parse script task result as FEEL context ([bpmn-io/variable-resolver#41](https://github.com/bpmn-io/variable-resolver/pull/41))

## 5.3.0

* `DEPS`: update to `bpmn-js-element-templates@2.4.0`
* `DEPS`: update to `bpmn-js-properties-panel@5.29.0`
* `DEPS`: update to `camunda-bpmn-js-behaviors@1.8.0`

### Key Changes in Properties Panel

* `FEAT`: rename "Zeebe user task" to "Camunda user task" ([bpmn-io/bpmn-js-properties-panel#1097](https://github.com/bpmn-io/bpmn-js-properties-panel/pull/1097))
* `FEAT`: make "Camunda user task" the default implementation of user task ([camunda/camunda-bpmn-js-behaviors#86](https://github.com/camunda/camunda-bpmn-js-behaviors/pull/86))
* `FIX`: move template selector right below documentation group ([bpmn-io/bpmn-js-element-templates#130](https://github.com/bpmn-io/bpmn-js-element-templates/pull/130))

### Key Changes in Element Templates

* `FEAT`: support element templates runtime compatibility ([bpmn-io/bpmn-js-element-templates#132](https://github.com/bpmn-io/bpmn-js-element-templates/pull/132))

## 5.2.2

* `DEPS`: update to `@bpmn-io/properties-panel@3.25.1`

### Key Changes in Properties Panel

* `FIX`: add focus outline to checkboxes and buttons ([bpmn-io/properties-panel#390](https://github.com/bpmn-io/properties-panel/pull/390))

## 5.2.1

* `FIX`: adjust search to prioritize start of word and exact matches ([bpmn-io/diagram-js#953](https://github.com/bpmn-io/diagram-js/pull/953))
* `FIX`: ignore whitespace when searching ([bpmn-io/diagram-js#954](https://github.com/bpmn-io/diagram-js/pull/954))
* `DEPS`: update to `bpmn-js@18.1.1`
* `DEPS`: update to `diagram-js@15.2.3`

## 5.2.0

* `DEPS`: update to `camunda-bpmn-js-behaviors@1.7.2`
* `DEPS`: update to `bpmn-js@18.1.0`
* `DEPS`: update to `diagram-js@15.2.2`
* `DEPS`: update to `bpmn-js-properties-panel@5.28.0`

### Key Changes in Modeling

* `FEAT`: integrate `popup-menu` with `search` ([bpmn-io/diagram-js#932](https://github.com/bpmn-io/diagram-js/pull/932))
* `FIX`: correctly handle duplicate entries and whitespace in `search` ([bpmn-io/diagram-js#932](https://github.com/bpmn-io/diagram-js/pull/932))
* `FIX`: find `search` terms across all keys ([bpmn-io/diagram-js#932](https://github.com/bpmn-io/diagram-js/pull/932))
* `FIX`: `search` always returns tokens for matched items ([bpmn-io/diagram-js#932](https://github.com/bpmn-io/diagram-js/pull/932))
* `FIX`: clear selection when opening search pad ([bpmn-io/diagram-js#947](https://github.com/bpmn-io/diagram-js/pull/947))
* `FIX`: correct dangling selection after search pad interaction ([bpmn-io/diagram-js#947](https://github.com/bpmn-io/diagram-js/pull/947))
* `FIX`: create new user task form only if user task form referenced ([camunda/camunda-bpmn-js-behaviors#85](https://github.com/camunda/camunda-bpmn-js-behaviors/pull/85))

### Key Changes in Properties Panel

* `FEAT`: make properties panel container focusable ([bpmn-io/bpmn-js-properties-panel#1095](https://github.com/bpmn-io/bpmn-js-properties-panel/pull/1095))

## 5.1.0

* `DEPS`: update to `bpmn-js-properties-panel@5.29.0`
* `DEPS`: update to `zeebe-bpmn-moddle@1.7.0`
* `DEPS`: update to `camunda-bpmn-js-behaviors@1.7.1`

### Key Changes in Properties Panel

* `FEAT`: support task listeners ([bpmn-io/bpmn-js-properties-panel#1088](https://github.com/bpmn-io/bpmn-js-properties-panel/pull/1088))

## 5.0.0

* `DEPS`: update to `bpmn-js@18.0.0`
* `DEPS`: update to `diagram-js@15.2.0`
* `DEPS`: update to `diagram-js-grid@1.1.0`
* `DEPS`: update to `diagram-js-minimap@5.2.0`
* `DEPS`: update to `min-dash@4.2.2`
* `DEPS`: update to `zeebe-bpmn-moddle@1.6.1`
* `DEPS`: update to `@bpmn-io/properties-panel@3.25.0`
* `DEPS`: update to `bpmn-js-properties-panel@5.26.0`

### Key Changes in Modeling

* `FEAT`: remove `outline` from `Viewer` modules ([bpmn-io/bpmn-js#2135](https://github.com/bpmn-io/bpmn-js/issues/2135))
* `FEAT`: make `Canvas` a focusable element ([bpmn-io/diagram-js#662](https://github.com/bpmn-io/diagram-js/pull/662))
* `FEAT`: implicit keyboard binding ([bpmn-io/diagram-js#662](https://github.com/bpmn-io/diagram-js/pull/662))
* `FIX`: prevent crash during label adjustment ([bpmn-io/bpmn-js#2239](https://github.com/bpmn-io/bpmn-js/issues/2239))
* `FIX`: keep existing loop characteristics when toggling through the replace menu ([bpmn-io/bpmn-js#2251](https://github.com/bpmn-io/bpmn-js/pull/2251))
* `FIX`: prevent covering multi selection with black box in `Viewer` ([bpmn-io/bpmn-js#2135](https://github.com/bpmn-io/bpmn-js/issues/2135))
* `FIX`: correct handling of group name with whitespace only ([bpmn-io/bpmn-js#2231](https://github.com/bpmn-io/bpmn-js/issues/2231))

### Key Changes in Properties Panel

* `FEAT`: add FEEL Copilot link to FEEL popup ([#385](https://github.com/camunda/camunda-bpmn-js/pull/385))

### Breaking Changes

* Require `Node >= 20`
* `Canvas` is now a focusable element and provides better support for native browser behaviors. Focus can be controlled with new `focus` and `restoreFocus` APIs.
* Keyboard is now implicitly bound to canvas SVG element. Calls to `keyboard.bind` and `keyboard.bindTo` now result with a descriptive console error and have no effect.

## 4.20.2

* `DEPS`: update to `diagram-js@14.11.3`

### Key Changes in Modeling

* `FIX`: restore search result highlight ([bpmn-io/diagram-js#931](https://github.com/bpmn-io/diagram-js/pull/931))
* `FIX`: correct search result highlight not being removed ([bpmn-io/diagram-js#931](https://github.com/bpmn-io/diagram-js/pull/931))
* `FIX`: do not change zoom when search openes ([bpmn-io/diagram-js#931](https://github.com/bpmn-io/diagram-js/pull/931))

## 4.20.1

* `DEPS`: update to `diagram-js@14.11.1`
* `DEPS`: update to `@bpmn-io/variable-resolver@1.3.0`
* `DEPS`: update to `bpmn-js-element-templates@2.3.0`
* `DEPS`: update to `bpmn-js-properties-panel@5.25.0`

## 4.20.0

* `DEPS`: update to `diagram-js@14.10.0`
* `DEPS`: update to `bpmn-js@17.11.1`
* `DEPS`: update to `@bpmn-io/properties-panel@3.24.1`
* `DEPS`: update to `bpmn-jsproperties-panel@5.24.0`
* `DEPS`: update to `bpmn-js-element-templates@2.2.1`

### Key Changes in Modeling

* `FEAT`: align search styles with other popups ([#2187](https://github.com/bpmn-io/bpmn-js/pull/2187))
* `FEAT`: prioritize start of tokens in search results ([#2187](https://github.com/bpmn-io/bpmn-js/pull/2187))
* `FIX`: pasting compensation activity without boundary event ([bpmn-io/bpmn-js#2070](https://github.com/bpmn-io/bpmn-js/issues/2070))
* `FIX`: lane resize constraints for se and nw direction ([bpmn-io/bpmn-js#2209](https://github.com/bpmn-io/bpmn-js/issues/2209))
* `FIX`: auto place elements vertically in sub-processes ([bpmn-io/bpmn-js#2127](https://github.com/bpmn-io/bpmn-js/issues/2127))
* `FIX`: hide lane label during direct editing

### Key Changes in Properties Panel

* `FEAT`: support Camunda 8.6 built-ins ([bpmn-io/feel-editor#62](https://github.com/bpmn-io/feel-editor/pull/62))
* `FEAT`: lint first item access ([bpmn-io/feel-lint#25](https://github.com/bpmn-io/feel-lint/issues/25))
* `FEAT`: suggest Camunda 8.6 FEEL built-ins

### Key Changes in Element Templates

* `FIX`: cast default `number` and `boolean` properties to FEEL ([bpmn-io/bpmn-js-element-templates#121](https://github.com/bpmn-io/bpmn-js-element-templates/pull/121))

## 4.19.1

* `DEPS`: update to `bpmn-js-properties-panel@5.23.1`

### Key Changes in Properties Panel

* `FIX`: prevent focus loss of _Binding_ and _Version tag_ entries ([bpmn-io/bpmn-js-properties-panel#1076](https://github.com/bpmn-io/bpmn-js-properties-panel/pull/1076))

## 4.19.0

* `DEPS`: update to `bpmn-js-properties-panel@5.23.0`
* `DEPS`: update to `camunda-bpmn-js-behaviors@1.6.1`
* `DEPS`: update to `zeebe-bpmn-moddle@1.6.0`

### Key Changes in Properties Panel

* `FEAT`: support maintaning `Version Tag` for Camunda 8 diagrams ([bpmn-io/bpmn-js-properties-panel#1062](https://github.com/bpmn-io/bpmn-js-properties-panel/issues/1062))

## 4.18.0

* `DEPS`: update to `bpmn-js@17.9.2`
* `DEPS`: update to `bpmn-js-properties-panel@5.22.0`
* `DEPS`: update to `bpmn-js-element-templates@2.2.0`
* `DEPS`: update to `diagram-js@14.9.0`
* `DEPS`: update to `zeebe-bpmn-moddle@1.5.1`

### Key Changes in Properties Panel

* `FEAT`: do not apply `*length` and `pattern` validation to FEEL expressions ([bpmn-io/bpmn-js-element-templates#115](https://github.com/bpmn-io/bpmn-js-element-templates/pull/115))
* `FEAT`: support maintaining `zeebe:priorityDefinition:priority` for user task ([bpmn-io/bpmn-js-properties-panel#1072](https://github.com/bpmn-io/bpmn-js-properties-panel/pull/1072))
* `FIX`: rename task definition type label ([bpmn-io/bpmn-js-properties-panel#1070](https://github.com/bpmn-io/bpmn-js-properties-panel/pull/1070))

## 4.17.0

* `DEPS`: update to `@bpmn-io/properties-panel@3.23.0`
* `DEPS`: update to `bpmn-js-element-templates@2.1.0`

### Key Changes in Properties Panel

* `FEAT`: make text area auto resize by default ([bpmn-io/properties-panel#377](https://github.com/bpmn-io/properties-panel/pull/377), [bpmn-io/bpmn-js-properties-panel#713](https://github.com/bpmn-io/bpmn-js-properties-panel/issues/713))

### Key Changes in Element Templates

* `FEAT`: always display execution listeners group for Zeebe ([bpmn-io/bpmn-js-element-templates#96](https://github.com/bpmn-io/bpmn-js-element-templates/pull/96))

## 4.16.0

* `DEPS`: update to `@bpmn-io/properties-panel@3.22.4`
* `DEPS`: update to `bpmn-js-properties-panel@5.20.0`
* `DEPS`: update to `camunda-bpmn-js-behaviors@1.5.0`
* `DEPS`: update to `zeebe-bpmn-moddle@1.4.0`

### Key Changes in Properties Panel

* `FEAT`: add `Binding` entry to busines rule task, call activity and user task ([bpmn-io/bpmn-js-properties-panel#1067](https://github.com/bpmn-io/bpmn-js-properties-panel/pull/1067))

## 4.15.0

* `DEPS`: update to `bpmn-js-properties-panel@5.19.0`
* `DEPS`: update to `bpmn-js-element-templates@2.0.0`
* `DEPS`: update to `bpmn-js-create-append-anything@0.5.2`

### Key Changes in Element Templates

* `FIX`: safely remove message when changing template ([bpmn-io/bpmn-js-element-templates#111](https://github.com/bpmn-io/bpmn-js-element-templates/pull/111))
* `FIX`: remove existing event definition when applying template ([bpmn-io/bpmn-js-element-templates#111](https://github.com/bpmn-io/bpmn-js-element-templates/pull/111))

## 4.14.0

* `DEPS`: update to `zeebe-bpmn-moddle@1.2.0`
* `DEPS`: update to `camunda-bpmn-js-behaviors@1.4.0`

### Key Changes in Properties Panel

* `FEAT`: support Zeebe execution listeners ([bpmn-io/bpmn-js-properties-panel#1048](https://github.com/bpmn-io/bpmn-js-properties-panel/pull/1048))

## 4.13.0

* `DEPS`: update to `@bpmn-io/properties-panel@3.22.3`
* `DEPS`: update to `bpmn-js-properties-panel@5.18.1`

### Key Changes in Properties Panel

* `FEAT`: change Header value and Field Injection value fields to text areas ([bpmn-io/bpmn-js-properties-panel#1065](https://github.com/bpmn-io/bpmn-js-properties-panel/pull/1065))
* `FIX`: correctly resize text areas ([bpmn-io/properties-panel#374](https://github.com/bpmn-io/properties-panel/pull/374))

## 4.12.1

* `DEPS`: update to `bpmn-js@17.9.1`
* `DEPS`: update to `diagram-js@14.8.0`

### Key Changes in Modeling

* `FIX`: show delete action for labels ([bpmn-io/bpmn-js#2163](https://github.com/bpmn-io/bpmn-js/issues/2163))
* `FIX`: remove incorrect attribute in replace menu ([bpmn-io/bpmn-js#2196](https://github.com/bpmn-io/bpmn-js/pull/2196))
* `FIX`: add accessible label to drill down button ([bpmn-io/bpmn-js#2194](https://github.com/bpmn-io/bpmn-js/pull/2194))

## 4.12.0

* `DEPS`: update to `bpmn-js-properties-panel@5.18.0`
* `DEPS`: update to `@bpmn-io/properties-panel@3.22.0`

### Key Changes in Properties Panel

* `FEAT`: move popup editor close button ([bpmn-io/properties-panel#368](https://github.com/bpmn-io/properties-panel/pull/368))
* `FIX`: prevent list group rendering with outdated components ([bpmn-io/properties-panel#369](https://github.com/bpmn-io/properties-panel/pull/369))

## 4.11.0

* `DEPS`: update to `@bpmn-io/properties-panel@3.21.0`
* `DEPS`: update to `bpmn-js@17.8.2`

### Key Changes in Modeling

* `FIX`: do not suggest root elements in search ([bpmn-io/bpmn-js#2143](https://github.com/bpmn-io/bpmn-js/issues/2143))

## 4.10.0

* `DEPS`: update to `@bpmn-io/properties-panel@3.20.0`
* `DEPS`: update to `bpmn-js-element-templates@1.16.0`

### Key Changes in Element Templates

* `FEAT`: support placeholders on String and Text properties ([bpmn-io/bpmn-js-element-templates#92](https://github.com/bpmn-io/bpmn-js-element-templates/issues/92))

## 4.9.0

* `DEPS`: update to `bpmn-js@17.8.1`
* `DEPS`: update to `diagram-js@14.7.1`
* `DEPS`: update to `diagram-js-minimap@5.1.0`
* `DEPS`: update to `bpmn-js-properties-panel@5.17.1`

### Key Changes in Modeling

* `FEAT`: keep global elements when deleting last participant ([bpmn-io/bpmn-js#2175](https://github.com/bpmn-io/bpmn-js/pull/2175))
* `FIX`: allow undo after deleting last participants and data store ([bpmn-io/bpmn-js#1676](https://github.com/bpmn-io/bpmn-js/issues/1676))
* `FIX`: allow styling markers with `canvas.addMarker` and css ([bpmn-io/bpmn-js#2173](https://github.com/bpmn-io/bpmn-js/pull/2173))
* `FIX`: gracefully handle missing process DI in drilldown ([bpmn-io/bpmn-js#2180](https://github.com/bpmn-io/bpmn-js/pull/2180))

### Key Changes in Properties Panel

* `FIX`: correct duplicate `Process Name` ([bpmn-io/bpmn-js-properties-panel#1055](https://github.com/bpmn-io/bpmn-js-properties-panel/pull/1055))

## 4.8.0

* `DEPS`: update to `bpmn-js@17.7.1`
* `DEPS`: update to `bpmn-js-properties-panel@5.17.0`
* `DEPS`: update to `@bpmn-io/properties-panel@3.19.0`

### Key Changes in Modeling

* `FIX`: correct call activity outline ([bpmn-io/bpmn-js#2167](https://github.com/bpmn-io/bpmn-js/issues/2167))
* `FIX`: gracefully handle missing `BPMNDiagram#plane` ([bpmn-io/bpmn-js#2172](https://github.com/bpmn-io/bpmn-js/pull/2172), [bpmn-io/bpmn-js#2171](https://github.com/bpmn-io/bpmn-js/pull/2171))

### Key Changes in Properties Panel

* `FEAT`: add hint for the process ID field in the Camunda 7 ([bpmn-io/bpmn-js-properties-panel#1038](https://github.com/bpmn-io/bpmn-js-properties-panel/issues/1038))
* `FEAT`: drop alphabetic sorting of list entries ([bpmn-io/bpmn-js-properties-panel##1047](https://github.com/bpmn-io/bpmn-js-properties-panel/pull/1047))

## 4.7.0

* `DEPS`: update to `bpmn-js@17.7.0`
* `DEPS`: update to `diagram-js@14.6.0`

### Key Changes in Modeling

* `FEAT`: popup menu header entries can be grouped ([bpmn-io/diagram-js#900](https://github.com/bpmn-io/diagram-js/pull/900))

## 4.6.3

* `DEPS`: update to `bpmn-js-element-templates@1.15.3`

### Key Changes in Modeling

* `FIX`: correctly apply condition depending on boolean on initial load ([bpmn-io/bpmn-js-element-templates#74](https://github.com/bpmn-io/bpmn-js-element-templates/issues/94))

## 4.6.2

* `DEPS`: update to `bpmn-js@17.6.4`
* `DEPS`: update to `diagram-js@14.5.4`

## 4.6.1

* `DEPS`: update to `bpmn-js@17.6.3`
* `DEPS`: update to `diagram-js@14.5.3`

## 4.6.0

* `DEPS`: update to `@bpmn-io/element-template-icon-renderer@0.5.2`
* `DEPS`: update to `bpmn-js@17.6.2`
* `DEPS`: update to `bpmn-js-color-picker@0.7.1`
* `DEPS`: update to `bpmn-js-element-templates@1.15.2`
* `DEPS`: update to `diagram-js@14.5.2`

### Key Changes in Modeling

* `FEAT`: context pad position absolute instead of relative to element ([bpmn-io/diagram-js#888](https://github.com/bpmn-io/diagram-js/pull/888))
* `FEAT`: add ability to type services and events ([bpmn-io/bpmn-js#2121](https://github.com/bpmn-io/bpmn-js/issues/2121), [#2153](https://github.com/bpmn-io/bpmn-js/pull/2153))
* `FEAT`: remove direct editing outline for embedded labels ([bpmn-io/bpmn-js#2147](https://github.com/bpmn-io/bpmn-js/pull/2147))
* `FEAT`: do not translate technical errors ([bpmn-io/bpmn-js#2145](https://github.com/bpmn-io/bpmn-js/pull/2145))
* `FEAT`: do not scale popup menu and context pad ([bpmn-io/diagram-js#883](https://github.com/bpmn-io/diagram-js/pull/883))
* `FEAT`: auto-place elements vertically ([bpmn-io/bpmn-js#2110](https://github.com/bpmn-io/bpmn-js/issues/2110))

## 4.5.1

* `DEPS`: update to `@camunda/example-data-properties-provider@1.2.1`

### Key Changes in Properties Panel

* `FIX`: mark non-object JSON as invalid example data ([example-data-properties-provider#17](https://github.com/camunda/example-data-properties-provider/pull/17))

## 4.5.0

* `DEPS`: update to `bpmn-js-properties-panel@5.14.0`

### Key Changes in Properties Panel

* `FEAT`: add user task implementation tooltip ([bpmn-io/bpmn-js-properties-panel#1032](https://github.com/bpmn-io/bpmn-js-properties-panel/pull/1032))
* `FEAT`: update form selection tooltip ([bpmn-io/bpmn-js-properties-panel#1035](https://github.com/bpmn-io/bpmn-js-properties-panel/pull/1035))

## 4.4.1

* `DEPS`: update to `diagram-js@14.3.1`
* `DEPS`: update to `bpmn-js@17.2.1`

## 4.4.0

* `DEPS`: update to `diagram-js@14.3.0`
* `DEPS`: update to `bpmn-js@17.2.0`

### Key Changes in Modeling

* `FEAT`: make popup menu fully keyboard navigatable ([bpmn-io/diagram-js#871](https://github.com/bpmn-io/diagram-js/issues/871))
* `FIX`: do not trap `TAB` in popup menu ([bpmn-io/diagram-js#874](https://github.com/bpmn-io/diagram-js/pull/874))
* `FIX`: do not trap `Space` and `Enter` on button elements ([bpmn-io/diagram-js#874](https://github.com/bpmn-io/diagram-js/pull/874))
* `FIX`: do not trap click outside of popup menu ([bpmn-io/diagram-js#874](https://github.com/bpmn-io/diagram-js/pull/874))
* `FIX`: show empty placeholder in popup menu when no entries were returned ([bpmn-io/diagram-js#876](https://github.com/bpmn-io/diagram-js/pull/876))

## 4.3.3

* `DEPS`: update to `@bpmn-io/properties-panel@3.18.2`

## 4.3.2

* `DEPS`: update to `bpmn-js-create-append-anything@0.5.1`
* `DEPS` update to `@bpmn-io/variable-resolver@1.2.2`

### Key Changes in Modeling

* `FIX`: use rule to decide whether to show context pad entry for appending ([bpmn-js-create-append-anything#27](https://github.com/bpmn-io/bpmn-js-create-append-anything/pull/27))
* `FIX`: prevent `Maximum call stack size exceeded` in variable resolver ([@bpmn-io/variable-resolver#30](https://github.com/bpmn-io/variable-resolver/pull/30))

## 4.3.1

* `DEPS`: update to `bpmn-js-element-templates@1.14.1`

### Key Changes in Element Templates

* `FIX`: disallow non-string values for `feel: required` properties ([bpmn-js-element-templates#70](https://github.com/bpmn-io/bpmn-js-element-templates/issues/70))

## 4.3.0

* `DEPS`: update to `zeebe-bpmn-moddle@1.1.0`
* `DEPS`: update to `camunda-bpmn-js-behaviors@1.3.0`
* `DEPS`: update to `bpmn-js-properties-panel@5.13.0`

### Key Changes in Properties Panel

* `FEAT`: support zeebe:userTask ([bpmn-io/bpmn-js-properties-panel#1026](https://github.com/bpmn-io/bpmn-js-properties-panel/pull/1026))

## 4.2.0

* `DEPS`: update to `bpmn-js-properties-panel@5.12.0`

### Key Changes in Properties Panel

* `FEAT`: show Camunda 7 HTTL hint

## 4.1.1

* `DEPS`: update to `bpmn-js-properties-panel@5.11.2`

### Key Changes in Properties Panel

* `FIX`: correct retires tooltip ([bpmn-io/bpmn-js-properties-panel#1029](https://github.com/bpmn-io/bpmn-js-properties-panel/pull/1029))
* `FIX`: do not offer output mapping for terminate end event ([bpmn-io/bpmn-js-properties-panel#1027](https://github.com/bpmn-io/bpmn-js-properties-panel/pull/1027))

## 4.1.0

* `DEPS`: update to `bpmn-js-element-templates@1.14.0`
* `DEPS`: update to `bpmn-js@17.0.2`
* `DEPS`: update to `diagram-js@14.1.0`

### Key Changes in Element Templates

* `FEAT`: always display `documentation` field in Camunda 7 diagrams ([bpmn-io/bpmn-js-element-templates#67](https://github.com/bpmn-io/bpmn-js-element-templates/pull/67))
* `FEAT`: always display `multi-instance` group in Camunda 7 diagrams ([bpmn-io/bpmn-js-element-templates#68](https://github.com/bpmn-io/bpmn-js-element-templates/pull/68))
* `FEAT`: allow `Boolean` and `Number` types in Camunda 8 diagrams ([bpmn-io/bpmn-js-element-templates#64](https://github.com/bpmn-io/bpmn-js-element-templates/pull/64))

### Key Changes in Modeling

* `FEAT`: add `PopupMenu#refresh` method ([bpmn-io/diagram-js#804](https://github.com/bpmn-io/diagram-js/issues/804))

## 4.0.0

* `DEPS`: update to `lezer-feel@1.2.6`
* `DEPS`: update to `bpmn-js-element-templates@1.13.2`
* `DEPS`: update to `bpmn-js@17.0.0`
* `DEPS`: update to `diagram-js@14.0.0`

### Breaking Changes

* Migrated to `diagram-js@14` / `bpmn-js@17` which removes touch interaction module, and dependency on unsupported `hammerjs` package. If you rely on touch interaction, you need to support touch interaction on your own.

### Key Changes in Modeling

* `FEAT`: add to selection through SHIFT ([bpmn-io/diagram-js#796](https://github.com/bpmn-io/diagram-js/pull/851), [#2053](https://github.com/bpmn-io/bpmn-js/issues/2053))
* `FEAT`: allow to provide custom popup menu empty state ([bpmn-io/diagram-js#847](https://github.com/bpmn-io/diagram-js/pull/847), [#322](https://github.com/camunda/camunda-bpmn-js/issues/322))
* `CHORE`: remove broken touch interaction ([bpmn-io/diagram-js#796](https://github.com/bpmn-io/diagram-js/issues/796))

### Key Changes in Element Templates

* `FIX`: apply all chained conditional properties ([bpmn-js-element-templates#49](https://github.com/bpmn-io/bpmn-js-element-templates/issues/49))

### Key Changes in Properties Panel

* `FIX`: adjust FEEL parsing to accept certain broken expressions ([camunda-modeler#4073](https://github.com/camunda/camunda-modeler/issues/4073))

## 3.13.0

* `DEPS`: update to `bpmn-js@16.4.0`
* `DEPS`: update to `@bpmn-io/variable-resolver@1.2.1`
* `DEPS`: update to `bpmn-js-properties-panel@5.11.1`
* `DEPS`: update to `@bpmn-io/properties-panel@3.18.1`
* `DEPS`: update to `camunda-bpmn-js-behaviors@1.2.3`
* `DEPS`: update to `bpmn-js-element-templates@1.13.1`

### Key Changes in Modeling

* `FEAT`: allow text annotations to overlap with the borders of subprocesses and pools ([bpmn-io/bpmn-js#2049](https://github.com/bpmn-io/bpmn-js/issues/2049))
* `FIX`: support core replace in compensation behavior ([bpmn-io/bpmn-js#2073](https://github.com/bpmn-io/bpmn-js/issues/2073))
* `FIX`: do not set label on planes ([bpmn-io/bpmn-js#2033](https://github.com/bpmn-io/bpmn-js/issues/2033))

### Key Changes in Properties Panel

* `FEAT`: improve Camunda 7 variable events tooltip ([#1016](https://github.com/bpmn-io/bpmn-js-properties-panel/pull/1016))
* `FEAT`: simplify FEEL editor external error ([bpmn-io/properties-panel#97](https://github.com/camunda/linting/pull/97))
* `FEAT`: remove unnecessary resizer ([bpmn-io/bpmn-js-properties-panel@`b2f6752`](https://github.com/bpmn-io/properties-panel/commit/b2f6752de3827384452d4b4c0b27bd269b7b5ad4))
* `FEAT`: display element template icon found in XML ([bpmn-io/bpmn-js-properties-panel#1011](https://github.com/bpmn-io/bpmn-js-properties-panel/issues/1011))
* `FEAT`: align zeebe input propagation label and tooltip ([bpmn-io/bpmn-js-properties-panel@`5d8bd68`](https://github.com/bpmn-io/bpmn-js-properties-panel/commit/5d8bd6846efcbbc7c67322df5a6c6fe28d63fb9b))
* `FEAT`: allow tooltip re-usability ([bpmn-io/properties-panel#321](https://github.com/bpmn-io/properties-panel/pull/321))
* `FEAT`: word wrap FEEL expressions, textarea style ([bpmn-io/properties-panel#319](https://github.com/bpmn-io/properties-panel/pull/319))
* `FEAT`: always show documentation field ([bpmn-io/bpmn-js-element-templates#50](https://github.com/bpmn-io/bpmn-js-element-templates/pull/50))
* `FIX`: attach popup editor toggle to the top ([bpmn-io/bpmn-js-properties-panel@`e6681f7`](https://github.com/bpmn-io/properties-panel/commit/e6681f74ad6268c8f533a721351bdeea376dac26))
* `FIX`: close popup editor when properties panel gets detached ([bpmn-io/bpmn-js-properties-panel@`7defc52`](https://github.com/bpmn-io/properties-panel/commit/7defc525400c62f253651cda589fe2f5058518a6))
* `FIX`: close popup editor when source component gets unmounted ([bpmn-io/bpmn-js-properties-panel@`1fa3330`](https://github.com/bpmn-io/properties-panel/commit/1fa3330ebdcbc7c0ac405a49eb510817fc3aa71c))
* `FIX`: correct re-validation of entries when validator changes ([bpmn-io/bpmn-js-properties-panel@`e93e986`](https://github.com/bpmn-io/properties-panel/commit/e93e986573d32adc361c64a1bc53cf1e38454715))
* `FIX`: show scrollbars in popup editor ([bpmn-io/properties-panel#319](https://github.com/bpmn-io/properties-panel/pull/319))

### Key Changes in Element Templates

* `FEAT`: validate text area and select ([bpmn-io/bpmn-js-element-templates#55](https://github.com/bpmn-io/bpmn-js-element-templates/issues/55))

### Misc Changes

* `FIX`: drop unnecessary variable propagation behavior ([camunda/camunda-bpmn-js-behaviors#57](https://github.com/camunda/camunda-bpmn-js-behaviors/pull/57))
* `FIX`: prevent infinite loop when suggesting variables ([bpmn-io/variable-resolver#23](https://github.com/bpmn-io/variable-resolver/pull/23))

## 3.12.1

* `DEPS`: update to `bpmn-js@16.3.1`

### Key Changes in Modeling

* `FIX`: do not remove connection that is being created when pasting compensation boundary event and handler ([bpmn-io/bpmn-js#2069](https://github.com/bpmn-io/bpmn-js/pull/2069))

## 3.12.0

* `DEPS`: update to `bpmn-js@16.3.0`
* `DEPS`: update to `bpmn-js-properties-panel@5.7.0`
* `DEPS`: update to `bpmn-js-color-picker@0.7.0`
* `DEPS`: update to `@bpmn-io/form-variable-provider@1.3.0`
* `DEPS`: update to `bpmn-js-create-append-anything@0.5.0`

### Key Changes in Modeling

* `FEAT`: simplify compensation modeling ([bpmn-io/bpmn-js#2038](https://github.com/bpmn-io/bpmn-js/issues/2038))

### Key Changes in Properties Panel

* `FEAT`: capitalize `Camunda Form` ([bpmn-io/bpmn-js-properties-panel#1005](https://github.com/bpmn-io/bpmn-js-properties-panel/issues/1005))
* `FEAT`: improve FEEL popup editor icon ([bpmn-io/properties-panel#310](https://github.com/bpmn-io/properties-panel/issues/310))
* `FEAT`: add contextual keyword completion in FEEL editor
* `FIX`: correct parsing of nested lists in FEEL editor
* `FIX`: correct parsing of incomplete `QuantifiedExpression` in FEEL editor
* `FIX`: only allow legal `Name` start characters in FEEL editor

## 3.11.0

* `DEPS`: update to `bpmn-js@16.0.0`
* `DEPS`: update to `bpmn-js-element-templates@1.10.0`
* `DEPS`: update to `diagram-js@13.3.0`

### Key Changes in Modeling

* `FEAT`: render vertical pools and lanes ([bpmn-io/bpmn-js#2024](https://github.com/bpmn-io/bpmn-js/pull/2024))
* `FEAT`: sentence case titles and labels ([bpmn-io/bpmn-js#2023](https://github.com/bpmn-io/bpmn-js/issues/2023))
* `FEAT`: allow non-searchable entries in popup menu ([bpmn-io/diagram-js#835](https://github.com/bpmn-io/diagram-js/pull/835))
* `FIX`: ensure all error translations are collected ([bpmn-io/bpmn-js#2040](https://github.com/bpmn-io/bpmn-js/pull/2040))

### Key Changes in Element Templates

* `FEAT`: support `zeebe:calledElement` binding ([bpmn-io/bpmn-js-element-templates#37](https://github.com/bpmn-io/bpmn-js-element-templates/pull/37))

## 3.10.2

### Key Changes in Element Templates

* `FIX`: keep custom value on update when the condition was changed ([bpmn-js-element-templates#32](https://github.com/bpmn-io/bpmn-js-element-templates/issues/32))
* `DEPS`: update to `bpmn-js-element-templates@1.9.2`

## 3.10.1

* `FIX`: remove unneeded `camunda-cloud` rules ([#325](https://github.com/camunda/camunda-bpmn-js/pull/325))
* `FIX`: remove unused `typescript` prod dependency ([#326](https://github.com/camunda/camunda-bpmn-js/pull/326))

## 3.10.0

* `DEPS`: update to `@bpmn-io/form-variable-provider@1.2.0`
* `DEPS`: update to `bpmn-js@15.2.2`
* `DEPS`: update to `bpmn-js-element-templates@1.9.1`
* `DEPS`: update to `diagram-js@12.8.1`

### Key Changes in Modeling

* `FEAT`: remove selection outline from connections ([diagram-js#826](https://github.com/bpmn-io/diagram-js/pull/826))
* `FEAT`: position context pad according to last waypoint for connections ([diagram-js#826](https://github.com/bpmn-io/diagram-js/pull/826))
* `FIX`: prevent access of non-existing connection bounds ([diagram-js#824](https://github.com/bpmn-io/diagram-js/pull/824))
* `FIX`: correct selection outline size for end event ([#2026](https://github.com/bpmn-io/bpmn-js/pull/2026))

### Key Changes in Element Templates

* `FEAT`: support `isActive` condition ([bpmn-js-element-templates#19](https://github.com/bpmn-io/bpmn-js-element-templates/issues/19))
* `FEAT`: add conditional `correlationKey` rendering ([bpmn-js-element-templates#19](https://github.com/bpmn-io/bpmn-js-element-templates/issues/19))
* `FIX`: disallow subscription binding for `bpmn:SendTask`

## 3.9.0

* `DEPS`: update to `bpmn-js-element-templates@1.8.0`

### Key Changes in Element Templates

* `FEAT`: support receive and send task message templating ([bpmn-io/bpmn-js-element-templates#30](https://github.com/bpmn-io/bpmn-js-element-templates/pull/30))

## 3.8.0

* `DEPS`: update to `bpmn-js@15.1.3`
* `DEPS`: update to `diagram-js@12.7.2`
* `DEPS`: update to `bpmn-js-element-templates@1.7.0`

### Key Changes in Modeling

* `FEAT`: add toggle for non-interrupting events ([bpmn-io/bpmn-js#2000](https://github.com/bpmn-io/bpmn-js/pull/2000))
* `FEAT`: keep events non-interrupting when using `bpmnReplace` by default ([bpmn-io/bpmn-js#2000](https://github.com/bpmn-io/bpmn-js/pull/2000))

### Key Changes in Element Templates

* `FEAT`: support `zeebe:taskDefinition` binding ([bpmn-io/bpmn-js-element-templates#29](https://github.com/bpmn-io/bpmn-js-element-templates/pull/29))

## 3.7.0

* `DEPS`: update to `bpmn-js@15.0.0`
* `DEPS`: update to `camunda-bpmn-js-behaviors@1.2.2`
* `DEPS`: update to `@bpmn-io/properties-panel@3.13.0`

### Key Changes in Modeling

* `FEAT`: preview append on hover ([bpmn-io/bpmn-js#1985](https://github.com/bpmn-io/bpmn-js/pull/1985))
* `FEAT`: align selection outline with element's shape ([bpmn-io/bpmn-io/bpmn-js#1996](https://github.com/bpmn-io/bpmn-js/pull/1985))
* `FEAT`: make space tool local per default ([bpmn-io/diagram-js#811](https://github.com/bpmn-io/diagram-js/pull/811), [bpmn-io/bpmn-js#1975](https://github.com/bpmn-io/bpmn-js/issues/1975))

### Key Changes in Properties Panel

* `FEAT`: add link to learning resources from the FEEL popup editor ([@bpmn-io/properties-panel#308](https://github.com/bpmn-io/properties-panel/pull/308))
* `CHORE`: update FEEL snippets ([bpmn-io/feel-editor#45](https://github.com/bpmn-io/feel-editor/pull/45))

## 3.6.1

* `DEPS`: update to `bpmn-js-element-templates@1.6.1`

### Key Changes in Element Templates

* `FIX`: display multi-instance configuration in properties panel ([bpmn-io/bpmn-js-element-templates#27](https://github.com/bpmn-io/bpmn-js-element-templates/pull/27))

## 3.6.0

* `DEPS`: update to `bpmn-js-element-templates@1.6.0`
* `DEPS`: update to `@bpmn-io/properties-panel@3.11.0`
* `DEPS`: update to `bpmn-js-properties-panel@5.6.0`

### Key Changes in Element Templates

* `FEAT`: add `zeebe:subscription` in single command ([bpmn-io/bpmn-js-element-templates#21](https://github.com/bpmn-io/bpmn-js-element-templates/issues/21))
* `FEAT`: support `camunda:executionListener` with `implementationType` ([bpmn-io/bpmn-js-element-templates#13](https://github.com/bpmn-io/bpmn-js-element-templates/issues/13))
* `FIX`: clean up empty `zeebe:subscription` ([bpmn-io/bpmn-js-element-templates#21](https://github.com/bpmn-io/bpmn-js-element-templates/issues/21))
* `FIX`: set `$parent` property when creating non-primitive properties ([bpmn-io/bpmn-js-element-templates#22](https://github.com/bpmn-io/bpmn-js-element-templates/pull/22))

### Key Changes in Properties Panel

* `FEAT`: support Camunda 8 form reference ([bpmn-io/bpmn-js-properties-panel#978](https://github.com/bpmn-io/bpmn-js-properties-panel/pull/978), [bpmn-io/bpmn-js-properties-panel#949](https://github.com/bpmn-io/bpmn-js-properties-panel/issues/949))
* `FEAT`: allow `PopupContainer` to be a CSS selector ([bpmn-io/properties-panel#291](https://github.com/bpmn-io/properties-panel/issues/291))
* `FEAT`: improve suggestion of local variables ([bpmn-io/bpmn-js-properties-panel#984](https://github.com/bpmn-io/bpmn-js-properties-panel/pull/984))
* `FIX`: add error style to popup editor opened fields ([bpmn-io/properties-panel#298](https://github.com/bpmn-io/properties-panel/pull/298))
* `FIX`: allow value `0` in FEEL number fields ([bpmn-io/properties-panel#297](https://github.com/bpmn-io/properties-panel/pull/297))
* `FIX`: keep undo/redo stack when editing Camunda input/output properties ([bpmn-io/bpmn-js-properties-panel#983](https://github.com/bpmn-io/bpmn-js-properties-panel/pull/983))

## 3.5.0

* `DEPS`: update to `camunda-bpmn-js-behaviors@1.2.1`

### Key Changes in Modeling

* `FEAT`: ensure that only one type of form is set at a time ([bpmn-io/bpmn-js-properties-panel](https://github.com/bpmn-io/bpmn-js-properties-panel/issues/949))
* `FEAT`: remove `zeebe:subscription` when no properties are left ([bpmn-io/bpmn-js-element-templates](https://github.com/bpmn-io/bpmn-js-element-templates/issues/21))

## 3.4.0

* `DEPS`: update to `bpmn-js-properties-panel@5.5.0`
* `DEPS`: update to `@bpmn-io/properties-panel@3.8.0`

### Key Changes in Properties Panel

* `FEAT`: improve FEEL popup lifecycle events ([bpmn-io/properties-panel#294](https://github.com/bpmn-io/properties-panel/pull/294))
* `FEAT`: add drag trap to popup component ([bpmn-io/properties-panel#289](https://github.com/bpmn-io/properties-panel/issues/289))
* `FEAT`: allow listen to `feelPopup.dragstart`, `feelPopup.dragover` and `feelPopup.dragend` events ([bpmn-io/properties-panel#299](https://github.com/bpmn-io/properties-panel/pull/292))
* `FEAT`: allow listen to `feelPopup.opened` and `feelPopup.closed` events ([bpmn-io/bpmn-js-properties-panel#974](https://github.com/bpmn-io/bpmn-js-properties-panel/issues/974))
* `FEAT`: provide `feelPopup` module to interact with FEEL popup ([bpmn-io/bpmn-js-properties-panel#974](https://github.com/bpmn-io/bpmn-js-properties-panel/issues/974))
* `FEAT`: prioritize externally provided errors ([bpmn-io/properties-panel@`375838b7`](https://github.com/bpmn-io/properties-panel/commit/375838b7c82b559a579792a46479592efcd5f500))
* `FEAT`: specify FEEL popup container via `propertiesPanel.feelPopupContainer` ([bpmn-io/properties-panel#970](https://github.com/bpmn-io/bpmn-js-properties-panel/pull/970))
* `FIX`: correct FEEL popup editor closing during auto-suggest ([bpmn-io/properties-panel#279](https://github.com/bpmn-io/properties-panel/issues/279))
* `FIX`: contain keyboard events within the FEEL popup editor ([bpmn-io/properties-panel@`a8dd384`](https://github.com/bpmn-io/properties-panel/commit/a8dd384ad625adb03272a9bc2e25fc4aab7bb284))

## 3.3.1

* `DEPS`: update to `bpmn-js-properties-panel@5.2.0`

## 3.3.0

* `DEPS`: update to `bpmn-js@14.0.0`

### Key Changes in Modeling

* `FEAT`: do not hide overlays on canvas move per default ([bpmn-io/diagram-js#798](https://github.com/bpmn-io/diagram-js/issues/798))
* `FEAT`: translate _Append TextAnnotation_ context pad action ([bpmn-io/bpmn-js#1932](https://github.com/bpmn-io/bpmn-js/pull/1932))
* `FIX`: allow to create connection + event-based gateway ([bpmn-io/bpmn-js#1490](https://github.com/bpmn-io/bpmn-js/issues/1490))
* `FIX`: make breadcrumb styling more robust ([bpmn-io/bpmn-js#1945](https://github.com/bpmn-io/bpmn-js/pull/1945))
* `FIX`: correct copy of default sequence flow elements ([bpmn-io/bpmn-js#1935](https://github.com/bpmn-io/bpmn-js/issues/1935))
* `CHORE`: drop deprecated callback support from public API
* `CHORE`: drop deprecated `import.parse.complete` event member `context`

## 3.2.0

* `DEPS`: update to `bpmn-js-create-append-anything@0.4.0`
* `DEPS`: update to `bpmn-js-element-templates@1.4.0`
* `DEPS`: update to `bpmn-js-properties-panel@5.1.0`
* `DEPS`: update to `@bpmn-io/properties-panel@3.4.0`

### Key Changes in Modeling

* `FEAT`: move "Call Activity" to "Sub Processes" group in options menu ([bpmn-js-create-append-anything#14](https://github.com/bpmn-io/bpmn-js-create-append-anything/pull/14))

### Key Changes in Properties Panel

* `FEAT`: add _Input propagation_ group ([bpmn-js-properties-panel#954](https://github.com/bpmn-io/bpmn-js-properties-panel/pull/954))
* `FEAT`: visually show deprecated templates in properties panel ([bpmn-js-element-templates#11](https://github.com/bpmn-io/bpmn-js-element-templates/issues/11))
* `FEAT`: suggest variables from form schema ([form-variable-provider#1](https://github.com/bpmn-io/form-variable-provider/pull/1))
* `CHORE`: example data is no longer scoped to the element that defines it ([example-data-properties-provider#13](https://github.com/camunda/example-data-properties-provider/pull/13))

## 3.1.2

* `DEPS`: update to `@bpmn-io/properties-panel@3.3.2`

## 3.1.1

* `DEPS`: update to `bpmn-js-properties-panel@5.0.0`

### Key Changes in Properties Panel

* `FEAT`: add FEEL popup editor ([bpmn-io/properties-panel#265](https://github.com/bpmn-io/properties-panel/pull/265))
* `FIX`: remove output group from error end events ([bpmn-js-properties-panel#952](https://github.com/bpmn-io/bpmn-js-properties-panel/pull/952), [camunda-bpmn-js-behaviors#42](https://github.com/camunda/camunda-bpmn-js-behaviors/pull/42))
* `FIX`: correct `properties-panel.css` ([#298](https://github.com/camunda/camunda-bpmn-js/pull/298))

## 3.1.0

* `DEPS`: update to `bpmn-js-properties-panel@4.0.2`
* `DEPS`: update to `bpmn-js-color-picker@0.6.1`
* `DEPS`: update to `bpmn-js-element-templates@1.2.2`
* `DEPS`: update to `bpmn-js-executable-fix@0.2.1`

### Key Changes in Properties Panel

* `FEAT`: migrate long descriptions and descriptions with documentation links to tooltips ([bpmn-js-properties-panel#946](https://github.com/bpmn-io/bpmn-js-properties-panel/pull/946), [#293](https://github.com/camunda/camunda-bpmn-js/pull/293))
* `FEAT`: allow to set tooltips via context ([bpmn-js-properties-panel#946](https://github.com/bpmn-io/bpmn-js-properties-panel/pull/946))
* `FIX`: allow removing templates from root elements ([bpmn-js-element-templates#7](https://github.com/bpmn-io/bpmn-js-element-templates/pull/7))

## 3.0.0

* `DEPS`: update to `bpmn-js-create-append-anything@0.3.0`
* `DEPS`: update to `bpmn-js-element-templates@1.2.0`
* `DEPS`: update to `bpmn-js-properties-panel@3.0.0`
* `DEPS`: update to `bpmn-js@13.2.2`

### Key changes in Modeling

* `FEAT`: base BPMN element entry in replace menu removes element template instead of unlinking it ([bpmn-js-create-append-anything#11](https://github.com/bpmn-io/bpmn-js-create-append-anything/pull/11))
* `FEAT`: add `ElementTemplates#unlinkTemplate` and `ElementTemplates#removeTemplate` API ([bpmn-js-properties-panel#935](https://github.com/bpmn-io/bpmn-js-properties-panel/pull/935))
* `FEAT`: invalid element template values are now persisted
* `FIX`: remove old element template properties ([bpmn-io/bpmn-js-element-templates#4](https://github.com/bpmn-io/bpmn-js-element-templates/pull/4))
* `FIX`: do not vertically resize empty pools using the space tool ([bpmn-io/bpmn-js#1769](https://github.com/bpmn-io/bpmn-js/issues/1769))

### Breaking Changes

* Invalid element template values are now persisted.
* Replacing a custom element with a stock BPMN element now removes the template, rather than unlinking it.

## 2.7.0

* `DEPS`: update to `bpmn-js-color-picker@0.6.0`
* `DEPS`: update to `diagram-js@12.2.0`
* `DEPS`: update to `bpmn-js-create-append-anything@0.2.1`
* `DEPS`: update to `bpmn-js-properties-panel@2.0.0`

### Key Changes in Properties Panel

* `FEAT`: remove templated `bpmn:Message` if no message bindings are active ([bpmn-js-properties-panel#915](https://github.com/bpmn-io/bpmn-js-properties-panel/issues/915))
* `FEAT`: allow time date in boundary and intermediate catch events ([bpmn-js-properties-panel#931](https://github.com/bpmn-io/bpmn-js-properties-panel/pull/931))

## 2.6.1

* `DEPS`: update to `@bpmn-io/element-template-icon-renderer@0.5.1`

### Key changes in Modeling

* `FIX`: intermediate catch and throw events with icons render successfully ([bpmn-io/element-template-icon-renderer#16](https://github.com/bpmn-io/element-template-icon-renderer/pull/16))

## 2.6.0

* `DEPS`: update to `bpmn-js-properties-panel@1.26.0`

### Key changes in Properties panel

* `FEAT`: change FEEL entry toggle

## 2.5.0

* `DEPS`: update to `@bpmn-io/element-template-icon-renderer@0.5.0`
* `DEPS`: update to `bpmn-js@12.1.0`
* `DEPS`: update to `bpmn-js-properties-panel@1.25.0`
* `DEPS`: update to `diagram-js@12.1.0`
* `DEPS`: update to `create-append-anything@0.2.0`

### Key changes in Modeling

* `FEAT`: support icons on all events ([@bpmn-io/element-template-icon-renderer#14](https://github.com/bpmn-io/element-template-icon-renderer/pull/14))
* `FEAT`: allow event rendering without icons ([bpmn-js#1917](https://github.com/bpmn-io/bpmn-js/pull/1917))

### Key changes in Properties panel

* `FEAT`: add _Inputs_ group for signal intermediate throw and end events ([bpmn-js-properties-panel911](https://github.com/bpmn-io/bpmn-js-properties-panel/pull/911))
* `FEAT`: change signal Name entry to optional FEEL entry ([bpmn-js-properties-panel#911](https://github.com/bpmn-io/bpmn-js-properties-panel/pull/911))
* `FEAT`: validate custom dropdown and textArea entries ([bpmn-js-properties-panel#922](https://github.com/bpmn-io/bpmn-js-properties-panel/pull/922))
* `FIX`: allow to configure variable events for conditional start event in event subprocess ([bpmn-js-properties-panel#925](https://github.com/bpmn-io/bpmn-js-properties-panel/pull/925))
* `FIX`: unlink templated message instead of removing ([bpmn-js-properties-panel#914](https://github.com/bpmn-io/bpmn-js-properties-panel/pull/914))
* `FIX`: handle undefined values in custom properties validator ([bpmn-js-properties-panel#926](https://github.com/bpmn-io/bpmn-js-properties-panel/pull/926))

## 2.4.0

* `DEPS`: update to `@bpmn-io/variable-resolver@1.1.0`

### Key changes in Properties panel

* `FEAT`: variable suggestions take the expression position into account ([@bpmn-io/variable-resolver#19](https://github.com/bpmn-io/variable-resolver/pull/19))
* `FIX`: handle missing `resultExpression` value ([@bpmn-io/variable-resolver#20](https://github.com/bpmn-io/variable-resolver/pull/20))

## 2.3.1

* `DEPS`: update to `bpmn-js-properties-panel@1.22.1`
* `DEPS`: update to `@bpmn-io/variable-resolver@1.0.1`
* `DEPS`: update to `@camunda/example-data-properties-provider@1.1.1`

### Key changes in Properties panel

* `FIX`: link to latest doc page ([example-data-properties-provider#12](https://github.com/camunda/example-data-properties-provider/pull/12))
* `FIX`: support empty variable mappings in connectors ([variable-resolver#18](https://github.com/bpmn-io/variable-resolver/pull/18))

## 2.3.0

* `FIX`: resolve connector variable mappings ([#265](https://github.com/camunda/camunda-bpmn-js/issues/265))
* `DEPS`: update to `bpmn-js-properties-panel@1.22.0`
* `DEPS`: update dependency zeebe-bpmn-moddle to ^0.19.0

### Key changes in Properties panel

* `FEAT`: support `bpmn:Message` templating in events ([bpmn-js-properties-panel#890](https://github.com/bpmn-io/bpmn-js-properties-panel/issues/890))
* `FEAT`: support `generatedValue` in templates ([bpmn-js-properties-panel#890](https://github.com/bpmn-io/bpmn-js-properties-panel/issues/890))
* `FEAT`: suggest variables for templates properties ([bpmn-js-properties-panel#904](https://github.com/bpmn-io/bpmn-js-properties-panel/issues/904))
* `FEAT`: support multiple output mappings for the same variable ([variable-resolver#15](https://github.com/bpmn-io/variable-resolver/pull/15))
* `FEAT`: suggest variables from connector mappings ([#265](https://github.com/camunda/camunda-bpmn-js/issues/265))
* `FEAT`: format example data preview ([example-data-properties-provider#10](https://github.com/camunda/example-data-properties-provider/pull/10))
* `FIX`: separate Camunda 7 and BPMN concerns in Timer Props ([bpmn-js-properties-panel#910](https://github.com/bpmn-io/bpmn-js-properties-panel/issues/910))
* `CHORE`: rename `Data` Group to `Example Data` ([example-data-properties-provider#11](https://github.com/camunda/example-data-properties-provider/pull/11))
* `CHORE`: example data is scoped to the element that defines it ([example-data-properties-provider#8](https://github.com/camunda/example-data-properties-provider/pull/8))

## 2.2.0

* `FEAT`: add type declarations for all viewers and modelers ([#271](https://github.com/camunda/camunda-bpmn-js/pull/271))
* `FEAT`: integrate `bpmn-js@13` including type declarations ([`cae78d2`](https://github.com/camunda/camunda-bpmn-js/commit/cae78d247f8f13ab1ee941d7a7a5be4893a1837f))
* `DEPS`: update to `bpmn-js@13.0.4`
* `DEPS`: update to `diagram-js@12.0.2`

## 2.1.1

* `FIX`: add create and append menus to platform modeler ([#268](https://github.com/camunda/camunda-bpmn-js/pull/268))

## 2.1.0

* `DEPS`: add `@camunda/example-data-properties-provider@1.0.1`
* `DEPS`: update to `@bpmn-io/properties-panel@1.6.2`
* `DEPS`: update to `bpmn-js@12.0.0`
* `DEPS`: update to `diagram-js@11.12.0`
* `DEPS`: update to `bpmn-js-properties-panel@1.20.3`

### Key changes in Modeling

* `FEAT`: allow adding example data to elements in cloud modeler ([#264](https://github.com/camunda/camunda-bpmn-js/pull/264))
* `FEAT`: add visual grid to editors ([#266](https://github.com/camunda/camunda-bpmn-js/pull/266))

### Key changes in Properties panel

* `FIX`: ensure element template properties order is maintained ([bpmn-js-properties-panel##898](https://github.com/bpmn-io/bpmn-js-properties-panel/pull/898))
* `FIX`: only provide external variable suggestions in fields backed by IO mappings ([bpmn-io/bpmn-js-properties-panel#902](https://github.com/bpmn-io/bpmn-js-properties-panel/pull/902))

## 2.0.2

* `FIX`: integrate `@bpmn-io/element-template-chooser` styles ([#258](https://github.com/camunda/camunda-bpmn-js/pull/258))

## 2.0.1

* `FIX`: make `@bpmn-io/element-template-chooser` a production dependency

## 2.0.0

* `FEAT`: remove integration support for [connectors extension](https://github.com/bpmn-io/bpmn-js-connectors-extension) ([#255](https://github.com/camunda/camunda-bpmn-js/pull/255))
* `FEAT`: provide [element template chooser](https://github.com/bpmn-io/element-template-chooser) ([#255](https://github.com/camunda/camunda-bpmn-js/pull/255))

### Breaking Changes

* `element-template-chooser` is now provided by default. To disable this, please use the `elementTemplatesChooser` option and set it to `false`.
* No longer ensures interoperability with `bpmn-js-connectors-extension`. This release replaces the connectors extension.

## 1.5.0

* `FEAT`: allow external variable providers to be added ([variable-resolver#1](https://github.com/bpmn-io/variable-resolver/pull/1))
* `DEPS`: update to `bpmn-js@11.5.1`
* `DEPS`: update to `bpmn-js-properties-panel@1.19.1`
* `FEAT`: update to `@camunda/linting@0.16.0`

### Key changes in Modeling

* `FIX`: restore undo/redo behavior for german keyboard layout ([diagram-js#749](https://github.com/bpmn-io/diagram-js/pull/749))

### Key changes in Properties panel

* `FEAT`: element templates support properties with multiple conditions ([bpmn-js-properties-panel#884](https://github.com/bpmn-io/bpmn-js-properties-panel/pull/884))
* `FIX`: conditional props are applied when creating elements from element templates ([bpmn-js-properties-panel#878](https://github.com/bpmn-io/bpmn-js-properties-panel/pull/878))
* `FIX`: correct order of variable name and FEEL expression in Script Tasks ([bpmn-js-properties-panel#886](https://github.com/bpmn-io/bpmn-js-properties-panel/pull/886))
* `FIX`: enforce minimum Textarea height ([properties-panel#220](https://github.com/bpmn-io/properties-panel/pull/220))

## 1.4.0

* `DEPS`: update to bpmn-js\@11.4.0

### Key changes in Modeling

* `FEAT`: provide templates as append menu entries ([#242](https://github.com/camunda/camunda-bpmn-js/pull/242))
* `FEAT`: provide templates as create menu entries ([#246](https://github.com/camunda/camunda-bpmn-js/pull/246))
* `FEAT`: activate direct editing on participant creation ([bpmn-js#1845](https://github.com/bpmn-io/bpmn-js/pull/1845))
* `FIX`: dragging append menu entries creates element connection ([bpmn-js#1843](https://github.com/bpmn-io/bpmn-js/pull/1843), [#247](https://github.com/camunda/camunda-bpmn-js/pull/247))
* `FIX`: append shortcut triggers create menu if append not allowed ([bpmn-js#1840](https://github.com/bpmn-io/bpmn-js/pull/1840))

## 1.3.1

* `FIX`: correct create menu position in palette
* `DEPS`: update to `bpmn-js@11.3.1`

## 1.3.0

* `FEAT`: add create-append-anything with feature toggle ([#236](https://github.com/camunda/camunda-bpmn-js/issues/236))
* `DEPS`: update to `bpmn-js@11.3.0`
* `DEPS`: update to `diagram-js@11.9.0`
* `DEPS`: update to `bpmn-js-properties-panel@1.17.1`

### Key changes in Modeling

* `FEAT`: feature `service` and `user` tasks more prominently in replace menu ([#1836](https://github.com/bpmn-io/bpmn-js/pull/1836))
* `FEAT`: hide rare items initially from create/append menus ([#1836](https://github.com/bpmn-io/bpmn-js/pull/1836))
* `FEAT`: retrieve instantiation modules with context ([#1835](https://github.com/bpmn-io/bpmn-js/pull/1835))
* `FEAT`: append menu available via context pad ([#1802](https://github.com/bpmn-io/bpmn-js/pull/1802), [#1809](https://github.com/bpmn-io/bpmn-js/pull/1809), [#1815](https://github.com/bpmn-io/bpmn-js/pull/1815), [#1818](https://github.com/bpmn-io/bpmn-js/pull/1818), [#1831](https://github.com/bpmn-io/bpmn-js/pull/1831))
* `FEAT`: create menu available via palette ([#1811](https://github.com/bpmn-io/bpmn-js/pull/1811), [#1809](https://github.com/bpmn-io/bpmn-js/pull/1809), [#1817](https://github.com/bpmn-io/bpmn-js/pull/1817))
* `FEAT`: simplify connection-multi icon ([#1822](https://github.com/bpmn-io/bpmn-js/pull/1822))
* `FEAT`: join paths `round` by default ([1827](https://github.com/bpmn-io/bpmn-js/pull/1827))
* `FEAT`: improved BPMN symbol rendering ([#1830](https://github.com/bpmn-io/bpmn-js/pull/1830))
* `FEAT`: round connection corners ([#1828](https://github.com/bpmn-io/bpmn-js/pull/1828))

### Key changes in Properties panel

* `FEAT`: Camunda 8 template properties can have `language` property ([bpmn-js-properties-panel#869](https://github.com/bpmn-io/bpmn-js-properties-panel/pull/869))
* `FEAT`: Camunda 8 template properties of type `Text` are resizable text areas ([bpmn-js-properties-panel#870](https://github.com/bpmn-io/bpmn-js-properties-panel/pull/870))

## 1.2.0

* `FEAT`: minimap works with touch ([#54](https://github.com/bpmn-io/diagram-js-minimap/pull/54))
* `DEPS`: update to `diagram-js-minimap@4.0.1`
* `DEPS`: update to `diagram-js@11.6.0`
* `DEPS`: update to `bpmn-js-properties-panel@1.16.0`

### Key changes in Properties Panel

* `FEAT`: allow escalation code to be an expression in throw events ([bpmn-js-properties-panel#855](https://github.com/bpmn-io/bpmn-js-properties-panel/pull/855))

## 1.1.2

* `DEPS`: update to `bpmn-js-properties-panel@1.15.1`

### Key changes in Properties Panel

* `FIX`: correct clear and set of errors ([bpmn-js-properties-panel#850](https://github.com/bpmn-io/bpmn-js-properties-panel/pull/850))

## 1.1.1

* `DEPS`: update to `diagram-js@11.4.4`

## 1.1.0

* `DEPS`: update to `bpmn-js-properties-panel@1.15.0`
* `DEPS`: update to `bpmn-js@11.1.1`

### Key changes in Properties Panel

* `FEAT`: add FEEL expression implementation for Script Task ([bpmn-io/bpmn-js-properties-panel#825](https://github.com/bpmn-io/bpmn-js-properties-panel/issues/825))
* `FEAT`: allow to set error code as FEEL expression ([bpmn-io/bpmn-js-properties-panel#836](https://github.com/bpmn-io/bpmn-js-properties-panel/issues/836))
* `FIX`: workaround Grammarly breaking textarea components ([bpmn-io/bpmn-js-properties-panel#810](https://github.com/bpmn-io/bpmn-js-properties-panel/issues/810))
* `FIX`: serialize templated properties in stable order ([bpmn-io/bpmn-js-properties-panel#838](https://github.com/bpmn-io/bpmn-js-properties-panel/issues/838))
* `FIX`: do not sort IO mappings alphabetically ([bpmn-io/bpmn-js-properties-panel#845](https://github.com/bpmn-io/bpmn-js-properties-panel/issues/845), [bpmn-io/bpmn-js-properties-panel#843](https://github.com/bpmn-io/bpmn-js-properties-panel/issues/843))
* `FIX`: correct element template defined `Dropdown` showing incorrect value ([bpmn-io/bpmn-js-properties-panel@`b3248fea`](https://github.com/bpmn-io/bpmn-js-properties-panel/commit/b3248fea0a19dabca7a9b969121cf07fba7a8f0a))

## 1.0.0

* `DEPS`: update to `bpmn-js@11.1.0`
* `DEPS`: update to `diagram-js@11.4.1`

### Key changes in Modeling

* `FEAT`: integrate `bpmn-js-color-picker` ([#221](https://github.com/camunda/camunda-bpmn-js/pull/221))
* `FEAT`: allow to unlink element template in replace menu ([#219](https://github.com/camunda/camunda-bpmn-js/pull/219))
* `FEAT`: remove feature flag from replace with templates ([#219](https://github.com/camunda/camunda-bpmn-js/pull/219))
* `FEAT`: add shortcut for opening replace menu ([bpmn-io/bpmn-js#1782](https://github.com/bpmn-io/bpmn-js/issues/1782))
* `FIX`: template name is used as label for replace menu ([#222](https://github.com/camunda/camunda-bpmn-js/pull/222))
* `CHORE`: move shared replace feature to dedicated sub-directory ([#219](https://github.com/camunda/camunda-bpmn-js/pull/219))

## 0.24.1

* `FIX`: ensure interoperability with connectors extension ([#211](https://github.com/camunda/camunda-bpmn-js/issues/211))
* `DEPS`: update to `bpmn-js@11.0.5`

## 0.24.0

* `DEPS`: update to `bpmn-js@11.0.1`
* `DEPS`: update to `diagram-js@11.1.1`
* `DEPS`: update to `bpmn-js-properties-panel@1.12.0`
* `DEPS`: update modeling dependencies

### Key changes in Modeling

* `FEAT`: provide templates as replace menu entries ([#207](https://github.com/camunda/camunda-bpmn-js/pull/207))
* `FEAT`: replace with templates available through feature flag ([#214](https://github.com/camunda/camunda-bpmn-js/pull/214))

### Breaking Changes

* New popup menu UI introduced with `diagram-js@11` / `bpmn-js@11`. See [`diagram-js` breaking changes and migration guide](https://github.com/bpmn-io/diagram-js/blob/develop/CHANGELOG.md#breaking-changes).

## 0.23.1

* `DEPS`: update to `bpmn-js-properties-panel@1.11.2`
* `DEPS`: update to `bpmn-js@10.3.0`

### Key changes in Modeling

* `FIX`: correct various space tool related issues ([bpmn-io/bpmn-js#1344](https://github.com/bpmn-io/bpmn-js/pull/1344), [bpmn-io/bpmn-js#1302](https://github.com/bpmn-io/bpmn-js/issues/1302))

### Key changes in Properties Panel

* `FIX`: ensure `ImplementationProps` does not remove empty properties ([bpmn-io/bpmn-js-properties-panel#811](https://github.com/bpmn-io/bpmn-js-properties-panel/pull/811))

## 0.23.0

* `DEPS`: update to `bpmn-js-properties-panel@1.11.1`
* `DEPS`: update to `camunda-bpmn-js-behaviors@0.4.0`
* `DEPS`: update to `zeebe-bpmn-moddle@0.16.0`

### Key changes in Modeling

* `FEAT`: do not remove assignment if `zeebe:candidateUsers` set ([camunda/camunda-bpmn-js-behaviors#20](https://github.com/camunda/camunda-bpmn-js-behaviors/pull/20))

### Key changes in Properties Panel

* `FEAT`: add candidate users entry to assignment group ([bpmn-io/bpmn-js-properties-panel#776](https://github.com/bpmn-io/bpmn-js-properties-panel/pull/776))

## 0.22.0

* `FEAT`: cloud modeler allows modeling of all elements ([#196](https://github.com/camunda/camunda-bpmn-js/pull/196))
* `DEPS`: update to `diagram-js@10`

### Breaking Changes

* Cloud modeler allows modeling of elements not supported by the engine; use [`@camunda/linting`](https://github.com/camunda/linting) to indicate elements supported by engine

## 0.21.1

* `FIX`: remove _Cycle_ option of _Timer_ _Type_ of interrupting timer start event ([bpmn-io/bpmn-js-properties-panel#802](https://github.com/bpmn-io/bpmn-js-properties-panel/pull/802))
* `FIX`: remove timer expression if not allowed after element changed ([camunda/camunda-bpmn-js-behaviors#15](https://github.com/camunda/camunda-bpmn-js-behaviors/pull/15))
* `DEPS`: update to `bpmn-js-properties-panel@1.10.0`
* `DEPS`: update to `camunda-bpmn-js-behaviors@0.3.0`

## 0.21.0

_Dependency clean-ups; no notable new features._

* `DEPS`: update to `bpmn-js@10.2.0`
* `DEPS`: update to `bpmn-js-disable-collapsed-subprocess@0.1.7`
* `DEPS`: update to `bpmn-js-executable-fix@0.2.0`
* `DEPS`: update to `camunda-bpmn-js-behaviors@0.2.2`

## 0.20.0

_Upgrade library target to ES2018. Checkout the [migration guide](https://bpmn.io/blog/posts/2022-migration-to-es2018.html)._

* `DEPS`: update to `bpmn-js@10`
* `DEPS`: update to `bpmn-js-properties-panel@1.8.2`
* `DEPS`: update modeling dependencies

### Key changes in Properties Panel

* `FIX`: correct replace removing valid dropdown property ([bpmn-io/bpmn-js-properties-panel#767](https://github.com/bpmn-io/bpmn-js-properties-panel/issues/767))

### Breaking Changes

* Core libraries target changed to ES2018. Checkout the [migration guide](https://bpmn.io/blog/posts/2022-migration-to-es2018.html).

## 0.19.0

* `FEAT`: support modeling of terminate end events in Camunda 8 ([#167](https://github.com/camunda/camunda-bpmn-js/pull/167))
* `DEPS`: update to `bpmn-js-properties-panel@1.8.1`

### Key changes in Properties Panel

* `FEAT`: support cron expressions for timer cycle ([bpmn-io/bpmn-js-properties-panel#772](https://github.com/bpmn-io/bpmn-js-properties-panel/pull/772))
* `FIX`: unset timer type correctly ([bpmn-io/bpmn-js-properties-panel#775](https://github.com/bpmn-io/bpmn-js-properties-panel/issues/775))

## 0.18.0

* `FEAT`: add inclusive gateway replacement option ([#162](https://github.com/camunda/camunda-bpmn-js/pull/162))
* `DEPS`: update to `bpmn-js-properties-panel@1.7.0`

### Key changes in Properties Panel

* `FEAT`: show conditions group if source is inclusive gateway ([bpmn-io/bpmn-js-properties-panel#756](https://github.com/bpmn-io/bpmn-js-properties-panel/pull/756))
* `FEAT`: support element template properties without default value ([bpmn-io/bpmn-js-properties-panel#763](https://github.com/bpmn-io/bpmn-js-properties-panel/pull/763))
* `FEAT`: support deprecated element templates ([bpmn-io/bpmn-js-properties-panel#766](https://github.com/bpmn-io/bpmn-js-properties-panel/pull/766))
* `FIX`: support `zeebe:property` binding for creation of elements from element templates ([bpmn-io/bpmn-js-properties-panel#762](https://github.com/bpmn-io/bpmn-js-properties-panel/pull/762))
* `FIX`: support conditional properties for creation of elements from element templates ([bpmn-io/bpmn-js-properties-panel#762](https://github.com/bpmn-io/bpmn-js-properties-panel/pull/762))
* `CHORE`: remove default values from _Variable assignment value_ of _Input_ and _Output_ ([bpmn-io/bpmn-js-properties-panel#757](https://github.com/bpmn-io/bpmn-js-properties-panel/pull/757))

## 0.17.2

* `DEPS`: update to `bpmn-js-properties-panel@1.6.1`

## 0.17.1

* `DEPS`: update to `@bpmn-io/properties-panel@0.20.1`

### Key changes in Properties Panel

* `FIX`: show FEEL syntax errors ([bpmn-io/properties-panel#173](https://github.com/bpmn-io/properties-panel/pull/173))
* `FIX`: focus FEEL container on click ([bpmn-io/properties-panel#179](https://github.com/bpmn-io/properties-panel/pull/179))

## 0.17.0

* `DEPS`: update to `bpmn-js@9.4.0`
* `DEPS`: update to `diagram-js@8.9.0`
* `DEPS`: update to `camunda-bpmn-js-behaviors@0.2.0`
* `DEPS`: update to `zeebe-bpmn-moddle@0.15.0`
* `DEPS`: update to `camunda-bpmn-moddle@7.0.1`
* `DEPS`: update to `bpmn-js-properties-panel@1.16.0`
* `DEPS`: update to `@bpmn-io/properties-panel@0.20.0`

### Key changes in Modeling

* `FEAT`: support `zeebe:property`
* `FEAT`: allow clipboard to be serialized
* `FIX`: make clipboard contents immutable ([bpmn-io/bpmn-js#1707](https://github.com/bpmn-io/bpmn-js/pull/1707))
* `FIX`: only claim existing IDs ([bpmn-io/bpmn-js#1707](https://github.com/bpmn-io/bpmn-js/pull/1707))
* `FIX`: move labels when collapsing sub-process ([bpmn-io/bpmn-js#1695](https://github.com/bpmn-io/bpmn-js/issues/1695))
* `FIX`: assign default size when expanding element ([bpmn-io/bpmn-js#1687](https://github.com/bpmn-io/bpmn-js/issues/1687))
* `FIX`: render sequence flows always on top ([bpmn-io/bpmn-js#1716](https://github.com/bpmn-io/bpmn-js/issues/1716))
* `FIX`: preserve `isExecutable` flag when deleting pool ([#149](https://github.com/camunda/camunda-bpmn-js/issues/149))

### Key changes in Properties Panel

* `FEAT`: support `zeebe:property` ([bpmn-io/bpmn-js-properties-panel#731](https://github.com/bpmn-io/bpmn-js-properties-panel/issues/731))
* `FIX`: copy full `FEEL` expression ([bpmn-io/bpmn-js-properties-panel#728](https://github.com/bpmn-io/bpmn-js-properties-panel/issues/728))
* `FIX`: don't serialize `zeebe:taskHeader` template bindings without a value ([bpmn-io/bpmn-js-properties-panel#684](https://github.com/bpmn-io/bpmn-js-properties-panel/issues/684))
* `FIX`: render sticky headers correctly ([bpmn-io/bpmn-js-properties-panel#726](https://github.com/bpmn-io/bpmn-js-properties-panel/issues/726))
* `FIX`: prevent undo events from affecting the wrong element ([bpmn-io/bpmn-js-properties-panel#712](https://github.com/bpmn-io/bpmn-js-properties-panel/issues/712))

## 0.16.1

* `DEPS`: update to `bpmn-js@9.3.2`

### Key changes in Modeling

* `FIX`: check for replacement using actual target ([bpmn-io/bpmn-js#1699](https://github.com/bpmn-io/bpmn-js/pull/1699))

## 0.16.0

* `DEPS`: update to `bpmn-js-properties-panel@1.4.0`
* `DEPS`: update to `@bpmn-io/properties-panel@0.18.0`
* `DEPS`: update to `camunda-bpmn-js-behaviors@0.1.1`

### Key changes in Properties Panel

* `FEAT`: add FEEL editor for FEEL properties ([bpmn-io/properties-panel#158](https://github.com/bpmn-io/properties-panel/pull/158))
* `FIX`: do not update empty business key ([camunda/camunda-bpmn-js-behaviors#2](https://github.com/camunda/camunda-bpmn-js-behaviors/pull/2))

## 0.15.3

* `FIX`: remove `@bpmn-io/properties-panel` peer dependency as it is transitive ([#147](https://github.com/camunda/camunda-bpmn-js/pull/147))

## 0.15.2

* `CHORE`: bumped properties-panel peer deps

## 0.15.1

* `DEPS`: update to `bpmn-js@9.3.1`

### Key changes in Modeling

* `FIX`: properly size icons for distribute/align menu ([bpmn-js#1694](https://github.com/bpmn-io/bpmn-js/pull/1694))

## 0.15.0

* `DEPS`: update to `bpmn-js@9.3.0`
* `DEPS`: update to `diagram-js@8.7.0`
* `DEPS`: update to `bpmn-js-properties-panel@1.2.0`

### Key changes in Modeling

* `FEAT`: allow to select participant and subprocess via click on body ([bpmn-js#1646](https://github.com/bpmn-io/bpmn-js/pull/1646))
* `FEAT`: clearly distinguish select and hover states ([bpmn-js#1616](https://github.com/bpmn-io/bpmn-js/issues/1616))
* `FEAT`: allow text annotation on sequence flows ([bpmn-js#1652](https://github.com/bpmn-io/bpmn-js/pull/1652))
* `FEAT`: add multi-element context pad ([bpmn-js#1525](https://github.com/bpmn-io/bpmn-js/pull/1525))
* `FEAT`: add aligment and distribution menu ([bpmn-js#1680](https://github.com/bpmn-io/bpmn-js/issues/1680), [bpmn-io/bpmn-js#1691](https://github.com/bpmn-io/bpmn-js/issues/1691))
* `FEAT`: rework select and hover interaction on the diagram ([bpmn-js#1616](https://github.com/bpmn-io/bpmn-js/issues/1616), [diagram-js#640](https://github.com/bpmn-io/diagram-js/pull/640), [diagram-js#643](https://github.com/bpmn-io/diagram-js/pull/643))
* `FEAT`: rework diagram interaction handles ([diagram-js#640](https://github.com/bpmn-io/diagram-js/pull/640))
* `FIX`: complete direct editing when selection changes ([bpmn-js#1648](https://github.com/bpmn-io/bpmn-js/pull/1648))
* `FIX`: cancel direct editing before shape deletion ([bpmn-js#1677](https://github.com/bpmn-io/bpmn-js/issues/1677))
* `FIX`: set correct label color when batch coloring elements ([bpmn-js#1653](https://github.com/bpmn-io/bpmn-js/issues/1653))
* `FIX`: always reconnect labels and associations ([bpmn-js#1659](https://github.com/bpmn-io/bpmn-js/pull/1659))

### Key changes in Properties Panel

* `FEAT`: enable multi-select state ([bpmn-props-panel#687](https://github.com/bpmn-io/bpmn-js-properties-panel/pull/678))
* `FEAT`: display timestamp for template versions ([bpmn-props-panel#698](https://github.com/bpmn-io/bpmn-js-properties-panel/pull/698))
* `FIX`: fixed error when field injection for execution listener is created ([bpmn-props-panel#710](https://github.com/bpmn-io/bpmn-js-properties-panel/pull/710)

## 0.14.0

* `DEPS`: update to `@bpmn-io/element-templates-icons-renderer@0.2.0`

### Key changes in Modeling

* `FEAT`: enforce rectangular element template icon size ([bpmn-io/element-templates-icons-renderer#4](https://github.com/bpmn-io/element-templates-icons-renderer/issues/4))
* `FIX`: remove `label` property on empty label ([bpmn-io/bpmn-js#1637](https://github.com/bpmn-io/bpmn-js/issues/1637))
* `FIX`: create drilldown overlays on `viewer.open` ([bpmn-io/bpmn-js@`574a674`](https://github.com/bpmn-io/bpmn-js/commit/574a674381d6449b509396b6d17c4ca94674ea1c))
* `FIX`: render data association inside collapsed sub-processes ([bpmn-io/bpmn-js#1619](https://github.com/bpmn-io/bpmn-js/issues/1619))
* `FIX`: preserve multi-instance properties when toggling between parallel and sequential ([bpmn-io/bpmn-js#1581](https://github.com/bpmn-io/bpmn-js/issues/1581))
* `FIX`: correct hanging sequence flow label after collapsing sub-process ([bpmn-io/bpmn-js#1617](https://github.com/bpmn-io/bpmn-js/issues/1617))
* `FIX`: correct start event not added to newly created sub-process ([bpmn-io/bpmn-js#1631](https://github.com/bpmn-io/bpmn-js/issues/1631))

## 0.13.2

* `DEPS`: update to `bpmn-js-properties-panel@1.1.1`
* `DEPS`: update to `@bpmn-io/properties-panel@0.13.2`

### Key changes in Properties Panel

* `FIX`: remove unnecessary scroll padding ([bpmn-io/properties-panel#145](https://github.com/bpmn-io/properties-panel/pull/145))
* `FIX`: keep existing configuration after template apply ([bpmn-io/bpmn-js-properties-panel#661](https://github.com/bpmn-io/bpmn-js-properties-panel/pull/661))
* `FIX`: always override `hidden` configuration on template apply ([bpmn-io/bpmn-js-properties-panel#661](https://github.com/bpmn-io/bpmn-js-properties-panel/pull/661))
* `FIX`: do not render non-existing values in element template ([bpmn-io/bpmn-js-properties-panel#676](https://github.com/bpmn-io/bpmn-js-properties-panel/pull/676))
* `FIX`: pick-up correct element template icon ([bpmn-io/bpmn-js-properties-panel#670](https://github.com/bpmn-io/bpmn-js-properties-panel/pull/670))

## 0.13.1

_Re-publish of v0.13.0 with fixed distro._

* `FIX`: fix distro on Windows ([#125](https://github.com/camunda/camunda-bpmn-js/pull/125))

## 0.13.0

* `FEAT`: add viewer distributions ([#115](https://github.com/camunda/camunda-bpmn-js/pull/115))
* `CHORE`: import behaviors from camunda-bpmn-js-behaviors ([#116](https://github.com/camunda/camunda-bpmn-js/pull/116))
* `DEPS`: update to `bpmn-js-disable-collapsed-subprocess@0.1.4` ([#112](https://github.com/camunda/camunda-bpmn-js/pull/112))
* `DEPS`: update to `bpmn-js-properties-panel@1.1.0` ([`03b659d`](https://github.com/camunda/camunda-bpmn-js/pull/123/commits/03b659da729364abf97ccc2dba421d83e9f5c48e))

## 0.13.0-alpha.8

* `FEAT`: support element template custom icons ([#108](https://github.com/camunda/camunda-bpmn-js/pull/108))
* `DEPS`: update to `bpmn-js-properties-panel@1.0.0-alpha.12` ([#108](https://github.com/camunda/camunda-bpmn-js/pull/108))
* `DEPS`: update to `diagram-js@8.2.1` ([#108](https://github.com/camunda/camunda-bpmn-js/pull/108))
* `DEPS`: update to `camunda-bpmn-moddle@6.1.2` ([#108](https://github.com/camunda/camunda-bpmn-js/pull/108))
* `DEPS`: update to `zeebe-bpmn-moddle@0.12.0` ([#108](https://github.com/camunda/camunda-bpmn-js/pull/108))
* `DEPS`: update to `@bpmn-io/element-templates-icons-renderer@0.1.2` ([#108](https://github.com/camunda/camunda-bpmn-js/pull/108))

### Key changes in Properties Panel

* `FEAT`: apply element template icons ([bpmn-io/bpmn-js-properties-panel#641](https://github.com/bpmn-io/bpmn-js-properties-panel/pull/641))
* `FEAT`: change task type when element template is applied ([bpmn-io/bpmn-js-properties-panel#648](https://github.com/bpmn-io/bpmn-js-properties-panel/pull/648))
* `FEAT`: display element template icons in header ([bpmn-io/bpmn-js-properties-panel#650](https://github.com/bpmn-io/bpmn-js-properties-panel/pull/650))

## 0.13.0-alpha.7

_Re-publish of v0.13.0-alpha.6 with fixed distro._

* `FIX`: update peer dependencies ([#103](https://github.com/camunda/camunda-bpmn-js/pull/103))

## 0.13.0-alpha.6

* `FIX`: set $parent when creating zeebe:CalledElement element ([#99](https://github.com/camunda/camunda-bpmn-js/pull/99))
* `DEPS`: update to `@bpmn-io/properties-panel@0.13.1`
* `DEPS`: update to `bpmn-js-properties-panel@1.0.0-alpha.9`

### Key changes in Properties Panel

* `FEAT`: allow showing entries and errors through events ([bpmn-io/properties-panel#137](https://github.com/bpmn-io/properties-panel/pull/137))
* `FEAT`: allow opening groups per default ([bpmn-io/properties-panel#139](https://github.com/bpmn-io/properties-panel/pull/139))
* `FEAT`: add documentation ref ([bpmn-io/properties-panel#141](https://github.com/bpmn-io/properties-panel/pull/141))
* `FEAT`: add show callbacks to show entries and errors ([bpmn-io/bpmn-js-properties-panel#601](https://github.com/bpmn-io/bpmn-js-properties-panel/pull/601))
* `FEAT`: open element template custom groups ([bpmn-io/bpmn-js-properties-panel#621](https://github.com/bpmn-io/bpmn-js-properties-panel/pull/621))
* `FEAT`: display template name in header ([bpmn-io/bpmn-js-properties-panel#627](https://github.com/bpmn-io/bpmn-js-properties-panel/pull/627))
* `FEAT`: add documentation ref to header ([bpmn-io/bpmn-js-properties-panel#629](https://github.com/bpmn-io/bpmn-js-properties-panel/pull/629))
* `FIX`: copy versioned element template ([bpmn-io/bpmn-js-properties-panel#632](https://github.com/bpmn-io/bpmn-js-properties-panel/pull/632))

## 0.13.0-alpha.5

* `DEPS`: update to `@bpmn-io/properties-panel@0.12.0`
* `DEPS`: update to `bpmn-js-properties-panel@1.0.0-alpha.7`

## 0.13.0-alpha.4

* `FIX`: move properties panel deps to peer dependencies
* `CHORE`: add prepare script
* `DEPS`: update to `bpmn-js@9.0.3`

## 0.13.0-alpha.3

* `FEAT`: add cloud element templates ([#95](https://github.com/camunda/camunda-bpmn-js/pull/95))
* `DEPS`: update to `bpmn-js@9.0.2`
* `DEPS`: update to `@bpmn-io/properties-panel@0.11.0`
* `DEPS`: update to `bpmn-js-properties-panel@1.0.0-alpha.5`
* `DEPS`: update to `zeebe-bpmn-moddle@0.11.0`

## 0.13.0-alpha.2

* `FEAT`: add support for drilldown ([#89](https://github.com/camunda/camunda-bpmn-js/pull/89))
* `CHORE`: refactor behaviors to only use modeling API ([#91](https://github.com/camunda/camunda-bpmn-js/pull/91))
* `DEPS`: update to `bpmn-js-properties-panel@1.0.0-alpha.3` ([`68c344f`](https://github.com/camunda/camunda-bpmn-js/commit/68c344f270405716e514c3947c98dee293877c7f))
* `DEPS`: update to `bpmn-js@9.0.0-alpha.2` ([`68c344f`](https://github.com/camunda/camunda-bpmn-js/commit/68c344f270405716e514c3947c98dee293877c7f))
* `DEPS`: update to `diagram-js-minimap@2.1.0` ([`68c344f`](https://github.com/camunda/camunda-bpmn-js/commit/68c344f270405716e514c3947c98dee293877c7f))
* `DEPS`: update to `diagram-js@8.1.1` ([`faf55e9`](https://github.com/camunda/camunda-bpmn-js/commit/faf55e958e7b8faf57a6b3cf0a8e6b496e59266d))

## 0.13.0-alpha.1

* `FEAT`: include documentation fields in properties panel for Camunda Cloud ([#83](https://github.com/camunda/camunda-bpmn-js/issues/83))
* `DEPS`: update to `bpmn-js-properties-panel@1.0.0-alpha.1` ([`faf55e9`](https://github.com/camunda/camunda-bpmn-js/commit/faf55e958e7b8faf57a6b3cf0a8e6b496e59266d))
* `DEPS`: update to `bpmn-js@8.9.1` ([`faf55e9`](https://github.com/camunda/camunda-bpmn-js/commit/faf55e958e7b8faf57a6b3cf0a8e6b496e59266d))
* `DEPS`: update to `diagram-js@7.8.2` ([`faf55e9`](https://github.com/camunda/camunda-bpmn-js/commit/faf55e958e7b8faf57a6b3cf0a8e6b496e59266d))

## 0.13.0-alpha.0

* `FEAT`: support Zeebe 1.3 features ([#71](https://github.com/camunda/camunda-bpmn-js/issues/71))
* `DEPS`: migrate to `bpmn-js-properties-panel@1.0.0-alpha.0` ([#71](https://github.com/camunda/camunda-bpmn-js/issues/71))
* `DEPS`: update to `bpmn-js@8.8.3` ([#74](https://github.com/camunda/camunda-bpmn-js/pull/74))

### Breaking Changes

* Extensions to `bpmn-js-properties-panel@0.x` no longer work with the `1.x` series.
  Read [the project's changelog for details](https://github.com/bpmn-io/bpmn-js-properties-panel/blob/next/CHANGELOG.md#breaking-changes).

## 0.12.2

* `FEAT`: behavior for Cloud to ensure that no empty `zeebe:AssignmentDefinitions`
  remain in the model after modeling or propertyPanel operations ([`e26c486`](https://github.com/camunda/camunda-bpmn-js/commit/e26c486bac3b54202fdf6c2b09d64483b52a2298))

## 0.12.1

* `DEPS`: update to `zeebe-bpmn-moddle@0.10.0`

## 0.12.0

* `FEAT`: behavior for Cloud to ensure that `bpmn:BusinessRuleTask`s only have a `zeebe:CalledDecision` or
  `zeebe:TaskDefinition`/`zeebe:TaskHeaders` respectively. This supports the Zeebe 1.3 release ([#65](https://github.com/camunda/camunda-bpmn-js/issues/65))
* `FIX`: use relative import path in library code ([`b5a696b`](https://github.com/camunda/camunda-bpmn-js/commit/b5a696bf36f8b6592d6bf3d92ed33c26c63d68f7))
* `CHORE`: refactor behaviors and helpers ([`85573af`](https://github.com/camunda/camunda-bpmn-js/commit/85573afe1653bffc2e1387da91076fb0cbe79345))

## 0.11.5

* `FIX`: correct assignment of IDs when pasting multiple times
* `DEPS`: update to `bpmn-js@8.8.2`

## 0.11.4

* `FIX`: gracefully handle incompatible properties providers
* `FIX`: re-use ID of a copied element if available
* `DEPS`: update to `camunda-bpmn-moddle@6.1.1`
* `DEPS`: update to `bpmn-js-properties-panel@0.46.0`
* `DEPS`: update to `bpmn-js@8.8.1`
* `DEPS`: update to `diagram-js@7.5.0`

## 0.11.3

* `FIX`: correctly default to `camunda:formBindingRef=latest` ([#60](https://github.com/camunda/camunda-bpmn-js/pull/60))
* `DEPS`: update to `camunda-bpmn-moddle@6.1.1`

## 0.11.2

* `FIX`: do not clean up recently added inputOutput ([#59](https://github.com/camunda/camunda-bpmn-js/pull/59))

## 0.11.1

* `CHORE`: ensure `dist` is built and tested before publish ([`331584b`](https://github.com/camunda/camunda-bpmn-js/commit/331584b49c56841943a328761ebc7c89632f11fe))

## 0.11.0

* `DEPS`: bump to `bpmn-js-properties-panel@0.45.0`
* `DEPS`: bump to `camunda-bpmn-moddle@v6.1.0`

## 0.10.0

* `FEAT`: update properties panel for Message Intermediate Throw Event and Message End Event for Cloud Modeler to support Zeebe 1.2 ([#55](https://github.com/camunda/camunda-bpmn-js/pull/55))
* `FEAT`: allow replace with Message Intermediate Throw Event and Message End Event for Cloud Modeler to support Zeebe 1.2 ([#50](https://github.com/camunda/camunda-bpmn-js/pull/50))
* `FEAT`: allow replace with Manual Task for Cloud Modeler to support Zeebe 1.2 ([#49](https://github.com/camunda/camunda-bpmn-js/pull/49))
* `FEAT`: add behavior to clean up empty `camunda:inputOutput` elements ([#39](https://github.com/camunda/camunda-bpmn-js/pull/39))
* `FEAT`: configure either `camunda:formKey` or `formRef` ([#37](https://github.com/camunda/camunda-bpmn-js/pull/37))
* `FEAT`: add behavior to delete error event definition ([#34](https://github.com/camunda/camunda-bpmn-js/pull/34))
* `FEAT`: add behavior to update result variable ([#34](https://github.com/camunda/camunda-bpmn-js/pull/34))
* `FEAT`: delete `camunda:jobRetryTimeCycle` when async is disabled ([#33](https://github.com/camunda/camunda-bpmn-js/pull/33))
* `FEAT`: set `camunda:exlusive flag` to true when async is disabled ([#31](https://github.com/camunda/camunda-bpmn-js/pull/31))
* `DEPS`: update to `zeebe-bpmn-moddle@0.8.0`
* `DEPS`: update to `camunda-bpmn-moddle@6.0.0`
* `DEPS`: update to `bpmn-js@8.7.3`
* `DEPS`: update dev dependencies

## 0.9.3

* `DEPS`: update to `zeebe-bpmn-moddle@0.7.1`

## 0.9.2

* `DEPS`: update to `bpmn-js-properties-panel@0.44.0`

## 0.9.1

* `DEPS`: update to `bpmn-js@8.7.1`

## 0.9.0

* `DEPS`: update to `bpmn-js@8.7.0`
* `DEPS`: update to `bpmn-js-properties-panel@0.43.1`

## 0.8.0

* `FEAT`: support business rule, send, and script tasks in Cloud Modeler ([#27](https://github.com/camunda/camunda-bpmn-js/pull/27))
* `FIX`: allow to pass expression as `bpmn:CallActivity#processId` in Cloud Modeler ([#28](https://github.com/camunda/camunda-bpmn-js/pull/28))
* `DEPS`: bump to `bpmn-js@8.6.1`
* `DEPS`: bump to `zeebe-bpmn-moddle@0.7.0`

## 0.7.0

* `DEPS`: bump to `bpmn-js@8.5.0`
* `DEPS`: bump to `bpmn-js-properties-panel@0.43.0`
* `DEPS`: bump to `diagram-js@7.3.0`
* `DEPS`: bump to `zeebe-bpmn-moddle@0.6.0`

## 0.6.0

* `FEAT`: re-enable user task support for Cloud Modeler

## 0.5.2

* `CHORE`: bump to `camunda-bpmn-moddle@5.1.2`

## 0.5.1

* `CHORE`: bump to `camunda-bpmn-moddle@5.1.1`

## 0.5.0

* `CHORE`: bump to `bpmn-js-properties-panel@0.42.0`
* `CHORE`: bump to `camunda-bpmn-moddle@5.1.0`
* `CHORE`: bump to `bpmn-js@8.3.0`

## 0.4.0

* `FEAT`: disable user task support for Cloud Modeler, can be enabled via `enableZeebeUserTasks` ([`9f78202`](https://github.com/camunda/camunda-bpmn-js/commit/9f7820284154b4ab0174f8c5eb745a3060f5c1ff))

## 0.3.0

* `CHORE`: bump to `bpmn-js@8.2.1`
* `CHORE`: bump to `bpmn-js-properties-panel@0.41.0`
* `CHORE`: bump to `camunda-bpmn-moddle@5.0.0`

## 0.2.0

* `FEAT`: add support for user tasks in cloud modeler ([#14](https://github.com/camunda/camunda-bpmn-js/pull/14))

## 0.1.0

_Republish of `v0.1.0-alpha.1`_.

## 0.1.0-alpha.1

* `FIX`: resolve moddle descriptors explicitly ([#11](https://github.com/camunda/camunda-bpmn-js/issues/11))

## 0.1.0-alpha.0

* `CHORE`: first release 🎉
