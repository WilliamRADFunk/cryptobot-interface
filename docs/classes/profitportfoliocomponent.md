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
* [pathState](profitportfoliocomponent.md#markdown-header-pathstate)
* [router](profitportfoliocomponent.md#markdown-header-private-router)


### Methods

* [ngOnInit](profitportfoliocomponent.md#markdown-header-ngoninit)



---
## Constructors



### ⊕ **new ProfitPortfolioComponent**(activatedRouter: *`ActivatedRoute`*, router: *`Router`*): [ProfitPortfolioComponent](profitportfoliocomponent.md)


*Defined in [app/components/profit-portfolio/profit-portfolio.component.ts:21](https://github.com/WilliamRADFunk/cryptobot-interface/blob/afbaa0e/src/app/components/profit-portfolio/profit-portfolio.component.ts#L21)*



Constructor for the class. Injects Angular's ActivatedRoute, and Router services


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| activatedRouter | `ActivatedRoute`   |  Angular's ActivatedRoute service for knowing current route |
| router | `Router`   |  Angular's Router service for changing route |





**Returns:** [ProfitPortfolioComponent](profitportfoliocomponent.md)

---


## Properties


### «Private» activatedRouter

**●  activatedRouter**:  *`ActivatedRoute`* 

*Defined in [app/components/profit-portfolio/profit-portfolio.component.ts:29](https://github.com/WilliamRADFunk/cryptobot-interface/blob/afbaa0e/src/app/components/profit-portfolio/profit-portfolio.component.ts#L29)*



Angular's ActivatedRoute service for knowing current route




___



###  chart

**●  chart**:  *`Chart`* 

*Defined in [app/components/profit-portfolio/profit-portfolio.component.ts:16](https://github.com/WilliamRADFunk/cryptobot-interface/blob/afbaa0e/src/app/components/profit-portfolio/profit-portfolio.component.ts#L16)*



The main chart object to be constructed whenever new data is returned from the service.




___



###  pathState

**●  pathState**:  *`string`*  = "BTC-USD"

*Defined in [app/components/profit-portfolio/profit-portfolio.component.ts:21](https://github.com/WilliamRADFunk/cryptobot-interface/blob/afbaa0e/src/app/components/profit-portfolio/profit-portfolio.component.ts#L21)*



The initial path state passed in by the activatedRouter. Keeps track of what currency the chart should be viewing.




___



### «Private» router

**●  router**:  *`Router`* 

*Defined in [app/components/profit-portfolio/profit-portfolio.component.ts:30](https://github.com/WilliamRADFunk/cryptobot-interface/blob/afbaa0e/src/app/components/profit-portfolio/profit-portfolio.component.ts#L30)*



Angular's Router service for changing route




___


## Methods


###  ngOnInit

► **ngOnInit**(): `void`



*Defined in [app/components/profit-portfolio/profit-portfolio.component.ts:35](https://github.com/WilliamRADFunk/cryptobot-interface/blob/afbaa0e/src/app/components/profit-portfolio/profit-portfolio.component.ts#L35)*



Triggered when component is loaded, but before it is viewed. Gets REST path info, and updates the profit chart.




**Returns:** `void`





___


