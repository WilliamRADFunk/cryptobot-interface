[cryptobot-interface](../README.md) > [TradingHistoryComponent](../classes/tradinghistorycomponent.md)



# Class: TradingHistoryComponent

## Implements

* `OnDestroy`
* `OnInit`

## Index

### Constructors

* [constructor](tradinghistorycomponent.md#markdown-header-constructor)


### Properties

* [activatedRouter](tradinghistorycomponent.md#markdown-header-private-activatedrouter)
* [busySubscription](tradinghistorycomponent.md#markdown-header-busysubscription)
* [firstTime](tradinghistorycomponent.md#markdown-header-firsttime)
* [gdaxDataService](tradinghistorycomponent.md#markdown-header-private-gdaxdataservice)
* [isBusy](tradinghistorycomponent.md#markdown-header-isbusy)
* [isNoNextPage](tradinghistorycomponent.md#markdown-header-isnonextpage)
* [isNoPrevPage](tradinghistorycomponent.md#markdown-header-isnoprevpage)
* [page](tradinghistorycomponent.md#markdown-header-page)
* [pageSubscription](tradinghistorycomponent.md#markdown-header-pagesubscription)
* [params](tradinghistorycomponent.md#markdown-header-params)
* [pathState](tradinghistorycomponent.md#markdown-header-pathstate)
* [queryParamSubscription](tradinghistorycomponent.md#markdown-header-queryparamsubscription)
* [router](tradinghistorycomponent.md#markdown-header-private-router)
* [rowAmounts](tradinghistorycomponent.md#markdown-header-rowamounts)
* [rowsPerPage](tradinghistorycomponent.md#markdown-header-rowsperpage)
* [table](tradinghistorycomponent.md#markdown-header-table)
* [tableDataSubscription](tradinghistorycomponent.md#markdown-header-tabledatasubscription)
* [tableReady](tradinghistorycomponent.md#markdown-header-tableready)
* [timeoutId](tradinghistorycomponent.md#markdown-header-timeoutid)
* [urlSubscription](tradinghistorycomponent.md#markdown-header-urlsubscription)


### Methods

* [changedPageNumber](tradinghistorycomponent.md#markdown-header-changedpagenumber)
* [changedRowsPerPage](tradinghistorycomponent.md#markdown-header-changedrowsperpage)
* [handleRowsPerPageParam](tradinghistorycomponent.md#markdown-header-private-handlerowsperpageparam)
* [ngOnDestroy](tradinghistorycomponent.md#markdown-header-private-ngondestroy)
* [ngOnInit](tradinghistorycomponent.md#markdown-header-ngoninit)
* [updateParams](tradinghistorycomponent.md#markdown-header-updateparams)
* [updateTable](tradinghistorycomponent.md#markdown-header-updatetable)



---
## Constructors



### ⊕ **new TradingHistoryComponent**(activatedRouter: *`ActivatedRoute`*, router: *`Router`*, gdaxDataService: *[GdaxDataService](gdaxdataservice.md)*): [TradingHistoryComponent](tradinghistorycomponent.md)


*Defined in [app/components/trading-history/trading-history.component.ts:86](https://github.com/WilliamRADFunk/cryptobot-interface/blob/660a506/src/app/components/trading-history/trading-history.component.ts#L86)*



Constructor for the class. Injects Angular's ActivatedRoute, and Router services


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| activatedRouter | `ActivatedRoute`   |  Angular's ActivatedRoute service for knowing current route |
| router | `Router`   |  Angular's Router service for changing route |
| gdaxDataService | [GdaxDataService](gdaxdataservice.md)   |  Internal service to get queried market data. |





**Returns:** [TradingHistoryComponent](tradinghistorycomponent.md)

---


## Properties


### «Private» activatedRouter

**●  activatedRouter**:  *`ActivatedRoute`* 

*Defined in [app/components/trading-history/trading-history.component.ts:94](https://github.com/WilliamRADFunk/cryptobot-interface/blob/660a506/src/app/components/trading-history/trading-history.component.ts#L94)*



Angular's ActivatedRoute service for knowing current route




___



###  busySubscription

**●  busySubscription**:  *`Subscription`* 

*Defined in [app/components/trading-history/trading-history.component.ts:16](https://github.com/WilliamRADFunk/cryptobot-interface/blob/660a506/src/app/components/trading-history/trading-history.component.ts#L16)*



Makes unsubscribing from this variable possible in OnDestroy




___



###  firstTime

**●  firstTime**:  *`boolean`[]*  =  [true, true]

*Defined in [app/components/trading-history/trading-history.component.ts:21](https://github.com/WilliamRADFunk/cryptobot-interface/blob/660a506/src/app/components/trading-history/trading-history.component.ts#L21)*



Array of flags to determine if initial param and url pull is done before triggering the service to query for data. First is currencyType. Second is rowsPerPage.




___



### «Private» gdaxDataService

**●  gdaxDataService**:  *[GdaxDataService](gdaxdataservice.md)* 

*Defined in [app/components/trading-history/trading-history.component.ts:96](https://github.com/WilliamRADFunk/cryptobot-interface/blob/660a506/src/app/components/trading-history/trading-history.component.ts#L96)*



Internal service to get queried market data.




___



###  isBusy

**●  isBusy**:  *`boolean`*  = true

*Defined in [app/components/trading-history/trading-history.component.ts:26](https://github.com/WilliamRADFunk/cryptobot-interface/blob/660a506/src/app/components/trading-history/trading-history.component.ts#L26)*



Checks with service to see if it's busy in a query, and puts table in standby mode until it's ready.




___



###  isNoNextPage

**●  isNoNextPage**:  *`boolean`*  = false

*Defined in [app/components/trading-history/trading-history.component.ts:30](https://github.com/WilliamRADFunk/cryptobot-interface/blob/660a506/src/app/components/trading-history/trading-history.component.ts#L30)*



Flag to disable next page button if there is no more data.




___



###  isNoPrevPage

**●  isNoPrevPage**:  *`boolean`*  = true

*Defined in [app/components/trading-history/trading-history.component.ts:34](https://github.com/WilliamRADFunk/cryptobot-interface/blob/660a506/src/app/components/trading-history/trading-history.component.ts#L34)*



Flag to disable previous page button if user is on first page.




___



###  page

**●  page**:  *`number`*  = 1

*Defined in [app/components/trading-history/trading-history.component.ts:38](https://github.com/WilliamRADFunk/cryptobot-interface/blob/660a506/src/app/components/trading-history/trading-history.component.ts#L38)*



Current page number




___



###  pageSubscription

**●  pageSubscription**:  *`Subscription`* 

*Defined in [app/components/trading-history/trading-history.component.ts:42](https://github.com/WilliamRADFunk/cryptobot-interface/blob/660a506/src/app/components/trading-history/trading-history.component.ts#L42)*



Makes unsubscribing from this variable possible in OnDestroy




___



###  params

**●  params**:  *`ParamMap`* 

*Defined in [app/components/trading-history/trading-history.component.ts:46](https://github.com/WilliamRADFunk/cryptobot-interface/blob/660a506/src/app/components/trading-history/trading-history.component.ts#L46)*



Holds query params to check against in other parts of component




___



###  pathState

**●  pathState**:  *`string`*  = "BTC-USD"

*Defined in [app/components/trading-history/trading-history.component.ts:51](https://github.com/WilliamRADFunk/cryptobot-interface/blob/660a506/src/app/components/trading-history/trading-history.component.ts#L51)*



The initial path state passed in by the activatedRouter. Keeps track of what currency the chart should be viewing.




___



###  queryParamSubscription

**●  queryParamSubscription**:  *`Subscription`* 

*Defined in [app/components/trading-history/trading-history.component.ts:63](https://github.com/WilliamRADFunk/cryptobot-interface/blob/660a506/src/app/components/trading-history/trading-history.component.ts#L63)*



Makes unsubscribing from this variable possible in OnDestroy




___



### «Private» router

**●  router**:  *`Router`* 

*Defined in [app/components/trading-history/trading-history.component.ts:95](https://github.com/WilliamRADFunk/cryptobot-interface/blob/660a506/src/app/components/trading-history/trading-history.component.ts#L95)*



Angular's Router service for changing route




___



###  rowAmounts

**●  rowAmounts**:  *`number`[]*  =  [10, 25, 50, 75]

*Defined in [app/components/trading-history/trading-history.component.ts:59](https://github.com/WilliamRADFunk/cryptobot-interface/blob/660a506/src/app/components/trading-history/trading-history.component.ts#L59)*



Options for number of rows to show per page




___



###  rowsPerPage

**●  rowsPerPage**:  *`number`*  = 10

*Defined in [app/components/trading-history/trading-history.component.ts:55](https://github.com/WilliamRADFunk/cryptobot-interface/blob/660a506/src/app/components/trading-history/trading-history.component.ts#L55)*



Number of rows to show per page




___



###  table

**●  table**:  *`__type`[]*  =  []

*Defined in [app/components/trading-history/trading-history.component.ts:68](https://github.com/WilliamRADFunk/cryptobot-interface/blob/660a506/src/app/components/trading-history/trading-history.component.ts#L68)*



The main table object to be constructed whenever new data is returned from the service.




___



###  tableDataSubscription

**●  tableDataSubscription**:  *`Subscription`* 

*Defined in [app/components/trading-history/trading-history.component.ts:72](https://github.com/WilliamRADFunk/cryptobot-interface/blob/660a506/src/app/components/trading-history/trading-history.component.ts#L72)*



Makes unsubscribing from this variable possible in OnDestroy




___



###  tableReady

**●  tableReady**:  *`boolean`*  = false

*Defined in [app/components/trading-history/trading-history.component.ts:77](https://github.com/WilliamRADFunk/cryptobot-interface/blob/660a506/src/app/components/trading-history/trading-history.component.ts#L77)*



The initial path state passed in by the activatedRouter. Keeps track of what currency the chart should be viewing.




___



###  timeoutId

**●  timeoutId**:  *`any`*  =  null

*Defined in [app/components/trading-history/trading-history.component.ts:82](https://github.com/WilliamRADFunk/cryptobot-interface/blob/660a506/src/app/components/trading-history/trading-history.component.ts#L82)*



The main table object to be constructed whenever new data is returned from the service.




___



###  urlSubscription

**●  urlSubscription**:  *`Subscription`* 

*Defined in [app/components/trading-history/trading-history.component.ts:86](https://github.com/WilliamRADFunk/cryptobot-interface/blob/660a506/src/app/components/trading-history/trading-history.component.ts#L86)*



Makes unsubscribing from this variable possible in OnDestroy




___


## Methods


###  changedPageNumber

► **changedPageNumber**(direction: *`string`*): `void`



*Defined in [app/components/trading-history/trading-history.component.ts:170](https://github.com/WilliamRADFunk/cryptobot-interface/blob/660a506/src/app/components/trading-history/trading-history.component.ts#L170)*



Called when user clicked next or previous page button


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| direction | `string`   |  'prev' for previous page, 'next' for next page |





**Returns:** `void`





___



###  changedRowsPerPage

► **changedRowsPerPage**(newRowsPerPage: *`number`*): `void`



*Defined in [app/components/trading-history/trading-history.component.ts:190](https://github.com/WilliamRADFunk/cryptobot-interface/blob/660a506/src/app/components/trading-history/trading-history.component.ts#L190)*



Called when user clicked a different rows per page choice


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| newRowsPerPage | `number`   |  new rows per page choice |





**Returns:** `void`





___



### «Private» handleRowsPerPageParam

► **handleRowsPerPageParam**(): `void`



*Defined in [app/components/trading-history/trading-history.component.ts:208](https://github.com/WilliamRADFunk/cryptobot-interface/blob/660a506/src/app/components/trading-history/trading-history.component.ts#L208)*






**Returns:** `void`





___



### «Private» ngOnDestroy

► **ngOnDestroy**(): `void`



*Defined in [app/components/trading-history/trading-history.component.ts:102](https://github.com/WilliamRADFunk/cryptobot-interface/blob/660a506/src/app/components/trading-history/trading-history.component.ts#L102)*






**Returns:** `void`





___



###  ngOnInit

► **ngOnInit**(): `void`



*Defined in [app/components/trading-history/trading-history.component.ts:130](https://github.com/WilliamRADFunk/cryptobot-interface/blob/660a506/src/app/components/trading-history/trading-history.component.ts#L130)*



Triggered when component is loaded, but before it is viewed. Gets REST path info, and updates the history table.




**Returns:** `void`





___



###  updateParams

► **updateParams**(params: *`__type`*): `void`



*Defined in [app/components/trading-history/trading-history.component.ts:235](https://github.com/WilliamRADFunk/cryptobot-interface/blob/660a506/src/app/components/trading-history/trading-history.component.ts#L235)*



Called when params need updating. Avoids repetition.


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| params | `__type`   |  param object used to update queryParams |





**Returns:** `void`





___



###  updateTable

► **updateTable**(data: *`__type`[]*): `void`



*Defined in [app/components/trading-history/trading-history.component.ts:246](https://github.com/WilliamRADFunk/cryptobot-interface/blob/660a506/src/app/components/trading-history/trading-history.component.ts#L246)*



When new data is received, it's passed to this function. Here the table details are assembled, and the tableReady flag is released.


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| data | `__type`[]   |  queried trading history data passed from the GdaxDataService. |





**Returns:** `void`





___


