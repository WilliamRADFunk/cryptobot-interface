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
* [isInvalid](filtercontrolscomponent.md#markdown-header-isinvalid)
* [startDate](filtercontrolscomponent.md#markdown-header-startdate)
* [timeInterval](filtercontrolscomponent.md#markdown-header-timeinterval)
* [timeIntervalLabel](filtercontrolscomponent.md#markdown-header-timeintervallabel)
* [timeIntervalOptions](filtercontrolscomponent.md#markdown-header-timeintervaloptions)
* [timeIntervals](filtercontrolscomponent.md#markdown-header-timeintervals)


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
* [ngOnInit](filtercontrolscomponent.md#markdown-header-ngoninit)
* [onEndDateChange](filtercontrolscomponent.md#markdown-header-onenddatechange)
* [onEndTimeChange](filtercontrolscomponent.md#markdown-header-onendtimechange)
* [onStartDateChange](filtercontrolscomponent.md#markdown-header-onstartdatechange)
* [onStartTimeChange](filtercontrolscomponent.md#markdown-header-onstarttimechange)


### Object literals

* [eDate](filtercontrolscomponent.md#markdown-header-object-literal-edate)
* [eTime](filtercontrolscomponent.md#markdown-header-object-literal-etime)
* [sDate](filtercontrolscomponent.md#markdown-header-object-literal-sdate)
* [sTime](filtercontrolscomponent.md#markdown-header-object-literal-stime)



---
## Constructors



### ⊕ **new FilterControlsComponent**(gdaxDataService: *[GdaxDataService](gdaxdataservice.md)*, config: *`NgbTimepickerConfig`*): [FilterControlsComponent](filtercontrolscomponent.md)


*Defined in [app/components/filter-controls/filter-controls.component.ts:105](https://github.com/WilliamRADFunk/cryptobot-interface/blob/afbaa0e/src/app/components/filter-controls/filter-controls.component.ts#L105)*



Constructor for the class.


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

*Defined in [app/components/filter-controls/filter-controls.component.ts:112](https://github.com/WilliamRADFunk/cryptobot-interface/blob/afbaa0e/src/app/components/filter-controls/filter-controls.component.ts#L112)*





___



###  endDate

**●  endDate**:  *`Date`*  =  new Date()

*Defined in [app/components/filter-controls/filter-controls.component.ts:17](https://github.com/WilliamRADFunk/cryptobot-interface/blob/afbaa0e/src/app/components/filter-controls/filter-controls.component.ts#L17)*



Maintains the end date in actual Javascript Date form




___



### «Private» gdaxDataService

**●  gdaxDataService**:  *[GdaxDataService](gdaxdataservice.md)* 

*Defined in [app/components/filter-controls/filter-controls.component.ts:111](https://github.com/WilliamRADFunk/cryptobot-interface/blob/afbaa0e/src/app/components/filter-controls/filter-controls.component.ts#L111)*





___



###  invalidEndDatetime

**●  invalidEndDatetime**:  *`boolean`*  = false

*Defined in [app/components/filter-controls/filter-controls.component.ts:45](https://github.com/WilliamRADFunk/cryptobot-interface/blob/afbaa0e/src/app/components/filter-controls/filter-controls.component.ts#L45)*



Flag to determine whether or not to display red for end datetime




___



###  invalidStartDatetime

**●  invalidStartDatetime**:  *`boolean`*  = false

*Defined in [app/components/filter-controls/filter-controls.component.ts:41](https://github.com/WilliamRADFunk/cryptobot-interface/blob/afbaa0e/src/app/components/filter-controls/filter-controls.component.ts#L41)*



Flag to determine whether or not to display red for start datetime




___



###  isInvalid

**●  isInvalid**:  *`boolean`*  = false

*Defined in [app/components/filter-controls/filter-controls.component.ts:37](https://github.com/WilliamRADFunk/cryptobot-interface/blob/afbaa0e/src/app/components/filter-controls/filter-controls.component.ts#L37)*



Flag to determine whether or not to show invalid data colors inside the datetime filters.




___



###  startDate

**●  startDate**:  *`Date`*  =  new Date(this.endDate.getTime() - 86400000)

*Defined in [app/components/filter-controls/filter-controls.component.ts:49](https://github.com/WilliamRADFunk/cryptobot-interface/blob/afbaa0e/src/app/components/filter-controls/filter-controls.component.ts#L49)*



Maintains the start date in actual Javascript Date form




___



###  timeInterval

**●  timeInterval**:  *`number`*  = 3600

*Defined in [app/components/filter-controls/filter-controls.component.ts:68](https://github.com/WilliamRADFunk/cryptobot-interface/blob/afbaa0e/src/app/components/filter-controls/filter-controls.component.ts#L68)*



Maintains current granularity level (ie. 3600)




___



###  timeIntervalLabel

**●  timeIntervalLabel**:  *`string`*  = "1 hour"

*Defined in [app/components/filter-controls/filter-controls.component.ts:72](https://github.com/WilliamRADFunk/cryptobot-interface/blob/afbaa0e/src/app/components/filter-controls/filter-controls.component.ts#L72)*



Maintains current granularity level label (ie. '1 hour')




___



###  timeIntervalOptions

**●  timeIntervalOptions**:  *`object`[]*  =  [
    {
      label: '1 minute',
      value: 60
    },
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

*Defined in [app/components/filter-controls/filter-controls.component.ts:76](https://github.com/WilliamRADFunk/cryptobot-interface/blob/afbaa0e/src/app/components/filter-controls/filter-controls.component.ts#L76)*



Contains all possible granularity levels.




___



###  timeIntervals

**●  timeIntervals**:  *`object`[]*  =  this.timeIntervalOptions.slice()

*Defined in [app/components/filter-controls/filter-controls.component.ts:105](https://github.com/WilliamRADFunk/cryptobot-interface/blob/afbaa0e/src/app/components/filter-controls/filter-controls.component.ts#L105)*



Contains all possible granularity levels available to end user.




___


## Methods


###  adjustGranularityOptions

► **adjustGranularityOptions**(): `void`



*Defined in [app/components/filter-controls/filter-controls.component.ts:127](https://github.com/WilliamRADFunk/cryptobot-interface/blob/afbaa0e/src/app/components/filter-controls/filter-controls.component.ts#L127)*



Checks which of the time intervals have no more than the gdax max of 300 results between start and end datetimes




**Returns:** `void`





___



###  changedTimeInterval

► **changedTimeInterval**(event: *`any`*): `void`



*Defined in [app/components/filter-controls/filter-controls.component.ts:174](https://github.com/WilliamRADFunk/cryptobot-interface/blob/afbaa0e/src/app/components/filter-controls/filter-controls.component.ts#L174)*



Triggered when user changes granularity choice. Updates the service variable.


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| event | `any`   |  label/value object containing granularity label and value |





**Returns:** `void`





___



###  checkValidDateTime

► **checkValidDateTime**(): `boolean`



*Defined in [app/components/filter-controls/filter-controls.component.ts:183](https://github.com/WilliamRADFunk/cryptobot-interface/blob/afbaa0e/src/app/components/filter-controls/filter-controls.component.ts#L183)*



Checks all aspects of both datetimes to make sure everything is valid




**Returns:** `boolean`
True is valid datetimes | False if something is wrong with one of them






___



###  checkValidDateTimeOrder

► **checkValidDateTimeOrder**(): `boolean`



*Defined in [app/components/filter-controls/filter-controls.component.ts:202](https://github.com/WilliamRADFunk/cryptobot-interface/blob/afbaa0e/src/app/components/filter-controls/filter-controls.component.ts#L202)*



Checks to make sure end datetime isn't before the start datetime




**Returns:** `boolean`
True is valid | False if invalid






___



###  checkValidDay

► **checkValidDay**(day: *`number`*): `boolean`



*Defined in [app/components/filter-controls/filter-controls.component.ts:216](https://github.com/WilliamRADFunk/cryptobot-interface/blob/afbaa0e/src/app/components/filter-controls/filter-controls.component.ts#L216)*



Checks to make sure day is valid


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| day | `number`   |  - |





**Returns:** `boolean`
True is valid | False if invalid






___



###  checkValidHours

► **checkValidHours**(hours: *`number`*): `boolean`



*Defined in [app/components/filter-controls/filter-controls.component.ts:229](https://github.com/WilliamRADFunk/cryptobot-interface/blob/afbaa0e/src/app/components/filter-controls/filter-controls.component.ts#L229)*



Checks to make sure hour is valid


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| hours | `number`   |  - |





**Returns:** `boolean`
True is valid | False if invalid






___



###  checkValidMinutes

► **checkValidMinutes**(minutes: *`number`*): `boolean`



*Defined in [app/components/filter-controls/filter-controls.component.ts:242](https://github.com/WilliamRADFunk/cryptobot-interface/blob/afbaa0e/src/app/components/filter-controls/filter-controls.component.ts#L242)*



Checks to make sure minute is valid


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| minutes | `number`   |  - |





**Returns:** `boolean`
True is valid | False if invalid






___



###  checkValidMonth

► **checkValidMonth**(month: *`number`*): `boolean`



*Defined in [app/components/filter-controls/filter-controls.component.ts:255](https://github.com/WilliamRADFunk/cryptobot-interface/blob/afbaa0e/src/app/components/filter-controls/filter-controls.component.ts#L255)*



Checks to make sure month is valid


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| month | `number`   |  - |





**Returns:** `boolean`
True is valid | False if invalid






___



###  checkValidYear

► **checkValidYear**(year: *`number`*): `boolean`



*Defined in [app/components/filter-controls/filter-controls.component.ts:268](https://github.com/WilliamRADFunk/cryptobot-interface/blob/afbaa0e/src/app/components/filter-controls/filter-controls.component.ts#L268)*



Checks to make sure year is valid


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| year | `number`   |  - |





**Returns:** `boolean`
True is valid | False if invalid






___



###  ngOnInit

► **ngOnInit**(): `void`



*Defined in [app/components/filter-controls/filter-controls.component.ts:120](https://github.com/WilliamRADFunk/cryptobot-interface/blob/afbaa0e/src/app/components/filter-controls/filter-controls.component.ts#L120)*



Triggered when component is loaded, but before it is viewed. Gets REST path info, and updates the profit chart.




**Returns:** `void`





___



###  onEndDateChange

► **onEndDateChange**(): `void`



*Defined in [app/components/filter-controls/filter-controls.component.ts:281](https://github.com/WilliamRADFunk/cryptobot-interface/blob/afbaa0e/src/app/components/filter-controls/filter-controls.component.ts#L281)*



Triggered when user changes end date choice. Updates the service variable.




**Returns:** `void`





___



###  onEndTimeChange

► **onEndTimeChange**(): `void`



*Defined in [app/components/filter-controls/filter-controls.component.ts:296](https://github.com/WilliamRADFunk/cryptobot-interface/blob/afbaa0e/src/app/components/filter-controls/filter-controls.component.ts#L296)*



Triggered when user changes end time choice. Updates the service variable.




**Returns:** `void`





___



###  onStartDateChange

► **onStartDateChange**(): `void`



*Defined in [app/components/filter-controls/filter-controls.component.ts:311](https://github.com/WilliamRADFunk/cryptobot-interface/blob/afbaa0e/src/app/components/filter-controls/filter-controls.component.ts#L311)*



Triggered when user changes start date choice. Updates the service variable.




**Returns:** `void`





___



###  onStartTimeChange

► **onStartTimeChange**(): `void`



*Defined in [app/components/filter-controls/filter-controls.component.ts:326](https://github.com/WilliamRADFunk/cryptobot-interface/blob/afbaa0e/src/app/components/filter-controls/filter-controls.component.ts#L326)*



Triggered when user changes start time choice. Updates the service variable.




**Returns:** `void`





___




## Object literal: eDate


Maintains the end date for 'End Date:' datepicker




###  day

**●  day**:  *`number`*  =  this.endDate.getDate()

*Defined in [app/components/filter-controls/filter-controls.component.ts:24](https://github.com/WilliamRADFunk/cryptobot-interface/blob/afbaa0e/src/app/components/filter-controls/filter-controls.component.ts#L24)*





___


###  month

**●  month**:  *`number`*  =  this.endDate.getMonth() + 1

*Defined in [app/components/filter-controls/filter-controls.component.ts:23](https://github.com/WilliamRADFunk/cryptobot-interface/blob/afbaa0e/src/app/components/filter-controls/filter-controls.component.ts#L23)*





___


###  year

**●  year**:  *`number`*  =  this.endDate.getFullYear()

*Defined in [app/components/filter-controls/filter-controls.component.ts:22](https://github.com/WilliamRADFunk/cryptobot-interface/blob/afbaa0e/src/app/components/filter-controls/filter-controls.component.ts#L22)*





___



## Object literal: eTime


Maintains the end time for 'End Time:' timepicker




###  hour

**●  hour**:  *`number`*  =  this.endDate.getHours()

*Defined in [app/components/filter-controls/filter-controls.component.ts:30](https://github.com/WilliamRADFunk/cryptobot-interface/blob/afbaa0e/src/app/components/filter-controls/filter-controls.component.ts#L30)*





___


###  minute

**●  minute**:  *`number`*  =  this.endDate.getMinutes()

*Defined in [app/components/filter-controls/filter-controls.component.ts:31](https://github.com/WilliamRADFunk/cryptobot-interface/blob/afbaa0e/src/app/components/filter-controls/filter-controls.component.ts#L31)*





___



## Object literal: sDate


Maintains the start date for 'Start Date:' datepicker




###  day

**●  day**:  *`number`*  =  this.startDate.getDate()

*Defined in [app/components/filter-controls/filter-controls.component.ts:56](https://github.com/WilliamRADFunk/cryptobot-interface/blob/afbaa0e/src/app/components/filter-controls/filter-controls.component.ts#L56)*





___


###  month

**●  month**:  *`number`*  =  this.startDate.getMonth() + 1

*Defined in [app/components/filter-controls/filter-controls.component.ts:55](https://github.com/WilliamRADFunk/cryptobot-interface/blob/afbaa0e/src/app/components/filter-controls/filter-controls.component.ts#L55)*





___


###  year

**●  year**:  *`number`*  =  this.startDate.getFullYear()

*Defined in [app/components/filter-controls/filter-controls.component.ts:54](https://github.com/WilliamRADFunk/cryptobot-interface/blob/afbaa0e/src/app/components/filter-controls/filter-controls.component.ts#L54)*





___



## Object literal: sTime


Maintains the start time for 'Start Time:' timepicker




###  hour

**●  hour**:  *`number`*  =  this.startDate.getHours()

*Defined in [app/components/filter-controls/filter-controls.component.ts:62](https://github.com/WilliamRADFunk/cryptobot-interface/blob/afbaa0e/src/app/components/filter-controls/filter-controls.component.ts#L62)*





___


###  minute

**●  minute**:  *`number`*  =  this.startDate.getMinutes()

*Defined in [app/components/filter-controls/filter-controls.component.ts:63](https://github.com/WilliamRADFunk/cryptobot-interface/blob/afbaa0e/src/app/components/filter-controls/filter-controls.component.ts#L63)*





___


