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
* [profitChartData](gdaxdataservice.md#markdown-header-profitchartdata)
* [rowsPerPage](gdaxdataservice.md#markdown-header-rowsperpage)
* [startDate](gdaxdataservice.md#markdown-header-startdate)
* [tableData](gdaxdataservice.md#markdown-header-tabledata)
* [tableResults](gdaxdataservice.md#markdown-header-tableresults)
* [validProfitResults](gdaxdataservice.md#markdown-header-validprofitresults)


### Methods

* [changeCurrencyType](gdaxdataservice.md#markdown-header-changecurrencytype)
* [changeEndDateTime](gdaxdataservice.md#markdown-header-changeenddatetime)
* [changePageNumber](gdaxdataservice.md#markdown-header-changepagenumber)
* [changeRowsPerPage](gdaxdataservice.md#markdown-header-changerowsperpage)
* [changeStartDateTime](gdaxdataservice.md#markdown-header-changestartdatetime)
* [changeTimeInterval](gdaxdataservice.md#markdown-header-changetimeinterval)
* [filterByDate](gdaxdataservice.md#markdown-header-filterbydate)
* [formatProduct](gdaxdataservice.md#markdown-header-formatproduct)
* [getEndDateTime](gdaxdataservice.md#markdown-header-getenddatetime)
* [getLatestCryptoBotData](gdaxdataservice.md#markdown-header-getlatestcryptobotdata)
* [getLatestGdaxData](gdaxdataservice.md#markdown-header-getlatestgdaxdata)
* [getLatestGdaxHistoryData](gdaxdataservice.md#markdown-header-getlatestgdaxhistorydata)
* [getLatestGdaxProfitData](gdaxdataservice.md#markdown-header-getlatestgdaxprofitdata)
* [getStartDateTime](gdaxdataservice.md#markdown-header-getstartdatetime)
* [handleHistoryResults](gdaxdataservice.md#markdown-header-handlehistoryresults)
* [handleProfitResults](gdaxdataservice.md#markdown-header-handleprofitresults)
* [organizeProfitData](gdaxdataservice.md#markdown-header-organizeprofitdata)
* [refreshData](gdaxdataservice.md#markdown-header-refreshdata)



---
## Constructors



### ⊕ **new GdaxDataService**(http: *`HttpClient`*): [GdaxDataService](gdaxdataservice.md)


*Defined in [app/services/gdax-data.service.ts:89](https://github.com/WilliamRADFunk/cryptobot-interface/blob/a748707/src/app/services/gdax-data.service.ts#L89)*



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

*Defined in [app/services/gdax-data.service.ts:13](https://github.com/WilliamRADFunk/cryptobot-interface/blob/a748707/src/app/services/gdax-data.service.ts#L13)*



Used to determine which of the api to refresh.




___



###  bookmark

**●  bookmark**:  *`number`* 

*Defined in [app/services/gdax-data.service.ts:17](https://github.com/WilliamRADFunk/cryptobot-interface/blob/a748707/src/app/services/gdax-data.service.ts#L17)*



Used to keep track of paging




___



###  chartData

**●  chartData**:  *`BehaviorSubject`.<`number`[][]>*  =  new BehaviorSubject<number[][]>([])

*Defined in [app/services/gdax-data.service.ts:22](https://github.com/WilliamRADFunk/cryptobot-interface/blob/a748707/src/app/services/gdax-data.service.ts#L22)*



The updated query results for historical trade market data in a format that all of the live views will understand and be able to use.




___



###  currIndex

**●  currIndex**:  *`number`*  = 0

*Defined in [app/services/gdax-data.service.ts:31](https://github.com/WilliamRADFunk/cryptobot-interface/blob/a748707/src/app/services/gdax-data.service.ts#L31)*



Keeps track of the index for current currency within currTypes for trading history 'ALL' fetches.




___



###  currTypes

**●  currTypes**:  *`string`[]*  =  ['btc', 'ltc', 'eth']

*Defined in [app/services/gdax-data.service.ts:37](https://github.com/WilliamRADFunk/cryptobot-interface/blob/a748707/src/app/services/gdax-data.service.ts#L37)*



Contains the types of currency, which allows trading history fetch to iterate through all currencies in the 'ALL' currency type. Dynamically switches API params when one currency type runs out but more results are needed.




___



###  currency

**●  currency**:  *`string`*  = "BTC-USD"

*Defined in [app/services/gdax-data.service.ts:26](https://github.com/WilliamRADFunk/cryptobot-interface/blob/a748707/src/app/services/gdax-data.service.ts#L26)*



Currency type which is used as part of the query URL.




___



###  endDate

**●  endDate**:  *`Date`*  =  null

*Defined in [app/services/gdax-data.service.ts:41](https://github.com/WilliamRADFunk/cryptobot-interface/blob/a748707/src/app/services/gdax-data.service.ts#L41)*



The end datetime used as a parameter in the query URL




___



###  firstTime

**●  firstTime**:  *`boolean`[]*  =  [true, true, true, true]

*Defined in [app/services/gdax-data.service.ts:47](https://github.com/WilliamRADFunk/cryptobot-interface/blob/a748707/src/app/services/gdax-data.service.ts#L47)*



Array of flags to determine if initial filtering params have called in the service to query for data. First is route component params. Second is granularity, Third is startDateTime. Fourth is endDateTime.




___



### «Private» http

**●  http**:  *`HttpClient`* 

*Defined in [app/services/gdax-data.service.ts:95](https://github.com/WilliamRADFunk/cryptobot-interface/blob/a748707/src/app/services/gdax-data.service.ts#L95)*



Angular's HttpClient service for making http calls




___



###  interval

**●  interval**:  *`number`*  = 3600

*Defined in [app/services/gdax-data.service.ts:51](https://github.com/WilliamRADFunk/cryptobot-interface/blob/a748707/src/app/services/gdax-data.service.ts#L51)*



The granularity between data points. Used as a parameter in query URL




___



###  isBusy

**●  isBusy**:  *`BehaviorSubject`.<`boolean`>*  =  new BehaviorSubject<boolean>(false)

*Defined in [app/services/gdax-data.service.ts:55](https://github.com/WilliamRADFunk/cryptobot-interface/blob/a748707/src/app/services/gdax-data.service.ts#L55)*



The flag to designate if query is busy




___



###  isRelevant

**●  isRelevant**:  *`BehaviorSubject`.<`boolean`>*  =  new BehaviorSubject<boolean>(false)

*Defined in [app/services/gdax-data.service.ts:59](https://github.com/WilliamRADFunk/cryptobot-interface/blob/a748707/src/app/services/gdax-data.service.ts#L59)*



The flag to designate if granularity is relevant for basePath api




___



###  page

**●  page**:  *`BehaviorSubject`.<`number`>*  =  new BehaviorSubject<number>(1)

*Defined in [app/services/gdax-data.service.ts:63](https://github.com/WilliamRADFunk/cryptobot-interface/blob/a748707/src/app/services/gdax-data.service.ts#L63)*



The current number for page in results.




___



###  profitChartData

**●  profitChartData**:  *`number`[][]*  =  []

*Defined in [app/services/gdax-data.service.ts:67](https://github.com/WilliamRADFunk/cryptobot-interface/blob/a748707/src/app/services/gdax-data.service.ts#L67)*



Temporary holder for profit portfolio data until recursive search is completed.




___



###  rowsPerPage

**●  rowsPerPage**:  *`number`*  = 10

*Defined in [app/services/gdax-data.service.ts:71](https://github.com/WilliamRADFunk/cryptobot-interface/blob/a748707/src/app/services/gdax-data.service.ts#L71)*



The current number for rows per page




___



###  startDate

**●  startDate**:  *`Date`*  =  null

*Defined in [app/services/gdax-data.service.ts:75](https://github.com/WilliamRADFunk/cryptobot-interface/blob/a748707/src/app/services/gdax-data.service.ts#L75)*



The start datetime used as a parameter in the query URL




___



###  tableData

**●  tableData**:  *`BehaviorSubject`.<`__type`[]>*  =  new BehaviorSubject<{}[]>([])

*Defined in [app/services/gdax-data.service.ts:80](https://github.com/WilliamRADFunk/cryptobot-interface/blob/a748707/src/app/services/gdax-data.service.ts#L80)*



The updated query results for historical trade market data in a format that all of the live views will understand and be able to use.




___



###  tableResults

**●  tableResults**:  *`__type`[]*  =  []

*Defined in [app/services/gdax-data.service.ts:84](https://github.com/WilliamRADFunk/cryptobot-interface/blob/a748707/src/app/services/gdax-data.service.ts#L84)*



Temporary holder for trading history table data until recursive search is completed.




___



###  validProfitResults

**●  validProfitResults**:  *`__type`[]*  =  []

*Defined in [app/services/gdax-data.service.ts:89](https://github.com/WilliamRADFunk/cryptobot-interface/blob/a748707/src/app/services/gdax-data.service.ts#L89)*



Contains list of profit results that reside inside filter zone. Used later in organizeProfitData function.




___


## Methods


###  changeCurrencyType

► **changeCurrencyType**(currency: *`string`*, basePath: *`string`*, refresh?: *`boolean`*): `void`



*Defined in [app/services/gdax-data.service.ts:102](https://github.com/WilliamRADFunk/cryptobot-interface/blob/a748707/src/app/services/gdax-data.service.ts#L102)*



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



*Defined in [app/services/gdax-data.service.ts:122](https://github.com/WilliamRADFunk/cryptobot-interface/blob/a748707/src/app/services/gdax-data.service.ts#L122)*



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



*Defined in [app/services/gdax-data.service.ts:141](https://github.com/WilliamRADFunk/cryptobot-interface/blob/a748707/src/app/services/gdax-data.service.ts#L141)*



Updates the page number, and refreshes query results.


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| page | `number`   |  the granularity to use |





**Returns:** `void`





___



###  changeRowsPerPage

► **changeRowsPerPage**(rowsPerPage: *`number`*, initChange?: *`boolean`*): `void`



*Defined in [app/services/gdax-data.service.ts:164](https://github.com/WilliamRADFunk/cryptobot-interface/blob/a748707/src/app/services/gdax-data.service.ts#L164)*



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



*Defined in [app/services/gdax-data.service.ts:183](https://github.com/WilliamRADFunk/cryptobot-interface/blob/a748707/src/app/services/gdax-data.service.ts#L183)*



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



*Defined in [app/services/gdax-data.service.ts:203](https://github.com/WilliamRADFunk/cryptobot-interface/blob/a748707/src/app/services/gdax-data.service.ts#L203)*



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



*Defined in [app/services/gdax-data.service.ts:217](https://github.com/WilliamRADFunk/cryptobot-interface/blob/a748707/src/app/services/gdax-data.service.ts#L217)*



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



*Defined in [app/services/gdax-data.service.ts:236](https://github.com/WilliamRADFunk/cryptobot-interface/blob/a748707/src/app/services/gdax-data.service.ts#L236)*



Pulls out and formats the product from gdax query results.


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| data | `__type`[]   |  array of data objects to be formatted |





**Returns:** `__type`[]
formatted data array






___



###  getEndDateTime

► **getEndDateTime**(): `Date`



*Defined in [app/services/gdax-data.service.ts:260](https://github.com/WilliamRADFunk/cryptobot-interface/blob/a748707/src/app/services/gdax-data.service.ts#L260)*



Returns the service stored endDatetime




**Returns:** `Date`
endDate stored on service from previous entry.






___



###  getLatestCryptoBotData

► **getLatestCryptoBotData**(): `void`



*Defined in [app/services/gdax-data.service.ts:266](https://github.com/WilliamRADFunk/cryptobot-interface/blob/a748707/src/app/services/gdax-data.service.ts#L266)*



Call to GDAX for cryptobot data




**Returns:** `void`





___



###  getLatestGdaxData

► **getLatestGdaxData**(): `void`



*Defined in [app/services/gdax-data.service.ts:272](https://github.com/WilliamRADFunk/cryptobot-interface/blob/a748707/src/app/services/gdax-data.service.ts#L272)*



Call to GDAX for historical market data




**Returns:** `void`





___



###  getLatestGdaxHistoryData

► **getLatestGdaxHistoryData**(): `void`



*Defined in [app/services/gdax-data.service.ts:324](https://github.com/WilliamRADFunk/cryptobot-interface/blob/a748707/src/app/services/gdax-data.service.ts#L324)*



Call to GDAX for trading history data




**Returns:** `void`





___



###  getLatestGdaxProfitData

► **getLatestGdaxProfitData**(): `void`



*Defined in [app/services/gdax-data.service.ts:362](https://github.com/WilliamRADFunk/cryptobot-interface/blob/a748707/src/app/services/gdax-data.service.ts#L362)*



Call to GDAX for profit data




**Returns:** `void`





___



###  getStartDateTime

► **getStartDateTime**(): `Date`



*Defined in [app/services/gdax-data.service.ts:393](https://github.com/WilliamRADFunk/cryptobot-interface/blob/a748707/src/app/services/gdax-data.service.ts#L393)*



Returns the service stored startDatetime




**Returns:** `Date`
startDate stored on service from previous entry.






___



###  handleHistoryResults

► **handleHistoryResults**(originalData: *`__type`[]*): `void`



*Defined in [app/services/gdax-data.service.ts:452](https://github.com/WilliamRADFunk/cryptobot-interface/blob/a748707/src/app/services/gdax-data.service.ts#L452)*



Recursive query maker until desired results are found


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| originalData | `__type`[]   |  data used to check against to see if current results are sufficient |





**Returns:** `void`





___



###  handleProfitResults

► **handleProfitResults**(originalData: *`__type`[]*): `void`



*Defined in [app/services/gdax-data.service.ts:404](https://github.com/WilliamRADFunk/cryptobot-interface/blob/a748707/src/app/services/gdax-data.service.ts#L404)*



Recursive query maker until desired results are found


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| originalData | `__type`[]   |  data used to check against to see if current results are sufficient |





**Returns:** `void`





___



###  organizeProfitData

► **organizeProfitData**(): `void`



*Defined in [app/services/gdax-data.service.ts:396](https://github.com/WilliamRADFunk/cryptobot-interface/blob/a748707/src/app/services/gdax-data.service.ts#L396)*





**Returns:** `void`





___



###  refreshData

► **refreshData**(isPageChange?: *`boolean`*): `void`



*Defined in [app/services/gdax-data.service.ts:583](https://github.com/WilliamRADFunk/cryptobot-interface/blob/a748707/src/app/services/gdax-data.service.ts#L583)*



Determines which data api to use based off of basePath, and calls it.


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| isPageChange | `boolean`   |  flag to make sure currIndex isn't reset on page change. |





**Returns:** `void`





___


