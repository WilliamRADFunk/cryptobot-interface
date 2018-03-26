[cryptobot-interface](../README.md) > [FilterControlsComponent](../classes/filtercontrolscomponent.md)



# Class: FilterControlsComponent

## Implements

* `OnInit`

## Index

### Constructors

* [constructor](filtercontrolscomponent.md#markdown-header-constructor)


### Properties

* [endDate](filtercontrolscomponent.md#markdown-header-enddate)
* [gdaxDataService](filtercontrolscomponent.md#markdown-header-private-gdaxdataservice)
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


*Defined in [app/components/filter-controls/filter-controls.component.ts:58](https://github.com/WilliamRADFunk/cryptobot-interface/blob/f419f2c/src/app/components/filter-controls/filter-controls.component.ts#L58)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| gdaxDataService | [GdaxDataService](gdaxdataservice.md)   |  - |





**Returns:** [FilterControlsComponent](filtercontrolscomponent.md)

---


## Properties


###  endDate

**●  endDate**:  *`Date`*  =  new Date()

*Defined in [app/components/filter-controls/filter-controls.component.ts:39](https://github.com/WilliamRADFunk/cryptobot-interface/blob/f419f2c/src/app/components/filter-controls/filter-controls.component.ts#L39)*





___



### «Private» gdaxDataService

**●  gdaxDataService**:  *[GdaxDataService](gdaxdataservice.md)* 

*Defined in [app/components/filter-controls/filter-controls.component.ts:59](https://github.com/WilliamRADFunk/cryptobot-interface/blob/f419f2c/src/app/components/filter-controls/filter-controls.component.ts#L59)*





___



###  startDate

**●  startDate**:  *`Date`*  =  new Date(this.endDate.getTime() - 86400000)

*Defined in [app/components/filter-controls/filter-controls.component.ts:40](https://github.com/WilliamRADFunk/cryptobot-interface/blob/f419f2c/src/app/components/filter-controls/filter-controls.component.ts#L40)*





___



###  timeInterval

**●  timeInterval**:  *`number`*  = 3600

*Defined in [app/components/filter-controls/filter-controls.component.ts:11](https://github.com/WilliamRADFunk/cryptobot-interface/blob/f419f2c/src/app/components/filter-controls/filter-controls.component.ts#L11)*





___



###  timeIntervalLabel

**●  timeIntervalLabel**:  *`string`*  = "1 hour"

*Defined in [app/components/filter-controls/filter-controls.component.ts:12](https://github.com/WilliamRADFunk/cryptobot-interface/blob/f419f2c/src/app/components/filter-controls/filter-controls.component.ts#L12)*





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

*Defined in [app/components/filter-controls/filter-controls.component.ts:13](https://github.com/WilliamRADFunk/cryptobot-interface/blob/f419f2c/src/app/components/filter-controls/filter-controls.component.ts#L13)*





___


## Methods


###  changedTimeInterval

► **changedTimeInterval**(event: *`any`*): `void`



*Defined in [app/components/filter-controls/filter-controls.component.ts:63](https://github.com/WilliamRADFunk/cryptobot-interface/blob/f419f2c/src/app/components/filter-controls/filter-controls.component.ts#L63)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| event | `any`   |  - |





**Returns:** `void`





___



###  ngOnInit

► **ngOnInit**(): `void`



*Defined in [app/components/filter-controls/filter-controls.component.ts:61](https://github.com/WilliamRADFunk/cryptobot-interface/blob/f419f2c/src/app/components/filter-controls/filter-controls.component.ts#L61)*





**Returns:** `void`





___



###  onEndDateChange

► **onEndDateChange**(): `void`



*Defined in [app/components/filter-controls/filter-controls.component.ts:69](https://github.com/WilliamRADFunk/cryptobot-interface/blob/f419f2c/src/app/components/filter-controls/filter-controls.component.ts#L69)*





**Returns:** `void`





___



###  onEndTimeChange

► **onEndTimeChange**(): `void`



*Defined in [app/components/filter-controls/filter-controls.component.ts:74](https://github.com/WilliamRADFunk/cryptobot-interface/blob/f419f2c/src/app/components/filter-controls/filter-controls.component.ts#L74)*





**Returns:** `void`





___



###  onStartDateChange

► **onStartDateChange**(): `void`



*Defined in [app/components/filter-controls/filter-controls.component.ts:79](https://github.com/WilliamRADFunk/cryptobot-interface/blob/f419f2c/src/app/components/filter-controls/filter-controls.component.ts#L79)*





**Returns:** `void`





___



###  onStartTimeChange

► **onStartTimeChange**(): `void`



*Defined in [app/components/filter-controls/filter-controls.component.ts:84](https://github.com/WilliamRADFunk/cryptobot-interface/blob/f419f2c/src/app/components/filter-controls/filter-controls.component.ts#L84)*





**Returns:** `void`





___




## Object literal: eDate




###  day

**●  day**:  *`number`*  = 25

*Defined in [app/components/filter-controls/filter-controls.component.ts:53](https://github.com/WilliamRADFunk/cryptobot-interface/blob/f419f2c/src/app/components/filter-controls/filter-controls.component.ts#L53)*





___


###  month

**●  month**:  *`number`*  = 3

*Defined in [app/components/filter-controls/filter-controls.component.ts:52](https://github.com/WilliamRADFunk/cryptobot-interface/blob/f419f2c/src/app/components/filter-controls/filter-controls.component.ts#L52)*





___


###  year

**●  year**:  *`number`*  = 2018

*Defined in [app/components/filter-controls/filter-controls.component.ts:51](https://github.com/WilliamRADFunk/cryptobot-interface/blob/f419f2c/src/app/components/filter-controls/filter-controls.component.ts#L51)*





___



## Object literal: eTime




###  hour

**●  hour**:  *`number`*  = 21

*Defined in [app/components/filter-controls/filter-controls.component.ts:56](https://github.com/WilliamRADFunk/cryptobot-interface/blob/f419f2c/src/app/components/filter-controls/filter-controls.component.ts#L56)*





___


###  minute

**●  minute**:  *`number`*  = 50

*Defined in [app/components/filter-controls/filter-controls.component.ts:57](https://github.com/WilliamRADFunk/cryptobot-interface/blob/f419f2c/src/app/components/filter-controls/filter-controls.component.ts#L57)*





___



## Object literal: sDate




###  day

**●  day**:  *`number`*  = 24

*Defined in [app/components/filter-controls/filter-controls.component.ts:44](https://github.com/WilliamRADFunk/cryptobot-interface/blob/f419f2c/src/app/components/filter-controls/filter-controls.component.ts#L44)*





___


###  month

**●  month**:  *`number`*  = 3

*Defined in [app/components/filter-controls/filter-controls.component.ts:43](https://github.com/WilliamRADFunk/cryptobot-interface/blob/f419f2c/src/app/components/filter-controls/filter-controls.component.ts#L43)*





___


###  year

**●  year**:  *`number`*  = 2018

*Defined in [app/components/filter-controls/filter-controls.component.ts:42](https://github.com/WilliamRADFunk/cryptobot-interface/blob/f419f2c/src/app/components/filter-controls/filter-controls.component.ts#L42)*





___



## Object literal: sTime




###  hour

**●  hour**:  *`number`*  = 21

*Defined in [app/components/filter-controls/filter-controls.component.ts:47](https://github.com/WilliamRADFunk/cryptobot-interface/blob/f419f2c/src/app/components/filter-controls/filter-controls.component.ts#L47)*





___


###  minute

**●  minute**:  *`number`*  = 50

*Defined in [app/components/filter-controls/filter-controls.component.ts:48](https://github.com/WilliamRADFunk/cryptobot-interface/blob/f419f2c/src/app/components/filter-controls/filter-controls.component.ts#L48)*





___


