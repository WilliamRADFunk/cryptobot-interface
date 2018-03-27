


#  cryptobot-interface

## Index

### Classes

* [AppComponent](classes/appcomponent.md)
* [CryptobotControlsComponent](classes/cryptobotcontrolscomponent.md)
* [FilterControlsComponent](classes/filtercontrolscomponent.md)
* [GdaxDataService](classes/gdaxdataservice.md)
* [LiveViewComponent](classes/liveviewcomponent.md)
* [ProfitPortfolioComponent](classes/profitportfoliocomponent.md)
* [SidePanelComponent](classes/sidepanelcomponent.md)
* [TradingHistoryComponent](classes/tradinghistorycomponent.md)


### Variables

* [appRoutes](#markdown-header-const-approutes)
* [context](#markdown-header-const-context)
* [date](#markdown-header-const-date)
* [date1](#markdown-header-const-date1)
* [date2](#markdown-header-const-date2)
* [gdaxDataService](#markdown-header-let-gdaxdataservice)
* [httpClient](#markdown-header-let-httpclient)
* [require](#markdown-header-const-require)


### Object literals

* [environment](#markdown-header-object-literal-const-environment)
* [shortDate1](#markdown-header-object-literal-const-shortdate1)
* [shortDate2](#markdown-header-object-literal-const-shortdate2)
* [shortTime1](#markdown-header-object-literal-const-shorttime1)
* [shortTime2](#markdown-header-object-literal-const-shorttime2)
* [subscribeReturn](#markdown-header-object-literal-const-subscribereturn)



---
# Variables


### «Const» appRoutes

**●  appRoutes**:  *`Routes`*  =  [
  { path: '', redirectTo: '/live-view/BTC-USD', pathMatch: 'full' },
  { path: 'live-view', children: [
    { path: '', redirectTo: '/live-view/BTC-USD', pathMatch: 'full' },
    { path: 'BTC-USD', component: LiveViewComponent },
    { path: 'LTC-USD', component: LiveViewComponent },
    { path: 'ETH-USD', component: LiveViewComponent },
    { path: 'ALL', component: LiveViewComponent }
  ] },
  { path: 'trading-history', children: [
    { path: '', redirectTo: '/trading-history/BTC-USD', pathMatch: 'full' },
    { path: 'BTC-USD', component: TradingHistoryComponent },
    { path: 'LTC-USD', component: TradingHistoryComponent },
    { path: 'ETH-USD', component: TradingHistoryComponent },
    { path: 'ALL', component: TradingHistoryComponent }
  ] },
  { path: 'profit-portfolio', children: [
    { path: '', redirectTo: '/profit-portfolio/BTC-USD', pathMatch: 'full' },
    { path: 'BTC-USD', component: ProfitPortfolioComponent },
    { path: 'LTC-USD', component: ProfitPortfolioComponent },
    { path: 'ETH-USD', component: ProfitPortfolioComponent },
    { path: 'ALL', component: ProfitPortfolioComponent }
  ] },
  { path: 'cryptobot-controls', children: [
    { path: '', redirectTo: '/cryptobot-controls/BTC-USD', pathMatch: 'full' },
    { path: 'BTC-USD', component: CryptobotControlsComponent },
    { path: 'LTC-USD', component: CryptobotControlsComponent },
    { path: 'ETH-USD', component: CryptobotControlsComponent },
    { path: 'ALL', component: CryptobotControlsComponent }
  ] }
]

*Defined in [app/app-routing.module.ts:9](https://github.com/WilliamRADFunk/cryptobot-interface/blob/afbaa0e/src/app/app-routing.module.ts#L9)*





___



### «Const» context

**●  context**:  *`any`*  =  require.context('./', true, /\.spec\.ts$/)

*Defined in [test.ts:18](https://github.com/WilliamRADFunk/cryptobot-interface/blob/afbaa0e/src/test.ts#L18)*





___



### «Const» date

**●  date**:  *`Date`*  =  new Date('2018-03-25T03:55:19.336Z')

*Defined in [app/services/gdax-data.service.spec.ts:6](https://github.com/WilliamRADFunk/cryptobot-interface/blob/afbaa0e/src/app/services/gdax-data.service.spec.ts#L6)*





___



### «Const» date1

**●  date1**:  *`Date`*  =  new Date('2018-03-25T03:55:00.000Z')

*Defined in [app/components/filter-controls/filter-controls.component.spec.ts:12](https://github.com/WilliamRADFunk/cryptobot-interface/blob/afbaa0e/src/app/components/filter-controls/filter-controls.component.spec.ts#L12)*





___



### «Const» date2

**●  date2**:  *`Date`*  =  new Date('2018-03-26T03:55:00.000Z')

*Defined in [app/components/filter-controls/filter-controls.component.spec.ts:13](https://github.com/WilliamRADFunk/cryptobot-interface/blob/afbaa0e/src/app/components/filter-controls/filter-controls.component.spec.ts#L13)*





___



### «Let» gdaxDataService

**●  gdaxDataService**:  *`any`* 

*Defined in [app/components/filter-controls/filter-controls.component.spec.ts:11](https://github.com/WilliamRADFunk/cryptobot-interface/blob/afbaa0e/src/app/components/filter-controls/filter-controls.component.spec.ts#L11)*
*Defined in [app/components/live-view/live-view.component.spec.ts:11](https://github.com/WilliamRADFunk/cryptobot-interface/blob/afbaa0e/src/app/components/live-view/live-view.component.spec.ts#L11)*





___



### «Let» httpClient

**●  httpClient**:  *`any`* 

*Defined in [app/services/gdax-data.service.spec.ts:12](https://github.com/WilliamRADFunk/cryptobot-interface/blob/afbaa0e/src/app/services/gdax-data.service.spec.ts#L12)*





___



### «Const» require

**●  require**:  *`any`* 

*Defined in [test.ts:10](https://github.com/WilliamRADFunk/cryptobot-interface/blob/afbaa0e/src/test.ts#L10)*





___




## Object literal: environment




###  production

**●  production**:  *`boolean`*  = false

*Defined in [environments/environment.prod.ts:2](https://github.com/WilliamRADFunk/cryptobot-interface/blob/afbaa0e/src/environments/environment.prod.ts#L2)*
*Defined in [environments/environment.ts:7](https://github.com/WilliamRADFunk/cryptobot-interface/blob/afbaa0e/src/environments/environment.ts#L7)*





___



## Object literal: shortDate1




###  day

**●  day**:  *`number`*  =  date1.getDate()

*Defined in [app/components/filter-controls/filter-controls.component.spec.ts:17](https://github.com/WilliamRADFunk/cryptobot-interface/blob/afbaa0e/src/app/components/filter-controls/filter-controls.component.spec.ts#L17)*





___


###  month

**●  month**:  *`number`*  =  date1.getMonth() + 1

*Defined in [app/components/filter-controls/filter-controls.component.spec.ts:16](https://github.com/WilliamRADFunk/cryptobot-interface/blob/afbaa0e/src/app/components/filter-controls/filter-controls.component.spec.ts#L16)*





___


###  year

**●  year**:  *`number`*  =  date1.getFullYear()

*Defined in [app/components/filter-controls/filter-controls.component.spec.ts:15](https://github.com/WilliamRADFunk/cryptobot-interface/blob/afbaa0e/src/app/components/filter-controls/filter-controls.component.spec.ts#L15)*





___



## Object literal: shortDate2




###  day

**●  day**:  *`number`*  =  date2.getDate()

*Defined in [app/components/filter-controls/filter-controls.component.spec.ts:26](https://github.com/WilliamRADFunk/cryptobot-interface/blob/afbaa0e/src/app/components/filter-controls/filter-controls.component.spec.ts#L26)*





___


###  month

**●  month**:  *`number`*  =  date2.getMonth() + 1

*Defined in [app/components/filter-controls/filter-controls.component.spec.ts:25](https://github.com/WilliamRADFunk/cryptobot-interface/blob/afbaa0e/src/app/components/filter-controls/filter-controls.component.spec.ts#L25)*





___


###  year

**●  year**:  *`number`*  =  date2.getFullYear()

*Defined in [app/components/filter-controls/filter-controls.component.spec.ts:24](https://github.com/WilliamRADFunk/cryptobot-interface/blob/afbaa0e/src/app/components/filter-controls/filter-controls.component.spec.ts#L24)*





___



## Object literal: shortTime1




###  hour

**●  hour**:  *`number`*  =  date1.getHours()

*Defined in [app/components/filter-controls/filter-controls.component.spec.ts:20](https://github.com/WilliamRADFunk/cryptobot-interface/blob/afbaa0e/src/app/components/filter-controls/filter-controls.component.spec.ts#L20)*





___


###  minute

**●  minute**:  *`number`*  =  date1.getMinutes()

*Defined in [app/components/filter-controls/filter-controls.component.spec.ts:21](https://github.com/WilliamRADFunk/cryptobot-interface/blob/afbaa0e/src/app/components/filter-controls/filter-controls.component.spec.ts#L21)*





___



## Object literal: shortTime2




###  hour

**●  hour**:  *`number`*  =  date2.getHours()

*Defined in [app/components/filter-controls/filter-controls.component.spec.ts:29](https://github.com/WilliamRADFunk/cryptobot-interface/blob/afbaa0e/src/app/components/filter-controls/filter-controls.component.spec.ts#L29)*





___


###  minute

**●  minute**:  *`number`*  =  date2.getMinutes()

*Defined in [app/components/filter-controls/filter-controls.component.spec.ts:30](https://github.com/WilliamRADFunk/cryptobot-interface/blob/afbaa0e/src/app/components/filter-controls/filter-controls.component.spec.ts#L30)*





___



## Object literal: subscribeReturn




###  subscribe

► **subscribe**(fn: *`any`*): `void`



*Defined in [app/services/gdax-data.service.spec.ts:8](https://github.com/WilliamRADFunk/cryptobot-interface/blob/afbaa0e/src/app/services/gdax-data.service.spec.ts#L8)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| fn | `any`   |  - |





**Returns:** `void`





___


