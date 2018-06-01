[cryptobot-interface](../README.md) > [ProfitPortfolioComponent](../classes/profitportfoliocomponent.md)



# Class: ProfitPortfolioComponent

## Implements

* `OnDestroy`
* `OnInit`

## Index

### Constructors

* [constructor](profitportfoliocomponent.md#markdown-header-constructor)


### Properties

* [activatedRouter](profitportfoliocomponent.md#markdown-header-private-activatedrouter)
* [busySubscription](profitportfoliocomponent.md#markdown-header-busysubscription)
* [chart](profitportfoliocomponent.md#markdown-header-chart)
* [chartDataSubscription](profitportfoliocomponent.md#markdown-header-chartdatasubscription)
* [gdaxDataService](profitportfoliocomponent.md#markdown-header-private-gdaxdataservice)
* [isBusy](profitportfoliocomponent.md#markdown-header-isbusy)
* [isEmpty](profitportfoliocomponent.md#markdown-header-isempty)
* [pathState](profitportfoliocomponent.md#markdown-header-pathstate)
* [router](profitportfoliocomponent.md#markdown-header-private-router)
* [urlSubscription](profitportfoliocomponent.md#markdown-header-urlsubscription)


### Methods

* [ngOnDestroy](profitportfoliocomponent.md#markdown-header-private-ngondestroy)
* [ngOnInit](profitportfoliocomponent.md#markdown-header-ngoninit)
* [updateChart](profitportfoliocomponent.md#markdown-header-updatechart)



---
## Constructors



### ⊕ **new ProfitPortfolioComponent**(activatedRouter: *`ActivatedRoute`*, router: *`Router`*, gdaxDataService: *[GdaxDataService](gdaxdataservice.md)*): [ProfitPortfolioComponent](profitportfoliocomponent.md)


*Defined in [app/components/profit-portfolio/profit-portfolio.component.ts:46](https://github.com/WilliamRADFunk/cryptobot-interface/blob/660a506/src/app/components/profit-portfolio/profit-portfolio.component.ts#L46)*



Constructor for the class. Injects Angular's ActivatedRoute, and Router services


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| activatedRouter | `ActivatedRoute`   |  Angular's ActivatedRoute service for knowing current route |
| router | `Router`   |  Angular's Router service for changing route |
| gdaxDataService | [GdaxDataService](gdaxdataservice.md)   |  Internal service to get queried market data. |





**Returns:** [ProfitPortfolioComponent](profitportfoliocomponent.md)

---


## Properties


### «Private» activatedRouter

**●  activatedRouter**:  *`ActivatedRoute`* 

*Defined in [app/components/profit-portfolio/profit-portfolio.component.ts:55](https://github.com/WilliamRADFunk/cryptobot-interface/blob/660a506/src/app/components/profit-portfolio/profit-portfolio.component.ts#L55)*



Angular's ActivatedRoute service for knowing current route




___



###  busySubscription

**●  busySubscription**:  *`Subscription`* 

*Defined in [app/components/profit-portfolio/profit-portfolio.component.ts:19](https://github.com/WilliamRADFunk/cryptobot-interface/blob/660a506/src/app/components/profit-portfolio/profit-portfolio.component.ts#L19)*



Makes unsubscribing from this variable possible in OnDestroy




___



###  chart

**●  chart**:  *`Chart`* 

*Defined in [app/components/profit-portfolio/profit-portfolio.component.ts:24](https://github.com/WilliamRADFunk/cryptobot-interface/blob/660a506/src/app/components/profit-portfolio/profit-portfolio.component.ts#L24)*



The main chart object to be constructed whenever new data is returned from the service.




___



###  chartDataSubscription

**●  chartDataSubscription**:  *`Subscription`* 

*Defined in [app/components/profit-portfolio/profit-portfolio.component.ts:28](https://github.com/WilliamRADFunk/cryptobot-interface/blob/660a506/src/app/components/profit-portfolio/profit-portfolio.component.ts#L28)*



Makes unsubscribing from this variable possible in OnDestroy




___



### «Private» gdaxDataService

**●  gdaxDataService**:  *[GdaxDataService](gdaxdataservice.md)* 

*Defined in [app/components/profit-portfolio/profit-portfolio.component.ts:57](https://github.com/WilliamRADFunk/cryptobot-interface/blob/660a506/src/app/components/profit-portfolio/profit-portfolio.component.ts#L57)*



Internal service to get queried market data.




___



###  isBusy

**●  isBusy**:  *`boolean`*  = true

*Defined in [app/components/profit-portfolio/profit-portfolio.component.ts:33](https://github.com/WilliamRADFunk/cryptobot-interface/blob/660a506/src/app/components/profit-portfolio/profit-portfolio.component.ts#L33)*



Checks with service to see if it's busy in a query, and puts table in standby mode until it's ready.




___



###  isEmpty

**●  isEmpty**:  *`boolean`* 

*Defined in [app/components/profit-portfolio/profit-portfolio.component.ts:37](https://github.com/WilliamRADFunk/cryptobot-interface/blob/660a506/src/app/components/profit-portfolio/profit-portfolio.component.ts#L37)*



Flag to let ui show no data returned message




___



###  pathState

**●  pathState**:  *`string`*  = "BTC-USD"

*Defined in [app/components/profit-portfolio/profit-portfolio.component.ts:42](https://github.com/WilliamRADFunk/cryptobot-interface/blob/660a506/src/app/components/profit-portfolio/profit-portfolio.component.ts#L42)*



The initial path state passed in by the activatedRouter. Keeps track of what currency the chart should be viewing.




___



### «Private» router

**●  router**:  *`Router`* 

*Defined in [app/components/profit-portfolio/profit-portfolio.component.ts:56](https://github.com/WilliamRADFunk/cryptobot-interface/blob/660a506/src/app/components/profit-portfolio/profit-portfolio.component.ts#L56)*



Angular's Router service for changing route




___



###  urlSubscription

**●  urlSubscription**:  *`Subscription`* 

*Defined in [app/components/profit-portfolio/profit-portfolio.component.ts:46](https://github.com/WilliamRADFunk/cryptobot-interface/blob/660a506/src/app/components/profit-portfolio/profit-portfolio.component.ts#L46)*



Makes unsubscribing from this variable possible in OnDestroy




___


## Methods


### «Private» ngOnDestroy

► **ngOnDestroy**(): `void`



*Defined in [app/components/profit-portfolio/profit-portfolio.component.ts:63](https://github.com/WilliamRADFunk/cryptobot-interface/blob/660a506/src/app/components/profit-portfolio/profit-portfolio.component.ts#L63)*






**Returns:** `void`





___



###  ngOnInit

► **ngOnInit**(): `void`



*Defined in [app/components/profit-portfolio/profit-portfolio.component.ts:83](https://github.com/WilliamRADFunk/cryptobot-interface/blob/660a506/src/app/components/profit-portfolio/profit-portfolio.component.ts#L83)*



Triggered when component is loaded, but before it is viewed. Gets REST path info, and updates the profit chart.




**Returns:** `void`





___



###  updateChart

► **updateChart**(data: *`number`[][]*): `void`



*Defined in [app/components/profit-portfolio/profit-portfolio.component.ts:101](https://github.com/WilliamRADFunk/cryptobot-interface/blob/660a506/src/app/components/profit-portfolio/profit-portfolio.component.ts#L101)*



When new data is received, it's passed to this function. Here the chart details assembled, and the chartReady flag is released.


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| data | `number`[][]   |  queried market data passed from the GdaxDataService. |





**Returns:** `void`





___


