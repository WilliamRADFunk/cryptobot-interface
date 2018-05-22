[cryptobot-interface](../README.md) > [SidePanelComponent](../classes/sidepanelcomponent.md)



# Class: SidePanelComponent

## Implements

* `OnInit`

## Index

### Constructors

* [constructor](sidepanelcomponent.md#markdown-header-constructor)


### Properties

* [gdaxDataService](sidepanelcomponent.md#markdown-header-private-gdaxdataservice)
* [isBusy](sidepanelcomponent.md#markdown-header-isbusy)
* [pathState](sidepanelcomponent.md#markdown-header-pathstate)


### Methods

* [ngOnInit](sidepanelcomponent.md#markdown-header-ngoninit)



---
## Constructors



### ⊕ **new SidePanelComponent**(gdaxDataService: *[GdaxDataService](gdaxdataservice.md)*): [SidePanelComponent](sidepanelcomponent.md)


*Defined in [app/components/side-panel/side-panel.component.ts:22](https://github.com/WilliamRADFunk/cryptobot-interface/blob/9f10186/src/app/components/side-panel/side-panel.component.ts#L22)*



Constructor for the class.


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| gdaxDataService | [GdaxDataService](gdaxdataservice.md)   |  - |





**Returns:** [SidePanelComponent](sidepanelcomponent.md)

---


## Properties


### «Private» gdaxDataService

**●  gdaxDataService**:  *[GdaxDataService](gdaxdataservice.md)* 

*Defined in [app/components/side-panel/side-panel.component.ts:26](https://github.com/WilliamRADFunk/cryptobot-interface/blob/9f10186/src/app/components/side-panel/side-panel.component.ts#L26)*





___



###  isBusy

**●  isBusy**:  *`boolean`*  = true

*Defined in [app/components/side-panel/side-panel.component.ts:22](https://github.com/WilliamRADFunk/cryptobot-interface/blob/9f10186/src/app/components/side-panel/side-panel.component.ts#L22)*



Checks with service to see if it's busy in a query, and disables controls when it is.




___



###  pathState

**●  pathState**:  *`string`*  = "BTC-USD"

*Defined in [app/components/side-panel/side-panel.component.ts:17](https://github.com/WilliamRADFunk/cryptobot-interface/blob/9f10186/src/app/components/side-panel/side-panel.component.ts#L17)*



The initial pathstate passed in by the main view. When these controls trigger a currency view change, and this component is replaced by its counterpart, this bound variable is what is updated to make relevant button 'active'




___


## Methods


###  ngOnInit

► **ngOnInit**(): `void`



*Defined in [app/components/side-panel/side-panel.component.ts:28](https://github.com/WilliamRADFunk/cryptobot-interface/blob/9f10186/src/app/components/side-panel/side-panel.component.ts#L28)*





**Returns:** `void`





___


