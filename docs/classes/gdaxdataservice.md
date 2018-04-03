[cryptobot-interface](../README.md) > [GdaxDataService](../classes/gdaxdataservice.md)



# Class: GdaxDataService

## Index

### Constructors

* [constructor](gdaxdataservice.md#markdown-header-constructor)


### Properties

* [basePath](gdaxdataservice.md#markdown-header-basepath)
* [bookmark](gdaxdataservice.md#markdown-header-bookmark)
* [chartData](gdaxdataservice.md#markdown-header-chartdata)
* [currency](gdaxdataservice.md#markdown-header-currency)
* [endDate](gdaxdataservice.md#markdown-header-enddate)
* [http](gdaxdataservice.md#markdown-header-private-http)
* [interval](gdaxdataservice.md#markdown-header-interval)
* [isBusy](gdaxdataservice.md#markdown-header-isbusy)
* [isRelevant](gdaxdataservice.md#markdown-header-isrelevant)
* [page](gdaxdataservice.md#markdown-header-page)
* [rowsPerPage](gdaxdataservice.md#markdown-header-rowsperpage)
* [startDate](gdaxdataservice.md#markdown-header-startdate)
* [tableData](gdaxdataservice.md#markdown-header-tabledata)


### Methods

* [changeCurrencyType](gdaxdataservice.md#markdown-header-changecurrencytype)
* [changeEndDateTime](gdaxdataservice.md#markdown-header-changeenddatetime)
* [changePageNumber](gdaxdataservice.md#markdown-header-changepagenumber)
* [changeRowsPerPage](gdaxdataservice.md#markdown-header-changerowsperpage)
* [changeStartDateTime](gdaxdataservice.md#markdown-header-changestartdatetime)
* [changeTimeInterval](gdaxdataservice.md#markdown-header-changetimeinterval)
* [formatProduct](gdaxdataservice.md#markdown-header-formatproduct)
* [getLatestCryptoBotData](gdaxdataservice.md#markdown-header-getlatestcryptobotdata)
* [getLatestGdaxData](gdaxdataservice.md#markdown-header-getlatestgdaxdata)
* [getLatestGdaxHistoryData](gdaxdataservice.md#markdown-header-getlatestgdaxhistorydata)
* [getLatestGdaxProfitData](gdaxdataservice.md#markdown-header-getlatestgdaxprofitdata)
* [refreshData](gdaxdataservice.md#markdown-header-refreshdata)



---
## Constructors



### ⊕ **new GdaxDataService**(http: *`HttpClient`*): [GdaxDataService](gdaxdataservice.md)


*Defined in [app/services/gdax-data.service.ts:56](https://github.com/WilliamRADFunk/cryptobot-interface/blob/2cb1c49/src/app/services/gdax-data.service.ts#L56)*



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

*Defined in [app/services/gdax-data.service.ts:10](https://github.com/WilliamRADFunk/cryptobot-interface/blob/2cb1c49/src/app/services/gdax-data.service.ts#L10)*



Used to determine which of the api to refresh.




___



###  bookmark

**●  bookmark**:  *`number`* 

*Defined in [app/services/gdax-data.service.ts:14](https://github.com/WilliamRADFunk/cryptobot-interface/blob/2cb1c49/src/app/services/gdax-data.service.ts#L14)*



Used to keep track of paging




___



###  chartData

**●  chartData**:  *`BehaviorSubject`.<`number`[][]>*  =  new BehaviorSubject<number[][]>([])

*Defined in [app/services/gdax-data.service.ts:19](https://github.com/WilliamRADFunk/cryptobot-interface/blob/2cb1c49/src/app/services/gdax-data.service.ts#L19)*



The updated query results for historical trade market data in a format that all of the live views will understand and be able to use.




___



###  currency

**●  currency**:  *`string`*  = "BTC-USD"

*Defined in [app/services/gdax-data.service.ts:23](https://github.com/WilliamRADFunk/cryptobot-interface/blob/2cb1c49/src/app/services/gdax-data.service.ts#L23)*



Currency type which is used as part of the query URL.




___



###  endDate

**●  endDate**:  *`Date`*  =  new Date()

*Defined in [app/services/gdax-data.service.ts:27](https://github.com/WilliamRADFunk/cryptobot-interface/blob/2cb1c49/src/app/services/gdax-data.service.ts#L27)*



The end datetime used as a parameter in the query URL




___



### «Private» http

**●  http**:  *`HttpClient`* 

*Defined in [app/services/gdax-data.service.ts:62](https://github.com/WilliamRADFunk/cryptobot-interface/blob/2cb1c49/src/app/services/gdax-data.service.ts#L62)*



Angular's HttpClient service for making http calls




___



###  interval

**●  interval**:  *`number`*  = 3600

*Defined in [app/services/gdax-data.service.ts:31](https://github.com/WilliamRADFunk/cryptobot-interface/blob/2cb1c49/src/app/services/gdax-data.service.ts#L31)*



The granularity between data points. Used as a parameter in query URL




___



###  isBusy

**●  isBusy**:  *`BehaviorSubject`.<`boolean`>*  =  new BehaviorSubject<boolean>(false)

*Defined in [app/services/gdax-data.service.ts:35](https://github.com/WilliamRADFunk/cryptobot-interface/blob/2cb1c49/src/app/services/gdax-data.service.ts#L35)*



The flag to designate if query is busy




___



###  isRelevant

**●  isRelevant**:  *`BehaviorSubject`.<`boolean`>*  =  new BehaviorSubject<boolean>(false)

*Defined in [app/services/gdax-data.service.ts:39](https://github.com/WilliamRADFunk/cryptobot-interface/blob/2cb1c49/src/app/services/gdax-data.service.ts#L39)*



The flag to designate if granularity is relevant for basePath api




___



###  page

**●  page**:  *`number`*  = 1

*Defined in [app/services/gdax-data.service.ts:43](https://github.com/WilliamRADFunk/cryptobot-interface/blob/2cb1c49/src/app/services/gdax-data.service.ts#L43)*



The current number for page in results.




___



###  rowsPerPage

**●  rowsPerPage**:  *`number`*  = 10

*Defined in [app/services/gdax-data.service.ts:47](https://github.com/WilliamRADFunk/cryptobot-interface/blob/2cb1c49/src/app/services/gdax-data.service.ts#L47)*



The current number for rows per page




___



###  startDate

**●  startDate**:  *`Date`*  =  new Date(this.endDate.getTime() - 86400000)

*Defined in [app/services/gdax-data.service.ts:51](https://github.com/WilliamRADFunk/cryptobot-interface/blob/2cb1c49/src/app/services/gdax-data.service.ts#L51)*



The start datetime used as a parameter in the query URL




___



###  tableData

**●  tableData**:  *`BehaviorSubject`.<`__type`[]>*  =  new BehaviorSubject<{}[]>([])

*Defined in [app/services/gdax-data.service.ts:56](https://github.com/WilliamRADFunk/cryptobot-interface/blob/2cb1c49/src/app/services/gdax-data.service.ts#L56)*



The updated query results for historical trade market data in a format that all of the live views will understand and be able to use.




___


## Methods


###  changeCurrencyType

► **changeCurrencyType**(currency: *`string`*, basePath: *`string`*): `void`



*Defined in [app/services/gdax-data.service.ts:67](https://github.com/WilliamRADFunk/cryptobot-interface/blob/2cb1c49/src/app/services/gdax-data.service.ts#L67)*



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



*Defined in [app/services/gdax-data.service.ts:76](https://github.com/WilliamRADFunk/cryptobot-interface/blob/2cb1c49/src/app/services/gdax-data.service.ts#L76)*



Updates the end datetime being viewed, and refreshes query results.


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| date | `Date`   |  the end datetime object |





**Returns:** `void`





___



###  changePageNumber

► **changePageNumber**(page: *`number`*): `void`



*Defined in [app/services/gdax-data.service.ts:85](https://github.com/WilliamRADFunk/cryptobot-interface/blob/2cb1c49/src/app/services/gdax-data.service.ts#L85)*



Updates the page number, and refreshes query results.


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| page | `number`   |  the granularity to use |





**Returns:** `void`





___



###  changeRowsPerPage

► **changeRowsPerPage**(rowsPerPage: *`number`*): `void`



*Defined in [app/services/gdax-data.service.ts:101](https://github.com/WilliamRADFunk/cryptobot-interface/blob/2cb1c49/src/app/services/gdax-data.service.ts#L101)*



Updates the number of rows per page, and refreshes query results.


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| rowsPerPage | `number`   |  the granularity to use |





**Returns:** `void`





___



###  changeStartDateTime

► **changeStartDateTime**(date: *`Date`*): `void`



*Defined in [app/services/gdax-data.service.ts:111](https://github.com/WilliamRADFunk/cryptobot-interface/blob/2cb1c49/src/app/services/gdax-data.service.ts#L111)*



Updates the start datetime being viewed, and refreshes query results.


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| date | `Date`   |  the start datetime object |





**Returns:** `void`





___



###  changeTimeInterval

► **changeTimeInterval**(interval: *`number`*): `void`



*Defined in [app/services/gdax-data.service.ts:120](https://github.com/WilliamRADFunk/cryptobot-interface/blob/2cb1c49/src/app/services/gdax-data.service.ts#L120)*



Updates the granularity of the data points, and refreshes query results.


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| interval | `number`   |  the granularity to use |





**Returns:** `void`





___



###  formatProduct

► **formatProduct**(data: *`__type`[]*): `__type`[]



*Defined in [app/services/gdax-data.service.ts:129](https://github.com/WilliamRADFunk/cryptobot-interface/blob/2cb1c49/src/app/services/gdax-data.service.ts#L129)*



Pulls out and formats the product from gdax query results.


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| data | `__type`[]   |  array of data objects to be formatted |





**Returns:** `__type`[]
formatted data array






___



###  getLatestCryptoBotData

► **getLatestCryptoBotData**(): `void`



*Defined in [app/services/gdax-data.service.ts:257](https://github.com/WilliamRADFunk/cryptobot-interface/blob/2cb1c49/src/app/services/gdax-data.service.ts#L257)*



Call to GDAX for cryptobot data




**Returns:** `void`





___



###  getLatestGdaxData

► **getLatestGdaxData**(): `void`



*Defined in [app/services/gdax-data.service.ts:152](https://github.com/WilliamRADFunk/cryptobot-interface/blob/2cb1c49/src/app/services/gdax-data.service.ts#L152)*



Call to GDAX for historical market data




**Returns:** `void`





___



###  getLatestGdaxHistoryData

► **getLatestGdaxHistoryData**(): `void`



*Defined in [app/services/gdax-data.service.ts:200](https://github.com/WilliamRADFunk/cryptobot-interface/blob/2cb1c49/src/app/services/gdax-data.service.ts#L200)*



Call to GDAX for trading history data




**Returns:** `void`





___



###  getLatestGdaxProfitData

► **getLatestGdaxProfitData**(): `void`



*Defined in [app/services/gdax-data.service.ts:251](https://github.com/WilliamRADFunk/cryptobot-interface/blob/2cb1c49/src/app/services/gdax-data.service.ts#L251)*



Call to GDAX for profit data




**Returns:** `void`





___



###  refreshData

► **refreshData**(): `void`



*Defined in [app/services/gdax-data.service.ts:263](https://github.com/WilliamRADFunk/cryptobot-interface/blob/2cb1c49/src/app/services/gdax-data.service.ts#L263)*



Determines which data api to use based off of basePath, and calls it.




**Returns:** `void`





___


