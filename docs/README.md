


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
* [httpClient](#markdown-header-let-httpclient)
* [require](#markdown-header-const-require)


### Object literals

* [environment](#markdown-header-object-literal-const-environment)
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

*Defined in [app/app-routing.module.ts:9](https://github.com/WilliamRADFunk/cryptobot-interface/blob/f419f2c/src/app/app-routing.module.ts#L9)*





___



### «Const» context

**●  context**:  *`any`*  =  require.context('./', true, /\.spec\.ts$/)

*Defined in [test.ts:18](https://github.com/WilliamRADFunk/cryptobot-interface/blob/f419f2c/src/test.ts#L18)*





___



### «Const» date

**●  date**:  *`Date`*  =  new Date('2018-03-25T03:55:19.336Z')

*Defined in [app/services/gdax-data.service.spec.ts:6](https://github.com/WilliamRADFunk/cryptobot-interface/blob/f419f2c/src/app/services/gdax-data.service.spec.ts#L6)*





___



### «Let» httpClient

**●  httpClient**:  *`any`* 

*Defined in [app/services/gdax-data.service.spec.ts:12](https://github.com/WilliamRADFunk/cryptobot-interface/blob/f419f2c/src/app/services/gdax-data.service.spec.ts#L12)*





___



### «Const» require

**●  require**:  *`any`* 

*Defined in [test.ts:10](https://github.com/WilliamRADFunk/cryptobot-interface/blob/f419f2c/src/test.ts#L10)*





___




## Object literal: environment




###  production

**●  production**:  *`boolean`*  = false

*Defined in [environments/environment.prod.ts:2](https://github.com/WilliamRADFunk/cryptobot-interface/blob/f419f2c/src/environments/environment.prod.ts#L2)*
*Defined in [environments/environment.ts:7](https://github.com/WilliamRADFunk/cryptobot-interface/blob/f419f2c/src/environments/environment.ts#L7)*





___



## Object literal: subscribeReturn




###  subscribe

► **subscribe**(fn: *`any`*): `void`



*Defined in [app/services/gdax-data.service.spec.ts:8](https://github.com/WilliamRADFunk/cryptobot-interface/blob/f419f2c/src/app/services/gdax-data.service.spec.ts#L8)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| fn | `any`   |  - |





**Returns:** `void`





___


