[cryptobot-interface](../README.md) > [GdaxDataService](../classes/gdaxdataservice.md)



# Class: GdaxDataService

## Index

### Constructors

* [constructor](gdaxdataservice.md#markdown-header-constructor)


### Properties

* [chartData](gdaxdataservice.md#markdown-header-chartdata)
* [currency](gdaxdataservice.md#markdown-header-currency)
* [endDate](gdaxdataservice.md#markdown-header-enddate)
* [http](gdaxdataservice.md#markdown-header-private-http)
* [interval](gdaxdataservice.md#markdown-header-interval)
* [isBusy](gdaxdataservice.md#markdown-header-isbusy)
* [startDate](gdaxdataservice.md#markdown-header-startdate)


### Methods

* [changeCurrencyType](gdaxdataservice.md#markdown-header-changecurrencytype)
* [changeEndDateTime](gdaxdataservice.md#markdown-header-changeenddatetime)
* [changeStartDateTime](gdaxdataservice.md#markdown-header-changestartdatetime)
* [changeTimeInterval](gdaxdataservice.md#markdown-header-changetimeinterval)
* [getLatestGdaxData](gdaxdataservice.md#markdown-header-getlatestgdaxdata)



---
## Constructors



### ⊕ **new GdaxDataService**(http: *`HttpClient`*): [GdaxDataService](gdaxdataservice.md)


*Defined in [app/services/gdax-data.service.ts:28](https://github.com/WilliamRADFunk/cryptobot-interface/blob/de4f8ae/src/app/services/gdax-data.service.ts#L28)*



Constructor for the class. Injects Angular's HttpClient service


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| http | `HttpClient`   |  Angular's HttpClient service for making http calls |





**Returns:** [GdaxDataService](gdaxdataservice.md)

---


## Properties


###  chartData

**●  chartData**:  *`BehaviorSubject`.<`number`[][]>*  =  new BehaviorSubject<number[][]>([])

*Defined in [app/services/gdax-data.service.ts:11](https://github.com/WilliamRADFunk/cryptobot-interface/blob/de4f8ae/src/app/services/gdax-data.service.ts#L11)*



The updated query results for historical trade market data in a format that all of the live views will understand and be able to use.




___



###  currency

**●  currency**:  *`string`*  = "BTC-USD"

*Defined in [app/services/gdax-data.service.ts:15](https://github.com/WilliamRADFunk/cryptobot-interface/blob/de4f8ae/src/app/services/gdax-data.service.ts#L15)*



Currency type which is used as part of the query URL.




___



###  endDate

**●  endDate**:  *`Date`*  =  new Date()

*Defined in [app/services/gdax-data.service.ts:19](https://github.com/WilliamRADFunk/cryptobot-interface/blob/de4f8ae/src/app/services/gdax-data.service.ts#L19)*



The end datetime used as a parameter in the query URL




___



### «Private» http

**●  http**:  *`HttpClient`* 

*Defined in [app/services/gdax-data.service.ts:34](https://github.com/WilliamRADFunk/cryptobot-interface/blob/de4f8ae/src/app/services/gdax-data.service.ts#L34)*



Angular's HttpClient service for making http calls




___



###  interval

**●  interval**:  *`number`*  = 3600

*Defined in [app/services/gdax-data.service.ts:23](https://github.com/WilliamRADFunk/cryptobot-interface/blob/de4f8ae/src/app/services/gdax-data.service.ts#L23)*



The granularity between data points. Used as a parameter in query URL.




___



###  isBusy

**●  isBusy**:  *`BehaviorSubject`.<`boolean`>*  =  new BehaviorSubject<boolean>(false)

*Defined in [app/services/gdax-data.service.ts:24](https://github.com/WilliamRADFunk/cryptobot-interface/blob/de4f8ae/src/app/services/gdax-data.service.ts#L24)*





___



###  startDate

**●  startDate**:  *`Date`*  =  new Date(this.endDate.getTime() - 86400000)

*Defined in [app/services/gdax-data.service.ts:28](https://github.com/WilliamRADFunk/cryptobot-interface/blob/de4f8ae/src/app/services/gdax-data.service.ts#L28)*



The start datetime used as a parameter in the query URL




___


## Methods


###  changeCurrencyType

► **changeCurrencyType**(currency: *`string`*): `void`



*Defined in [app/services/gdax-data.service.ts:39](https://github.com/WilliamRADFunk/cryptobot-interface/blob/de4f8ae/src/app/services/gdax-data.service.ts#L39)*



Updates the currency type being viewed, and refreshes query results.


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| currency | `string`   |  the currency string (ie. 'BTC-USD') |





**Returns:** `void`





___



###  changeEndDateTime

► **changeEndDateTime**(date: *`Date`*): `void`



*Defined in [app/services/gdax-data.service.ts:47](https://github.com/WilliamRADFunk/cryptobot-interface/blob/de4f8ae/src/app/services/gdax-data.service.ts#L47)*



Updates the end datetime being viewed, and refreshes query results.


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| date | `Date`   |  the end datetime object |





**Returns:** `void`





___



###  changeStartDateTime

► **changeStartDateTime**(date: *`Date`*): `void`



*Defined in [app/services/gdax-data.service.ts:55](https://github.com/WilliamRADFunk/cryptobot-interface/blob/de4f8ae/src/app/services/gdax-data.service.ts#L55)*



Updates the start datetime being viewed, and refreshes query results.


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| date | `Date`   |  the start datetime object |





**Returns:** `void`





___



###  changeTimeInterval

► **changeTimeInterval**(interval: *`number`*): `void`



*Defined in [app/services/gdax-data.service.ts:64](https://github.com/WilliamRADFunk/cryptobot-interface/blob/de4f8ae/src/app/services/gdax-data.service.ts#L64)*



Updates the granularity of the data points, and refreshes query results.


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| interval | `number`   |  the granularity to use |





**Returns:** `void`





___



###  getLatestGdaxData

► **getLatestGdaxData**(): `void`



*Defined in [app/services/gdax-data.service.ts:72](https://github.com/WilliamRADFunk/cryptobot-interface/blob/de4f8ae/src/app/services/gdax-data.service.ts#L72)*



Call to GDAX for historical market data




**Returns:** `void`
an observable that returns market data specific to query params






___


