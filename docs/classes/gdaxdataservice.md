[cryptobot-interface](../README.md) > [GdaxDataService](../classes/gdaxdataservice.md)



# Class: GdaxDataService

## Index

### Constructors

* [constructor](gdaxdataservice.md#markdown-header-constructor)


### Properties

* [basePath](gdaxdataservice.md#markdown-header-basepath)
* [bookmark](gdaxdataservice.md#markdown-header-bookmark)
* [chartData](gdaxdataservice.md#markdown-header-chartdata)
* [currIndex](gdaxdataservice.md#markdown-header-currindex)
* [currTypes](gdaxdataservice.md#markdown-header-currtypes)
* [currency](gdaxdataservice.md#markdown-header-currency)
* [endDate](gdaxdataservice.md#markdown-header-enddate)
* [firstTime](gdaxdataservice.md#markdown-header-firsttime)
* [http](gdaxdataservice.md#markdown-header-private-http)
* [interval](gdaxdataservice.md#markdown-header-interval)
* [isBusy](gdaxdataservice.md#markdown-header-isbusy)
* [isRelevant](gdaxdataservice.md#markdown-header-isrelevant)
* [page](gdaxdataservice.md#markdown-header-page)
* [rowsPerPage](gdaxdataservice.md#markdown-header-rowsperpage)
* [startDate](gdaxdataservice.md#markdown-header-startdate)
* [tableData](gdaxdataservice.md#markdown-header-tabledata)
* [tableResults](gdaxdataservice.md#markdown-header-tableresults)


### Methods

* [changeCurrencyType](gdaxdataservice.md#markdown-header-changecurrencytype)
* [changeEndDateTime](gdaxdataservice.md#markdown-header-changeenddatetime)
* [changePageNumber](gdaxdataservice.md#markdown-header-changepagenumber)
* [changeRowsPerPage](gdaxdataservice.md#markdown-header-changerowsperpage)
* [changeStartDateTime](gdaxdataservice.md#markdown-header-changestartdatetime)
* [changeTimeInterval](gdaxdataservice.md#markdown-header-changetimeinterval)
* [filterByDate](gdaxdataservice.md#markdown-header-filterbydate)
* [formatProduct](gdaxdataservice.md#markdown-header-formatproduct)
* [getLatestCryptoBotData](gdaxdataservice.md#markdown-header-getlatestcryptobotdata)
* [getLatestGdaxData](gdaxdataservice.md#markdown-header-getlatestgdaxdata)
* [getLatestGdaxHistoryData](gdaxdataservice.md#markdown-header-getlatestgdaxhistorydata)
* [getLatestGdaxProfitData](gdaxdataservice.md#markdown-header-getlatestgdaxprofitdata)
* [handleHistoryResults](gdaxdataservice.md#markdown-header-handlehistoryresults)
* [refreshData](gdaxdataservice.md#markdown-header-refreshdata)



---
## Constructors



### ⊕ **new GdaxDataService**(http: *`HttpClient`*): [GdaxDataService](gdaxdataservice.md)


*Defined in [app/services/gdax-data.service.ts:67](https://github.com/WilliamRADFunk/cryptobot-interface/blob/b6d7879/src/app/services/gdax-data.service.ts#L67)*



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

*Defined in [app/services/gdax-data.service.ts:12](https://github.com/WilliamRADFunk/cryptobot-interface/blob/b6d7879/src/app/services/gdax-data.service.ts#L12)*



Used to determine which of the api to refresh.




___



###  bookmark

**●  bookmark**:  *`number`* 

*Defined in [app/services/gdax-data.service.ts:16](https://github.com/WilliamRADFunk/cryptobot-interface/blob/b6d7879/src/app/services/gdax-data.service.ts#L16)*



Used to keep track of paging




___



###  chartData

**●  chartData**:  *`BehaviorSubject`.<`number`[][]>*  =  new BehaviorSubject<number[][]>([])

*Defined in [app/services/gdax-data.service.ts:21](https://github.com/WilliamRADFunk/cryptobot-interface/blob/b6d7879/src/app/services/gdax-data.service.ts#L21)*



The updated query results for historical trade market data in a format that all of the live views will understand and be able to use.




___



###  currIndex

**●  currIndex**:  *`number`*  = 0

*Defined in [app/services/gdax-data.service.ts:67](https://github.com/WilliamRADFunk/cryptobot-interface/blob/b6d7879/src/app/services/gdax-data.service.ts#L67)*





___



###  currTypes

**●  currTypes**:  *`string`[]*  =  ['btc', 'ltc', 'eth']

*Defined in [app/services/gdax-data.service.ts:66](https://github.com/WilliamRADFunk/cryptobot-interface/blob/b6d7879/src/app/services/gdax-data.service.ts#L66)*





___



###  currency

**●  currency**:  *`string`*  = "BTC-USD"

*Defined in [app/services/gdax-data.service.ts:25](https://github.com/WilliamRADFunk/cryptobot-interface/blob/b6d7879/src/app/services/gdax-data.service.ts#L25)*



Currency type which is used as part of the query URL.




___



###  endDate

**●  endDate**:  *`Date`*  =  new Date()

*Defined in [app/services/gdax-data.service.ts:29](https://github.com/WilliamRADFunk/cryptobot-interface/blob/b6d7879/src/app/services/gdax-data.service.ts#L29)*



The end datetime used as a parameter in the query URL




___



###  firstTime

**●  firstTime**:  *`boolean`[]*  =  [true, true, true, true]

*Defined in [app/services/gdax-data.service.ts:35](https://github.com/WilliamRADFunk/cryptobot-interface/blob/b6d7879/src/app/services/gdax-data.service.ts#L35)*



Array of flags to determine if initial filtering params have called in the service to query for data. First is route component params. Second is granularity, Third is startDateTime. Fourth is endDateTime.




___



### «Private» http

**●  http**:  *`HttpClient`* 

*Defined in [app/services/gdax-data.service.ts:73](https://github.com/WilliamRADFunk/cryptobot-interface/blob/b6d7879/src/app/services/gdax-data.service.ts#L73)*



Angular's HttpClient service for making http calls




___



###  interval

**●  interval**:  *`number`*  = 3600

*Defined in [app/services/gdax-data.service.ts:39](https://github.com/WilliamRADFunk/cryptobot-interface/blob/b6d7879/src/app/services/gdax-data.service.ts#L39)*



The granularity between data points. Used as a parameter in query URL




___



###  isBusy

**●  isBusy**:  *`BehaviorSubject`.<`boolean`>*  =  new BehaviorSubject<boolean>(false)

*Defined in [app/services/gdax-data.service.ts:43](https://github.com/WilliamRADFunk/cryptobot-interface/blob/b6d7879/src/app/services/gdax-data.service.ts#L43)*



The flag to designate if query is busy




___



###  isRelevant

**●  isRelevant**:  *`BehaviorSubject`.<`boolean`>*  =  new BehaviorSubject<boolean>(false)

*Defined in [app/services/gdax-data.service.ts:47](https://github.com/WilliamRADFunk/cryptobot-interface/blob/b6d7879/src/app/services/gdax-data.service.ts#L47)*



The flag to designate if granularity is relevant for basePath api




___



###  page

**●  page**:  *`BehaviorSubject`.<`number`>*  =  new BehaviorSubject<number>(1)

*Defined in [app/services/gdax-data.service.ts:51](https://github.com/WilliamRADFunk/cryptobot-interface/blob/b6d7879/src/app/services/gdax-data.service.ts#L51)*



The current number for page in results.




___



###  rowsPerPage

**●  rowsPerPage**:  *`number`*  = 10

*Defined in [app/services/gdax-data.service.ts:55](https://github.com/WilliamRADFunk/cryptobot-interface/blob/b6d7879/src/app/services/gdax-data.service.ts#L55)*



The current number for rows per page




___



###  startDate

**●  startDate**:  *`Date`*  =  new Date(this.endDate.getTime() - 86400000)

*Defined in [app/services/gdax-data.service.ts:59](https://github.com/WilliamRADFunk/cryptobot-interface/blob/b6d7879/src/app/services/gdax-data.service.ts#L59)*



The start datetime used as a parameter in the query URL




___



###  tableData

**●  tableData**:  *`BehaviorSubject`.<`__type`[]>*  =  new BehaviorSubject<{}[]>([])

*Defined in [app/services/gdax-data.service.ts:64](https://github.com/WilliamRADFunk/cryptobot-interface/blob/b6d7879/src/app/services/gdax-data.service.ts#L64)*



The updated query results for historical trade market data in a format that all of the live views will understand and be able to use.




___



###  tableResults

**●  tableResults**:  *`__type`[]*  =  []

*Defined in [app/services/gdax-data.service.ts:65](https://github.com/WilliamRADFunk/cryptobot-interface/blob/b6d7879/src/app/services/gdax-data.service.ts#L65)*





___


## Methods


###  changeCurrencyType

► **changeCurrencyType**(currency: *`string`*, basePath: *`string`*, refresh?: *`boolean`*): `void`



*Defined in [app/services/gdax-data.service.ts:80](https://github.com/WilliamRADFunk/cryptobot-interface/blob/b6d7879/src/app/services/gdax-data.service.ts#L80)*



Updates the currency type being viewed, and refreshes query results.


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| currency | `string`   |  the currency string (ie. 'BTC-USD') |
| basePath | `string`   |  keeps track of basepath to determine which options to turn on and off |
| refresh | `boolean`   |  flag to refresh the query. Helps to wait until all url details are pulled |





**Returns:** `void`





___



###  changeEndDateTime

► **changeEndDateTime**(date: *`Date`*, initChange?: *`boolean`*): `void`



*Defined in [app/services/gdax-data.service.ts:98](https://github.com/WilliamRADFunk/cryptobot-interface/blob/b6d7879/src/app/services/gdax-data.service.ts#L98)*



Updates the end datetime being viewed, and refreshes query results.


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| date | `Date`   |  the end datetime object |
| initChange | `boolean`   |  flag to signal it's an original change (prevents multiple query calls onInit) |





**Returns:** `void`





___



###  changePageNumber

► **changePageNumber**(page: *`number`*): `void`



*Defined in [app/services/gdax-data.service.ts:115](https://github.com/WilliamRADFunk/cryptobot-interface/blob/b6d7879/src/app/services/gdax-data.service.ts#L115)*



Updates the page number, and refreshes query results.


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| page | `number`   |  the granularity to use |





**Returns:** `void`





___



###  changeRowsPerPage

► **changeRowsPerPage**(rowsPerPage: *`number`*, initChange?: *`boolean`*): `void`



*Defined in [app/services/gdax-data.service.ts:136](https://github.com/WilliamRADFunk/cryptobot-interface/blob/b6d7879/src/app/services/gdax-data.service.ts#L136)*



Updates the number of rows per page, and refreshes query results.


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| rowsPerPage | `number`   |  the granularity to use |
| initChange | `boolean`   |  flag to signal it's an original change (prevents multiple query calls onInit) |





**Returns:** `void`





___



###  changeStartDateTime

► **changeStartDateTime**(date: *`Date`*, initChange?: *`boolean`*): `void`



*Defined in [app/services/gdax-data.service.ts:153](https://github.com/WilliamRADFunk/cryptobot-interface/blob/b6d7879/src/app/services/gdax-data.service.ts#L153)*



Updates the start datetime being viewed, and refreshes query results.


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| date | `Date`   |  the start datetime object |
| initChange | `boolean`   |  flag to signal it's an original change (prevents multiple query calls onInit) |





**Returns:** `void`





___



###  changeTimeInterval

► **changeTimeInterval**(interval: *`number`*, initChange?: *`boolean`*): `void`



*Defined in [app/services/gdax-data.service.ts:171](https://github.com/WilliamRADFunk/cryptobot-interface/blob/b6d7879/src/app/services/gdax-data.service.ts#L171)*



Updates the granularity of the data points, and refreshes query results.


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| interval | `number`   |  the granularity to use |
| initChange | `boolean`   |  flag to signal it's an original change (prevents multiple query calls onInit) |





**Returns:** `void`





___



###  filterByDate

► **filterByDate**(data: *`__type`[]*): `__type`[]



*Defined in [app/services/gdax-data.service.ts:185](https://github.com/WilliamRADFunk/cryptobot-interface/blob/b6d7879/src/app/services/gdax-data.service.ts#L185)*



Only returns elements of data array that fit within user specified time range.


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| data | `__type`[]   |  array of data objects to be formatted |





**Returns:** `__type`[]
filtered data array






___



###  formatProduct

► **formatProduct**(data: *`__type`[]*): `__type`[]



*Defined in [app/services/gdax-data.service.ts:204](https://github.com/WilliamRADFunk/cryptobot-interface/blob/b6d7879/src/app/services/gdax-data.service.ts#L204)*



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



*Defined in [app/services/gdax-data.service.ts:450](https://github.com/WilliamRADFunk/cryptobot-interface/blob/b6d7879/src/app/services/gdax-data.service.ts#L450)*



Call to GDAX for cryptobot data




**Returns:** `void`





___



###  getLatestGdaxData

► **getLatestGdaxData**(): `void`



*Defined in [app/services/gdax-data.service.ts:227](https://github.com/WilliamRADFunk/cryptobot-interface/blob/b6d7879/src/app/services/gdax-data.service.ts#L227)*



Call to GDAX for historical market data




**Returns:** `void`





___



###  getLatestGdaxHistoryData

► **getLatestGdaxHistoryData**(): `void`



*Defined in [app/services/gdax-data.service.ts:279](https://github.com/WilliamRADFunk/cryptobot-interface/blob/b6d7879/src/app/services/gdax-data.service.ts#L279)*



Call to GDAX for trading history data




**Returns:** `void`





___



###  getLatestGdaxProfitData

► **getLatestGdaxProfitData**(): `void`



*Defined in [app/services/gdax-data.service.ts:444](https://github.com/WilliamRADFunk/cryptobot-interface/blob/b6d7879/src/app/services/gdax-data.service.ts#L444)*



Call to GDAX for profit data




**Returns:** `void`





___



###  handleHistoryResults

► **handleHistoryResults**(originalData: *`__type`[]*): `void`



*Defined in [app/services/gdax-data.service.ts:314](https://github.com/WilliamRADFunk/cryptobot-interface/blob/b6d7879/src/app/services/gdax-data.service.ts#L314)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| originalData | `__type`[]   |  - |





**Returns:** `void`





___



###  refreshData

► **refreshData**(isPageChange?: *`boolean`*): `void`



*Defined in [app/services/gdax-data.service.ts:457](https://github.com/WilliamRADFunk/cryptobot-interface/blob/b6d7879/src/app/services/gdax-data.service.ts#L457)*



Determines which data api to use based off of basePath, and calls it.


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| isPageChange | `boolean`   |  flag to make sure currIndex isn't reset on page change. |





**Returns:** `void`





___


