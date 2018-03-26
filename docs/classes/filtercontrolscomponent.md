[cryptobot-interface](../README.md) > [FilterControlsComponent](../classes/filtercontrolscomponent.md)



# Class: FilterControlsComponent

## Implements

* `OnInit`

## Index

### Constructors

* [constructor](filtercontrolscomponent.md#markdown-header-constructor)


### Properties

* [OFF](filtercontrolscomponent.md#markdown-header-off)
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



### ⊕ **new FilterControlsComponent**(gdaxDataService: *[GdaxDataService](gdaxdataservice.md)*): [FilterControlsComponent](filtercontrolscomponent.md)


*Defined in [app/components/filter-controls/filter-controls.component.ts:96](https://github.com/WilliamRADFunk/cryptobot-interface/blob/64d4170/src/app/components/filter-controls/filter-controls.component.ts#L96)*



Constructor for the class.


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| gdaxDataService | [GdaxDataService](gdaxdataservice.md)   |  - |





**Returns:** [FilterControlsComponent](filtercontrolscomponent.md)

---


## Properties


###  OFF

**●  OFF**:  *`string`*  = "OFF"

*Defined in [app/components/filter-controls/filter-controls.component.ts:16](https://github.com/WilliamRADFunk/cryptobot-interface/blob/64d4170/src/app/components/filter-controls/filter-controls.component.ts#L16)*



Here to help Angular build process from getting confused. [spinners]='OFF' is a timepicker necessity, but angular doesn't know that.




___



###  endDate

**●  endDate**:  *`Date`*  =  new Date()

*Defined in [app/components/filter-controls/filter-controls.component.ts:62](https://github.com/WilliamRADFunk/cryptobot-interface/blob/64d4170/src/app/components/filter-controls/filter-controls.component.ts#L62)*



Maintains the end date in actual Javascript Date form




___



### «Private» gdaxDataService

**●  gdaxDataService**:  *[GdaxDataService](gdaxdataservice.md)* 

*Defined in [app/components/filter-controls/filter-controls.component.ts:101](https://github.com/WilliamRADFunk/cryptobot-interface/blob/64d4170/src/app/components/filter-controls/filter-controls.component.ts#L101)*





___



###  isInvalid

**●  isInvalid**:  *`boolean`*  = false

*Defined in [app/components/filter-controls/filter-controls.component.ts:21](https://github.com/WilliamRADFunk/cryptobot-interface/blob/64d4170/src/app/components/filter-controls/filter-controls.component.ts#L21)*



Flag to determine whether or not to show invalid data colors inside the datetime filters.




___



###  startDate

**●  startDate**:  *`Date`*  =  new Date(this.endDate.getTime() - 86400000)

*Defined in [app/components/filter-controls/filter-controls.component.ts:66](https://github.com/WilliamRADFunk/cryptobot-interface/blob/64d4170/src/app/components/filter-controls/filter-controls.component.ts#L66)*



Maintains the start date in actual Javascript Date form




___



###  timeInterval

**●  timeInterval**:  *`number`*  = 3600

*Defined in [app/components/filter-controls/filter-controls.component.ts:25](https://github.com/WilliamRADFunk/cryptobot-interface/blob/64d4170/src/app/components/filter-controls/filter-controls.component.ts#L25)*



Maintains current granularity level (ie. 3600)




___



###  timeIntervalLabel

**●  timeIntervalLabel**:  *`string`*  = "1 hour"

*Defined in [app/components/filter-controls/filter-controls.component.ts:29](https://github.com/WilliamRADFunk/cryptobot-interface/blob/64d4170/src/app/components/filter-controls/filter-controls.component.ts#L29)*



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

*Defined in [app/components/filter-controls/filter-controls.component.ts:33](https://github.com/WilliamRADFunk/cryptobot-interface/blob/64d4170/src/app/components/filter-controls/filter-controls.component.ts#L33)*



Contains all possible granularity levels available to end user.




___


## Methods


###  changedTimeInterval

► **changedTimeInterval**(event: *`any`*): `void`



*Defined in [app/components/filter-controls/filter-controls.component.ts:112](https://github.com/WilliamRADFunk/cryptobot-interface/blob/64d4170/src/app/components/filter-controls/filter-controls.component.ts#L112)*



Triggered when user changes granularity choice. Updates the service variable.


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| event | `any`   |  label/value object containing granularity label and value |





**Returns:** `void`





___



###  ngOnInit

► **ngOnInit**(): `void`



*Defined in [app/components/filter-controls/filter-controls.component.ts:106](https://github.com/WilliamRADFunk/cryptobot-interface/blob/64d4170/src/app/components/filter-controls/filter-controls.component.ts#L106)*



Triggered when component is loaded, but before it is viewed. Gets REST path info, and updates the profit chart.




**Returns:** `void`





___



###  onEndDateChange

► **onEndDateChange**(): `void`



*Defined in [app/components/filter-controls/filter-controls.component.ts:121](https://github.com/WilliamRADFunk/cryptobot-interface/blob/64d4170/src/app/components/filter-controls/filter-controls.component.ts#L121)*



Triggered when user changes end date choice. Updates the service variable.




**Returns:** `void`





___



###  onEndTimeChange

► **onEndTimeChange**(): `void`



*Defined in [app/components/filter-controls/filter-controls.component.ts:129](https://github.com/WilliamRADFunk/cryptobot-interface/blob/64d4170/src/app/components/filter-controls/filter-controls.component.ts#L129)*



Triggered when user changes end time choice. Updates the service variable.




**Returns:** `void`





___



###  onStartDateChange

► **onStartDateChange**(): `void`



*Defined in [app/components/filter-controls/filter-controls.component.ts:137](https://github.com/WilliamRADFunk/cryptobot-interface/blob/64d4170/src/app/components/filter-controls/filter-controls.component.ts#L137)*



Triggered when user changes start date choice. Updates the service variable.




**Returns:** `void`





___



###  onStartTimeChange

► **onStartTimeChange**(): `void`



*Defined in [app/components/filter-controls/filter-controls.component.ts:145](https://github.com/WilliamRADFunk/cryptobot-interface/blob/64d4170/src/app/components/filter-controls/filter-controls.component.ts#L145)*



Triggered when user changes start time choice. Updates the service variable.




**Returns:** `void`





___




## Object literal: eDate


Maintains the end date for 'End Date:' datepicker




###  day

**●  day**:  *`number`*  =  this.endDate.getDate()

*Defined in [app/components/filter-controls/filter-controls.component.ts:88](https://github.com/WilliamRADFunk/cryptobot-interface/blob/64d4170/src/app/components/filter-controls/filter-controls.component.ts#L88)*





___


###  month

**●  month**:  *`number`*  =  this.endDate.getMonth() + 1

*Defined in [app/components/filter-controls/filter-controls.component.ts:87](https://github.com/WilliamRADFunk/cryptobot-interface/blob/64d4170/src/app/components/filter-controls/filter-controls.component.ts#L87)*





___


###  year

**●  year**:  *`number`*  =  this.endDate.getFullYear()

*Defined in [app/components/filter-controls/filter-controls.component.ts:86](https://github.com/WilliamRADFunk/cryptobot-interface/blob/64d4170/src/app/components/filter-controls/filter-controls.component.ts#L86)*





___



## Object literal: eTime


Maintains the end time for 'End Time:' timepicker




###  hour

**●  hour**:  *`number`*  =  this.endDate.getHours()

*Defined in [app/components/filter-controls/filter-controls.component.ts:94](https://github.com/WilliamRADFunk/cryptobot-interface/blob/64d4170/src/app/components/filter-controls/filter-controls.component.ts#L94)*





___


###  minute

**●  minute**:  *`number`*  =  this.endDate.getMinutes()

*Defined in [app/components/filter-controls/filter-controls.component.ts:95](https://github.com/WilliamRADFunk/cryptobot-interface/blob/64d4170/src/app/components/filter-controls/filter-controls.component.ts#L95)*





___



## Object literal: sDate


Maintains the start date for 'Start Date:' datepicker




###  day

**●  day**:  *`number`*  =  this.startDate.getDate()

*Defined in [app/components/filter-controls/filter-controls.component.ts:73](https://github.com/WilliamRADFunk/cryptobot-interface/blob/64d4170/src/app/components/filter-controls/filter-controls.component.ts#L73)*





___


###  month

**●  month**:  *`number`*  =  this.startDate.getMonth() + 1

*Defined in [app/components/filter-controls/filter-controls.component.ts:72](https://github.com/WilliamRADFunk/cryptobot-interface/blob/64d4170/src/app/components/filter-controls/filter-controls.component.ts#L72)*





___


###  year

**●  year**:  *`number`*  =  this.startDate.getFullYear()

*Defined in [app/components/filter-controls/filter-controls.component.ts:71](https://github.com/WilliamRADFunk/cryptobot-interface/blob/64d4170/src/app/components/filter-controls/filter-controls.component.ts#L71)*





___



## Object literal: sTime


Maintains the start time for 'Start Time:' timepicker




###  hour

**●  hour**:  *`number`*  =  this.startDate.getHours()

*Defined in [app/components/filter-controls/filter-controls.component.ts:79](https://github.com/WilliamRADFunk/cryptobot-interface/blob/64d4170/src/app/components/filter-controls/filter-controls.component.ts#L79)*





___


###  minute

**●  minute**:  *`number`*  =  this.startDate.getMinutes()

*Defined in [app/components/filter-controls/filter-controls.component.ts:80](https://github.com/WilliamRADFunk/cryptobot-interface/blob/64d4170/src/app/components/filter-controls/filter-controls.component.ts#L80)*





___


