[cryptobot-interface](../README.md) > [FilterControlsComponent](../classes/filtercontrolscomponent.md)



# Class: FilterControlsComponent

## Implements

* `OnInit`

## Index

### Constructors

* [constructor](filtercontrolscomponent.md#markdown-header-constructor)


### Properties

* [config](filtercontrolscomponent.md#markdown-header-private-config)
* [endDate](filtercontrolscomponent.md#markdown-header-enddate)
* [gdaxDataService](filtercontrolscomponent.md#markdown-header-private-gdaxdataservice)
* [invalidEndDatetime](filtercontrolscomponent.md#markdown-header-invalidenddatetime)
* [invalidStartDatetime](filtercontrolscomponent.md#markdown-header-invalidstartdatetime)
* [isBusy](filtercontrolscomponent.md#markdown-header-isbusy)
* [isInvalid](filtercontrolscomponent.md#markdown-header-isinvalid)
* [isRelevant](filtercontrolscomponent.md#markdown-header-isrelevant)
* [maxEndDate](filtercontrolscomponent.md#markdown-header-maxenddate)
* [maxStartDate](filtercontrolscomponent.md#markdown-header-maxstartdate)
* [minEndDate](filtercontrolscomponent.md#markdown-header-minenddate)
* [minStartDate](filtercontrolscomponent.md#markdown-header-minstartdate)
* [startDate](filtercontrolscomponent.md#markdown-header-startdate)
* [timeInterval](filtercontrolscomponent.md#markdown-header-timeinterval)
* [timeIntervalLabel](filtercontrolscomponent.md#markdown-header-timeintervallabel)
* [timeIntervalOptions](filtercontrolscomponent.md#markdown-header-timeintervaloptions)
* [timeIntervals](filtercontrolscomponent.md#markdown-header-timeintervals)
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
* [isTooltipOpen](filtercontrolscomponent.md#markdown-header-istooltipopen)
* [ngOnInit](filtercontrolscomponent.md#markdown-header-private-ngoninit)
* [onEndDateChange](filtercontrolscomponent.md#markdown-header-onenddatechange)
* [onEndTimeChange](filtercontrolscomponent.md#markdown-header-onendtimechange)
* [onStartDateChange](filtercontrolscomponent.md#markdown-header-onstartdatechange)
* [onStartTimeChange](filtercontrolscomponent.md#markdown-header-onstarttimechange)
* [openTooltip](filtercontrolscomponent.md#markdown-header-opentooltip)
* [resetMinMax](filtercontrolscomponent.md#markdown-header-resetminmax)


### Object literals

* [eDate](filtercontrolscomponent.md#markdown-header-object-literal-edate)
* [eTime](filtercontrolscomponent.md#markdown-header-object-literal-etime)
* [sDate](filtercontrolscomponent.md#markdown-header-object-literal-sdate)
* [sTime](filtercontrolscomponent.md#markdown-header-object-literal-stime)



---
## Constructors



### ⊕ **new FilterControlsComponent**(gdaxDataService: *[GdaxDataService](gdaxdataservice.md)*, config: *`NgbTimepickerConfig`*): [FilterControlsComponent](filtercontrolscomponent.md)


*Defined in [app/components/filter-controls/filter-controls.component.ts:136](https://github.com/WilliamRADFunk/cryptobot-interface/blob/ade795d/src/app/components/filter-controls/filter-controls.component.ts#L136)*



Constructor for the class


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| gdaxDataService | [GdaxDataService](gdaxdataservice.md)   |  - |
| config | `NgbTimepickerConfig`   |  - |





**Returns:** [FilterControlsComponent](filtercontrolscomponent.md)

---


## Properties


### «Private» config

**●  config**:  *`NgbTimepickerConfig`* 

*Defined in [app/components/filter-controls/filter-controls.component.ts:143](https://github.com/WilliamRADFunk/cryptobot-interface/blob/ade795d/src/app/components/filter-controls/filter-controls.component.ts#L143)*





___



###  endDate

**●  endDate**:  *`Date`*  =  new Date()

*Defined in [app/components/filter-controls/filter-controls.component.ts:18](https://github.com/WilliamRADFunk/cryptobot-interface/blob/ade795d/src/app/components/filter-controls/filter-controls.component.ts#L18)*



Maintains the end date in actual Javascript Date form




___



### «Private» gdaxDataService

**●  gdaxDataService**:  *[GdaxDataService](gdaxdataservice.md)* 

*Defined in [app/components/filter-controls/filter-controls.component.ts:142](https://github.com/WilliamRADFunk/cryptobot-interface/blob/ade795d/src/app/components/filter-controls/filter-controls.component.ts#L142)*





___



###  invalidEndDatetime

**●  invalidEndDatetime**:  *`boolean`*  = false

*Defined in [app/components/filter-controls/filter-controls.component.ts:56](https://github.com/WilliamRADFunk/cryptobot-interface/blob/ade795d/src/app/components/filter-controls/filter-controls.component.ts#L56)*



Flag to determine whether or not to display red for end datetime




___



###  invalidStartDatetime

**●  invalidStartDatetime**:  *`boolean`*  = false

*Defined in [app/components/filter-controls/filter-controls.component.ts:52](https://github.com/WilliamRADFunk/cryptobot-interface/blob/ade795d/src/app/components/filter-controls/filter-controls.component.ts#L52)*



Flag to determine whether or not to display red for start datetime




___



###  isBusy

**●  isBusy**:  *`boolean`*  = true

*Defined in [app/components/filter-controls/filter-controls.component.ts:38](https://github.com/WilliamRADFunk/cryptobot-interface/blob/ade795d/src/app/components/filter-controls/filter-controls.component.ts#L38)*



Checks with service to see if it's busy in a query, and disables controls when it is.




___



###  isInvalid

**●  isInvalid**:  *`boolean`*  = false

*Defined in [app/components/filter-controls/filter-controls.component.ts:48](https://github.com/WilliamRADFunk/cryptobot-interface/blob/ade795d/src/app/components/filter-controls/filter-controls.component.ts#L48)*



Flag to determine whether or not to show invalid data colors inside the datetime filters.




___



###  isRelevant

**●  isRelevant**:  *`boolean`*  = true

*Defined in [app/components/filter-controls/filter-controls.component.ts:43](https://github.com/WilliamRADFunk/cryptobot-interface/blob/ade795d/src/app/components/filter-controls/filter-controls.component.ts#L43)*



Checks with service to see if granularity control is relevant in a query, and disables control when it isn't.




___



###  maxEndDate

**●  maxEndDate**:  *`object`* 

*Defined in [app/components/filter-controls/filter-controls.component.ts:60](https://github.com/WilliamRADFunk/cryptobot-interface/blob/ade795d/src/app/components/filter-controls/filter-controls.component.ts#L60)*



Max date a dropdown from end date ngb-tooltip should show

#### Type declaration




 day: `number`






 month: `number`






 year: `number`







___



###  maxStartDate

**●  maxStartDate**:  *`object`* 

*Defined in [app/components/filter-controls/filter-controls.component.ts:64](https://github.com/WilliamRADFunk/cryptobot-interface/blob/ade795d/src/app/components/filter-controls/filter-controls.component.ts#L64)*



Max date a dropdown from start date ngb-tooltip should show

#### Type declaration




 day: `number`






 month: `number`






 year: `number`







___



###  minEndDate

**●  minEndDate**:  *`object`* 

*Defined in [app/components/filter-controls/filter-controls.component.ts:68](https://github.com/WilliamRADFunk/cryptobot-interface/blob/ade795d/src/app/components/filter-controls/filter-controls.component.ts#L68)*



Min date a dropdown from end date ngb-tooltip should show

#### Type declaration




 day: `number`






 month: `number`






 year: `number`







___



###  minStartDate

**●  minStartDate**:  *`object`* 

*Defined in [app/components/filter-controls/filter-controls.component.ts:72](https://github.com/WilliamRADFunk/cryptobot-interface/blob/ade795d/src/app/components/filter-controls/filter-controls.component.ts#L72)*



Min date a dropdown from start date ngb-tooltip should show

#### Type declaration




 day: `number`






 month: `number`






 year: `number`







___



###  startDate

**●  startDate**:  *`Date`*  =  new Date(this.endDate.getTime() - 87600000)

*Defined in [app/components/filter-controls/filter-controls.component.ts:76](https://github.com/WilliamRADFunk/cryptobot-interface/blob/ade795d/src/app/components/filter-controls/filter-controls.component.ts#L76)*



Maintains the start date in actual Javascript Date form




___



###  timeInterval

**●  timeInterval**:  *`number`*  = 3600

*Defined in [app/components/filter-controls/filter-controls.component.ts:95](https://github.com/WilliamRADFunk/cryptobot-interface/blob/ade795d/src/app/components/filter-controls/filter-controls.component.ts#L95)*



Maintains current granularity level (ie. 3600)




___



###  timeIntervalLabel

**●  timeIntervalLabel**:  *`string`*  = "1 hour"

*Defined in [app/components/filter-controls/filter-controls.component.ts:99](https://github.com/WilliamRADFunk/cryptobot-interface/blob/ade795d/src/app/components/filter-controls/filter-controls.component.ts#L99)*



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

*Defined in [app/components/filter-controls/filter-controls.component.ts:103](https://github.com/WilliamRADFunk/cryptobot-interface/blob/ade795d/src/app/components/filter-controls/filter-controls.component.ts#L103)*



Contains all possible granularity levels




___



###  timeIntervals

**●  timeIntervals**:  *`object`[]*  =  this.timeIntervalOptions.slice()

*Defined in [app/components/filter-controls/filter-controls.component.ts:128](https://github.com/WilliamRADFunk/cryptobot-interface/blob/ade795d/src/app/components/filter-controls/filter-controls.component.ts#L128)*



Contains all possible granularity levels available to end user




___



###  tooltip

**●  tooltip**:  *`NgbTooltip`* 

*Defined in [app/components/filter-controls/filter-controls.component.ts:14](https://github.com/WilliamRADFunk/cryptobot-interface/blob/ade795d/src/app/components/filter-controls/filter-controls.component.ts#L14)*





___



###  warningMessage

**●  warningMessage**:  *`string`[]*  =  [
    'Start datetime must be before End datetime.',
    'Datetimes must be at least more than 10 minutes apart.',
    'Datetimes must be less than 299 days apart.'
  ]

*Defined in [app/components/filter-controls/filter-controls.component.ts:132](https://github.com/WilliamRADFunk/cryptobot-interface/blob/ade795d/src/app/components/filter-controls/filter-controls.component.ts#L132)*



Message to use if start datetime is invalid




___


## Methods


###  adjustGranularityOptions

► **adjustGranularityOptions**(): `void`



*Defined in [app/components/filter-controls/filter-controls.component.ts:174](https://github.com/WilliamRADFunk/cryptobot-interface/blob/ade795d/src/app/components/filter-controls/filter-controls.component.ts#L174)*



Checks which of the time intervals have no more than the gdax max of 300 results between start and end datetimes




**Returns:** `void`





___



###  changedTimeInterval

► **changedTimeInterval**(event: *`any`*): `void`



*Defined in [app/components/filter-controls/filter-controls.component.ts:221](https://github.com/WilliamRADFunk/cryptobot-interface/blob/ade795d/src/app/components/filter-controls/filter-controls.component.ts#L221)*



Triggered when user changes granularity choice Updates the service variable


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| event | `any`   |  label/value object containing granularity label and value |





**Returns:** `void`





___



###  checkValidDateTime

► **checkValidDateTime**(): `boolean`



*Defined in [app/components/filter-controls/filter-controls.component.ts:230](https://github.com/WilliamRADFunk/cryptobot-interface/blob/ade795d/src/app/components/filter-controls/filter-controls.component.ts#L230)*



Checks all aspects of both datetimes to make sure everything is valid




**Returns:** `boolean`
True is valid datetimes | False if something is wrong with one of them






___



###  checkValidDateTimeOrder

► **checkValidDateTimeOrder**(): `boolean`



*Defined in [app/components/filter-controls/filter-controls.component.ts:249](https://github.com/WilliamRADFunk/cryptobot-interface/blob/ade795d/src/app/components/filter-controls/filter-controls.component.ts#L249)*



Checks to make sure end datetime isn't before the start datetime




**Returns:** `boolean`
True is valid | False if invalid






___



###  checkValidDay

► **checkValidDay**(date: *`object`*): `boolean`



*Defined in [app/components/filter-controls/filter-controls.component.ts:268](https://github.com/WilliamRADFunk/cryptobot-interface/blob/ade795d/src/app/components/filter-controls/filter-controls.component.ts#L268)*



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



*Defined in [app/components/filter-controls/filter-controls.component.ts:281](https://github.com/WilliamRADFunk/cryptobot-interface/blob/ade795d/src/app/components/filter-controls/filter-controls.component.ts#L281)*



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



*Defined in [app/components/filter-controls/filter-controls.component.ts:294](https://github.com/WilliamRADFunk/cryptobot-interface/blob/ade795d/src/app/components/filter-controls/filter-controls.component.ts#L294)*



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



*Defined in [app/components/filter-controls/filter-controls.component.ts:307](https://github.com/WilliamRADFunk/cryptobot-interface/blob/ade795d/src/app/components/filter-controls/filter-controls.component.ts#L307)*



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



*Defined in [app/components/filter-controls/filter-controls.component.ts:320](https://github.com/WilliamRADFunk/cryptobot-interface/blob/ade795d/src/app/components/filter-controls/filter-controls.component.ts#L320)*



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



*Defined in [app/components/filter-controls/filter-controls.component.ts:332](https://github.com/WilliamRADFunk/cryptobot-interface/blob/ade795d/src/app/components/filter-controls/filter-controls.component.ts#L332)*



Closes the datetime warning tooltip if it's open




**Returns:** `void`





___



###  isTooltipOpen

► **isTooltipOpen**(): `boolean`



*Defined in [app/components/filter-controls/filter-controls.component.ts:342](https://github.com/WilliamRADFunk/cryptobot-interface/blob/ade795d/src/app/components/filter-controls/filter-controls.component.ts#L342)*



Tells whether or not the warningMessage tooltip is open or not




**Returns:** `boolean`
True if the warning tooltip is open } False if not






___



### «Private» ngOnInit

► **ngOnInit**(): `void`



*Defined in [app/components/filter-controls/filter-controls.component.ts:152](https://github.com/WilliamRADFunk/cryptobot-interface/blob/ade795d/src/app/components/filter-controls/filter-controls.component.ts#L152)*






**Returns:** `void`





___



###  onEndDateChange

► **onEndDateChange**(): `void`



*Defined in [app/components/filter-controls/filter-controls.component.ts:349](https://github.com/WilliamRADFunk/cryptobot-interface/blob/ade795d/src/app/components/filter-controls/filter-controls.component.ts#L349)*



Triggered when user changes end date choice Updates the service variable




**Returns:** `void`





___



###  onEndTimeChange

► **onEndTimeChange**(): `void`



*Defined in [app/components/filter-controls/filter-controls.component.ts:367](https://github.com/WilliamRADFunk/cryptobot-interface/blob/ade795d/src/app/components/filter-controls/filter-controls.component.ts#L367)*



Triggered when user changes end time choice Updates the service variable




**Returns:** `void`





___



###  onStartDateChange

► **onStartDateChange**(): `void`



*Defined in [app/components/filter-controls/filter-controls.component.ts:385](https://github.com/WilliamRADFunk/cryptobot-interface/blob/ade795d/src/app/components/filter-controls/filter-controls.component.ts#L385)*



Triggered when user changes start date choice Updates the service variable




**Returns:** `void`





___



###  onStartTimeChange

► **onStartTimeChange**(): `void`



*Defined in [app/components/filter-controls/filter-controls.component.ts:403](https://github.com/WilliamRADFunk/cryptobot-interface/blob/ade795d/src/app/components/filter-controls/filter-controls.component.ts#L403)*



Triggered when user changes start time choice Updates the service variable




**Returns:** `void`





___



###  openTooltip

► **openTooltip**(): `void`



*Defined in [app/components/filter-controls/filter-controls.component.ts:420](https://github.com/WilliamRADFunk/cryptobot-interface/blob/ade795d/src/app/components/filter-controls/filter-controls.component.ts#L420)*



Opens the datetime warning tooltip if it's closed




**Returns:** `void`





___



###  resetMinMax

► **resetMinMax**(): `void`



*Defined in [app/components/filter-controls/filter-controls.component.ts:429](https://github.com/WilliamRADFunk/cryptobot-interface/blob/ade795d/src/app/components/filter-controls/filter-controls.component.ts#L429)*



Changes the min and max dates for both datepickers when one changes




**Returns:** `void`





___




## Object literal: eDate


Maintains the end date for 'End Date:' datepicker




###  day

**●  day**:  *`number`*  =  this.endDate.getDate()

*Defined in [app/components/filter-controls/filter-controls.component.ts:25](https://github.com/WilliamRADFunk/cryptobot-interface/blob/ade795d/src/app/components/filter-controls/filter-controls.component.ts#L25)*





___


###  month

**●  month**:  *`number`*  =  this.endDate.getMonth() + 1

*Defined in [app/components/filter-controls/filter-controls.component.ts:24](https://github.com/WilliamRADFunk/cryptobot-interface/blob/ade795d/src/app/components/filter-controls/filter-controls.component.ts#L24)*





___


###  year

**●  year**:  *`number`*  =  this.endDate.getFullYear()

*Defined in [app/components/filter-controls/filter-controls.component.ts:23](https://github.com/WilliamRADFunk/cryptobot-interface/blob/ade795d/src/app/components/filter-controls/filter-controls.component.ts#L23)*





___



## Object literal: eTime


Maintains the end time for 'End Time:' timepicker




###  hour

**●  hour**:  *`number`*  =  this.endDate.getHours()

*Defined in [app/components/filter-controls/filter-controls.component.ts:31](https://github.com/WilliamRADFunk/cryptobot-interface/blob/ade795d/src/app/components/filter-controls/filter-controls.component.ts#L31)*





___


###  minute

**●  minute**:  *`number`*  =  this.endDate.getMinutes()

*Defined in [app/components/filter-controls/filter-controls.component.ts:32](https://github.com/WilliamRADFunk/cryptobot-interface/blob/ade795d/src/app/components/filter-controls/filter-controls.component.ts#L32)*





___



## Object literal: sDate


Maintains the start date for 'Start Date:' datepicker




###  day

**●  day**:  *`number`*  =  this.startDate.getDate()

*Defined in [app/components/filter-controls/filter-controls.component.ts:83](https://github.com/WilliamRADFunk/cryptobot-interface/blob/ade795d/src/app/components/filter-controls/filter-controls.component.ts#L83)*





___


###  month

**●  month**:  *`number`*  =  this.startDate.getMonth() + 1

*Defined in [app/components/filter-controls/filter-controls.component.ts:82](https://github.com/WilliamRADFunk/cryptobot-interface/blob/ade795d/src/app/components/filter-controls/filter-controls.component.ts#L82)*





___


###  year

**●  year**:  *`number`*  =  this.startDate.getFullYear()

*Defined in [app/components/filter-controls/filter-controls.component.ts:81](https://github.com/WilliamRADFunk/cryptobot-interface/blob/ade795d/src/app/components/filter-controls/filter-controls.component.ts#L81)*





___



## Object literal: sTime


Maintains the start time for 'Start Time:' timepicker




###  hour

**●  hour**:  *`number`*  =  this.startDate.getHours()

*Defined in [app/components/filter-controls/filter-controls.component.ts:89](https://github.com/WilliamRADFunk/cryptobot-interface/blob/ade795d/src/app/components/filter-controls/filter-controls.component.ts#L89)*





___


###  minute

**●  minute**:  *`number`*  =  this.startDate.getMinutes()

*Defined in [app/components/filter-controls/filter-controls.component.ts:90](https://github.com/WilliamRADFunk/cryptobot-interface/blob/ade795d/src/app/components/filter-controls/filter-controls.component.ts#L90)*





___


