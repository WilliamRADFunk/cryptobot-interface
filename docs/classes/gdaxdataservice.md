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
* [getLatestCryptoBotData](gdaxdataservice.md#markdown-header-getlatestcryptobotdata)
* [getLatestGdaxData](gdaxdataservice.md#markdown-header-getlatestgdaxdata)
* [getLatestGdaxHistoryData](gdaxdataservice.md#markdown-header-getlatestgdaxhistorydata)
* [getLatestGdaxProfitData](gdaxdataservice.md#markdown-header-getlatestgdaxprofitdata)
* [refreshData](gdaxdataservice.md#markdown-header-refreshdata)



---
## Constructors



### ⊕ **new GdaxDataService**(http: *`HttpClient`*): [GdaxDataService](gdaxdataservice.md)


*Defined in [app/services/gdax-data.service.ts:52](https://github.com/WilliamRADFunk/cryptobot-interface/blob/ade795d/src/app/services/gdax-data.service.ts#L52)*



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

*Defined in [app/services/gdax-data.service.ts:10](https://github.com/WilliamRADFunk/cryptobot-interface/blob/ade795d/src/app/services/gdax-data.service.ts#L10)*



Used to determine which of the api to refresh.




___



###  chartData

**●  chartData**:  *`BehaviorSubject`.<`number`[][]>*  =  new BehaviorSubject<number[][]>([])

*Defined in [app/services/gdax-data.service.ts:15](https://github.com/WilliamRADFunk/cryptobot-interface/blob/ade795d/src/app/services/gdax-data.service.ts#L15)*



The updated query results for historical trade market data in a format that all of the live views will understand and be able to use.




___



###  currency

**●  currency**:  *`string`*  = "BTC-USD"

*Defined in [app/services/gdax-data.service.ts:19](https://github.com/WilliamRADFunk/cryptobot-interface/blob/ade795d/src/app/services/gdax-data.service.ts#L19)*



Currency type which is used as part of the query URL.




___



###  endDate

**●  endDate**:  *`Date`*  =  new Date()

*Defined in [app/services/gdax-data.service.ts:23](https://github.com/WilliamRADFunk/cryptobot-interface/blob/ade795d/src/app/services/gdax-data.service.ts#L23)*



The end datetime used as a parameter in the query URL




___



### «Private» http

**●  http**:  *`HttpClient`* 

*Defined in [app/services/gdax-data.service.ts:58](https://github.com/WilliamRADFunk/cryptobot-interface/blob/ade795d/src/app/services/gdax-data.service.ts#L58)*



Angular's HttpClient service for making http calls




___



###  interval

**●  interval**:  *`number`*  = 3600

*Defined in [app/services/gdax-data.service.ts:27](https://github.com/WilliamRADFunk/cryptobot-interface/blob/ade795d/src/app/services/gdax-data.service.ts#L27)*



The granularity between data points. Used as a parameter in query URL




___



###  isBusy

**●  isBusy**:  *`BehaviorSubject`.<`boolean`>*  =  new BehaviorSubject<boolean>(false)

*Defined in [app/services/gdax-data.service.ts:31](https://github.com/WilliamRADFunk/cryptobot-interface/blob/ade795d/src/app/services/gdax-data.service.ts#L31)*



The flag to designate if query is busy




___



###  isRelevant

**●  isRelevant**:  *`BehaviorSubject`.<`boolean`>*  =  new BehaviorSubject<boolean>(false)

*Defined in [app/services/gdax-data.service.ts:35](https://github.com/WilliamRADFunk/cryptobot-interface/blob/ade795d/src/app/services/gdax-data.service.ts#L35)*



The flag to designate if granularity is relevant for basePath api




___



###  page

**●  page**:  *`number`*  = 1

*Defined in [app/services/gdax-data.service.ts:39](https://github.com/WilliamRADFunk/cryptobot-interface/blob/ade795d/src/app/services/gdax-data.service.ts#L39)*



The current number for page in results.




___



###  rowsPerPage

**●  rowsPerPage**:  *`number`*  = 100

*Defined in [app/services/gdax-data.service.ts:43](https://github.com/WilliamRADFunk/cryptobot-interface/blob/ade795d/src/app/services/gdax-data.service.ts#L43)*



The current number for rows per page




___



###  startDate

**●  startDate**:  *`Date`*  =  new Date(this.endDate.getTime() - 86400000)

*Defined in [app/services/gdax-data.service.ts:47](https://github.com/WilliamRADFunk/cryptobot-interface/blob/ade795d/src/app/services/gdax-data.service.ts#L47)*



The start datetime used as a parameter in the query URL




___



###  tableData

**●  tableData**:  *`BehaviorSubject`.<`__type`[]>*  =  new BehaviorSubject<{}[]>([])

*Defined in [app/services/gdax-data.service.ts:52](https://github.com/WilliamRADFunk/cryptobot-interface/blob/ade795d/src/app/services/gdax-data.service.ts#L52)*



The updated query results for historical trade market data in a format that all of the live views will understand and be able to use.




___


## Methods


###  changeCurrencyType

► **changeCurrencyType**(currency: *`string`*, basePath: *`string`*): `void`



*Defined in [app/services/gdax-data.service.ts:63](https://github.com/WilliamRADFunk/cryptobot-interface/blob/ade795d/src/app/services/gdax-data.service.ts#L63)*



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



*Defined in [app/services/gdax-data.service.ts:72](https://github.com/WilliamRADFunk/cryptobot-interface/blob/ade795d/src/app/services/gdax-data.service.ts#L72)*



Updates the end datetime being viewed, and refreshes query results.


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| date | `Date`   |  the end datetime object |





**Returns:** `void`





___



###  changePageNumber

► **changePageNumber**(page: *`number`*): `void`



*Defined in [app/services/gdax-data.service.ts:81](https://github.com/WilliamRADFunk/cryptobot-interface/blob/ade795d/src/app/services/gdax-data.service.ts#L81)*



Updates the page number, and refreshes query results.


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| page | `number`   |  the granularity to use |





**Returns:** `void`





___



###  changeRowsPerPage

► **changeRowsPerPage**(rowsPerPage: *`number`*): `void`



*Defined in [app/services/gdax-data.service.ts:90](https://github.com/WilliamRADFunk/cryptobot-interface/blob/ade795d/src/app/services/gdax-data.service.ts#L90)*



Updates the number of rows per page, and refreshes query results.


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| rowsPerPage | `number`   |  the granularity to use |





**Returns:** `void`





___



###  changeStartDateTime

► **changeStartDateTime**(date: *`Date`*): `void`



*Defined in [app/services/gdax-data.service.ts:98](https://github.com/WilliamRADFunk/cryptobot-interface/blob/ade795d/src/app/services/gdax-data.service.ts#L98)*



Updates the start datetime being viewed, and refreshes query results.


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| date | `Date`   |  the start datetime object |





**Returns:** `void`





___



###  changeTimeInterval

► **changeTimeInterval**(interval: *`number`*): `void`



*Defined in [app/services/gdax-data.service.ts:107](https://github.com/WilliamRADFunk/cryptobot-interface/blob/ade795d/src/app/services/gdax-data.service.ts#L107)*



Updates the granularity of the data points, and refreshes query results.


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| interval | `number`   |  the granularity to use |





**Returns:** `void`





___



###  getLatestCryptoBotData

► **getLatestCryptoBotData**(): `void`



*Defined in [app/services/gdax-data.service.ts:252](https://github.com/WilliamRADFunk/cryptobot-interface/blob/ade795d/src/app/services/gdax-data.service.ts#L252)*



Call to GDAX for cryptobot data




**Returns:** `void`





___



###  getLatestGdaxData

► **getLatestGdaxData**(): `void`



*Defined in [app/services/gdax-data.service.ts:114](https://github.com/WilliamRADFunk/cryptobot-interface/blob/ade795d/src/app/services/gdax-data.service.ts#L114)*



Call to GDAX for historical market data




**Returns:** `void`





___



###  getLatestGdaxHistoryData

► **getLatestGdaxHistoryData**(): `void`



*Defined in [app/services/gdax-data.service.ts:162](https://github.com/WilliamRADFunk/cryptobot-interface/blob/ade795d/src/app/services/gdax-data.service.ts#L162)*



Call to GDAX for trading history data




**Returns:** `void`





___



###  getLatestGdaxProfitData

► **getLatestGdaxProfitData**(): `void`



*Defined in [app/services/gdax-data.service.ts:246](https://github.com/WilliamRADFunk/cryptobot-interface/blob/ade795d/src/app/services/gdax-data.service.ts#L246)*



Call to GDAX for profit data




**Returns:** `void`





___



###  refreshData

► **refreshData**(): `void`



*Defined in [app/services/gdax-data.service.ts:258](https://github.com/WilliamRADFunk/cryptobot-interface/blob/ade795d/src/app/services/gdax-data.service.ts#L258)*



Determines which data api to use based off of basePath, and calls it.




**Returns:** `void`





___


