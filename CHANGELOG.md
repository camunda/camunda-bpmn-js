# Changelog

All notable changes to [camunda-bpmn-js](https://github.com/camunda/camunda-bpmn-js) are documented here. We use [semantic versioning](http://semver.org/) for releases.

## Unreleased

___Note:__ Yet to be released changes appear here._


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

### Key Changes in Properties Panel

* `FIX`: remove output group from error end events ([bpmn-js-properties-panel#952](https://github.com/bpmn-io/bpmn-js-properties-panel/pull/952), [camunda-bpmn-js-behaviors#42](https://github.com/camunda/camunda-bpmn-js-behaviors/pull/42))
* `FIX`: correct properties-panel.css ([#298](https://github.com/camunda/camunda-bpmn-js/pull/298))


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
