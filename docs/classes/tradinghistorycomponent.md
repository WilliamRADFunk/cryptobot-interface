[cryptobot-interface](../README.md) > [TradingHistoryComponent](../classes/tradinghistorycomponent.md)



# Class: TradingHistoryComponent

## Implements

* `OnInit`

## Index

### Constructors

* [constructor](tradinghistorycomponent.md#markdown-header-constructor)


### Properties

* [activatedRouter](tradinghistorycomponent.md#markdown-header-private-activatedrouter)
* [pathState](tradinghistorycomponent.md#markdown-header-pathstate)
* [router](tradinghistorycomponent.md#markdown-header-private-router)


### Methods

* [ngOnInit](tradinghistorycomponent.md#markdown-header-ngoninit)



---
## Constructors



### ⊕ **new TradingHistoryComponent**(activatedRouter: *`ActivatedRoute`*, router: *`Router`*): [TradingHistoryComponent](tradinghistorycomponent.md)


*Defined in [app/components/trading-history/trading-history.component.ts:14](https://github.com/WilliamRADFunk/cryptobot-interface/blob/de4f8ae/src/app/components/trading-history/trading-history.component.ts#L14)*



Constructor for the class. Injects Angular's ActivatedRoute, and Router services


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| activatedRouter | `ActivatedRoute`   |  Angular's ActivatedRoute service for knowing current route |
| router | `Router`   |  Angular's Router service for changing route |





**Returns:** [TradingHistoryComponent](tradinghistorycomponent.md)

---


## Properties


### «Private» activatedRouter

**●  activatedRouter**:  *`ActivatedRoute`* 

*Defined in [app/components/trading-history/trading-history.component.ts:22](https://github.com/WilliamRADFunk/cryptobot-interface/blob/de4f8ae/src/app/components/trading-history/trading-history.component.ts#L22)*



Angular's ActivatedRoute service for knowing current route




___



###  pathState

**●  pathState**:  *`string`*  = "BTC-USD"

*Defined in [app/components/trading-history/trading-history.component.ts:14](https://github.com/WilliamRADFunk/cryptobot-interface/blob/de4f8ae/src/app/components/trading-history/trading-history.component.ts#L14)*



The initial path state passed in by the activatedRouter. Keeps track of what currency the chart should be viewing.




___



### «Private» router

**●  router**:  *`Router`* 

*Defined in [app/components/trading-history/trading-history.component.ts:23](https://github.com/WilliamRADFunk/cryptobot-interface/blob/de4f8ae/src/app/components/trading-history/trading-history.component.ts#L23)*



Angular's Router service for changing route




___


## Methods


###  ngOnInit

► **ngOnInit**(): `void`



*Defined in [app/components/trading-history/trading-history.component.ts:28](https://github.com/WilliamRADFunk/cryptobot-interface/blob/de4f8ae/src/app/components/trading-history/trading-history.component.ts#L28)*



Triggered when component is loaded, but before it is viewed. Gets REST path info, and updates the history table.




**Returns:** `void`





___


