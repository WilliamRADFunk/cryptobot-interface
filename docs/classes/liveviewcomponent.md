[cryptobot-interface](../README.md) > [LiveViewComponent](../classes/liveviewcomponent.md)



# Class: LiveViewComponent

## Implements

* `OnDestroy`
* `OnInit`

## Index

### Constructors

* [constructor](liveviewcomponent.md#markdown-header-constructor)


### Properties

* [activatedRouter](liveviewcomponent.md#markdown-header-private-activatedrouter)
* [busySubscription](liveviewcomponent.md#markdown-header-busysubscription)
* [chart](liveviewcomponent.md#markdown-header-chart)
* [chartDataSubscription](liveviewcomponent.md#markdown-header-chartdatasubscription)
* [chartReady](liveviewcomponent.md#markdown-header-chartready)
* [gdaxDataService](liveviewcomponent.md#markdown-header-private-gdaxdataservice)
* [isBusy](liveviewcomponent.md#markdown-header-isbusy)
* [pathState](liveviewcomponent.md#markdown-header-pathstate)
* [router](liveviewcomponent.md#markdown-header-private-router)
* [urlSubscription](liveviewcomponent.md#markdown-header-urlsubscription)


### Methods

* [ngOnDestroy](liveviewcomponent.md#markdown-header-private-ngondestroy)
* [ngOnInit](liveviewcomponent.md#markdown-header-ngoninit)
* [updateChart](liveviewcomponent.md#markdown-header-updatechart)



---
## Constructors



### ⊕ **new LiveViewComponent**(activatedRouter: *`ActivatedRoute`*, router: *`Router`*, gdaxDataService: *[GdaxDataService](gdaxdataservice.md)*): [LiveViewComponent](liveviewcomponent.md)


*Defined in [app/components/live-view/live-view.component.ts:47](https://github.com/WilliamRADFunk/cryptobot-interface/blob/660a506/src/app/components/live-view/live-view.component.ts#L47)*



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

*Defined in [app/components/live-view/live-view.component.ts:56](https://github.com/WilliamRADFunk/cryptobot-interface/blob/660a506/src/app/components/live-view/live-view.component.ts#L56)*



Angular's ActivatedRoute service for knowing current route




___



###  busySubscription

**●  busySubscription**:  *`Subscription`* 

*Defined in [app/components/live-view/live-view.component.ts:20](https://github.com/WilliamRADFunk/cryptobot-interface/blob/660a506/src/app/components/live-view/live-view.component.ts#L20)*



Makes unsubscribing from this variable possible in OnDestroy




___



###  chart

**●  chart**:  *`Chart`* 

*Defined in [app/components/live-view/live-view.component.ts:25](https://github.com/WilliamRADFunk/cryptobot-interface/blob/660a506/src/app/components/live-view/live-view.component.ts#L25)*



The main chart object to be constructed whenever new data is returned from the service.




___



###  chartDataSubscription

**●  chartDataSubscription**:  *`Subscription`* 

*Defined in [app/components/live-view/live-view.component.ts:29](https://github.com/WilliamRADFunk/cryptobot-interface/blob/660a506/src/app/components/live-view/live-view.component.ts#L29)*



Makes unsubscribing from this variable possible in OnDestroy




___



###  chartReady

**●  chartReady**:  *`boolean`*  = false

*Defined in [app/components/live-view/live-view.component.ts:33](https://github.com/WilliamRADFunk/cryptobot-interface/blob/660a506/src/app/components/live-view/live-view.component.ts#L33)*



Flag to prevent chart compilation until after chart is created.




___



### «Private» gdaxDataService

**●  gdaxDataService**:  *[GdaxDataService](gdaxdataservice.md)* 

*Defined in [app/components/live-view/live-view.component.ts:58](https://github.com/WilliamRADFunk/cryptobot-interface/blob/660a506/src/app/components/live-view/live-view.component.ts#L58)*



Internal service to get queried market data.




___



###  isBusy

**●  isBusy**:  *`boolean`*  = true

*Defined in [app/components/live-view/live-view.component.ts:38](https://github.com/WilliamRADFunk/cryptobot-interface/blob/660a506/src/app/components/live-view/live-view.component.ts#L38)*



Checks with service to see if it's busy in a query, and puts table in standby mode until it's ready.




___



###  pathState

**●  pathState**:  *`string`*  = "BTC-USD"

*Defined in [app/components/live-view/live-view.component.ts:43](https://github.com/WilliamRADFunk/cryptobot-interface/blob/660a506/src/app/components/live-view/live-view.component.ts#L43)*



The initial path state passed in by the activatedRouter. Keeps track of what currency the chart should be viewing.




___



### «Private» router

**●  router**:  *`Router`* 

*Defined in [app/components/live-view/live-view.component.ts:57](https://github.com/WilliamRADFunk/cryptobot-interface/blob/660a506/src/app/components/live-view/live-view.component.ts#L57)*



Angular's Router service for changing route




___



###  urlSubscription

**●  urlSubscription**:  *`Subscription`* 

*Defined in [app/components/live-view/live-view.component.ts:47](https://github.com/WilliamRADFunk/cryptobot-interface/blob/660a506/src/app/components/live-view/live-view.component.ts#L47)*



Makes unsubscribing from this variable possible in OnDestroy




___


## Methods


### «Private» ngOnDestroy

► **ngOnDestroy**(): `void`



*Defined in [app/components/live-view/live-view.component.ts:64](https://github.com/WilliamRADFunk/cryptobot-interface/blob/660a506/src/app/components/live-view/live-view.component.ts#L64)*






**Returns:** `void`





___



###  ngOnInit

► **ngOnInit**(): `void`



*Defined in [app/components/live-view/live-view.component.ts:84](https://github.com/WilliamRADFunk/cryptobot-interface/blob/660a506/src/app/components/live-view/live-view.component.ts#L84)*



Triggered when component is loaded, but before it is viewed. Gets REST path info, and updates the profit chart.




**Returns:** `void`





___



###  updateChart

► **updateChart**(data: *`number`[][]*): `void`



*Defined in [app/components/live-view/live-view.component.ts:102](https://github.com/WilliamRADFunk/cryptobot-interface/blob/660a506/src/app/components/live-view/live-view.component.ts#L102)*



When new data is received, it's passed to this function. Here the chart details assembled, and the chartReady flag is released.


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| data | `number`[][]   |  queried market data passed from the GdaxDataService. |





**Returns:** `void`





___


