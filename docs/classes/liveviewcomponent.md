[cryptobot-interface](../README.md) > [LiveViewComponent](../classes/liveviewcomponent.md)



# Class: LiveViewComponent

## Implements

* `OnInit`

## Index

### Constructors

* [constructor](liveviewcomponent.md#markdown-header-constructor)


### Properties

* [activatedRouter](liveviewcomponent.md#markdown-header-private-activatedrouter)
* [chart](liveviewcomponent.md#markdown-header-chart)
* [chartReady](liveviewcomponent.md#markdown-header-chartready)
* [gdaxDataService](liveviewcomponent.md#markdown-header-private-gdaxdataservice)
* [pathState](liveviewcomponent.md#markdown-header-pathstate)
* [router](liveviewcomponent.md#markdown-header-private-router)


### Methods

* [ngOnInit](liveviewcomponent.md#markdown-header-ngoninit)
* [updateChart](liveviewcomponent.md#markdown-header-updatechart)



---
## Constructors



### ⊕ **new LiveViewComponent**(activatedRouter: *`ActivatedRoute`*, router: *`Router`*, gdaxDataService: *[GdaxDataService](gdaxdataservice.md)*): [LiveViewComponent](liveviewcomponent.md)


*Defined in [app/components/live-view/live-view.component.ts:29](https://github.com/WilliamRADFunk/cryptobot-interface/blob/e137f0d/src/app/components/live-view/live-view.component.ts#L29)*



Constructor for the class. Injects Angular's ActivatedRoute, Router, and GdaxDataService services


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| activatedRouter | `ActivatedRoute`   |  Angular's ActivatedRoute service for knowing current route |
| router | `Router`   |  Angular's Router service for changing route |
| gdaxDataService | [GdaxDataService](gdaxdataservice.md)   |  Internal service to get queried market data. |





**Returns:** [LiveViewComponent](liveviewcomponent.md)

---


## Properties


### «Private» activatedRouter

**●  activatedRouter**:  *`ActivatedRoute`* 

*Defined in [app/components/live-view/live-view.component.ts:38](https://github.com/WilliamRADFunk/cryptobot-interface/blob/e137f0d/src/app/components/live-view/live-view.component.ts#L38)*



Angular's ActivatedRoute service for knowing current route




___



###  chart

**●  chart**:  *`Chart`* 

*Defined in [app/components/live-view/live-view.component.ts:20](https://github.com/WilliamRADFunk/cryptobot-interface/blob/e137f0d/src/app/components/live-view/live-view.component.ts#L20)*



The main chart object to be constructed whenever new data is returned from the service.




___



###  chartReady

**●  chartReady**:  *`boolean`*  = false

*Defined in [app/components/live-view/live-view.component.ts:24](https://github.com/WilliamRADFunk/cryptobot-interface/blob/e137f0d/src/app/components/live-view/live-view.component.ts#L24)*



Flag to prevent chart compilation until after chart is created.




___



### «Private» gdaxDataService

**●  gdaxDataService**:  *[GdaxDataService](gdaxdataservice.md)* 

*Defined in [app/components/live-view/live-view.component.ts:40](https://github.com/WilliamRADFunk/cryptobot-interface/blob/e137f0d/src/app/components/live-view/live-view.component.ts#L40)*



Internal service to get queried market data.




___



###  pathState

**●  pathState**:  *`string`*  = "BTC-USD"

*Defined in [app/components/live-view/live-view.component.ts:29](https://github.com/WilliamRADFunk/cryptobot-interface/blob/e137f0d/src/app/components/live-view/live-view.component.ts#L29)*



The initial path state passed in by the activatedRouter. Keeps track of what currency the chart should be viewing.




___



### «Private» router

**●  router**:  *`Router`* 

*Defined in [app/components/live-view/live-view.component.ts:39](https://github.com/WilliamRADFunk/cryptobot-interface/blob/e137f0d/src/app/components/live-view/live-view.component.ts#L39)*



Angular's Router service for changing route




___


## Methods


###  ngOnInit

► **ngOnInit**(): `void`



*Defined in [app/components/live-view/live-view.component.ts:45](https://github.com/WilliamRADFunk/cryptobot-interface/blob/e137f0d/src/app/components/live-view/live-view.component.ts#L45)*



Triggered when component is loaded, but before it is viewed. Gets REST path info, and updates the profit chart.




**Returns:** `void`





___



###  updateChart

► **updateChart**(data: *`number`[][]*): `void`



*Defined in [app/components/live-view/live-view.component.ts:59](https://github.com/WilliamRADFunk/cryptobot-interface/blob/e137f0d/src/app/components/live-view/live-view.component.ts#L59)*



When new data is received, it's passed to this function. Here the chart details assembled, and the chartReady flag is released.


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| data | `number`[][]   |  queried market data passed from the GdaxDataService. |





**Returns:** `void`





___


