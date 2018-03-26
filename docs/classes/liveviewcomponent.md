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


*Defined in [app/components/live-view/live-view.component.ts:18](https://github.com/WilliamRADFunk/cryptobot-interface/blob/4204bce/src/app/components/live-view/live-view.component.ts#L18)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| activatedRouter | `ActivatedRoute`   |  - |
| router | `Router`   |  - |
| gdaxDataService | [GdaxDataService](gdaxdataservice.md)   |  - |





**Returns:** [LiveViewComponent](liveviewcomponent.md)

---


## Properties


### «Private» activatedRouter

**●  activatedRouter**:  *`ActivatedRoute`* 

*Defined in [app/components/live-view/live-view.component.ts:21](https://github.com/WilliamRADFunk/cryptobot-interface/blob/4204bce/src/app/components/live-view/live-view.component.ts#L21)*





___



###  chart

**●  chart**:  *`Chart`* 

*Defined in [app/components/live-view/live-view.component.ts:16](https://github.com/WilliamRADFunk/cryptobot-interface/blob/4204bce/src/app/components/live-view/live-view.component.ts#L16)*





___



###  chartReady

**●  chartReady**:  *`boolean`*  = false

*Defined in [app/components/live-view/live-view.component.ts:17](https://github.com/WilliamRADFunk/cryptobot-interface/blob/4204bce/src/app/components/live-view/live-view.component.ts#L17)*





___



### «Private» gdaxDataService

**●  gdaxDataService**:  *[GdaxDataService](gdaxdataservice.md)* 

*Defined in [app/components/live-view/live-view.component.ts:23](https://github.com/WilliamRADFunk/cryptobot-interface/blob/4204bce/src/app/components/live-view/live-view.component.ts#L23)*





___



###  pathState

**●  pathState**:  *`string`*  = "BTC-USD"

*Defined in [app/components/live-view/live-view.component.ts:18](https://github.com/WilliamRADFunk/cryptobot-interface/blob/4204bce/src/app/components/live-view/live-view.component.ts#L18)*





___



### «Private» router

**●  router**:  *`Router`* 

*Defined in [app/components/live-view/live-view.component.ts:22](https://github.com/WilliamRADFunk/cryptobot-interface/blob/4204bce/src/app/components/live-view/live-view.component.ts#L22)*





___


## Methods


###  ngOnInit

► **ngOnInit**(): `void`



*Defined in [app/components/live-view/live-view.component.ts:25](https://github.com/WilliamRADFunk/cryptobot-interface/blob/4204bce/src/app/components/live-view/live-view.component.ts#L25)*





**Returns:** `void`





___



###  updateChart

► **updateChart**(data: *`number`[][]*): `void`



*Defined in [app/components/live-view/live-view.component.ts:35](https://github.com/WilliamRADFunk/cryptobot-interface/blob/4204bce/src/app/components/live-view/live-view.component.ts#L35)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| data | `number`[][]   |  - |





**Returns:** `void`





___


