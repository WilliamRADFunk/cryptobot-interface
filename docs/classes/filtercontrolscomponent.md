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
* [isInvalid](filtercontrolscomponent.md#markdown-header-isinvalid)
* [startDate](filtercontrolscomponent.md#markdown-header-startdate)
* [timeInterval](filtercontrolscomponent.md#markdown-header-timeinterval)
* [timeIntervalLabel](filtercontrolscomponent.md#markdown-header-timeintervallabel)
* [timeIntervals](filtercontrolscomponent.md#markdown-header-timeintervals)


### Methods

* [changedTimeInterval](filtercontrolscomponent.md#markdown-header-changedtimeinterval)
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


*Defined in [app/components/filter-controls/filter-controls.component.ts:93](https://github.com/WilliamRADFunk/cryptobot-interface/blob/0ee4bcc/src/app/components/filter-controls/filter-controls.component.ts#L93)*



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

*Defined in [app/components/filter-controls/filter-controls.component.ts:100](https://github.com/WilliamRADFunk/cryptobot-interface/blob/0ee4bcc/src/app/components/filter-controls/filter-controls.component.ts#L100)*





___



###  endDate

**●  endDate**:  *`Date`*  =  new Date()

*Defined in [app/components/filter-controls/filter-controls.component.ts:59](https://github.com/WilliamRADFunk/cryptobot-interface/blob/0ee4bcc/src/app/components/filter-controls/filter-controls.component.ts#L59)*



Maintains the end date in actual Javascript Date form




___



### «Private» gdaxDataService

**●  gdaxDataService**:  *[GdaxDataService](gdaxdataservice.md)* 

*Defined in [app/components/filter-controls/filter-controls.component.ts:99](https://github.com/WilliamRADFunk/cryptobot-interface/blob/0ee4bcc/src/app/components/filter-controls/filter-controls.component.ts#L99)*





___



###  isInvalid

**●  isInvalid**:  *`boolean`*  = false

*Defined in [app/components/filter-controls/filter-controls.component.ts:18](https://github.com/WilliamRADFunk/cryptobot-interface/blob/0ee4bcc/src/app/components/filter-controls/filter-controls.component.ts#L18)*



Flag to determine whether or not to show invalid data colors inside the datetime filters.




___



###  startDate

**●  startDate**:  *`Date`*  =  new Date(this.endDate.getTime() - 86400000)

*Defined in [app/components/filter-controls/filter-controls.component.ts:63](https://github.com/WilliamRADFunk/cryptobot-interface/blob/0ee4bcc/src/app/components/filter-controls/filter-controls.component.ts#L63)*



Maintains the start date in actual Javascript Date form




___



###  timeInterval

**●  timeInterval**:  *`number`*  = 3600

*Defined in [app/components/filter-controls/filter-controls.component.ts:22](https://github.com/WilliamRADFunk/cryptobot-interface/blob/0ee4bcc/src/app/components/filter-controls/filter-controls.component.ts#L22)*



Maintains current granularity level (ie. 3600)




___



###  timeIntervalLabel

**●  timeIntervalLabel**:  *`string`*  = "1 hour"

*Defined in [app/components/filter-controls/filter-controls.component.ts:26](https://github.com/WilliamRADFunk/cryptobot-interface/blob/0ee4bcc/src/app/components/filter-controls/filter-controls.component.ts#L26)*



Maintains current granularity level label (ie. '1 hour')




___



###  timeIntervals

**●  timeIntervals**:  *`object`[]*  =  [
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

*Defined in [app/components/filter-controls/filter-controls.component.ts:30](https://github.com/WilliamRADFunk/cryptobot-interface/blob/0ee4bcc/src/app/components/filter-controls/filter-controls.component.ts#L30)*



Contains all possible granularity levels available to end user.




___


## Methods


###  changedTimeInterval

► **changedTimeInterval**(event: *`any`*): `void`



*Defined in [app/components/filter-controls/filter-controls.component.ts:114](https://github.com/WilliamRADFunk/cryptobot-interface/blob/0ee4bcc/src/app/components/filter-controls/filter-controls.component.ts#L114)*



Triggered when user changes granularity choice. Updates the service variable.


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| event | `any`   |  label/value object containing granularity label and value |





**Returns:** `void`





___



###  ngOnInit

► **ngOnInit**(): `void`



*Defined in [app/components/filter-controls/filter-controls.component.ts:108](https://github.com/WilliamRADFunk/cryptobot-interface/blob/0ee4bcc/src/app/components/filter-controls/filter-controls.component.ts#L108)*



Triggered when component is loaded, but before it is viewed. Gets REST path info, and updates the profit chart.




**Returns:** `void`





___



###  onEndDateChange

► **onEndDateChange**(): `void`



*Defined in [app/components/filter-controls/filter-controls.component.ts:123](https://github.com/WilliamRADFunk/cryptobot-interface/blob/0ee4bcc/src/app/components/filter-controls/filter-controls.component.ts#L123)*



Triggered when user changes end date choice. Updates the service variable.




**Returns:** `void`





___



###  onEndTimeChange

► **onEndTimeChange**(): `void`



*Defined in [app/components/filter-controls/filter-controls.component.ts:131](https://github.com/WilliamRADFunk/cryptobot-interface/blob/0ee4bcc/src/app/components/filter-controls/filter-controls.component.ts#L131)*



Triggered when user changes end time choice. Updates the service variable.




**Returns:** `void`





___



###  onStartDateChange

► **onStartDateChange**(): `void`



*Defined in [app/components/filter-controls/filter-controls.component.ts:139](https://github.com/WilliamRADFunk/cryptobot-interface/blob/0ee4bcc/src/app/components/filter-controls/filter-controls.component.ts#L139)*



Triggered when user changes start date choice. Updates the service variable.




**Returns:** `void`





___



###  onStartTimeChange

► **onStartTimeChange**(): `void`



*Defined in [app/components/filter-controls/filter-controls.component.ts:147](https://github.com/WilliamRADFunk/cryptobot-interface/blob/0ee4bcc/src/app/components/filter-controls/filter-controls.component.ts#L147)*



Triggered when user changes start time choice. Updates the service variable.




**Returns:** `void`





___




## Object literal: eDate


Maintains the end date for 'End Date:' datepicker




###  day

**●  day**:  *`number`*  =  this.endDate.getDate()

*Defined in [app/components/filter-controls/filter-controls.component.ts:85](https://github.com/WilliamRADFunk/cryptobot-interface/blob/0ee4bcc/src/app/components/filter-controls/filter-controls.component.ts#L85)*





___


###  month

**●  month**:  *`number`*  =  this.endDate.getMonth() + 1

*Defined in [app/components/filter-controls/filter-controls.component.ts:84](https://github.com/WilliamRADFunk/cryptobot-interface/blob/0ee4bcc/src/app/components/filter-controls/filter-controls.component.ts#L84)*





___


###  year

**●  year**:  *`number`*  =  this.endDate.getFullYear()

*Defined in [app/components/filter-controls/filter-controls.component.ts:83](https://github.com/WilliamRADFunk/cryptobot-interface/blob/0ee4bcc/src/app/components/filter-controls/filter-controls.component.ts#L83)*





___



## Object literal: eTime


Maintains the end time for 'End Time:' timepicker




###  hour

**●  hour**:  *`number`*  =  this.endDate.getHours()

*Defined in [app/components/filter-controls/filter-controls.component.ts:91](https://github.com/WilliamRADFunk/cryptobot-interface/blob/0ee4bcc/src/app/components/filter-controls/filter-controls.component.ts#L91)*





___


###  minute

**●  minute**:  *`number`*  =  this.endDate.getMinutes()

*Defined in [app/components/filter-controls/filter-controls.component.ts:92](https://github.com/WilliamRADFunk/cryptobot-interface/blob/0ee4bcc/src/app/components/filter-controls/filter-controls.component.ts#L92)*





___



## Object literal: sDate


Maintains the start date for 'Start Date:' datepicker




###  day

**●  day**:  *`number`*  =  this.startDate.getDate()

*Defined in [app/components/filter-controls/filter-controls.component.ts:70](https://github.com/WilliamRADFunk/cryptobot-interface/blob/0ee4bcc/src/app/components/filter-controls/filter-controls.component.ts#L70)*





___


###  month

**●  month**:  *`number`*  =  this.startDate.getMonth() + 1

*Defined in [app/components/filter-controls/filter-controls.component.ts:69](https://github.com/WilliamRADFunk/cryptobot-interface/blob/0ee4bcc/src/app/components/filter-controls/filter-controls.component.ts#L69)*





___


###  year

**●  year**:  *`number`*  =  this.startDate.getFullYear()

*Defined in [app/components/filter-controls/filter-controls.component.ts:68](https://github.com/WilliamRADFunk/cryptobot-interface/blob/0ee4bcc/src/app/components/filter-controls/filter-controls.component.ts#L68)*





___



## Object literal: sTime


Maintains the start time for 'Start Time:' timepicker




###  hour

**●  hour**:  *`number`*  =  this.startDate.getHours()

*Defined in [app/components/filter-controls/filter-controls.component.ts:76](https://github.com/WilliamRADFunk/cryptobot-interface/blob/0ee4bcc/src/app/components/filter-controls/filter-controls.component.ts#L76)*





___


###  minute

**●  minute**:  *`number`*  =  this.startDate.getMinutes()

*Defined in [app/components/filter-controls/filter-controls.component.ts:77](https://github.com/WilliamRADFunk/cryptobot-interface/blob/0ee4bcc/src/app/components/filter-controls/filter-controls.component.ts#L77)*





___


