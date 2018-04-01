[cryptobot-interface](../README.md) > [GdaxDataService](../classes/gdaxdataservice.md)



# Class: GdaxDataService

## Index

### Constructors

* [constructor](gdaxdataservice.md#markdown-header-constructor)


### Properties

* [basePath](gdaxdataservice.md#markdown-header-basepath)
* [chartData](gdaxdataservice.md#markdown-header-chartdata)
* [currency](gdaxdataservice.md#markdown-header-currency)
* [endDate](gdaxdataservice.md#markdown-header-enddate)
* [http](gdaxdataservice.md#markdown-header-private-http)
* [interval](gdaxdataservice.md#markdown-header-interval)
* [isBusy](gdaxdataservice.md#markdown-header-isbusy)
* [startDate](gdaxdataservice.md#markdown-header-startdate)
* [tableData](gdaxdataservice.md#markdown-header-tabledata)


### Methods

* [changeCurrencyType](gdaxdataservice.md#markdown-header-changecurrencytype)
* [changeEndDateTime](gdaxdataservice.md#markdown-header-changeenddatetime)
* [changeStartDateTime](gdaxdataservice.md#markdown-header-changestartdatetime)
* [changeTimeInterval](gdaxdataservice.md#markdown-header-changetimeinterval)
* [getLatestGdaxData](gdaxdataservice.md#markdown-header-getlatestgdaxdata)
* [getLatestGdaxHistoryData](gdaxdataservice.md#markdown-header-getlatestgdaxhistorydata)
* [refreshData](gdaxdataservice.md#markdown-header-refreshdata)



---
## Constructors



### ⊕ **new GdaxDataService**(http: *`HttpClient`*): [GdaxDataService](gdaxdataservice.md)


*Defined in [app/services/gdax-data.service.ts:37](https://github.com/WilliamRADFunk/cryptobot-interface/blob/db3d1a3/src/app/services/gdax-data.service.ts#L37)*



Constructor for the class. Injects Angular's HttpClient service


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| http | `HttpClient`   |  Angular's HttpClient service for making http calls |





**Returns:** [GdaxDataService](gdaxdataservice.md)

---


## Properties


###  basePath

**●  basePath**:  *`string`*  = "live-view"

*Defined in [app/services/gdax-data.service.ts:20](https://github.com/WilliamRADFunk/cryptobot-interface/blob/db3d1a3/src/app/services/gdax-data.service.ts#L20)*



Used to determine which of the api to refresh.




___



###  chartData

**●  chartData**:  *`BehaviorSubject`.<`number`[][]>*  =  new BehaviorSubject<number[][]>([])

*Defined in [app/services/gdax-data.service.ts:11](https://github.com/WilliamRADFunk/cryptobot-interface/blob/db3d1a3/src/app/services/gdax-data.service.ts#L11)*



The updated query results for historical trade market data in a format that all of the live views will understand and be able to use.




___



###  currency

**●  currency**:  *`string`*  = "BTC-USD"

*Defined in [app/services/gdax-data.service.ts:24](https://github.com/WilliamRADFunk/cryptobot-interface/blob/db3d1a3/src/app/services/gdax-data.service.ts#L24)*



Currency type which is used as part of the query URL.




___



###  endDate

**●  endDate**:  *`Date`*  =  new Date()

*Defined in [app/services/gdax-data.service.ts:28](https://github.com/WilliamRADFunk/cryptobot-interface/blob/db3d1a3/src/app/services/gdax-data.service.ts#L28)*



The end datetime used as a parameter in the query URL




___



### «Private» http

**●  http**:  *`HttpClient`* 

*Defined in [app/services/gdax-data.service.ts:43](https://github.com/WilliamRADFunk/cryptobot-interface/blob/db3d1a3/src/app/services/gdax-data.service.ts#L43)*



Angular's HttpClient service for making http calls




___



###  interval

**●  interval**:  *`number`*  = 3600

*Defined in [app/services/gdax-data.service.ts:32](https://github.com/WilliamRADFunk/cryptobot-interface/blob/db3d1a3/src/app/services/gdax-data.service.ts#L32)*



The granularity between data points. Used as a parameter in query URL.




___



###  isBusy

**●  isBusy**:  *`BehaviorSubject`.<`boolean`>*  =  new BehaviorSubject<boolean>(false)

*Defined in [app/services/gdax-data.service.ts:33](https://github.com/WilliamRADFunk/cryptobot-interface/blob/db3d1a3/src/app/services/gdax-data.service.ts#L33)*





___



###  startDate

**●  startDate**:  *`Date`*  =  new Date(this.endDate.getTime() - 86400000)

*Defined in [app/services/gdax-data.service.ts:37](https://github.com/WilliamRADFunk/cryptobot-interface/blob/db3d1a3/src/app/services/gdax-data.service.ts#L37)*



The start datetime used as a parameter in the query URL




___



###  tableData

**●  tableData**:  *`BehaviorSubject`.<`number`[][]>*  =  new BehaviorSubject<number[][]>([])

*Defined in [app/services/gdax-data.service.ts:16](https://github.com/WilliamRADFunk/cryptobot-interface/blob/db3d1a3/src/app/services/gdax-data.service.ts#L16)*



The updated query results for historical trade market data in a format that all of the live views will understand and be able to use.




___


## Methods


###  changeCurrencyType

► **changeCurrencyType**(currency: *`string`*, basePath: *`string`*): `void`



*Defined in [app/services/gdax-data.service.ts:48](https://github.com/WilliamRADFunk/cryptobot-interface/blob/db3d1a3/src/app/services/gdax-data.service.ts#L48)*



Updates the currency type being viewed, and refreshes query results.


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| currency | `string`   |  the currency string (ie. 'BTC-USD') |
| basePath | `string`   |  - |





**Returns:** `void`





___



###  changeEndDateTime

► **changeEndDateTime**(date: *`Date`*): `void`



*Defined in [app/services/gdax-data.service.ts:57](https://github.com/WilliamRADFunk/cryptobot-interface/blob/db3d1a3/src/app/services/gdax-data.service.ts#L57)*



Updates the end datetime being viewed, and refreshes query results.


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| date | `Date`   |  the end datetime object |





**Returns:** `void`





___



###  changeStartDateTime

► **changeStartDateTime**(date: *`Date`*): `void`



*Defined in [app/services/gdax-data.service.ts:65](https://github.com/WilliamRADFunk/cryptobot-interface/blob/db3d1a3/src/app/services/gdax-data.service.ts#L65)*



Updates the start datetime being viewed, and refreshes query results.


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| date | `Date`   |  the start datetime object |





**Returns:** `void`





___



###  changeTimeInterval

► **changeTimeInterval**(interval: *`number`*): `void`



*Defined in [app/services/gdax-data.service.ts:74](https://github.com/WilliamRADFunk/cryptobot-interface/blob/db3d1a3/src/app/services/gdax-data.service.ts#L74)*



Updates the granularity of the data points, and refreshes query results.


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| interval | `number`   |  the granularity to use |





**Returns:** `void`





___



###  getLatestGdaxData

► **getLatestGdaxData**(): `void`



*Defined in [app/services/gdax-data.service.ts:82](https://github.com/WilliamRADFunk/cryptobot-interface/blob/db3d1a3/src/app/services/gdax-data.service.ts#L82)*



Call to GDAX for historical market data




**Returns:** `void`
an observable that returns market data specific to query params






___



###  getLatestGdaxHistoryData

► **getLatestGdaxHistoryData**(): `void`



*Defined in [app/services/gdax-data.service.ts:127](https://github.com/WilliamRADFunk/cryptobot-interface/blob/db3d1a3/src/app/services/gdax-data.service.ts#L127)*





**Returns:** `void`





___



###  refreshData

► **refreshData**(): `void`



*Defined in [app/services/gdax-data.service.ts:147](https://github.com/WilliamRADFunk/cryptobot-interface/blob/db3d1a3/src/app/services/gdax-data.service.ts#L147)*





**Returns:** `void`





___


