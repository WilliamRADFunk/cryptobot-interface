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
* [isNoNextPage](tradinghistorycomponent.md#markdown-header-isnonextpage)
* [isNoPrevPage](tradinghistorycomponent.md#markdown-header-isnoprevpage)
* [page](tradinghistorycomponent.md#markdown-header-page)
* [pathState](tradinghistorycomponent.md#markdown-header-pathstate)
* [router](tradinghistorycomponent.md#markdown-header-private-router)
* [rowsPerPage](tradinghistorycomponent.md#markdown-header-rowsperpage)
* [table](tradinghistorycomponent.md#markdown-header-table)
* [tableReady](tradinghistorycomponent.md#markdown-header-tableready)


### Methods

* [changedPageNumber](tradinghistorycomponent.md#markdown-header-changedpagenumber)
* [changedRowsPerPage](tradinghistorycomponent.md#markdown-header-changedrowsperpage)
* [ngOnInit](tradinghistorycomponent.md#markdown-header-ngoninit)
* [updateTable](tradinghistorycomponent.md#markdown-header-updatetable)



---
## Constructors



### ⊕ **new TradingHistoryComponent**(activatedRouter: *`ActivatedRoute`*, router: *`Router`*, gdaxDataService: *[GdaxDataService](gdaxdataservice.md)*): [TradingHistoryComponent](tradinghistorycomponent.md)


*Defined in [app/components/trading-history/trading-history.component.ts:42](https://github.com/WilliamRADFunk/cryptobot-interface/blob/ade795d/src/app/components/trading-history/trading-history.component.ts#L42)*



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

*Defined in [app/components/trading-history/trading-history.component.ts:50](https://github.com/WilliamRADFunk/cryptobot-interface/blob/ade795d/src/app/components/trading-history/trading-history.component.ts#L50)*



Angular's ActivatedRoute service for knowing current route




___



### «Private» gdaxDataService

**●  gdaxDataService**:  *[GdaxDataService](gdaxdataservice.md)* 

*Defined in [app/components/trading-history/trading-history.component.ts:52](https://github.com/WilliamRADFunk/cryptobot-interface/blob/ade795d/src/app/components/trading-history/trading-history.component.ts#L52)*



Internal service to get queried market data.




___



###  isNoNextPage

**●  isNoNextPage**:  *`boolean`*  = false

*Defined in [app/components/trading-history/trading-history.component.ts:15](https://github.com/WilliamRADFunk/cryptobot-interface/blob/ade795d/src/app/components/trading-history/trading-history.component.ts#L15)*



Flag to disable next page button if there is no more data.




___



###  isNoPrevPage

**●  isNoPrevPage**:  *`boolean`*  = false

*Defined in [app/components/trading-history/trading-history.component.ts:19](https://github.com/WilliamRADFunk/cryptobot-interface/blob/ade795d/src/app/components/trading-history/trading-history.component.ts#L19)*



Flag to disable previous page button if user is on first page.




___



###  page

**●  page**:  *`number`*  = 1

*Defined in [app/components/trading-history/trading-history.component.ts:27](https://github.com/WilliamRADFunk/cryptobot-interface/blob/ade795d/src/app/components/trading-history/trading-history.component.ts#L27)*



Current page number




___



###  pathState

**●  pathState**:  *`string`*  = "BTC-USD"

*Defined in [app/components/trading-history/trading-history.component.ts:32](https://github.com/WilliamRADFunk/cryptobot-interface/blob/ade795d/src/app/components/trading-history/trading-history.component.ts#L32)*



The initial path state passed in by the activatedRouter. Keeps track of what currency the chart should be viewing.




___



### «Private» router

**●  router**:  *`Router`* 

*Defined in [app/components/trading-history/trading-history.component.ts:51](https://github.com/WilliamRADFunk/cryptobot-interface/blob/ade795d/src/app/components/trading-history/trading-history.component.ts#L51)*



Angular's Router service for changing route




___



###  rowsPerPage

**●  rowsPerPage**:  *`number`*  = 100

*Defined in [app/components/trading-history/trading-history.component.ts:23](https://github.com/WilliamRADFunk/cryptobot-interface/blob/ade795d/src/app/components/trading-history/trading-history.component.ts#L23)*



Number of rows to show per page




___



###  table

**●  table**:  *`__type`[]*  =  []

*Defined in [app/components/trading-history/trading-history.component.ts:37](https://github.com/WilliamRADFunk/cryptobot-interface/blob/ade795d/src/app/components/trading-history/trading-history.component.ts#L37)*



The main table object to be constructed whenever new data is returned from the service.




___



###  tableReady

**●  tableReady**:  *`boolean`*  = false

*Defined in [app/components/trading-history/trading-history.component.ts:42](https://github.com/WilliamRADFunk/cryptobot-interface/blob/ade795d/src/app/components/trading-history/trading-history.component.ts#L42)*



The initial path state passed in by the activatedRouter. Keeps track of what currency the chart should be viewing.




___


## Methods


###  changedPageNumber

► **changedPageNumber**(direction: *`string`*): `void`



*Defined in [app/components/trading-history/trading-history.component.ts:70](https://github.com/WilliamRADFunk/cryptobot-interface/blob/ade795d/src/app/components/trading-history/trading-history.component.ts#L70)*



Called when user clicked next or previous page button


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| direction | `string`   |  'prev' for previous page, 'next' for next page |





**Returns:** `void`





___



###  changedRowsPerPage

► **changedRowsPerPage**(newRowsPerPage: *`number`*): `void`



*Defined in [app/components/trading-history/trading-history.component.ts:83](https://github.com/WilliamRADFunk/cryptobot-interface/blob/ade795d/src/app/components/trading-history/trading-history.component.ts#L83)*



Called when user clicked a different rows per page choice


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| newRowsPerPage | `number`   |  new rows per page choice |





**Returns:** `void`





___



###  ngOnInit

► **ngOnInit**(): `void`



*Defined in [app/components/trading-history/trading-history.component.ts:57](https://github.com/WilliamRADFunk/cryptobot-interface/blob/ade795d/src/app/components/trading-history/trading-history.component.ts#L57)*



Triggered when component is loaded, but before it is viewed. Gets REST path info, and updates the history table.




**Returns:** `void`





___



###  updateTable

► **updateTable**(data: *`__type`[]*): `void`



*Defined in [app/components/trading-history/trading-history.component.ts:94](https://github.com/WilliamRADFunk/cryptobot-interface/blob/ade795d/src/app/components/trading-history/trading-history.component.ts#L94)*



When new data is received, it's passed to this function. Here the table details are assembled, and the tableReady flag is released.


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| data | `__type`[]   |  queried trading history data passed from the GdaxDataService. |





**Returns:** `void`





___


