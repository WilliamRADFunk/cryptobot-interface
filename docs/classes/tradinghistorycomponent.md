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
* [pathState](tradinghistorycomponent.md#markdown-header-pathstate)
* [router](tradinghistorycomponent.md#markdown-header-private-router)


### Methods

* [ngOnInit](tradinghistorycomponent.md#markdown-header-ngoninit)



---
## Constructors



### ⊕ **new TradingHistoryComponent**(activatedRouter: *`ActivatedRoute`*, router: *`Router`*, gdaxDataService: *[GdaxDataService](gdaxdataservice.md)*): [TradingHistoryComponent](tradinghistorycomponent.md)


*Defined in [app/components/trading-history/trading-history.component.ts:16](https://github.com/WilliamRADFunk/cryptobot-interface/blob/db3d1a3/src/app/components/trading-history/trading-history.component.ts#L16)*



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

*Defined in [app/components/trading-history/trading-history.component.ts:25](https://github.com/WilliamRADFunk/cryptobot-interface/blob/db3d1a3/src/app/components/trading-history/trading-history.component.ts#L25)*



Angular's ActivatedRoute service for knowing current route




___



### «Private» gdaxDataService

**●  gdaxDataService**:  *[GdaxDataService](gdaxdataservice.md)* 

*Defined in [app/components/trading-history/trading-history.component.ts:27](https://github.com/WilliamRADFunk/cryptobot-interface/blob/db3d1a3/src/app/components/trading-history/trading-history.component.ts#L27)*



Internal service to get queried market data.




___



###  pathState

**●  pathState**:  *`string`*  = "BTC-USD"

*Defined in [app/components/trading-history/trading-history.component.ts:16](https://github.com/WilliamRADFunk/cryptobot-interface/blob/db3d1a3/src/app/components/trading-history/trading-history.component.ts#L16)*



The initial path state passed in by the activatedRouter. Keeps track of what currency the chart should be viewing.




___



### «Private» router

**●  router**:  *`Router`* 

*Defined in [app/components/trading-history/trading-history.component.ts:26](https://github.com/WilliamRADFunk/cryptobot-interface/blob/db3d1a3/src/app/components/trading-history/trading-history.component.ts#L26)*



Angular's Router service for changing route




___


## Methods


###  ngOnInit

► **ngOnInit**(): `void`



*Defined in [app/components/trading-history/trading-history.component.ts:32](https://github.com/WilliamRADFunk/cryptobot-interface/blob/db3d1a3/src/app/components/trading-history/trading-history.component.ts#L32)*



Triggered when component is loaded, but before it is viewed. Gets REST path info, and updates the history table.




**Returns:** `void`





___


