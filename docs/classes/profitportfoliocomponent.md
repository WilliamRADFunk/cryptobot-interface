[cryptobot-interface](../README.md) > [ProfitPortfolioComponent](../classes/profitportfoliocomponent.md)



# Class: ProfitPortfolioComponent

## Implements

* `OnInit`

## Index

### Constructors

* [constructor](profitportfoliocomponent.md#markdown-header-constructor)


### Properties

* [activatedRouter](profitportfoliocomponent.md#markdown-header-private-activatedrouter)
* [chart](profitportfoliocomponent.md#markdown-header-chart)
* [gdaxDataService](profitportfoliocomponent.md#markdown-header-private-gdaxdataservice)
* [isBusy](profitportfoliocomponent.md#markdown-header-isbusy)
* [pathState](profitportfoliocomponent.md#markdown-header-pathstate)
* [router](profitportfoliocomponent.md#markdown-header-private-router)


### Methods

* [ngOnInit](profitportfoliocomponent.md#markdown-header-ngoninit)
* [updateChart](profitportfoliocomponent.md#markdown-header-updatechart)



---
## Constructors



### ⊕ **new ProfitPortfolioComponent**(activatedRouter: *`ActivatedRoute`*, router: *`Router`*, gdaxDataService: *[GdaxDataService](gdaxdataservice.md)*): [ProfitPortfolioComponent](profitportfoliocomponent.md)


*Defined in [app/components/profit-portfolio/profit-portfolio.component.ts:28](https://github.com/WilliamRADFunk/cryptobot-interface/blob/9f10186/src/app/components/profit-portfolio/profit-portfolio.component.ts#L28)*



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

*Defined in [app/components/profit-portfolio/profit-portfolio.component.ts:37](https://github.com/WilliamRADFunk/cryptobot-interface/blob/9f10186/src/app/components/profit-portfolio/profit-portfolio.component.ts#L37)*



Angular's ActivatedRoute service for knowing current route




___



###  chart

**●  chart**:  *`Chart`* 

*Defined in [app/components/profit-portfolio/profit-portfolio.component.ts:18](https://github.com/WilliamRADFunk/cryptobot-interface/blob/9f10186/src/app/components/profit-portfolio/profit-portfolio.component.ts#L18)*



The main chart object to be constructed whenever new data is returned from the service.




___



### «Private» gdaxDataService

**●  gdaxDataService**:  *[GdaxDataService](gdaxdataservice.md)* 

*Defined in [app/components/profit-portfolio/profit-portfolio.component.ts:39](https://github.com/WilliamRADFunk/cryptobot-interface/blob/9f10186/src/app/components/profit-portfolio/profit-portfolio.component.ts#L39)*



Internal service to get queried market data.




___



###  isBusy

**●  isBusy**:  *`boolean`*  = true

*Defined in [app/components/profit-portfolio/profit-portfolio.component.ts:23](https://github.com/WilliamRADFunk/cryptobot-interface/blob/9f10186/src/app/components/profit-portfolio/profit-portfolio.component.ts#L23)*



Checks with service to see if it's busy in a query, and puts table in standby mode until it's ready.




___



###  pathState

**●  pathState**:  *`string`*  = "BTC-USD"

*Defined in [app/components/profit-portfolio/profit-portfolio.component.ts:28](https://github.com/WilliamRADFunk/cryptobot-interface/blob/9f10186/src/app/components/profit-portfolio/profit-portfolio.component.ts#L28)*



The initial path state passed in by the activatedRouter. Keeps track of what currency the chart should be viewing.




___



### «Private» router

**●  router**:  *`Router`* 

*Defined in [app/components/profit-portfolio/profit-portfolio.component.ts:38](https://github.com/WilliamRADFunk/cryptobot-interface/blob/9f10186/src/app/components/profit-portfolio/profit-portfolio.component.ts#L38)*



Angular's Router service for changing route




___


## Methods


###  ngOnInit

► **ngOnInit**(): `void`



*Defined in [app/components/profit-portfolio/profit-portfolio.component.ts:44](https://github.com/WilliamRADFunk/cryptobot-interface/blob/9f10186/src/app/components/profit-portfolio/profit-portfolio.component.ts#L44)*



Triggered when component is loaded, but before it is viewed. Gets REST path info, and updates the profit chart.




**Returns:** `void`





___



###  updateChart

► **updateChart**(data: *`number`[][]*): `void`



*Defined in [app/components/profit-portfolio/profit-portfolio.component.ts:62](https://github.com/WilliamRADFunk/cryptobot-interface/blob/9f10186/src/app/components/profit-portfolio/profit-portfolio.component.ts#L62)*



When new data is received, it's passed to this function. Here the chart details assembled, and the chartReady flag is released.


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| data | `number`[][]   |  queried market data passed from the GdaxDataService. |





**Returns:** `void`





___


