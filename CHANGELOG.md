# Changelog

All notable changes to [camunda-bpmn-js](https://github.com/camunda/camunda-bpmn-js) are documented here. We use [semantic versioning](http://semver.org/) for releases.

## Unreleased

___Note:__ Yet to be released changes appear here._

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
