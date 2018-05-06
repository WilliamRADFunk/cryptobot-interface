[cryptobot-interface](../README.md) > [FilterControlsComponent](../classes/filtercontrolscomponent.md)



# Class: FilterControlsComponent

## Implements

* `OnInit`

## Index

### Constructors

* [constructor](filtercontrolscomponent.md#markdown-header-constructor)


### Properties

* [activatedRouter](filtercontrolscomponent.md#markdown-header-private-activatedrouter)
* [config](filtercontrolscomponent.md#markdown-header-private-config)
* [endDate](filtercontrolscomponent.md#markdown-header-enddate)
* [gdaxDataService](filtercontrolscomponent.md#markdown-header-private-gdaxdataservice)
* [invalidEndDatetime](filtercontrolscomponent.md#markdown-header-invalidenddatetime)
* [invalidStartDatetime](filtercontrolscomponent.md#markdown-header-invalidstartdatetime)
* [isBusy](filtercontrolscomponent.md#markdown-header-isbusy)
* [isInitialized](filtercontrolscomponent.md#markdown-header-isinitialized)
* [isInvalid](filtercontrolscomponent.md#markdown-header-isinvalid)
* [isRelevant](filtercontrolscomponent.md#markdown-header-isrelevant)
* [maxEndDate](filtercontrolscomponent.md#markdown-header-maxenddate)
* [maxStartDate](filtercontrolscomponent.md#markdown-header-maxstartdate)
* [minEndDate](filtercontrolscomponent.md#markdown-header-minenddate)
* [minStartDate](filtercontrolscomponent.md#markdown-header-minstartdate)
* [params](filtercontrolscomponent.md#markdown-header-params)
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
* [ngOnInit](filtercontrolscomponent.md#markdown-header-private-ngoninit)
* [onEndDateChange](filtercontrolscomponent.md#markdown-header-onenddatechange)
* [onEndTimeChange](filtercontrolscomponent.md#markdown-header-onendtimechange)
* [onStartDateChange](filtercontrolscomponent.md#markdown-header-onstartdatechange)
* [onStartTimeChange](filtercontrolscomponent.md#markdown-header-onstarttimechange)
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


*Defined in [app/components/filter-controls/filter-controls.component.ts:149](https://github.com/WilliamRADFunk/cryptobot-interface/blob/b6d7879/src/app/components/filter-controls/filter-controls.component.ts#L149)*



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

*Defined in [app/components/filter-controls/filter-controls.component.ts:159](https://github.com/WilliamRADFunk/cryptobot-interface/blob/b6d7879/src/app/components/filter-controls/filter-controls.component.ts#L159)*



Angular's ActivatedRoute service for knowing current route




___



### «Private» config

**●  config**:  *`NgbTimepickerConfig`* 

*Defined in [app/components/filter-controls/filter-controls.component.ts:162](https://github.com/WilliamRADFunk/cryptobot-interface/blob/b6d7879/src/app/components/filter-controls/filter-controls.component.ts#L162)*



Configuration service for ngb's timepicker




___



###  endDate

**●  endDate**:  *`Date`*  =  new Date()

*Defined in [app/components/filter-controls/filter-controls.component.ts:19](https://github.com/WilliamRADFunk/cryptobot-interface/blob/b6d7879/src/app/components/filter-controls/filter-controls.component.ts#L19)*



Maintains the end date in actual Javascript Date form




___



### «Private» gdaxDataService

**●  gdaxDataService**:  *[GdaxDataService](gdaxdataservice.md)* 

*Defined in [app/components/filter-controls/filter-controls.component.ts:161](https://github.com/WilliamRADFunk/cryptobot-interface/blob/b6d7879/src/app/components/filter-controls/filter-controls.component.ts#L161)*



Internal service to get queried market data.




___



###  invalidEndDatetime

**●  invalidEndDatetime**:  *`boolean`*  = false

*Defined in [app/components/filter-controls/filter-controls.component.ts:61](https://github.com/WilliamRADFunk/cryptobot-interface/blob/b6d7879/src/app/components/filter-controls/filter-controls.component.ts#L61)*



Flag to determine whether or not to display red for end datetime




___



###  invalidStartDatetime

**●  invalidStartDatetime**:  *`boolean`*  = false

*Defined in [app/components/filter-controls/filter-controls.component.ts:57](https://github.com/WilliamRADFunk/cryptobot-interface/blob/b6d7879/src/app/components/filter-controls/filter-controls.component.ts#L57)*



Flag to determine whether or not to display red for start datetime




___



###  isBusy

**●  isBusy**:  *`boolean`*  = true

*Defined in [app/components/filter-controls/filter-controls.component.ts:39](https://github.com/WilliamRADFunk/cryptobot-interface/blob/b6d7879/src/app/components/filter-controls/filter-controls.component.ts#L39)*



Checks with service to see if it's busy in a query, and disables controls when it is.




___



###  isInitialized

**●  isInitialized**:  *`boolean`*  = false

*Defined in [app/components/filter-controls/filter-controls.component.ts:43](https://github.com/WilliamRADFunk/cryptobot-interface/blob/b6d7879/src/app/components/filter-controls/filter-controls.component.ts#L43)*



Skips change detections on start and end dates until inital settings are finished.




___



###  isInvalid

**●  isInvalid**:  *`boolean`*  = false

*Defined in [app/components/filter-controls/filter-controls.component.ts:53](https://github.com/WilliamRADFunk/cryptobot-interface/blob/b6d7879/src/app/components/filter-controls/filter-controls.component.ts#L53)*



Flag to determine whether or not to show invalid data colors inside the datetime filters.




___



###  isRelevant

**●  isRelevant**:  *`boolean`*  = true

*Defined in [app/components/filter-controls/filter-controls.component.ts:48](https://github.com/WilliamRADFunk/cryptobot-interface/blob/b6d7879/src/app/components/filter-controls/filter-controls.component.ts#L48)*



Checks with service to see if granularity control is relevant in a query, and disables control when it isn't.




___



###  maxEndDate

**●  maxEndDate**:  *`object`* 

*Defined in [app/components/filter-controls/filter-controls.component.ts:65](https://github.com/WilliamRADFunk/cryptobot-interface/blob/b6d7879/src/app/components/filter-controls/filter-controls.component.ts#L65)*



Max date a dropdown from end date ngb-tooltip should show

#### Type declaration




 day: `number`






 month: `number`






 year: `number`







___



###  maxStartDate

**●  maxStartDate**:  *`object`* 

*Defined in [app/components/filter-controls/filter-controls.component.ts:69](https://github.com/WilliamRADFunk/cryptobot-interface/blob/b6d7879/src/app/components/filter-controls/filter-controls.component.ts#L69)*



Max date a dropdown from start date ngb-tooltip should show

#### Type declaration




 day: `number`






 month: `number`






 year: `number`







___



###  minEndDate

**●  minEndDate**:  *`object`* 

*Defined in [app/components/filter-controls/filter-controls.component.ts:73](https://github.com/WilliamRADFunk/cryptobot-interface/blob/b6d7879/src/app/components/filter-controls/filter-controls.component.ts#L73)*



Min date a dropdown from end date ngb-tooltip should show

#### Type declaration




 day: `number`






 month: `number`






 year: `number`







___



###  minStartDate

**●  minStartDate**:  *`object`* 

*Defined in [app/components/filter-controls/filter-controls.component.ts:77](https://github.com/WilliamRADFunk/cryptobot-interface/blob/b6d7879/src/app/components/filter-controls/filter-controls.component.ts#L77)*



Min date a dropdown from start date ngb-tooltip should show

#### Type declaration




 day: `number`






 month: `number`






 year: `number`







___



###  params

**●  params**:  *`ParamMap`* 

*Defined in [app/components/filter-controls/filter-controls.component.ts:81](https://github.com/WilliamRADFunk/cryptobot-interface/blob/b6d7879/src/app/components/filter-controls/filter-controls.component.ts#L81)*



Holds query params to check against in other parts of component




___



### «Private» router

**●  router**:  *`Router`* 

*Defined in [app/components/filter-controls/filter-controls.component.ts:160](https://github.com/WilliamRADFunk/cryptobot-interface/blob/b6d7879/src/app/components/filter-controls/filter-controls.component.ts#L160)*



Angular's Router service for changing route




___



###  startDate

**●  startDate**:  *`Date`*  =  new Date(this.endDate.getTime() - 87600000)

*Defined in [app/components/filter-controls/filter-controls.component.ts:85](https://github.com/WilliamRADFunk/cryptobot-interface/blob/b6d7879/src/app/components/filter-controls/filter-controls.component.ts#L85)*



Maintains the start date in actual Javascript Date form




___



###  timeInterval

**●  timeInterval**:  *`number`*  = 3600

*Defined in [app/components/filter-controls/filter-controls.component.ts:104](https://github.com/WilliamRADFunk/cryptobot-interface/blob/b6d7879/src/app/components/filter-controls/filter-controls.component.ts#L104)*



Maintains current granularity level (ie. 3600)




___



###  timeIntervalLabel

**●  timeIntervalLabel**:  *`string`*  = "1 hour"

*Defined in [app/components/filter-controls/filter-controls.component.ts:108](https://github.com/WilliamRADFunk/cryptobot-interface/blob/b6d7879/src/app/components/filter-controls/filter-controls.component.ts#L108)*



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

*Defined in [app/components/filter-controls/filter-controls.component.ts:112](https://github.com/WilliamRADFunk/cryptobot-interface/blob/b6d7879/src/app/components/filter-controls/filter-controls.component.ts#L112)*



Contains all possible granularity levels




___



###  timeIntervals

**●  timeIntervals**:  *`object`[]*  =  this.timeIntervalOptions.slice()

*Defined in [app/components/filter-controls/filter-controls.component.ts:137](https://github.com/WilliamRADFunk/cryptobot-interface/blob/b6d7879/src/app/components/filter-controls/filter-controls.component.ts#L137)*



Contains all possible granularity levels available to end user




___



###  timeoutId

**●  timeoutId**:  *`any`*  =  null

*Defined in [app/components/filter-controls/filter-controls.component.ts:141](https://github.com/WilliamRADFunk/cryptobot-interface/blob/b6d7879/src/app/components/filter-controls/filter-controls.component.ts#L141)*



Message to use if start datetime is invalid




___



###  tooltip

**●  tooltip**:  *`NgbTooltip`* 

*Defined in [app/components/filter-controls/filter-controls.component.ts:15](https://github.com/WilliamRADFunk/cryptobot-interface/blob/b6d7879/src/app/components/filter-controls/filter-controls.component.ts#L15)*





___



###  warningMessage

**●  warningMessage**:  *`string`[]*  =  [
    'Start datetime must be before End datetime.',
    'Datetimes must be at least more than 10 minutes apart.',
    'Datetimes must be less than 299 days apart.'
  ]

*Defined in [app/components/filter-controls/filter-controls.component.ts:145](https://github.com/WilliamRADFunk/cryptobot-interface/blob/b6d7879/src/app/components/filter-controls/filter-controls.component.ts#L145)*



Message to use if start datetime is invalid




___


## Methods


###  adjustGranularityOptions

► **adjustGranularityOptions**(forcedChangedTimeInterval?: *`boolean`*): `void`



*Defined in [app/components/filter-controls/filter-controls.component.ts:198](https://github.com/WilliamRADFunk/cryptobot-interface/blob/b6d7879/src/app/components/filter-controls/filter-controls.component.ts#L198)*



Checks which of the time intervals have no more than the gdax max of 300 results between start and end datetimes


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| forcedChangedTimeInterval | `boolean`   |  signals whether to force a changedTimeInterval call |





**Returns:** `void`





___



###  changedTimeInterval

► **changedTimeInterval**(event: *`any`*, initChange?: *`boolean`*): `void`



*Defined in [app/components/filter-controls/filter-controls.component.ts:253](https://github.com/WilliamRADFunk/cryptobot-interface/blob/b6d7879/src/app/components/filter-controls/filter-controls.component.ts#L253)*



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



*Defined in [app/components/filter-controls/filter-controls.component.ts:268](https://github.com/WilliamRADFunk/cryptobot-interface/blob/b6d7879/src/app/components/filter-controls/filter-controls.component.ts#L268)*



Checks all aspects of both datetimes to make sure everything is valid




**Returns:** `boolean`
True is valid datetimes | False if something is wrong with one of them






___



###  checkValidDateTimeOrder

► **checkValidDateTimeOrder**(): `boolean`



*Defined in [app/components/filter-controls/filter-controls.component.ts:287](https://github.com/WilliamRADFunk/cryptobot-interface/blob/b6d7879/src/app/components/filter-controls/filter-controls.component.ts#L287)*



Checks to make sure end datetime isn't before the start datetime




**Returns:** `boolean`
True is valid | False if invalid






___



###  checkValidDay

► **checkValidDay**(date: *`object`*): `boolean`



*Defined in [app/components/filter-controls/filter-controls.component.ts:306](https://github.com/WilliamRADFunk/cryptobot-interface/blob/b6d7879/src/app/components/filter-controls/filter-controls.component.ts#L306)*



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



*Defined in [app/components/filter-controls/filter-controls.component.ts:319](https://github.com/WilliamRADFunk/cryptobot-interface/blob/b6d7879/src/app/components/filter-controls/filter-controls.component.ts#L319)*



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



*Defined in [app/components/filter-controls/filter-controls.component.ts:332](https://github.com/WilliamRADFunk/cryptobot-interface/blob/b6d7879/src/app/components/filter-controls/filter-controls.component.ts#L332)*



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



*Defined in [app/components/filter-controls/filter-controls.component.ts:345](https://github.com/WilliamRADFunk/cryptobot-interface/blob/b6d7879/src/app/components/filter-controls/filter-controls.component.ts#L345)*



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



*Defined in [app/components/filter-controls/filter-controls.component.ts:358](https://github.com/WilliamRADFunk/cryptobot-interface/blob/b6d7879/src/app/components/filter-controls/filter-controls.component.ts#L358)*



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



*Defined in [app/components/filter-controls/filter-controls.component.ts:370](https://github.com/WilliamRADFunk/cryptobot-interface/blob/b6d7879/src/app/components/filter-controls/filter-controls.component.ts#L370)*



Closes the datetime warning tooltip if it's open




**Returns:** `void`





___



### «Private» handleEndDateTimeParam

► **handleEndDateTimeParam**(): `void`



*Defined in [app/components/filter-controls/filter-controls.component.ts:381](https://github.com/WilliamRADFunk/cryptobot-interface/blob/b6d7879/src/app/components/filter-controls/filter-controls.component.ts#L381)*






**Returns:** `void`





___



### «Private» handleGranularityParam

► **handleGranularityParam**(): `void`



*Defined in [app/components/filter-controls/filter-controls.component.ts:406](https://github.com/WilliamRADFunk/cryptobot-interface/blob/b6d7879/src/app/components/filter-controls/filter-controls.component.ts#L406)*






**Returns:** `void`





___



### «Private» handleIncorrectDateTimeParams

► **handleIncorrectDateTimeParams**(): `void`



*Defined in [app/components/filter-controls/filter-controls.component.ts:424](https://github.com/WilliamRADFunk/cryptobot-interface/blob/b6d7879/src/app/components/filter-controls/filter-controls.component.ts#L424)*






**Returns:** `void`





___



### «Private» handleInitialParamUpdate

► **handleInitialParamUpdate**(): `void`



*Defined in [app/components/filter-controls/filter-controls.component.ts:440](https://github.com/WilliamRADFunk/cryptobot-interface/blob/b6d7879/src/app/components/filter-controls/filter-controls.component.ts#L440)*






**Returns:** `void`





___



### «Private» handleStartDateTimeParam

► **handleStartDateTimeParam**(): `void`



*Defined in [app/components/filter-controls/filter-controls.component.ts:465](https://github.com/WilliamRADFunk/cryptobot-interface/blob/b6d7879/src/app/components/filter-controls/filter-controls.component.ts#L465)*






**Returns:** `void`





___



###  isTooltipOpen

► **isTooltipOpen**(): `boolean`



*Defined in [app/components/filter-controls/filter-controls.component.ts:488](https://github.com/WilliamRADFunk/cryptobot-interface/blob/b6d7879/src/app/components/filter-controls/filter-controls.component.ts#L488)*



Tells whether or not the warningMessage tooltip is open or not




**Returns:** `boolean`
True if the warning tooltip is open } False if not






___



### «Private» ngOnInit

► **ngOnInit**(): `void`



*Defined in [app/components/filter-controls/filter-controls.component.ts:171](https://github.com/WilliamRADFunk/cryptobot-interface/blob/b6d7879/src/app/components/filter-controls/filter-controls.component.ts#L171)*






**Returns:** `void`





___



###  onEndDateChange

► **onEndDateChange**(): `void`



*Defined in [app/components/filter-controls/filter-controls.component.ts:495](https://github.com/WilliamRADFunk/cryptobot-interface/blob/b6d7879/src/app/components/filter-controls/filter-controls.component.ts#L495)*



Triggered when user changes end date choice Updates the service variable




**Returns:** `void`





___



###  onEndTimeChange

► **onEndTimeChange**(): `void`



*Defined in [app/components/filter-controls/filter-controls.component.ts:520](https://github.com/WilliamRADFunk/cryptobot-interface/blob/b6d7879/src/app/components/filter-controls/filter-controls.component.ts#L520)*



Triggered when user changes end time choice Updates the service variable




**Returns:** `void`





___



###  onStartDateChange

► **onStartDateChange**(): `void`



*Defined in [app/components/filter-controls/filter-controls.component.ts:545](https://github.com/WilliamRADFunk/cryptobot-interface/blob/b6d7879/src/app/components/filter-controls/filter-controls.component.ts#L545)*



Triggered when user changes start date choice Updates the service variable




**Returns:** `void`





___



###  onStartTimeChange

► **onStartTimeChange**(): `void`



*Defined in [app/components/filter-controls/filter-controls.component.ts:570](https://github.com/WilliamRADFunk/cryptobot-interface/blob/b6d7879/src/app/components/filter-controls/filter-controls.component.ts#L570)*



Triggered when user changes start time choice Updates the service variable




**Returns:** `void`





___



###  openTooltip

► **openTooltip**(): `void`



*Defined in [app/components/filter-controls/filter-controls.component.ts:594](https://github.com/WilliamRADFunk/cryptobot-interface/blob/b6d7879/src/app/components/filter-controls/filter-controls.component.ts#L594)*



Opens the datetime warning tooltip if it's closed




**Returns:** `void`





___



###  resetMinMax

► **resetMinMax**(): `void`



*Defined in [app/components/filter-controls/filter-controls.component.ts:603](https://github.com/WilliamRADFunk/cryptobot-interface/blob/b6d7879/src/app/components/filter-controls/filter-controls.component.ts#L603)*



Changes the min and max dates for both datepickers when one changes




**Returns:** `void`





___



###  setADateTime

► **setADateTime**(dateObject: *`Date`*, dateVarToUpdate: *`object`*, timeVarToUpdate: *`object`*): `void`



*Defined in [app/components/filter-controls/filter-controls.component.ts:634](https://github.com/WilliamRADFunk/cryptobot-interface/blob/b6d7879/src/app/components/filter-controls/filter-controls.component.ts#L634)*



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



*Defined in [app/components/filter-controls/filter-controls.component.ts:648](https://github.com/WilliamRADFunk/cryptobot-interface/blob/b6d7879/src/app/components/filter-controls/filter-controls.component.ts#L648)*



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

*Defined in [app/components/filter-controls/filter-controls.component.ts:26](https://github.com/WilliamRADFunk/cryptobot-interface/blob/b6d7879/src/app/components/filter-controls/filter-controls.component.ts#L26)*





___


###  month

**●  month**:  *`number`*  =  this.endDate.getMonth() + 1

*Defined in [app/components/filter-controls/filter-controls.component.ts:25](https://github.com/WilliamRADFunk/cryptobot-interface/blob/b6d7879/src/app/components/filter-controls/filter-controls.component.ts#L25)*





___


###  year

**●  year**:  *`number`*  =  this.endDate.getFullYear()

*Defined in [app/components/filter-controls/filter-controls.component.ts:24](https://github.com/WilliamRADFunk/cryptobot-interface/blob/b6d7879/src/app/components/filter-controls/filter-controls.component.ts#L24)*





___



## Object literal: eTime


Maintains the end time for 'End Time:' timepicker




###  hour

**●  hour**:  *`number`*  =  this.endDate.getHours()

*Defined in [app/components/filter-controls/filter-controls.component.ts:32](https://github.com/WilliamRADFunk/cryptobot-interface/blob/b6d7879/src/app/components/filter-controls/filter-controls.component.ts#L32)*





___


###  minute

**●  minute**:  *`number`*  =  this.endDate.getMinutes()

*Defined in [app/components/filter-controls/filter-controls.component.ts:33](https://github.com/WilliamRADFunk/cryptobot-interface/blob/b6d7879/src/app/components/filter-controls/filter-controls.component.ts#L33)*





___



## Object literal: sDate


Maintains the start date for 'Start Date:' datepicker




###  day

**●  day**:  *`number`*  =  this.startDate.getDate()

*Defined in [app/components/filter-controls/filter-controls.component.ts:92](https://github.com/WilliamRADFunk/cryptobot-interface/blob/b6d7879/src/app/components/filter-controls/filter-controls.component.ts#L92)*





___


###  month

**●  month**:  *`number`*  =  this.startDate.getMonth() + 1

*Defined in [app/components/filter-controls/filter-controls.component.ts:91](https://github.com/WilliamRADFunk/cryptobot-interface/blob/b6d7879/src/app/components/filter-controls/filter-controls.component.ts#L91)*





___


###  year

**●  year**:  *`number`*  =  this.startDate.getFullYear()

*Defined in [app/components/filter-controls/filter-controls.component.ts:90](https://github.com/WilliamRADFunk/cryptobot-interface/blob/b6d7879/src/app/components/filter-controls/filter-controls.component.ts#L90)*





___



## Object literal: sTime


Maintains the start time for 'Start Time:' timepicker




###  hour

**●  hour**:  *`number`*  =  this.startDate.getHours()

*Defined in [app/components/filter-controls/filter-controls.component.ts:98](https://github.com/WilliamRADFunk/cryptobot-interface/blob/b6d7879/src/app/components/filter-controls/filter-controls.component.ts#L98)*





___


###  minute

**●  minute**:  *`number`*  =  this.startDate.getMinutes()

*Defined in [app/components/filter-controls/filter-controls.component.ts:99](https://github.com/WilliamRADFunk/cryptobot-interface/blob/b6d7879/src/app/components/filter-controls/filter-controls.component.ts#L99)*





___


