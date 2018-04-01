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
* [page](tradinghistorycomponent.md#markdown-header-page)
* [pathState](tradinghistorycomponent.md#markdown-header-pathstate)
* [router](tradinghistorycomponent.md#markdown-header-private-router)
* [rowsPerPage](tradinghistorycomponent.md#markdown-header-rowsperpage)
* [table](tradinghistorycomponent.md#markdown-header-table)
* [tableReady](tradinghistorycomponent.md#markdown-header-tableready)


### Methods

* [ngOnInit](tradinghistorycomponent.md#markdown-header-ngoninit)
* [updateTable](tradinghistorycomponent.md#markdown-header-updatetable)



---
## Constructors



### ⊕ **new TradingHistoryComponent**(activatedRouter: *`ActivatedRoute`*, router: *`Router`*, gdaxDataService: *[GdaxDataService](gdaxdataservice.md)*): [TradingHistoryComponent](tradinghistorycomponent.md)


*Defined in [app/components/trading-history/trading-history.component.ts:34](https://github.com/WilliamRADFunk/cryptobot-interface/blob/e62ec40/src/app/components/trading-history/trading-history.component.ts#L34)*



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

*Defined in [app/components/trading-history/trading-history.component.ts:43](https://github.com/WilliamRADFunk/cryptobot-interface/blob/e62ec40/src/app/components/trading-history/trading-history.component.ts#L43)*



Angular's ActivatedRoute service for knowing current route




___



### «Private» gdaxDataService

**●  gdaxDataService**:  *[GdaxDataService](gdaxdataservice.md)* 

*Defined in [app/components/trading-history/trading-history.component.ts:45](https://github.com/WilliamRADFunk/cryptobot-interface/blob/e62ec40/src/app/components/trading-history/trading-history.component.ts#L45)*



Internal service to get queried market data.




___



###  page

**●  page**:  *`number`*  = 1

*Defined in [app/components/trading-history/trading-history.component.ts:19](https://github.com/WilliamRADFunk/cryptobot-interface/blob/e62ec40/src/app/components/trading-history/trading-history.component.ts#L19)*



Current page number




___



###  pathState

**●  pathState**:  *`string`*  = "BTC-USD"

*Defined in [app/components/trading-history/trading-history.component.ts:24](https://github.com/WilliamRADFunk/cryptobot-interface/blob/e62ec40/src/app/components/trading-history/trading-history.component.ts#L24)*



The initial path state passed in by the activatedRouter. Keeps track of what currency the chart should be viewing.




___



### «Private» router

**●  router**:  *`Router`* 

*Defined in [app/components/trading-history/trading-history.component.ts:44](https://github.com/WilliamRADFunk/cryptobot-interface/blob/e62ec40/src/app/components/trading-history/trading-history.component.ts#L44)*



Angular's Router service for changing route




___



###  rowsPerPage

**●  rowsPerPage**:  *`number`*  = 100

*Defined in [app/components/trading-history/trading-history.component.ts:15](https://github.com/WilliamRADFunk/cryptobot-interface/blob/e62ec40/src/app/components/trading-history/trading-history.component.ts#L15)*



Number of rows to show per page




___



###  table

**●  table**:  *`__type`[]*  =  []

*Defined in [app/components/trading-history/trading-history.component.ts:29](https://github.com/WilliamRADFunk/cryptobot-interface/blob/e62ec40/src/app/components/trading-history/trading-history.component.ts#L29)*



The main table object to be constructed whenever new data is returned from the service.




___



###  tableReady

**●  tableReady**:  *`boolean`*  = false

*Defined in [app/components/trading-history/trading-history.component.ts:34](https://github.com/WilliamRADFunk/cryptobot-interface/blob/e62ec40/src/app/components/trading-history/trading-history.component.ts#L34)*



The initial path state passed in by the activatedRouter. Keeps track of what currency the chart should be viewing.




___


## Methods


###  ngOnInit

► **ngOnInit**(): `void`



*Defined in [app/components/trading-history/trading-history.component.ts:50](https://github.com/WilliamRADFunk/cryptobot-interface/blob/e62ec40/src/app/components/trading-history/trading-history.component.ts#L50)*



Triggered when component is loaded, but before it is viewed. Gets REST path info, and updates the history table.




**Returns:** `void`





___



###  updateTable

► **updateTable**(data: *`__type`[]*): `void`



*Defined in [app/components/trading-history/trading-history.component.ts:64](https://github.com/WilliamRADFunk/cryptobot-interface/blob/e62ec40/src/app/components/trading-history/trading-history.component.ts#L64)*



When new data is received, it's passed to this function. Here the table details are assembled, and the tableReady flag is released.


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| data | `__type`[]   |  queried trading history data passed from the GdaxDataService. |





**Returns:** `void`





___


