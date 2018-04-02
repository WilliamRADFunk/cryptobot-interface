[cryptobot-interface](../README.md) > [TradingHistoryComponent](../classes/tradinghistorycomponent.md)



# Class: TradingHistoryComponent

## Implements

* `OnInit`

## Index

### Constructors

* [constructor](tradinghistorycomponent.md#markdown-header-constructor)


### Properties

* [activatedRouter](tradinghistorycomponent.md#markdown-header-private-activatedrouter)
* [gdaxDataService](tradinghistorycomponent.md#markdown-header-private-gdaxdataservice)
* [isBusy](tradinghistorycomponent.md#markdown-header-isbusy)
* [isNoNextPage](tradinghistorycomponent.md#markdown-header-isnonextpage)
* [isNoPrevPage](tradinghistorycomponent.md#markdown-header-isnoprevpage)
* [page](tradinghistorycomponent.md#markdown-header-page)
* [pathState](tradinghistorycomponent.md#markdown-header-pathstate)
* [router](tradinghistorycomponent.md#markdown-header-private-router)
* [rowsPerPage](tradinghistorycomponent.md#markdown-header-rowsperpage)
* [table](tradinghistorycomponent.md#markdown-header-table)
* [tableReady](tradinghistorycomponent.md#markdown-header-tableready)
* [timeoutId](tradinghistorycomponent.md#markdown-header-timeoutid)


### Methods

* [changedPageNumber](tradinghistorycomponent.md#markdown-header-changedpagenumber)
* [changedRowsPerPage](tradinghistorycomponent.md#markdown-header-changedrowsperpage)
* [ngOnInit](tradinghistorycomponent.md#markdown-header-ngoninit)
* [updateTable](tradinghistorycomponent.md#markdown-header-updatetable)



---
## Constructors



### ⊕ **new TradingHistoryComponent**(activatedRouter: *`ActivatedRoute`*, router: *`Router`*, gdaxDataService: *[GdaxDataService](gdaxdataservice.md)*): [TradingHistoryComponent](tradinghistorycomponent.md)


*Defined in [app/components/trading-history/trading-history.component.ts:52](https://github.com/WilliamRADFunk/cryptobot-interface/blob/eb9c587/src/app/components/trading-history/trading-history.component.ts#L52)*



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

*Defined in [app/components/trading-history/trading-history.component.ts:60](https://github.com/WilliamRADFunk/cryptobot-interface/blob/eb9c587/src/app/components/trading-history/trading-history.component.ts#L60)*



Angular's ActivatedRoute service for knowing current route




___



### «Private» gdaxDataService

**●  gdaxDataService**:  *[GdaxDataService](gdaxdataservice.md)* 

*Defined in [app/components/trading-history/trading-history.component.ts:62](https://github.com/WilliamRADFunk/cryptobot-interface/blob/eb9c587/src/app/components/trading-history/trading-history.component.ts#L62)*



Internal service to get queried market data.




___



###  isBusy

**●  isBusy**:  *`boolean`*  = true

*Defined in [app/components/trading-history/trading-history.component.ts:16](https://github.com/WilliamRADFunk/cryptobot-interface/blob/eb9c587/src/app/components/trading-history/trading-history.component.ts#L16)*



Checks with service to see if it's busy in a query, and puts table in standby mode until it's ready.




___



###  isNoNextPage

**●  isNoNextPage**:  *`boolean`*  = false

*Defined in [app/components/trading-history/trading-history.component.ts:20](https://github.com/WilliamRADFunk/cryptobot-interface/blob/eb9c587/src/app/components/trading-history/trading-history.component.ts#L20)*



Flag to disable next page button if there is no more data.




___



###  isNoPrevPage

**●  isNoPrevPage**:  *`boolean`*  = false

*Defined in [app/components/trading-history/trading-history.component.ts:24](https://github.com/WilliamRADFunk/cryptobot-interface/blob/eb9c587/src/app/components/trading-history/trading-history.component.ts#L24)*



Flag to disable previous page button if user is on first page.




___



###  page

**●  page**:  *`number`*  = 1

*Defined in [app/components/trading-history/trading-history.component.ts:32](https://github.com/WilliamRADFunk/cryptobot-interface/blob/eb9c587/src/app/components/trading-history/trading-history.component.ts#L32)*



Current page number




___



###  pathState

**●  pathState**:  *`string`*  = "BTC-USD"

*Defined in [app/components/trading-history/trading-history.component.ts:37](https://github.com/WilliamRADFunk/cryptobot-interface/blob/eb9c587/src/app/components/trading-history/trading-history.component.ts#L37)*



The initial path state passed in by the activatedRouter. Keeps track of what currency the chart should be viewing.




___



### «Private» router

**●  router**:  *`Router`* 

*Defined in [app/components/trading-history/trading-history.component.ts:61](https://github.com/WilliamRADFunk/cryptobot-interface/blob/eb9c587/src/app/components/trading-history/trading-history.component.ts#L61)*



Angular's Router service for changing route




___



###  rowsPerPage

**●  rowsPerPage**:  *`number`*  = 100

*Defined in [app/components/trading-history/trading-history.component.ts:28](https://github.com/WilliamRADFunk/cryptobot-interface/blob/eb9c587/src/app/components/trading-history/trading-history.component.ts#L28)*



Number of rows to show per page




___



###  table

**●  table**:  *`__type`[]*  =  []

*Defined in [app/components/trading-history/trading-history.component.ts:42](https://github.com/WilliamRADFunk/cryptobot-interface/blob/eb9c587/src/app/components/trading-history/trading-history.component.ts#L42)*



The main table object to be constructed whenever new data is returned from the service.




___



###  tableReady

**●  tableReady**:  *`boolean`*  = false

*Defined in [app/components/trading-history/trading-history.component.ts:47](https://github.com/WilliamRADFunk/cryptobot-interface/blob/eb9c587/src/app/components/trading-history/trading-history.component.ts#L47)*



The initial path state passed in by the activatedRouter. Keeps track of what currency the chart should be viewing.




___



###  timeoutId

**●  timeoutId**:  *`any`*  =  null

*Defined in [app/components/trading-history/trading-history.component.ts:52](https://github.com/WilliamRADFunk/cryptobot-interface/blob/eb9c587/src/app/components/trading-history/trading-history.component.ts#L52)*



The main table object to be constructed whenever new data is returned from the service.




___


## Methods


###  changedPageNumber

► **changedPageNumber**(direction: *`string`*): `void`



*Defined in [app/components/trading-history/trading-history.component.ts:86](https://github.com/WilliamRADFunk/cryptobot-interface/blob/eb9c587/src/app/components/trading-history/trading-history.component.ts#L86)*



Called when user clicked next or previous page button


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| direction | `string`   |  'prev' for previous page, 'next' for next page |





**Returns:** `void`





___



###  changedRowsPerPage

► **changedRowsPerPage**(newRowsPerPage: *`number`*): `void`



*Defined in [app/components/trading-history/trading-history.component.ts:101](https://github.com/WilliamRADFunk/cryptobot-interface/blob/eb9c587/src/app/components/trading-history/trading-history.component.ts#L101)*



Called when user clicked a different rows per page choice


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| newRowsPerPage | `number`   |  new rows per page choice |





**Returns:** `void`





___



###  ngOnInit

► **ngOnInit**(): `void`



*Defined in [app/components/trading-history/trading-history.component.ts:67](https://github.com/WilliamRADFunk/cryptobot-interface/blob/eb9c587/src/app/components/trading-history/trading-history.component.ts#L67)*



Triggered when component is loaded, but before it is viewed. Gets REST path info, and updates the history table.




**Returns:** `void`





___



###  updateTable

► **updateTable**(data: *`__type`[]*): `void`



*Defined in [app/components/trading-history/trading-history.component.ts:113](https://github.com/WilliamRADFunk/cryptobot-interface/blob/eb9c587/src/app/components/trading-history/trading-history.component.ts#L113)*



When new data is received, it's passed to this function. Here the table details are assembled, and the tableReady flag is released.


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| data | `__type`[]   |  queried trading history data passed from the GdaxDataService. |





**Returns:** `void`





___


