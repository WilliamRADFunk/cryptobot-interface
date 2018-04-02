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
* [pathState](profitportfoliocomponent.md#markdown-header-pathstate)
* [router](profitportfoliocomponent.md#markdown-header-private-router)


### Methods

* [ngOnInit](profitportfoliocomponent.md#markdown-header-ngoninit)



---
## Constructors



### ⊕ **new ProfitPortfolioComponent**(activatedRouter: *`ActivatedRoute`*, router: *`Router`*, gdaxDataService: *[GdaxDataService](gdaxdataservice.md)*): [ProfitPortfolioComponent](profitportfoliocomponent.md)


*Defined in [app/components/profit-portfolio/profit-portfolio.component.ts:23](https://github.com/WilliamRADFunk/cryptobot-interface/blob/eb9c587/src/app/components/profit-portfolio/profit-portfolio.component.ts#L23)*



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

*Defined in [app/components/profit-portfolio/profit-portfolio.component.ts:32](https://github.com/WilliamRADFunk/cryptobot-interface/blob/eb9c587/src/app/components/profit-portfolio/profit-portfolio.component.ts#L32)*



Angular's ActivatedRoute service for knowing current route




___



###  chart

**●  chart**:  *`Chart`* 

*Defined in [app/components/profit-portfolio/profit-portfolio.component.ts:18](https://github.com/WilliamRADFunk/cryptobot-interface/blob/eb9c587/src/app/components/profit-portfolio/profit-portfolio.component.ts#L18)*



The main chart object to be constructed whenever new data is returned from the service.




___



### «Private» gdaxDataService

**●  gdaxDataService**:  *[GdaxDataService](gdaxdataservice.md)* 

*Defined in [app/components/profit-portfolio/profit-portfolio.component.ts:34](https://github.com/WilliamRADFunk/cryptobot-interface/blob/eb9c587/src/app/components/profit-portfolio/profit-portfolio.component.ts#L34)*



Internal service to get queried market data.




___



###  pathState

**●  pathState**:  *`string`*  = "BTC-USD"

*Defined in [app/components/profit-portfolio/profit-portfolio.component.ts:23](https://github.com/WilliamRADFunk/cryptobot-interface/blob/eb9c587/src/app/components/profit-portfolio/profit-portfolio.component.ts#L23)*



The initial path state passed in by the activatedRouter. Keeps track of what currency the chart should be viewing.




___



### «Private» router

**●  router**:  *`Router`* 

*Defined in [app/components/profit-portfolio/profit-portfolio.component.ts:33](https://github.com/WilliamRADFunk/cryptobot-interface/blob/eb9c587/src/app/components/profit-portfolio/profit-portfolio.component.ts#L33)*



Angular's Router service for changing route




___


## Methods


###  ngOnInit

► **ngOnInit**(): `void`



*Defined in [app/components/profit-portfolio/profit-portfolio.component.ts:39](https://github.com/WilliamRADFunk/cryptobot-interface/blob/eb9c587/src/app/components/profit-portfolio/profit-portfolio.component.ts#L39)*



Triggered when component is loaded, but before it is viewed. Gets REST path info, and updates the profit chart.




**Returns:** `void`





___


