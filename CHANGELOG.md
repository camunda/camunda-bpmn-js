# Changelog

All notable changes to [camunda-bpmn-js](https://github.com/camunda/camunda-bpmn-js) are documented here. We use [semantic versioning](http://semver.org/) for releases.

## Unreleased

___Note:__ Yet to be released changes appear here._

## 0.21.1

* `FIX`: remove _Cycle_ option of _Timer_ _Type_ of interrupting timer start event ([#802](https://github.com/bpmn-io/bpmn-js-properties-panel/pull/802))
* `FIX`: remove timer expression if not allowed after element changed ([#15](https://github.com/camunda/camunda-bpmn-js-behaviors/pull/15))

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

* `FIX`: correct replace removing valid dropdown property ([#767](https://github.com/bpmn-io/bpmn-js-properties-panel/issues/767))

### Breaking Changes

* Core libraries target changed to ES2018. Checkout the [migration guide](https://bpmn.io/blog/posts/2022-migration-to-es2018.html).

## 0.19.0

* `FEAT`: support modeling of terminate end events in Camunda 8 ([#167](https://github.com/camunda/camunda-bpmn-js/pull/167))
* `DEPS`: update to `bpmn-js-properties-panel@1.8.1`

### Key changes in Properties Panel

* `FEAT`: support cron expressions for timer cycle ([#772](https://github.com/bpmn-io/bpmn-js-properties-panel/pull/772))
* `FIX`: unset timer type correctly ([#775](https://github.com/bpmn-io/bpmn-js-properties-panel/issues/775))

## 0.18.0

* `FEAT`: add inclusive gateway replacement option ([#162](https://github.com/camunda/camunda-bpmn-js/pull/162))
* `DEPS`: update to `bpmn-js-properties-panel@1.7.0`

### Key changes in Properties Panel

* `FEAT`: show conditions group if source is inclusive gateway ([#756](https://github.com/bpmn-io/bpmn-js-properties-panel/pull/756))
* `FEAT`: support element template properties without default value ([#763](https://github.com/bpmn-io/bpmn-js-properties-panel/pull/763))
* `FEAT`: support deprecated element templates ([#766](https://github.com/bpmn-io/bpmn-js-properties-panel/pull/766))
* `FIX`: support `zeebe:property` binding for creation of elements from element templates ([#762](https://github.com/bpmn-io/bpmn-js-properties-panel/pull/762))
* `FIX`: support conditional properties for creation of elements from element templates ([#762](https://github.com/bpmn-io/bpmn-js-properties-panel/pull/762))
* `CHORE`: remove default values from _Variable assignment value_ of _Input_ and _Output_ ([#757](https://github.com/bpmn-io/bpmn-js-properties-panel/pull/757))

## 0.17.2

* `DEPS`: update to `bpmn-js-properties-panel@1.6.1`

## 0.17.1

* `DEPS`: update to `@bpmn-io/properties-panel@0.20.1`

### Key changes in Properties Panel

* `FIX`: show FEEL syntax errors ([#173](https://github.com/bpmn-io/properties-panel/pull/173))
* `FIX`: focus FEEL container on click ([#179](https://github.com/bpmn-io/properties-panel/pull/179))

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
* `FIX`: make clipboard contents immutable ([#1707](https://github.com/bpmn-io/bpmn-js/pull/1707))
* `FIX`: only claim existing IDs ([#1707](https://github.com/bpmn-io/bpmn-js/pull/1707))
* `FIX`: move labels when collapsing sub-process ([#1695](https://github.com/bpmn-io/bpmn-js/issues/1695))
* `FIX`: assign default size when expanding element ([#1687](https://github.com/bpmn-io/bpmn-js/issues/1687))
* `FIX`: render sequence flows always on top ([#1716](https://github.com/bpmn-io/bpmn-js/issues/1716))
* `FIX`: preserve `isExecutable` flag when deleting pool ([#149](https://github.com/camunda/camunda-bpmn-js/issues/149))

### Key changes in Properties Panel

* `FEAT`: support `zeebe:property` ([#731](https://github.com/bpmn-io/bpmn-js-properties-panel/issues/731))
* `FIX`: copy full `FEEL` expression ([#728](https://github.com/bpmn-io/bpmn-js-properties-panel/issues/728))
* `FIX`: don't serialize `zeebe:taskHeader` template bindings without a value ([#684](https://github.com/bpmn-io/bpmn-js-properties-panel/issues/684))
* `FIX`: render sticky headers correctly ([#726](https://github.com/bpmn-io/bpmn-js-properties-panel/issues/726))
* `FIX`: prevent undo events from affecting the wrong element ([#712](https://github.com/bpmn-io/bpmn-js-properties-panel/issues/712))

## 0.16.1

* `DEPS`: update to `bpmn-js@9.3.2`

### Key changes in Modeling

* `FIX`: check for replacement using actual target ([#1699](https://github.com/bpmn-io/bpmn-js/pull/1699))

## 0.16.0

* `DEPS`: update to `bpmn-js-properties-panel@1.4.0`
* `DEPS`: update to `@bpmn-io/properties-panel@0.18.0`
* `DEPS`: update to `camunda-bpmn-js-behaviors@0.1.1`

### Key changes in Properties Panel

* `FEAT`: add FEEL editor for FEEL properties ([#158](https://github.com/bpmn-io/properties-panel/pull/158))
* `FIX`: do not update empty business key ([#2](https://github.com/camunda/camunda-bpmn-js-behaviors/pull/2))

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
* `FEAT`: add aligment and distribution menu ([bpmn-js#1680](https://github.com/bpmn-io/bpmn-js/issues/1680), [#1691](https://github.com/bpmn-io/bpmn-js/issues/1691))
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

* `FEAT`: enforce rectangular element template icon size ([#4](https://github.com/bpmn-io/element-templates-icons-renderer/issues/4))
* `FIX`: remove `label` property on empty label ([#1637](https://github.com/bpmn-io/bpmn-js/issues/1637))
* `FIX`: create drilldown overlays on `viewer.open` ([`574a67438`](https://github.com/bpmn-io/bpmn-js/commit/574a674381d6449b509396b6d17c4ca94674ea1c))
* `FIX`: render data association inside collapsed sub-processes ([#1619](https://github.com/bpmn-io/bpmn-js/issues/1619))
* `FIX`: preserve multi-instance properties when toggling between parallel and sequential ([#1581](https://github.com/bpmn-io/bpmn-js/issues/1581))
* `FIX`: correct hanging sequence flow label after collapsing sub-process ([#1617](https://github.com/bpmn-io/bpmn-js/issues/1617))
* `FIX`: correct start event not added to newly created sub-process ([#1631](https://github.com/bpmn-io/bpmn-js/issues/1631))

## 0.13.2

* `DEPS`: update to `bpmn-js-properties-panel@1.1.1`
* `DEPS`: update to `@bpmn-io/properties-panel@0.13.2`

### Key changes in Properties Panel

* `FIX`: remove unnecessary scroll padding ([#145](https://github.com/bpmn-io/properties-panel/pull/145))
* `FIX`: keep existing configuration after template apply ([#661](https://github.com/bpmn-io/bpmn-js-properties-panel/pull/661))
* `FIX`: always override `hidden` configuration on template apply ([#661](https://github.com/bpmn-io/bpmn-js-properties-panel/pull/661))
* `FIX`: do not render non-existing values in element template ([#676](https://github.com/bpmn-io/bpmn-js-properties-panel/pull/676))
* `FIX`: pick-up correct element template icon ([#670](https://github.com/bpmn-io/bpmn-js-properties-panel/pull/670))

## 0.13.1

_Re-publish of v0.13.0 with fixed distro._

* `FIX`: fix distro on Windows ([#125](https://github.com/camunda/camunda-bpmn-js/pull/125))

## 0.13.0

* `FEAT`: add viewer distributions ([#115](https://github.com/camunda/camunda-bpmn-js/pull/115))
* `CHORE`: import behaviors from camunda-bpmn-js-behaviors ([#116](https://github.com/camunda/camunda-bpmn-js/pull/116))
* `DEPS`: update to `bpmn-js-disable-collapsed-subprocess@0.1.4` ([#112](https://github.com/camunda/camunda-bpmn-js/pull/112))
* `DEPS`: update to `bpmn-js-properties-panel@1.1.0` ([03b659](https://github.com/camunda/camunda-bpmn-js/pull/123/commits/03b659da729364abf97ccc2dba421d83e9f5c48e))

## 0.13.0-alpha.8

* `FEAT`: support element template custom icons ([#108](https://github.com/camunda/camunda-bpmn-js/pull/108))
* `DEPS`: update to `bpmn-js-properties-panel@1.0.0-alpha.12` ([#108](https://github.com/camunda/camunda-bpmn-js/pull/108))
* `DEPS`: update to `diagram-js@8.2.1` ([#108](https://github.com/camunda/camunda-bpmn-js/pull/108))
* `DEPS`: update to `camunda-bpmn-moddle@6.1.2` ([#108](https://github.com/camunda/camunda-bpmn-js/pull/108))
* `DEPS`: update to `zeebe-bpmn-moddle@0.12.0` ([#108](https://github.com/camunda/camunda-bpmn-js/pull/108))
* `DEPS`: update to `@bpmn-io/element-templates-icons-renderer@0.1.2` ([#108](https://github.com/camunda/camunda-bpmn-js/pull/108))

### Key changes in Properties Panel

* `FEAT`: apply element template icons ([#641](https://github.com/bpmn-io/bpmn-js-properties-panel/pull/641))
* `FEAT`: change task type when element template is applied ([#648](https://github.com/bpmn-io/bpmn-js-properties-panel/pull/648))
* `FEAT`: display element template icons in header ([#650](https://github.com/bpmn-io/bpmn-js-properties-panel/pull/650))

## 0.13.0-alpha.7

_Re-publish of v0.13.0-alpha.6 with fixed distro._

* `FIX`: update peer dependencies ([#103](https://github.com/camunda/camunda-bpmn-js/pull/103))

## 0.13.0-alpha.6

* `FIX`: set $parent when creating zeebe:CalledElement element ([#99](https://github.com/camunda/camunda-bpmn-js/pull/99))
* `DEPS`: update to `@bpmn-io/properties-panel@0.13.1`
* `DEPS`: update to `bpmn-js-properties-panel@1.0.0-alpha.9`

### Key changes in Properties Panel

* `FEAT`: allow showing entries and errors through events ([#137](https://github.com/bpmn-io/properties-panel/pull/137))
* `FEAT`: allow opening groups per default ([#139](https://github.com/bpmn-io/properties-panel/pull/139))
* `FEAT`: add documentation ref ([#141](https://github.com/bpmn-io/properties-panel/pull/141))
* `FEAT`: add show callbacks to show entries and errors ([#601](https://github.com/bpmn-io/bpmn-js-properties-panel/pull/601))
* `FEAT`: open element template custom groups ([#621](https://github.com/bpmn-io/bpmn-js-properties-panel/pull/621))
* `FEAT`: display template name in header ([#627](https://github.com/bpmn-io/bpmn-js-properties-panel/pull/627))
* `FEAT`: add documentation ref to header ([#629](https://github.com/bpmn-io/bpmn-js-properties-panel/pull/629))
* `FIX`: copy versioned element template ([#632](https://github.com/bpmn-io/bpmn-js-properties-panel/pull/632))

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
* `DEPS`: update to `bpmn-js-properties-panel@1.0.0-alpha.3` ([68c344](https://github.com/camunda/camunda-bpmn-js/commit/68c344f270405716e514c3947c98dee293877c7f))
* `DEPS`: update to `bpmn-js@9.0.0-alpha.2` ([68c344](https://github.com/camunda/camunda-bpmn-js/commit/68c344f270405716e514c3947c98dee293877c7f))
* `DEPS`: update to `diagram-js-minimap@2.1.0` ([68c344](https://github.com/camunda/camunda-bpmn-js/commit/68c344f270405716e514c3947c98dee293877c7f))
* `DEPS`: update to `diagram-js@8.1.1` ([faf55e](https://github.com/camunda/camunda-bpmn-js/commit/faf55e958e7b8faf57a6b3cf0a8e6b496e59266d))

## 0.13.0-alpha.1

* `FEAT`: include documentation fields in properties panel for Camunda Cloud ([#83](https://github.com/camunda/camunda-bpmn-js/issues/83))
* `DEPS`: update to `bpmn-js-properties-panel@1.0.0-alpha.1` ([faf55e](https://github.com/camunda/camunda-bpmn-js/commit/faf55e958e7b8faf57a6b3cf0a8e6b496e59266d))
* `DEPS`: update to `bpmn-js@8.9.1` ([faf55e](https://github.com/camunda/camunda-bpmn-js/commit/faf55e958e7b8faf57a6b3cf0a8e6b496e59266d))
* `DEPS`: update to `diagram-js@7.8.2` ([faf55e](https://github.com/camunda/camunda-bpmn-js/commit/faf55e958e7b8faf57a6b3cf0a8e6b496e59266d))

## 0.13.0-alpha.0

* `FEAT`: support Zeebe 1.3 features ([#71](https://github.com/camunda/camunda-bpmn-js/issues/71))
* `DEPS`: migrate to `bpmn-js-properties-panel@1.0.0-alpha.0` ([#71](https://github.com/camunda/camunda-bpmn-js/issues/71))
* `DEPS`: update to `bpmn-js@8.8.3` ([#74](https://github.com/camunda/camunda-bpmn-js/pull/74))

### Breaking Changes

* Extensions to `bpmn-js-properties-panel@0.x` no longer work with the `1.x` series.
  Read [the project's changelog for details](https://github.com/bpmn-io/bpmn-js-properties-panel/blob/next/CHANGELOG.md#breaking-changes).

## 0.12.2

* `FEAT`: behavior for Cloud to ensure that no empty `zeebe:AssignmentDefinitions`
  remain in the model after modeling or propertyPanel operations ([e26c486](https://github.com/camunda/camunda-bpmn-js/commit/e26c486bac3b54202fdf6c2b09d64483b52a2298))

## 0.12.1

* `DEPS`: update to `zeebe-bpmn-moddle@0.10.0`

## 0.12.0

* `FEAT`: behavior for Cloud to ensure that `bpmn:BusinessRuleTask`s only have a `zeebe:CalledDecision` or
  `zeebe:TaskDefinition`/`zeebe:TaskHeaders` respectively. This supports the Zeebe 1.3 release ([#65](https://github.com/camunda/camunda-bpmn-js/issues/65))
* `FIX`: use relative import path in library code ([b5a696](https://github.com/camunda/camunda-bpmn-js/commit/b5a696bf36f8b6592d6bf3d92ed33c26c63d68f7))
* `CHORE`: refactor behaviors and helpers ([85573a](https://github.com/camunda/camunda-bpmn-js/commit/85573afe1653bffc2e1387da91076fb0cbe79345))

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

* `CHORE`: ensure `dist` is built and tested before publish ([331584b4](https://github.com/camunda/camunda-bpmn-js/commit/331584b49c56841943a328761ebc7c89632f11fe))

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

* `FEAT`: disable user task support for Cloud Modeler, can be enabled via `enableZeebeUserTasks` ([`9f782028`](https://github.com/camunda/camunda-bpmn-js/commit/9f7820284154b4ab0174f8c5eb745a3060f5c1ff))

## 0.3.0

* `CHORE`: bump to `bpmn-js@8.2.1`
* `CHORE`: bump to `bpmn-js-properties-panel@0.41.0`
* `CHORE`: bump to `camunda-bpmn-moddle@5.0.0`

## 0.2.0

* `FEAT`: add support for user tasks in cloud modeler ([#14](https://github.com/camunda/camunda-bpmn-js/pull/14))

## 0.1.0

*Republish of `v0.1.0-alpha.1`*.

## 0.1.0-alpha.1

* `FIX`: resolve moddle descriptors explicitly ([#11](https://github.com/camunda/camunda-bpmn-js/issues/11))

## 0.1.0-alpha.0

* `CHORE`: first release 🎉
