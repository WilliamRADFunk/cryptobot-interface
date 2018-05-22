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
* [validUSDResults](gdaxdataservice.md#markdown-header-validusdresults)


### Methods

* [calculateAfterProfitMonths](gdaxdataservice.md#markdown-header-calculateafterprofitmonths)
* [calculateBeforeProfitMonths](gdaxdataservice.md#markdown-header-calculatebeforeprofitmonths)
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
* [getLatestGdaxUSDData](gdaxdataservice.md#markdown-header-getlatestgdaxusddata)
* [getStartDateTime](gdaxdataservice.md#markdown-header-getstartdatetime)
* [handleHistoryResults](gdaxdataservice.md#markdown-header-handlehistoryresults)
* [handleProfitResults](gdaxdataservice.md#markdown-header-handleprofitresults)
* [handleUSDResults](gdaxdataservice.md#markdown-header-handleusdresults)
* [organizeProfitData](gdaxdataservice.md#markdown-header-organizeprofitdata)
* [refreshData](gdaxdataservice.md#markdown-header-refreshdata)



---
## Constructors



### ⊕ **new GdaxDataService**(http: *`HttpClient`*): [GdaxDataService](gdaxdataservice.md)


*Defined in [app/services/gdax-data.service.ts:99](https://github.com/WilliamRADFunk/cryptobot-interface/blob/9f10186/src/app/services/gdax-data.service.ts#L99)*



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

*Defined in [app/services/gdax-data.service.ts:18](https://github.com/WilliamRADFunk/cryptobot-interface/blob/9f10186/src/app/services/gdax-data.service.ts#L18)*



Used to determine which of the api to refresh.




___



###  bookmark

**●  bookmark**:  *`number`* 

*Defined in [app/services/gdax-data.service.ts:22](https://github.com/WilliamRADFunk/cryptobot-interface/blob/9f10186/src/app/services/gdax-data.service.ts#L22)*



Used to keep track of paging




___



###  chartData

**●  chartData**:  *`BehaviorSubject`.<`number`[][]>*  =  new BehaviorSubject<number[][]>([])

*Defined in [app/services/gdax-data.service.ts:27](https://github.com/WilliamRADFunk/cryptobot-interface/blob/9f10186/src/app/services/gdax-data.service.ts#L27)*



The updated query results for historical trade market data in a format that all of the live views will understand and be able to use.




___



###  currIndex

**●  currIndex**:  *`number`*  = 0

*Defined in [app/services/gdax-data.service.ts:36](https://github.com/WilliamRADFunk/cryptobot-interface/blob/9f10186/src/app/services/gdax-data.service.ts#L36)*



Keeps track of the index for current currency within currTypes for trading history 'ALL' fetches.




___



###  currTypes

**●  currTypes**:  *`string`[]*  =  ['btc', 'ltc', 'eth']

*Defined in [app/services/gdax-data.service.ts:42](https://github.com/WilliamRADFunk/cryptobot-interface/blob/9f10186/src/app/services/gdax-data.service.ts#L42)*



Contains the types of currency, which allows trading history fetch to iterate through all currencies in the 'ALL' currency type. Dynamically switches API params when one currency type runs out but more results are needed.




___



###  currency

**●  currency**:  *`string`*  = "BTC-USD"

*Defined in [app/services/gdax-data.service.ts:31](https://github.com/WilliamRADFunk/cryptobot-interface/blob/9f10186/src/app/services/gdax-data.service.ts#L31)*



Currency type which is used as part of the query URL.




___



###  endDate

**●  endDate**:  *`Date`*  =  null

*Defined in [app/services/gdax-data.service.ts:46](https://github.com/WilliamRADFunk/cryptobot-interface/blob/9f10186/src/app/services/gdax-data.service.ts#L46)*



The end datetime used as a parameter in the query URL




___



###  firstTime

**●  firstTime**:  *`boolean`[]*  =  [true, true, true, true]

*Defined in [app/services/gdax-data.service.ts:52](https://github.com/WilliamRADFunk/cryptobot-interface/blob/9f10186/src/app/services/gdax-data.service.ts#L52)*



Array of flags to determine if initial filtering params have called in the service to query for data. First is route component params. Second is granularity, Third is startDateTime. Fourth is endDateTime.




___



### «Private» http

**●  http**:  *`HttpClient`* 

*Defined in [app/services/gdax-data.service.ts:105](https://github.com/WilliamRADFunk/cryptobot-interface/blob/9f10186/src/app/services/gdax-data.service.ts#L105)*



Angular's HttpClient service for making http calls




___



###  interval

**●  interval**:  *`number`*  = 3600

*Defined in [app/services/gdax-data.service.ts:56](https://github.com/WilliamRADFunk/cryptobot-interface/blob/9f10186/src/app/services/gdax-data.service.ts#L56)*



The granularity between data points. Used as a parameter in query URL




___



###  isBusy

**●  isBusy**:  *`BehaviorSubject`.<`boolean`>*  =  new BehaviorSubject<boolean>(false)

*Defined in [app/services/gdax-data.service.ts:60](https://github.com/WilliamRADFunk/cryptobot-interface/blob/9f10186/src/app/services/gdax-data.service.ts#L60)*



The flag to designate if query is busy




___



###  isRelevant

**●  isRelevant**:  *`BehaviorSubject`.<`boolean`>*  =  new BehaviorSubject<boolean>(false)

*Defined in [app/services/gdax-data.service.ts:64](https://github.com/WilliamRADFunk/cryptobot-interface/blob/9f10186/src/app/services/gdax-data.service.ts#L64)*



The flag to designate if granularity is relevant for basePath api




___



###  page

**●  page**:  *`BehaviorSubject`.<`number`>*  =  new BehaviorSubject<number>(1)

*Defined in [app/services/gdax-data.service.ts:68](https://github.com/WilliamRADFunk/cryptobot-interface/blob/9f10186/src/app/services/gdax-data.service.ts#L68)*



The current number for page in results.




___



###  profitChartData

**●  profitChartData**:  *`number`[][]*  =  []

*Defined in [app/services/gdax-data.service.ts:72](https://github.com/WilliamRADFunk/cryptobot-interface/blob/9f10186/src/app/services/gdax-data.service.ts#L72)*



Temporary holder for profit portfolio data until recursive search is completed.




___



###  rowsPerPage

**●  rowsPerPage**:  *`number`*  = 10

*Defined in [app/services/gdax-data.service.ts:76](https://github.com/WilliamRADFunk/cryptobot-interface/blob/9f10186/src/app/services/gdax-data.service.ts#L76)*



The current number for rows per page




___



###  startDate

**●  startDate**:  *`Date`*  =  null

*Defined in [app/services/gdax-data.service.ts:80](https://github.com/WilliamRADFunk/cryptobot-interface/blob/9f10186/src/app/services/gdax-data.service.ts#L80)*



The start datetime used as a parameter in the query URL




___



###  tableData

**●  tableData**:  *`BehaviorSubject`.<`__type`[]>*  =  new BehaviorSubject<{}[]>([])

*Defined in [app/services/gdax-data.service.ts:85](https://github.com/WilliamRADFunk/cryptobot-interface/blob/9f10186/src/app/services/gdax-data.service.ts#L85)*



The updated query results for historical trade market data in a format that all of the live views will understand and be able to use.




___



###  tableResults

**●  tableResults**:  *`__type`[]*  =  []

*Defined in [app/services/gdax-data.service.ts:89](https://github.com/WilliamRADFunk/cryptobot-interface/blob/9f10186/src/app/services/gdax-data.service.ts#L89)*



Temporary holder for trading history table data until recursive search is completed.




___



###  validProfitResults

**●  validProfitResults**:  *`__type`[]*  =  []

*Defined in [app/services/gdax-data.service.ts:94](https://github.com/WilliamRADFunk/cryptobot-interface/blob/9f10186/src/app/services/gdax-data.service.ts#L94)*



Contains list of profit results that reside inside filter zone. Used later in organizeProfitData function.




___



###  validUSDResults

**●  validUSDResults**:  *`__type`[]*  =  []

*Defined in [app/services/gdax-data.service.ts:99](https://github.com/WilliamRADFunk/cryptobot-interface/blob/9f10186/src/app/services/gdax-data.service.ts#L99)*



Contains list of usd transaction results that reside inside filter zone. Used later for price of purchase or sale in organizeProfitData function.




___


## Methods


###  calculateAfterProfitMonths

► **calculateAfterProfitMonths**(): `any`[]



*Defined in [app/services/gdax-data.service.ts:112](https://github.com/WilliamRADFunk/cryptobot-interface/blob/9f10186/src/app/services/gdax-data.service.ts#L112)*



Calculates the months after the last profit transaction, adds 0 values and the label, which allows the user to have data for the range they want even if there was no profit or loss during those months. Prettier charts.




**Returns:** `any`[]
the compiled array of blank data and month-year label






___



###  calculateBeforeProfitMonths

► **calculateBeforeProfitMonths**(): `any`[]



*Defined in [app/services/gdax-data.service.ts:146](https://github.com/WilliamRADFunk/cryptobot-interface/blob/9f10186/src/app/services/gdax-data.service.ts#L146)*



Calculates the months before the first profit transaction, adds 0 values and the label, which allows the user to have data for the range they want even if there was no profit or loss during those months. Prettier charts.




**Returns:** `any`[]
the compiled array of blank data and month-year label






___



###  changeCurrencyType

► **changeCurrencyType**(currency: *`string`*, basePath: *`string`*, refresh?: *`boolean`*): `void`



*Defined in [app/services/gdax-data.service.ts:180](https://github.com/WilliamRADFunk/cryptobot-interface/blob/9f10186/src/app/services/gdax-data.service.ts#L180)*



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



*Defined in [app/services/gdax-data.service.ts:201](https://github.com/WilliamRADFunk/cryptobot-interface/blob/9f10186/src/app/services/gdax-data.service.ts#L201)*



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



*Defined in [app/services/gdax-data.service.ts:219](https://github.com/WilliamRADFunk/cryptobot-interface/blob/9f10186/src/app/services/gdax-data.service.ts#L219)*



Updates the page number, and refreshes query results.


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| page | `number`   |  the granularity to use |





**Returns:** `void`





___



###  changeRowsPerPage

► **changeRowsPerPage**(rowsPerPage: *`number`*, initChange?: *`boolean`*): `void`



*Defined in [app/services/gdax-data.service.ts:241](https://github.com/WilliamRADFunk/cryptobot-interface/blob/9f10186/src/app/services/gdax-data.service.ts#L241)*



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



*Defined in [app/services/gdax-data.service.ts:259](https://github.com/WilliamRADFunk/cryptobot-interface/blob/9f10186/src/app/services/gdax-data.service.ts#L259)*



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



*Defined in [app/services/gdax-data.service.ts:278](https://github.com/WilliamRADFunk/cryptobot-interface/blob/9f10186/src/app/services/gdax-data.service.ts#L278)*



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



*Defined in [app/services/gdax-data.service.ts:292](https://github.com/WilliamRADFunk/cryptobot-interface/blob/9f10186/src/app/services/gdax-data.service.ts#L292)*



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



*Defined in [app/services/gdax-data.service.ts:311](https://github.com/WilliamRADFunk/cryptobot-interface/blob/9f10186/src/app/services/gdax-data.service.ts#L311)*



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



*Defined in [app/services/gdax-data.service.ts:335](https://github.com/WilliamRADFunk/cryptobot-interface/blob/9f10186/src/app/services/gdax-data.service.ts#L335)*



Returns the service stored endDatetime




**Returns:** `Date`
endDate stored on service from previous entry.






___



###  getLatestCryptoBotData

► **getLatestCryptoBotData**(): `void`



*Defined in [app/services/gdax-data.service.ts:341](https://github.com/WilliamRADFunk/cryptobot-interface/blob/9f10186/src/app/services/gdax-data.service.ts#L341)*



Call to GDAX for cryptobot data




**Returns:** `void`





___



###  getLatestGdaxData

► **getLatestGdaxData**(): `void`



*Defined in [app/services/gdax-data.service.ts:347](https://github.com/WilliamRADFunk/cryptobot-interface/blob/9f10186/src/app/services/gdax-data.service.ts#L347)*



Call to GDAX for historical market data




**Returns:** `void`





___



###  getLatestGdaxHistoryData

► **getLatestGdaxHistoryData**(): `void`



*Defined in [app/services/gdax-data.service.ts:399](https://github.com/WilliamRADFunk/cryptobot-interface/blob/9f10186/src/app/services/gdax-data.service.ts#L399)*



Call to GDAX for trading history data




**Returns:** `void`





___



###  getLatestGdaxProfitData

► **getLatestGdaxProfitData**(): `void`



*Defined in [app/services/gdax-data.service.ts:437](https://github.com/WilliamRADFunk/cryptobot-interface/blob/9f10186/src/app/services/gdax-data.service.ts#L437)*



Call to GDAX for profit data




**Returns:** `void`





___



###  getLatestGdaxUSDData

► **getLatestGdaxUSDData**(): `void`



*Defined in [app/services/gdax-data.service.ts:468](https://github.com/WilliamRADFunk/cryptobot-interface/blob/9f10186/src/app/services/gdax-data.service.ts#L468)*



Call to GDAX for USD results to later compare crypto profit data against




**Returns:** `void`





___



###  getStartDateTime

► **getStartDateTime**(): `Date`



*Defined in [app/services/gdax-data.service.ts:497](https://github.com/WilliamRADFunk/cryptobot-interface/blob/9f10186/src/app/services/gdax-data.service.ts#L497)*



Returns the service stored startDatetime




**Returns:** `Date`
startDate stored on service from previous entry.






___



###  handleHistoryResults

► **handleHistoryResults**(originalData: *`__type`[]*): `void`



*Defined in [app/services/gdax-data.service.ts:504](https://github.com/WilliamRADFunk/cryptobot-interface/blob/9f10186/src/app/services/gdax-data.service.ts#L504)*



Recursive query maker until desired results are found


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| originalData | `__type`[]   |  data used to check against to see if current results are sufficient |





**Returns:** `void`





___



###  handleProfitResults

► **handleProfitResults**(originalData: *`__type`[]*): `void`



*Defined in [app/services/gdax-data.service.ts:635](https://github.com/WilliamRADFunk/cryptobot-interface/blob/9f10186/src/app/services/gdax-data.service.ts#L635)*



Recursive query maker until desired results are found


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| originalData | `__type`[]   |  data used to check against to see if current results are sufficient |





**Returns:** `void`





___



###  handleUSDResults

► **handleUSDResults**(originalData: *`__type`[]*): `void`



*Defined in [app/services/gdax-data.service.ts:685](https://github.com/WilliamRADFunk/cryptobot-interface/blob/9f10186/src/app/services/gdax-data.service.ts#L685)*



Recursive query maker until desired results are found


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| originalData | `__type`[]   |  data used to check against to see if current results are sufficient |





**Returns:** `void`





___



###  organizeProfitData

► **organizeProfitData**(): `void`



*Defined in [app/services/gdax-data.service.ts:726](https://github.com/WilliamRADFunk/cryptobot-interface/blob/9f10186/src/app/services/gdax-data.service.ts#L726)*



Assembles the data into a format suitable for the profit portfolio page.




**Returns:** `void`





___



###  refreshData

► **refreshData**(isPageChange?: *`boolean`*): `void`



*Defined in [app/services/gdax-data.service.ts:812](https://github.com/WilliamRADFunk/cryptobot-interface/blob/9f10186/src/app/services/gdax-data.service.ts#L812)*



Determines which data api to use based off of basePath, and calls it.


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| isPageChange | `boolean`   |  flag to make sure currIndex isn't reset on page change. |





**Returns:** `void`





___


