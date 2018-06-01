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
* [historySubscription](gdaxdataservice.md#markdown-header-historysubscription)
* [http](gdaxdataservice.md#markdown-header-private-http)
* [interval](gdaxdataservice.md#markdown-header-interval)
* [isBusy](gdaxdataservice.md#markdown-header-isbusy)
* [isKilled](gdaxdataservice.md#markdown-header-iskilled)
* [isRelevant](gdaxdataservice.md#markdown-header-isrelevant)
* [page](gdaxdataservice.md#markdown-header-page)
* [profitChartData](gdaxdataservice.md#markdown-header-profitchartdata)
* [profitSubscription](gdaxdataservice.md#markdown-header-profitsubscription)
* [rowsPerPage](gdaxdataservice.md#markdown-header-rowsperpage)
* [startDate](gdaxdataservice.md#markdown-header-startdate)
* [tableData](gdaxdataservice.md#markdown-header-tabledata)
* [tableResults](gdaxdataservice.md#markdown-header-tableresults)
* [usdSubscription](gdaxdataservice.md#markdown-header-usdsubscription)
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
* [kill](gdaxdataservice.md#markdown-header-kill)
* [organizeProfitData](gdaxdataservice.md#markdown-header-organizeprofitdata)
* [refreshData](gdaxdataservice.md#markdown-header-refreshdata)



---
## Constructors



### ⊕ **new GdaxDataService**(http: *`HttpClient`*): [GdaxDataService](gdaxdataservice.md)


*Defined in [app/services/gdax-data.service.ts:115](https://github.com/WilliamRADFunk/cryptobot-interface/blob/660a506/src/app/services/gdax-data.service.ts#L115)*



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

*Defined in [app/services/gdax-data.service.ts:21](https://github.com/WilliamRADFunk/cryptobot-interface/blob/660a506/src/app/services/gdax-data.service.ts#L21)*



Used to determine which of the api to refresh.




___



###  bookmark

**●  bookmark**:  *`number`* 

*Defined in [app/services/gdax-data.service.ts:25](https://github.com/WilliamRADFunk/cryptobot-interface/blob/660a506/src/app/services/gdax-data.service.ts#L25)*



Used to keep track of paging




___



###  chartData

**●  chartData**:  *`BehaviorSubject`.<`number`[][]>*  =  new BehaviorSubject<number[][]>([])

*Defined in [app/services/gdax-data.service.ts:30](https://github.com/WilliamRADFunk/cryptobot-interface/blob/660a506/src/app/services/gdax-data.service.ts#L30)*



The updated query results for historical trade market data in a format that all of the live views will understand and be able to use.




___



###  currIndex

**●  currIndex**:  *`number`*  = 0

*Defined in [app/services/gdax-data.service.ts:39](https://github.com/WilliamRADFunk/cryptobot-interface/blob/660a506/src/app/services/gdax-data.service.ts#L39)*



Keeps track of the index for current currency within currTypes for trading history 'ALL' fetches.




___



###  currTypes

**●  currTypes**:  *`string`[]*  =  ['btc', 'ltc', 'eth']

*Defined in [app/services/gdax-data.service.ts:45](https://github.com/WilliamRADFunk/cryptobot-interface/blob/660a506/src/app/services/gdax-data.service.ts#L45)*



Contains the types of currency, which allows trading history fetch to iterate through all currencies in the 'ALL' currency type. Dynamically switches API params when one currency type runs out but more results are needed.




___



###  currency

**●  currency**:  *`string`*  = "BTC-USD"

*Defined in [app/services/gdax-data.service.ts:34](https://github.com/WilliamRADFunk/cryptobot-interface/blob/660a506/src/app/services/gdax-data.service.ts#L34)*



Currency type which is used as part of the query URL.




___



###  endDate

**●  endDate**:  *`Date`*  =  null

*Defined in [app/services/gdax-data.service.ts:49](https://github.com/WilliamRADFunk/cryptobot-interface/blob/660a506/src/app/services/gdax-data.service.ts#L49)*



The end datetime used as a parameter in the query URL




___



###  firstTime

**●  firstTime**:  *`boolean`[]*  =  [true, true, true, true]

*Defined in [app/services/gdax-data.service.ts:55](https://github.com/WilliamRADFunk/cryptobot-interface/blob/660a506/src/app/services/gdax-data.service.ts#L55)*



Array of flags to determine if initial filtering params have called in the service to query for data. First is route component params. Second is granularity, Third is startDateTime. Fourth is endDateTime.




___



###  historySubscription

**●  historySubscription**:  *`Subscription`* 

*Defined in [app/services/gdax-data.service.ts:56](https://github.com/WilliamRADFunk/cryptobot-interface/blob/660a506/src/app/services/gdax-data.service.ts#L56)*





___



### «Private» http

**●  http**:  *`HttpClient`* 

*Defined in [app/services/gdax-data.service.ts:121](https://github.com/WilliamRADFunk/cryptobot-interface/blob/660a506/src/app/services/gdax-data.service.ts#L121)*



Angular's HttpClient service for making http calls




___



###  interval

**●  interval**:  *`number`*  = 3600

*Defined in [app/services/gdax-data.service.ts:60](https://github.com/WilliamRADFunk/cryptobot-interface/blob/660a506/src/app/services/gdax-data.service.ts#L60)*



The granularity between data points. Used as a parameter in query URL




___



###  isBusy

**●  isBusy**:  *`BehaviorSubject`.<`boolean`>*  =  new BehaviorSubject<boolean>(false)

*Defined in [app/services/gdax-data.service.ts:64](https://github.com/WilliamRADFunk/cryptobot-interface/blob/660a506/src/app/services/gdax-data.service.ts#L64)*



The flag to designate if query is busy




___



###  isKilled

**●  isKilled**:  *`boolean`*  = false

*Defined in [app/services/gdax-data.service.ts:68](https://github.com/WilliamRADFunk/cryptobot-interface/blob/660a506/src/app/services/gdax-data.service.ts#L68)*



The flag to designate component destruction for preventing accidental query calls.




___



###  isRelevant

**●  isRelevant**:  *`BehaviorSubject`.<`boolean`>*  =  new BehaviorSubject<boolean>(false)

*Defined in [app/services/gdax-data.service.ts:72](https://github.com/WilliamRADFunk/cryptobot-interface/blob/660a506/src/app/services/gdax-data.service.ts#L72)*



The flag to designate if granularity is relevant for basePath api




___



###  page

**●  page**:  *`BehaviorSubject`.<`number`>*  =  new BehaviorSubject<number>(1)

*Defined in [app/services/gdax-data.service.ts:76](https://github.com/WilliamRADFunk/cryptobot-interface/blob/660a506/src/app/services/gdax-data.service.ts#L76)*



The current number for page in results.




___



###  profitChartData

**●  profitChartData**:  *`number`[][]*  =  []

*Defined in [app/services/gdax-data.service.ts:80](https://github.com/WilliamRADFunk/cryptobot-interface/blob/660a506/src/app/services/gdax-data.service.ts#L80)*



Temporary holder for profit portfolio data until recursive search is completed.




___



###  profitSubscription

**●  profitSubscription**:  *`Subscription`* 

*Defined in [app/services/gdax-data.service.ts:84](https://github.com/WilliamRADFunk/cryptobot-interface/blob/660a506/src/app/services/gdax-data.service.ts#L84)*



Makes unsubscribing from this variable possible in OnDestroy




___



###  rowsPerPage

**●  rowsPerPage**:  *`number`*  = 10

*Defined in [app/services/gdax-data.service.ts:88](https://github.com/WilliamRADFunk/cryptobot-interface/blob/660a506/src/app/services/gdax-data.service.ts#L88)*



The current number for rows per page




___



###  startDate

**●  startDate**:  *`Date`*  =  null

*Defined in [app/services/gdax-data.service.ts:92](https://github.com/WilliamRADFunk/cryptobot-interface/blob/660a506/src/app/services/gdax-data.service.ts#L92)*



The start datetime used as a parameter in the query URL




___



###  tableData

**●  tableData**:  *`BehaviorSubject`.<`__type`[]>*  =  new BehaviorSubject<{}[]>([])

*Defined in [app/services/gdax-data.service.ts:97](https://github.com/WilliamRADFunk/cryptobot-interface/blob/660a506/src/app/services/gdax-data.service.ts#L97)*



The updated query results for historical trade market data in a format that all of the live views will understand and be able to use.




___



###  tableResults

**●  tableResults**:  *`__type`[]*  =  []

*Defined in [app/services/gdax-data.service.ts:101](https://github.com/WilliamRADFunk/cryptobot-interface/blob/660a506/src/app/services/gdax-data.service.ts#L101)*



Temporary holder for trading history table data until recursive search is completed.




___



###  usdSubscription

**●  usdSubscription**:  *`Subscription`* 

*Defined in [app/services/gdax-data.service.ts:105](https://github.com/WilliamRADFunk/cryptobot-interface/blob/660a506/src/app/services/gdax-data.service.ts#L105)*



Makes unsubscribing from this variable possible in OnDestroy




___



###  validProfitResults

**●  validProfitResults**:  *`__type`[]*  =  []

*Defined in [app/services/gdax-data.service.ts:110](https://github.com/WilliamRADFunk/cryptobot-interface/blob/660a506/src/app/services/gdax-data.service.ts#L110)*



Contains list of profit results that reside inside filter zone. Used later in organizeProfitData function.




___



###  validUSDResults

**●  validUSDResults**:  *`__type`[]*  =  []

*Defined in [app/services/gdax-data.service.ts:115](https://github.com/WilliamRADFunk/cryptobot-interface/blob/660a506/src/app/services/gdax-data.service.ts#L115)*



Contains list of usd transaction results that reside inside filter zone. Used later for price of purchase or sale in organizeProfitData function.




___


## Methods


###  calculateAfterProfitMonths

► **calculateAfterProfitMonths**(): `any`[]



*Defined in [app/services/gdax-data.service.ts:128](https://github.com/WilliamRADFunk/cryptobot-interface/blob/660a506/src/app/services/gdax-data.service.ts#L128)*



Calculates the months after the last profit transaction, adds 0 values and the label, which allows the user to have data for the range they want even if there was no profit or loss during those months. Prettier charts.




**Returns:** `any`[]
the compiled array of blank data and month-year label






___



###  calculateBeforeProfitMonths

► **calculateBeforeProfitMonths**(): `any`[]



*Defined in [app/services/gdax-data.service.ts:162](https://github.com/WilliamRADFunk/cryptobot-interface/blob/660a506/src/app/services/gdax-data.service.ts#L162)*



Calculates the months before the first profit transaction, adds 0 values and the label, which allows the user to have data for the range they want even if there was no profit or loss during those months. Prettier charts.




**Returns:** `any`[]
the compiled array of blank data and month-year label






___



###  changeCurrencyType

► **changeCurrencyType**(currency: *`string`*, basePath: *`string`*, refresh?: *`boolean`*): `void`



*Defined in [app/services/gdax-data.service.ts:196](https://github.com/WilliamRADFunk/cryptobot-interface/blob/660a506/src/app/services/gdax-data.service.ts#L196)*



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



*Defined in [app/services/gdax-data.service.ts:214](https://github.com/WilliamRADFunk/cryptobot-interface/blob/660a506/src/app/services/gdax-data.service.ts#L214)*



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



*Defined in [app/services/gdax-data.service.ts:231](https://github.com/WilliamRADFunk/cryptobot-interface/blob/660a506/src/app/services/gdax-data.service.ts#L231)*



Updates the page number, and refreshes query results.


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| page | `number`   |  the granularity to use |





**Returns:** `void`





___



###  changeRowsPerPage

► **changeRowsPerPage**(rowsPerPage: *`number`*, initChange?: *`boolean`*): `void`



*Defined in [app/services/gdax-data.service.ts:252](https://github.com/WilliamRADFunk/cryptobot-interface/blob/660a506/src/app/services/gdax-data.service.ts#L252)*



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



*Defined in [app/services/gdax-data.service.ts:269](https://github.com/WilliamRADFunk/cryptobot-interface/blob/660a506/src/app/services/gdax-data.service.ts#L269)*



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



*Defined in [app/services/gdax-data.service.ts:287](https://github.com/WilliamRADFunk/cryptobot-interface/blob/660a506/src/app/services/gdax-data.service.ts#L287)*



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



*Defined in [app/services/gdax-data.service.ts:301](https://github.com/WilliamRADFunk/cryptobot-interface/blob/660a506/src/app/services/gdax-data.service.ts#L301)*



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



*Defined in [app/services/gdax-data.service.ts:320](https://github.com/WilliamRADFunk/cryptobot-interface/blob/660a506/src/app/services/gdax-data.service.ts#L320)*



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



*Defined in [app/services/gdax-data.service.ts:344](https://github.com/WilliamRADFunk/cryptobot-interface/blob/660a506/src/app/services/gdax-data.service.ts#L344)*



Returns the service stored endDatetime




**Returns:** `Date`
endDate stored on service from previous entry.






___



###  getLatestCryptoBotData

► **getLatestCryptoBotData**(): `void`



*Defined in [app/services/gdax-data.service.ts:350](https://github.com/WilliamRADFunk/cryptobot-interface/blob/660a506/src/app/services/gdax-data.service.ts#L350)*



Call to GDAX for cryptobot data




**Returns:** `void`





___



###  getLatestGdaxData

► **getLatestGdaxData**(): `void`



*Defined in [app/services/gdax-data.service.ts:356](https://github.com/WilliamRADFunk/cryptobot-interface/blob/660a506/src/app/services/gdax-data.service.ts#L356)*



Call to GDAX for historical market data




**Returns:** `void`





___



###  getLatestGdaxHistoryData

► **getLatestGdaxHistoryData**(): `void`



*Defined in [app/services/gdax-data.service.ts:418](https://github.com/WilliamRADFunk/cryptobot-interface/blob/660a506/src/app/services/gdax-data.service.ts#L418)*



Call to GDAX for trading history data




**Returns:** `void`





___



###  getLatestGdaxProfitData

► **getLatestGdaxProfitData**(): `void`



*Defined in [app/services/gdax-data.service.ts:462](https://github.com/WilliamRADFunk/cryptobot-interface/blob/660a506/src/app/services/gdax-data.service.ts#L462)*



Call to GDAX for profit data




**Returns:** `void`





___



###  getLatestGdaxUSDData

► **getLatestGdaxUSDData**(): `void`



*Defined in [app/services/gdax-data.service.ts:495](https://github.com/WilliamRADFunk/cryptobot-interface/blob/660a506/src/app/services/gdax-data.service.ts#L495)*



Call to GDAX for USD results to later compare crypto profit data against




**Returns:** `void`





___



###  getStartDateTime

► **getStartDateTime**(): `Date`



*Defined in [app/services/gdax-data.service.ts:527](https://github.com/WilliamRADFunk/cryptobot-interface/blob/660a506/src/app/services/gdax-data.service.ts#L527)*



Returns the service stored startDatetime




**Returns:** `Date`
startDate stored on service from previous entry.






___



###  handleHistoryResults

► **handleHistoryResults**(originalData: *`__type`[]*): `void`



*Defined in [app/services/gdax-data.service.ts:534](https://github.com/WilliamRADFunk/cryptobot-interface/blob/660a506/src/app/services/gdax-data.service.ts#L534)*



Recursive query maker until desired results are found


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| originalData | `__type`[]   |  data used to check against to see if current results are sufficient |





**Returns:** `void`





___



###  handleProfitResults

► **handleProfitResults**(originalData: *`__type`[]*, subscription: *`any`*): `void`



*Defined in [app/services/gdax-data.service.ts:669](https://github.com/WilliamRADFunk/cryptobot-interface/blob/660a506/src/app/services/gdax-data.service.ts#L669)*



Recursive query maker until desired results are found


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| originalData | `__type`[]   |  data used to check against to see if current results are sufficient |
| subscription | `any`   |  - |





**Returns:** `void`





___



###  handleUSDResults

► **handleUSDResults**(originalData: *`__type`[]*, subscription: *`any`*): `void`



*Defined in [app/services/gdax-data.service.ts:724](https://github.com/WilliamRADFunk/cryptobot-interface/blob/660a506/src/app/services/gdax-data.service.ts#L724)*



Recursive query maker until desired results are found


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| originalData | `__type`[]   |  data used to check against to see if current results are sufficient |
| subscription | `any`   |  - |





**Returns:** `void`





___



###  kill

► **kill**(): `void`



*Defined in [app/services/gdax-data.service.ts:771](https://github.com/WilliamRADFunk/cryptobot-interface/blob/660a506/src/app/services/gdax-data.service.ts#L771)*



Resets initialization flags, unsubscribes from all subscriptions, and halts any current queries.




**Returns:** `void`





___



###  organizeProfitData

► **organizeProfitData**(): `void`



*Defined in [app/services/gdax-data.service.ts:796](https://github.com/WilliamRADFunk/cryptobot-interface/blob/660a506/src/app/services/gdax-data.service.ts#L796)*



Assembles the data into a format suitable for the profit portfolio page.




**Returns:** `void`





___



###  refreshData

► **refreshData**(isPageChange?: *`boolean`*): `void`



*Defined in [app/services/gdax-data.service.ts:886](https://github.com/WilliamRADFunk/cryptobot-interface/blob/660a506/src/app/services/gdax-data.service.ts#L886)*



Determines which data api to use based off of basePath, and calls it.


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| isPageChange | `boolean`   |  flag to make sure currIndex isn't reset on page change. |





**Returns:** `void`





___


