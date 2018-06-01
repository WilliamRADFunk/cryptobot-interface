[cryptobot-interface](../README.md) > [FilterControlsComponent](../classes/filtercontrolscomponent.md)



# Class: FilterControlsComponent

## Implements

* `OnDestroy`
* `OnInit`

## Index

### Constructors

* [constructor](filtercontrolscomponent.md#markdown-header-constructor)


### Properties

* [activatedRouter](filtercontrolscomponent.md#markdown-header-private-activatedrouter)
* [busySubscription](filtercontrolscomponent.md#markdown-header-busysubscription)
* [config](filtercontrolscomponent.md#markdown-header-private-config)
* [endDate](filtercontrolscomponent.md#markdown-header-enddate)
* [gdaxDataService](filtercontrolscomponent.md#markdown-header-private-gdaxdataservice)
* [invalidEndDatetime](filtercontrolscomponent.md#markdown-header-invalidenddatetime)
* [invalidStartDatetime](filtercontrolscomponent.md#markdown-header-invalidstartdatetime)
* [isBusy](filtercontrolscomponent.md#markdown-header-isbusy)
* [isInitialized](filtercontrolscomponent.md#markdown-header-isinitialized)
* [isInvalid](filtercontrolscomponent.md#markdown-header-isinvalid)
* [isRelevant](filtercontrolscomponent.md#markdown-header-isrelevant)
* [isRelevantSubscription](filtercontrolscomponent.md#markdown-header-isrelevantsubscription)
* [maxEndDate](filtercontrolscomponent.md#markdown-header-maxenddate)
* [maxStartDate](filtercontrolscomponent.md#markdown-header-maxstartdate)
* [minEndDate](filtercontrolscomponent.md#markdown-header-minenddate)
* [minStartDate](filtercontrolscomponent.md#markdown-header-minstartdate)
* [params](filtercontrolscomponent.md#markdown-header-params)
* [queryParamSubscription](filtercontrolscomponent.md#markdown-header-queryparamsubscription)
* [router](filtercontrolscomponent.md#markdown-header-private-router)
* [startDate](filtercontrolscomponent.md#markdown-header-startdate)
* [timeInterval](filtercontrolscomponent.md#markdown-header-timeinterval)
* [timeIntervalLabel](filtercontrolscomponent.md#markdown-header-timeintervallabel)
* [timeIntervalOptions](filtercontrolscomponent.md#markdown-header-timeintervaloptions)
* [timeIntervals](filtercontrolscomponent.md#markdown-header-timeintervals)
* [timeoutId](filtercontrolscomponent.md#markdown-header-timeoutid)
* [tooltip](filtercontrolscomponent.md#markdown-header-tooltip)
* [warningMessage](filtercontrolscomponent.md#markdown-header-warningmessage)


### Methods

* [adjustGranularityOptions](filtercontrolscomponent.md#markdown-header-adjustgranularityoptions)
* [changedTimeInterval](filtercontrolscomponent.md#markdown-header-changedtimeinterval)
* [checkValidDateTime](filtercontrolscomponent.md#markdown-header-checkvaliddatetime)
* [checkValidDateTimeOrder](filtercontrolscomponent.md#markdown-header-checkvaliddatetimeorder)
* [checkValidDay](filtercontrolscomponent.md#markdown-header-checkvalidday)
* [checkValidHours](filtercontrolscomponent.md#markdown-header-checkvalidhours)
* [checkValidMinutes](filtercontrolscomponent.md#markdown-header-checkvalidminutes)
* [checkValidMonth](filtercontrolscomponent.md#markdown-header-checkvalidmonth)
* [checkValidYear](filtercontrolscomponent.md#markdown-header-checkvalidyear)
* [closeTooltip](filtercontrolscomponent.md#markdown-header-closetooltip)
* [handleEndDateTimeParam](filtercontrolscomponent.md#markdown-header-private-handleenddatetimeparam)
* [handleGranularityParam](filtercontrolscomponent.md#markdown-header-private-handlegranularityparam)
* [handleIncorrectDateTimeParams](filtercontrolscomponent.md#markdown-header-private-handleincorrectdatetimeparams)
* [handleInitialParamUpdate](filtercontrolscomponent.md#markdown-header-private-handleinitialparamupdate)
* [handleStartDateTimeParam](filtercontrolscomponent.md#markdown-header-private-handlestartdatetimeparam)
* [isTooltipOpen](filtercontrolscomponent.md#markdown-header-istooltipopen)
* [ngOnDestroy](filtercontrolscomponent.md#markdown-header-private-ngondestroy)
* [ngOnInit](filtercontrolscomponent.md#markdown-header-private-ngoninit)
* [onEndDateTimeChange](filtercontrolscomponent.md#markdown-header-onenddatetimechange)
* [onStartDateTimeChange](filtercontrolscomponent.md#markdown-header-onstartdatetimechange)
* [openTooltip](filtercontrolscomponent.md#markdown-header-opentooltip)
* [resetMinMax](filtercontrolscomponent.md#markdown-header-resetminmax)
* [setADateTime](filtercontrolscomponent.md#markdown-header-setadatetime)
* [updateParams](filtercontrolscomponent.md#markdown-header-updateparams)


### Object literals

* [eDate](filtercontrolscomponent.md#markdown-header-object-literal-edate)
* [eTime](filtercontrolscomponent.md#markdown-header-object-literal-etime)
* [sDate](filtercontrolscomponent.md#markdown-header-object-literal-sdate)
* [sTime](filtercontrolscomponent.md#markdown-header-object-literal-stime)



---
## Constructors



### ⊕ **new FilterControlsComponent**(activatedRouter: *`ActivatedRoute`*, router: *`Router`*, gdaxDataService: *[GdaxDataService](gdaxdataservice.md)*, config: *`NgbTimepickerConfig`*): [FilterControlsComponent](filtercontrolscomponent.md)


*Defined in [app/components/filter-controls/filter-controls.component.ts:162](https://github.com/WilliamRADFunk/cryptobot-interface/blob/660a506/src/app/components/filter-controls/filter-controls.component.ts#L162)*



Constructor for the class


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| activatedRouter | `ActivatedRoute`   |  Angular's ActivatedRoute service for knowing current route |
| router | `Router`   |  Angular's Router service for changing route |
| gdaxDataService | [GdaxDataService](gdaxdataservice.md)   |  Internal service to get queried market data. |
| config | `NgbTimepickerConfig`   |  Configuration service for ngb's timepicker |





**Returns:** [FilterControlsComponent](filtercontrolscomponent.md)

---


## Properties


### «Private» activatedRouter

**●  activatedRouter**:  *`ActivatedRoute`* 

*Defined in [app/components/filter-controls/filter-controls.component.ts:172](https://github.com/WilliamRADFunk/cryptobot-interface/blob/660a506/src/app/components/filter-controls/filter-controls.component.ts#L172)*



Angular's ActivatedRoute service for knowing current route




___



###  busySubscription

**●  busySubscription**:  *`Subscription`* 

*Defined in [app/components/filter-controls/filter-controls.component.ts:20](https://github.com/WilliamRADFunk/cryptobot-interface/blob/660a506/src/app/components/filter-controls/filter-controls.component.ts#L20)*



Makes unsubscribing from this variable possible in OnDestroy




___



### «Private» config

**●  config**:  *`NgbTimepickerConfig`* 

*Defined in [app/components/filter-controls/filter-controls.component.ts:175](https://github.com/WilliamRADFunk/cryptobot-interface/blob/660a506/src/app/components/filter-controls/filter-controls.component.ts#L175)*



Configuration service for ngb's timepicker




___



###  endDate

**●  endDate**:  *`Date`*  =  new Date((new Date()).getTime() - 360000)

*Defined in [app/components/filter-controls/filter-controls.component.ts:24](https://github.com/WilliamRADFunk/cryptobot-interface/blob/660a506/src/app/components/filter-controls/filter-controls.component.ts#L24)*



Maintains the end date in actual Javascript Date form




___



### «Private» gdaxDataService

**●  gdaxDataService**:  *[GdaxDataService](gdaxdataservice.md)* 

*Defined in [app/components/filter-controls/filter-controls.component.ts:174](https://github.com/WilliamRADFunk/cryptobot-interface/blob/660a506/src/app/components/filter-controls/filter-controls.component.ts#L174)*



Internal service to get queried market data.




___



###  invalidEndDatetime

**●  invalidEndDatetime**:  *`boolean`*  = false

*Defined in [app/components/filter-controls/filter-controls.component.ts:70](https://github.com/WilliamRADFunk/cryptobot-interface/blob/660a506/src/app/components/filter-controls/filter-controls.component.ts#L70)*



Flag to determine whether or not to display red for end datetime




___



###  invalidStartDatetime

**●  invalidStartDatetime**:  *`boolean`*  = false

*Defined in [app/components/filter-controls/filter-controls.component.ts:66](https://github.com/WilliamRADFunk/cryptobot-interface/blob/660a506/src/app/components/filter-controls/filter-controls.component.ts#L66)*



Flag to determine whether or not to display red for start datetime




___



###  isBusy

**●  isBusy**:  *`boolean`*  = true

*Defined in [app/components/filter-controls/filter-controls.component.ts:44](https://github.com/WilliamRADFunk/cryptobot-interface/blob/660a506/src/app/components/filter-controls/filter-controls.component.ts#L44)*



Checks with service to see if it's busy in a query, and disables controls when it is.




___



###  isInitialized

**●  isInitialized**:  *`boolean`*  = false

*Defined in [app/components/filter-controls/filter-controls.component.ts:48](https://github.com/WilliamRADFunk/cryptobot-interface/blob/660a506/src/app/components/filter-controls/filter-controls.component.ts#L48)*



Skips change detections on start and end dates until inital settings are finished.




___



###  isInvalid

**●  isInvalid**:  *`boolean`*  = false

*Defined in [app/components/filter-controls/filter-controls.component.ts:62](https://github.com/WilliamRADFunk/cryptobot-interface/blob/660a506/src/app/components/filter-controls/filter-controls.component.ts#L62)*



Flag to determine whether or not to show invalid data colors inside the datetime filters.




___



###  isRelevant

**●  isRelevant**:  *`boolean`*  = true

*Defined in [app/components/filter-controls/filter-controls.component.ts:53](https://github.com/WilliamRADFunk/cryptobot-interface/blob/660a506/src/app/components/filter-controls/filter-controls.component.ts#L53)*



Checks with service to see if granularity control is relevant in a query, and disables control when it isn't.




___



###  isRelevantSubscription

**●  isRelevantSubscription**:  *`Subscription`* 

*Defined in [app/components/filter-controls/filter-controls.component.ts:57](https://github.com/WilliamRADFunk/cryptobot-interface/blob/660a506/src/app/components/filter-controls/filter-controls.component.ts#L57)*



Makes unsubscribing from this variable possible in OnDestroy




___



###  maxEndDate

**●  maxEndDate**:  *`object`* 

*Defined in [app/components/filter-controls/filter-controls.component.ts:74](https://github.com/WilliamRADFunk/cryptobot-interface/blob/660a506/src/app/components/filter-controls/filter-controls.component.ts#L74)*



Max date a dropdown from end date ngb-tooltip should show

#### Type declaration




 day: `number`






 month: `number`






 year: `number`







___



###  maxStartDate

**●  maxStartDate**:  *`object`* 

*Defined in [app/components/filter-controls/filter-controls.component.ts:78](https://github.com/WilliamRADFunk/cryptobot-interface/blob/660a506/src/app/components/filter-controls/filter-controls.component.ts#L78)*



Max date a dropdown from start date ngb-tooltip should show

#### Type declaration




 day: `number`






 month: `number`






 year: `number`







___



###  minEndDate

**●  minEndDate**:  *`object`* 

*Defined in [app/components/filter-controls/filter-controls.component.ts:82](https://github.com/WilliamRADFunk/cryptobot-interface/blob/660a506/src/app/components/filter-controls/filter-controls.component.ts#L82)*



Min date a dropdown from end date ngb-tooltip should show

#### Type declaration




 day: `number`






 month: `number`






 year: `number`







___



###  minStartDate

**●  minStartDate**:  *`object`* 

*Defined in [app/components/filter-controls/filter-controls.component.ts:86](https://github.com/WilliamRADFunk/cryptobot-interface/blob/660a506/src/app/components/filter-controls/filter-controls.component.ts#L86)*



Min date a dropdown from start date ngb-tooltip should show

#### Type declaration




 day: `number`






 month: `number`






 year: `number`







___



###  params

**●  params**:  *`ParamMap`* 

*Defined in [app/components/filter-controls/filter-controls.component.ts:90](https://github.com/WilliamRADFunk/cryptobot-interface/blob/660a506/src/app/components/filter-controls/filter-controls.component.ts#L90)*



Holds query params to check against in other parts of component




___



###  queryParamSubscription

**●  queryParamSubscription**:  *`Subscription`* 

*Defined in [app/components/filter-controls/filter-controls.component.ts:94](https://github.com/WilliamRADFunk/cryptobot-interface/blob/660a506/src/app/components/filter-controls/filter-controls.component.ts#L94)*



Makes unsubscribing from this variable possible in OnDestroy




___



### «Private» router

**●  router**:  *`Router`* 

*Defined in [app/components/filter-controls/filter-controls.component.ts:173](https://github.com/WilliamRADFunk/cryptobot-interface/blob/660a506/src/app/components/filter-controls/filter-controls.component.ts#L173)*



Angular's Router service for changing route




___



###  startDate

**●  startDate**:  *`Date`*  =  new Date(this.endDate.getTime() - 87600000)

*Defined in [app/components/filter-controls/filter-controls.component.ts:98](https://github.com/WilliamRADFunk/cryptobot-interface/blob/660a506/src/app/components/filter-controls/filter-controls.component.ts#L98)*



Maintains the start date in actual Javascript Date form




___



###  timeInterval

**●  timeInterval**:  *`number`*  = 3600

*Defined in [app/components/filter-controls/filter-controls.component.ts:117](https://github.com/WilliamRADFunk/cryptobot-interface/blob/660a506/src/app/components/filter-controls/filter-controls.component.ts#L117)*



Maintains current granularity level (ie. 3600)




___



###  timeIntervalLabel

**●  timeIntervalLabel**:  *`string`*  = "1 hour"

*Defined in [app/components/filter-controls/filter-controls.component.ts:121](https://github.com/WilliamRADFunk/cryptobot-interface/blob/660a506/src/app/components/filter-controls/filter-controls.component.ts#L121)*



Maintains current granularity level label (ie. '1 hour')




___



###  timeIntervalOptions

**●  timeIntervalOptions**:  *`object`[]*  =  [
    {
      label: '5 minutes',
      value: 300
    },
    {
      label: '15 minutes',
      value: 900
    },
    {
      label: '1 hour',
      value: 3600
    },
    {
      label: '6 hours',
      value: 21600
    },
    {
      label: '1 day',
      value: 86400
    }
  ]

*Defined in [app/components/filter-controls/filter-controls.component.ts:125](https://github.com/WilliamRADFunk/cryptobot-interface/blob/660a506/src/app/components/filter-controls/filter-controls.component.ts#L125)*



Contains all possible granularity levels




___



###  timeIntervals

**●  timeIntervals**:  *`object`[]*  =  this.timeIntervalOptions.slice()

*Defined in [app/components/filter-controls/filter-controls.component.ts:150](https://github.com/WilliamRADFunk/cryptobot-interface/blob/660a506/src/app/components/filter-controls/filter-controls.component.ts#L150)*



Contains all possible granularity levels available to end user




___



###  timeoutId

**●  timeoutId**:  *`any`*  =  null

*Defined in [app/components/filter-controls/filter-controls.component.ts:154](https://github.com/WilliamRADFunk/cryptobot-interface/blob/660a506/src/app/components/filter-controls/filter-controls.component.ts#L154)*



Message to use if start datetime is invalid




___



###  tooltip

**●  tooltip**:  *`NgbTooltip`* 

*Defined in [app/components/filter-controls/filter-controls.component.ts:16](https://github.com/WilliamRADFunk/cryptobot-interface/blob/660a506/src/app/components/filter-controls/filter-controls.component.ts#L16)*





___



###  warningMessage

**●  warningMessage**:  *`string`[]*  =  [
    'Start datetime must be before End datetime.',
    'Datetimes must be at least more than 10 minutes apart.',
    'Datetimes must be less than 299 days apart.'
  ]

*Defined in [app/components/filter-controls/filter-controls.component.ts:158](https://github.com/WilliamRADFunk/cryptobot-interface/blob/660a506/src/app/components/filter-controls/filter-controls.component.ts#L158)*



Message to use if start datetime is invalid




___


## Methods


###  adjustGranularityOptions

► **adjustGranularityOptions**(forcedChangedTimeInterval?: *`boolean`*): `void`



*Defined in [app/components/filter-controls/filter-controls.component.ts:233](https://github.com/WilliamRADFunk/cryptobot-interface/blob/660a506/src/app/components/filter-controls/filter-controls.component.ts#L233)*



Checks which of the time intervals have no more than the gdax max of 300 results between start and end datetimes


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| forcedChangedTimeInterval | `boolean`   |  signals whether to force a changedTimeInterval call |





**Returns:** `void`





___



###  changedTimeInterval

► **changedTimeInterval**(event: *`any`*, initChange?: *`boolean`*): `void`



*Defined in [app/components/filter-controls/filter-controls.component.ts:288](https://github.com/WilliamRADFunk/cryptobot-interface/blob/660a506/src/app/components/filter-controls/filter-controls.component.ts#L288)*



Triggered when user changes granularity choice Updates the service variable


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| event | `any`   |  label/value object containing granularity label and value |
| initChange | `boolean`   |  signals service that this is the OnInit value change. |





**Returns:** `void`





___



###  checkValidDateTime

► **checkValidDateTime**(): `boolean`



*Defined in [app/components/filter-controls/filter-controls.component.ts:305](https://github.com/WilliamRADFunk/cryptobot-interface/blob/660a506/src/app/components/filter-controls/filter-controls.component.ts#L305)*



Checks all aspects of both datetimes to make sure everything is valid




**Returns:** `boolean`
True is valid datetimes | False if something is wrong with one of them






___



###  checkValidDateTimeOrder

► **checkValidDateTimeOrder**(): `boolean`



*Defined in [app/components/filter-controls/filter-controls.component.ts:324](https://github.com/WilliamRADFunk/cryptobot-interface/blob/660a506/src/app/components/filter-controls/filter-controls.component.ts#L324)*



Checks to make sure end datetime isn't before the start datetime




**Returns:** `boolean`
True is valid | False if invalid






___



###  checkValidDay

► **checkValidDay**(date: *`object`*): `boolean`



*Defined in [app/components/filter-controls/filter-controls.component.ts:343](https://github.com/WilliamRADFunk/cryptobot-interface/blob/660a506/src/app/components/filter-controls/filter-controls.component.ts#L343)*



Checks to make sure day is valid


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| date | `object`   |  - |





**Returns:** `boolean`
True is valid | False if invalid






___



###  checkValidHours

► **checkValidHours**(time: *`object`*): `boolean`



*Defined in [app/components/filter-controls/filter-controls.component.ts:356](https://github.com/WilliamRADFunk/cryptobot-interface/blob/660a506/src/app/components/filter-controls/filter-controls.component.ts#L356)*



Checks to make sure hour is valid


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| time | `object`   |  - |





**Returns:** `boolean`
True is valid | False if invalid






___



###  checkValidMinutes

► **checkValidMinutes**(time: *`object`*): `boolean`



*Defined in [app/components/filter-controls/filter-controls.component.ts:369](https://github.com/WilliamRADFunk/cryptobot-interface/blob/660a506/src/app/components/filter-controls/filter-controls.component.ts#L369)*



Checks to make sure minute is valid


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| time | `object`   |  - |





**Returns:** `boolean`
True is valid | False if invalid






___



###  checkValidMonth

► **checkValidMonth**(date: *`object`*): `boolean`



*Defined in [app/components/filter-controls/filter-controls.component.ts:382](https://github.com/WilliamRADFunk/cryptobot-interface/blob/660a506/src/app/components/filter-controls/filter-controls.component.ts#L382)*



Checks to make sure month is valid


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| date | `object`   |  - |





**Returns:** `boolean`
True is valid | False if invalid






___



###  checkValidYear

► **checkValidYear**(date: *`object`*): `boolean`



*Defined in [app/components/filter-controls/filter-controls.component.ts:395](https://github.com/WilliamRADFunk/cryptobot-interface/blob/660a506/src/app/components/filter-controls/filter-controls.component.ts#L395)*



Checks to make sure year is valid


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| date | `object`   |  - |





**Returns:** `boolean`
True is valid | False if invalid






___



###  closeTooltip

► **closeTooltip**(): `void`



*Defined in [app/components/filter-controls/filter-controls.component.ts:407](https://github.com/WilliamRADFunk/cryptobot-interface/blob/660a506/src/app/components/filter-controls/filter-controls.component.ts#L407)*



Closes the datetime warning tooltip if it's open




**Returns:** `void`





___



### «Private» handleEndDateTimeParam

► **handleEndDateTimeParam**(): `void`



*Defined in [app/components/filter-controls/filter-controls.component.ts:418](https://github.com/WilliamRADFunk/cryptobot-interface/blob/660a506/src/app/components/filter-controls/filter-controls.component.ts#L418)*






**Returns:** `void`





___



### «Private» handleGranularityParam

► **handleGranularityParam**(): `void`



*Defined in [app/components/filter-controls/filter-controls.component.ts:456](https://github.com/WilliamRADFunk/cryptobot-interface/blob/660a506/src/app/components/filter-controls/filter-controls.component.ts#L456)*






**Returns:** `void`





___



### «Private» handleIncorrectDateTimeParams

► **handleIncorrectDateTimeParams**(): `void`



*Defined in [app/components/filter-controls/filter-controls.component.ts:474](https://github.com/WilliamRADFunk/cryptobot-interface/blob/660a506/src/app/components/filter-controls/filter-controls.component.ts#L474)*






**Returns:** `void`





___



### «Private» handleInitialParamUpdate

► **handleInitialParamUpdate**(): `void`



*Defined in [app/components/filter-controls/filter-controls.component.ts:490](https://github.com/WilliamRADFunk/cryptobot-interface/blob/660a506/src/app/components/filter-controls/filter-controls.component.ts#L490)*






**Returns:** `void`





___



### «Private» handleStartDateTimeParam

► **handleStartDateTimeParam**(): `void`



*Defined in [app/components/filter-controls/filter-controls.component.ts:515](https://github.com/WilliamRADFunk/cryptobot-interface/blob/660a506/src/app/components/filter-controls/filter-controls.component.ts#L515)*






**Returns:** `void`





___



###  isTooltipOpen

► **isTooltipOpen**(): `boolean`



*Defined in [app/components/filter-controls/filter-controls.component.ts:551](https://github.com/WilliamRADFunk/cryptobot-interface/blob/660a506/src/app/components/filter-controls/filter-controls.component.ts#L551)*



Tells whether or not the warningMessage tooltip is open or not




**Returns:** `boolean`
True if the warning tooltip is open } False if not






___



### «Private» ngOnDestroy

► **ngOnDestroy**(): `void`



*Defined in [app/components/filter-controls/filter-controls.component.ts:184](https://github.com/WilliamRADFunk/cryptobot-interface/blob/660a506/src/app/components/filter-controls/filter-controls.component.ts#L184)*






**Returns:** `void`





___



### «Private» ngOnInit

► **ngOnInit**(): `void`



*Defined in [app/components/filter-controls/filter-controls.component.ts:204](https://github.com/WilliamRADFunk/cryptobot-interface/blob/660a506/src/app/components/filter-controls/filter-controls.component.ts#L204)*






**Returns:** `void`





___



###  onEndDateTimeChange

► **onEndDateTimeChange**(): `void`



*Defined in [app/components/filter-controls/filter-controls.component.ts:558](https://github.com/WilliamRADFunk/cryptobot-interface/blob/660a506/src/app/components/filter-controls/filter-controls.component.ts#L558)*



Triggered when user changes end datetime choice Updates the service variable




**Returns:** `void`





___



###  onStartDateTimeChange

► **onStartDateTimeChange**(): `void`



*Defined in [app/components/filter-controls/filter-controls.component.ts:583](https://github.com/WilliamRADFunk/cryptobot-interface/blob/660a506/src/app/components/filter-controls/filter-controls.component.ts#L583)*



Triggered when user changes start datetime choice Updates the service variable




**Returns:** `void`





___



###  openTooltip

► **openTooltip**(): `void`



*Defined in [app/components/filter-controls/filter-controls.component.ts:607](https://github.com/WilliamRADFunk/cryptobot-interface/blob/660a506/src/app/components/filter-controls/filter-controls.component.ts#L607)*



Opens the datetime warning tooltip if it's closed




**Returns:** `void`





___



###  resetMinMax

► **resetMinMax**(): `void`



*Defined in [app/components/filter-controls/filter-controls.component.ts:616](https://github.com/WilliamRADFunk/cryptobot-interface/blob/660a506/src/app/components/filter-controls/filter-controls.component.ts#L616)*



Changes the min and max dates for both datepickers when one changes




**Returns:** `void`





___



###  setADateTime

► **setADateTime**(dateObject: *`Date`*, dateVarToUpdate: *`object`*, timeVarToUpdate: *`object`*): `void`



*Defined in [app/components/filter-controls/filter-controls.component.ts:647](https://github.com/WilliamRADFunk/cryptobot-interface/blob/660a506/src/app/components/filter-controls/filter-controls.component.ts#L647)*



Updates the date and time objects based on dateObject Date parameter


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| dateObject | `Date`   |  Date used to update the dateVarToUpdate & timeVarToUpdate objects |
| dateVarToUpdate | `object`   |  ngbDatepicker friendly object used as either start or end date |
| timeVarToUpdate | `object`   |  ngbTimepicker friendly object used as either start or end time |





**Returns:** `void`





___



###  updateParams

► **updateParams**(params: *`__type`*): `void`



*Defined in [app/components/filter-controls/filter-controls.component.ts:661](https://github.com/WilliamRADFunk/cryptobot-interface/blob/660a506/src/app/components/filter-controls/filter-controls.component.ts#L661)*



Called when params need updating. Avoids repetition.


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| params | `__type`   |  param object used to update queryParams |





**Returns:** `void`





___




## Object literal: eDate


Maintains the end date for 'End Date:' datepicker




###  day

**●  day**:  *`number`*  =  this.endDate.getDate()

*Defined in [app/components/filter-controls/filter-controls.component.ts:31](https://github.com/WilliamRADFunk/cryptobot-interface/blob/660a506/src/app/components/filter-controls/filter-controls.component.ts#L31)*





___


###  month

**●  month**:  *`number`*  =  this.endDate.getMonth() + 1

*Defined in [app/components/filter-controls/filter-controls.component.ts:30](https://github.com/WilliamRADFunk/cryptobot-interface/blob/660a506/src/app/components/filter-controls/filter-controls.component.ts#L30)*





___


###  year

**●  year**:  *`number`*  =  this.endDate.getFullYear()

*Defined in [app/components/filter-controls/filter-controls.component.ts:29](https://github.com/WilliamRADFunk/cryptobot-interface/blob/660a506/src/app/components/filter-controls/filter-controls.component.ts#L29)*





___



## Object literal: eTime


Maintains the end time for 'End Time:' timepicker




###  hour

**●  hour**:  *`number`*  =  this.endDate.getHours()

*Defined in [app/components/filter-controls/filter-controls.component.ts:37](https://github.com/WilliamRADFunk/cryptobot-interface/blob/660a506/src/app/components/filter-controls/filter-controls.component.ts#L37)*





___


###  minute

**●  minute**:  *`number`*  =  this.endDate.getMinutes()

*Defined in [app/components/filter-controls/filter-controls.component.ts:38](https://github.com/WilliamRADFunk/cryptobot-interface/blob/660a506/src/app/components/filter-controls/filter-controls.component.ts#L38)*





___



## Object literal: sDate


Maintains the start date for 'Start Date:' datepicker




###  day

**●  day**:  *`number`*  =  this.startDate.getDate()

*Defined in [app/components/filter-controls/filter-controls.component.ts:105](https://github.com/WilliamRADFunk/cryptobot-interface/blob/660a506/src/app/components/filter-controls/filter-controls.component.ts#L105)*





___


###  month

**●  month**:  *`number`*  =  this.startDate.getMonth() + 1

*Defined in [app/components/filter-controls/filter-controls.component.ts:104](https://github.com/WilliamRADFunk/cryptobot-interface/blob/660a506/src/app/components/filter-controls/filter-controls.component.ts#L104)*





___


###  year

**●  year**:  *`number`*  =  this.startDate.getFullYear()

*Defined in [app/components/filter-controls/filter-controls.component.ts:103](https://github.com/WilliamRADFunk/cryptobot-interface/blob/660a506/src/app/components/filter-controls/filter-controls.component.ts#L103)*





___



## Object literal: sTime


Maintains the start time for 'Start Time:' timepicker




###  hour

**●  hour**:  *`number`*  =  this.startDate.getHours()

*Defined in [app/components/filter-controls/filter-controls.component.ts:111](https://github.com/WilliamRADFunk/cryptobot-interface/blob/660a506/src/app/components/filter-controls/filter-controls.component.ts#L111)*





___


###  minute

**●  minute**:  *`number`*  =  this.startDate.getMinutes()

*Defined in [app/components/filter-controls/filter-controls.component.ts:112](https://github.com/WilliamRADFunk/cryptobot-interface/blob/660a506/src/app/components/filter-controls/filter-controls.component.ts#L112)*





___


