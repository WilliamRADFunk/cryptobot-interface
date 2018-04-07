


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
* [reallyOldDate](#markdown-header-const-reallyolddate)
* [require](#markdown-header-const-require)


### Object literals

* [environment](#markdown-header-object-literal-const-environment)
* [shortDate1](#markdown-header-object-literal-let-shortdate1)
* [shortDate2](#markdown-header-object-literal-let-shortdate2)
* [shortDate3](#markdown-header-object-literal-const-shortdate3)
* [shortTime1](#markdown-header-object-literal-let-shorttime1)
* [shortTime2](#markdown-header-object-literal-let-shorttime2)
* [shortTime3](#markdown-header-object-literal-const-shorttime3)
* [subscribeReturn1](#markdown-header-object-literal-const-subscribereturn1)
* [subscribeReturn2](#markdown-header-object-literal-const-subscribereturn2)



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

*Defined in [app/app-routing.module.ts:9](https://github.com/WilliamRADFunk/cryptobot-interface/blob/1ce3fc7/src/app/app-routing.module.ts#L9)*





___



### «Const» context

**●  context**:  *`any`*  =  require.context('./', true, /\.spec\.ts$/)

*Defined in [test.ts:18](https://github.com/WilliamRADFunk/cryptobot-interface/blob/1ce3fc7/src/test.ts#L18)*





___



### «Const» date

**●  date**:  *`Date`*  =  new Date('2018-03-25T03:55:19.336Z')

*Defined in [app/services/gdax-data.service.spec.ts:6](https://github.com/WilliamRADFunk/cryptobot-interface/blob/1ce3fc7/src/app/services/gdax-data.service.spec.ts#L6)*





___



### «Const» date1

**●  date1**:  *`Date`*  =  new Date('2018-03-25T03:55:00.000Z')

*Defined in [app/components/filter-controls/filter-controls.component.spec.ts:12](https://github.com/WilliamRADFunk/cryptobot-interface/blob/1ce3fc7/src/app/components/filter-controls/filter-controls.component.spec.ts#L12)*





___



### «Const» date2

**●  date2**:  *`Date`*  =  new Date('2018-03-26T03:55:00.000Z')

*Defined in [app/components/filter-controls/filter-controls.component.spec.ts:13](https://github.com/WilliamRADFunk/cryptobot-interface/blob/1ce3fc7/src/app/components/filter-controls/filter-controls.component.spec.ts#L13)*





___



### «Let» gdaxDataService

**●  gdaxDataService**:  *`any`* 

*Defined in [app/components/cryptobot-controls/cryptobot-controls.component.spec.ts:11](https://github.com/WilliamRADFunk/cryptobot-interface/blob/1ce3fc7/src/app/components/cryptobot-controls/cryptobot-controls.component.spec.ts#L11)*
*Defined in [app/components/filter-controls/filter-controls.component.spec.ts:11](https://github.com/WilliamRADFunk/cryptobot-interface/blob/1ce3fc7/src/app/components/filter-controls/filter-controls.component.spec.ts#L11)*
*Defined in [app/components/live-view/live-view.component.spec.ts:11](https://github.com/WilliamRADFunk/cryptobot-interface/blob/1ce3fc7/src/app/components/live-view/live-view.component.spec.ts#L11)*
*Defined in [app/components/profit-portfolio/profit-portfolio.component.spec.ts:11](https://github.com/WilliamRADFunk/cryptobot-interface/blob/1ce3fc7/src/app/components/profit-portfolio/profit-portfolio.component.spec.ts#L11)*
*Defined in [app/components/trading-history/trading-history.component.spec.ts:11](https://github.com/WilliamRADFunk/cryptobot-interface/blob/1ce3fc7/src/app/components/trading-history/trading-history.component.spec.ts#L11)*





___



### «Let» httpClient

**●  httpClient**:  *`any`* 

*Defined in [app/services/gdax-data.service.spec.ts:22](https://github.com/WilliamRADFunk/cryptobot-interface/blob/1ce3fc7/src/app/services/gdax-data.service.spec.ts#L22)*





___



### «Const» reallyOldDate

**●  reallyOldDate**:  *`Date`*  =  new Date(
  new Date('2018-03-26T03:55:00.000Z').getTime()
  - 25833600000)

*Defined in [app/components/filter-controls/filter-controls.component.spec.ts:14](https://github.com/WilliamRADFunk/cryptobot-interface/blob/1ce3fc7/src/app/components/filter-controls/filter-controls.component.spec.ts#L14)*





___



### «Const» require

**●  require**:  *`any`* 

*Defined in [test.ts:10](https://github.com/WilliamRADFunk/cryptobot-interface/blob/1ce3fc7/src/test.ts#L10)*





___




## Object literal: environment




###  production

**●  production**:  *`boolean`*  = false

*Defined in [environments/environment.prod.ts:2](https://github.com/WilliamRADFunk/cryptobot-interface/blob/1ce3fc7/src/environments/environment.prod.ts#L2)*
*Defined in [environments/environment.ts:7](https://github.com/WilliamRADFunk/cryptobot-interface/blob/1ce3fc7/src/environments/environment.ts#L7)*





___



## Object literal: shortDate1




###  day

**●  day**:  *`null`*  =  null

*Defined in [app/components/filter-controls/filter-controls.component.spec.ts:20](https://github.com/WilliamRADFunk/cryptobot-interface/blob/1ce3fc7/src/app/components/filter-controls/filter-controls.component.spec.ts#L20)*





___


###  month

**●  month**:  *`null`*  =  null

*Defined in [app/components/filter-controls/filter-controls.component.spec.ts:19](https://github.com/WilliamRADFunk/cryptobot-interface/blob/1ce3fc7/src/app/components/filter-controls/filter-controls.component.spec.ts#L19)*





___


###  year

**●  year**:  *`null`*  =  null

*Defined in [app/components/filter-controls/filter-controls.component.spec.ts:18](https://github.com/WilliamRADFunk/cryptobot-interface/blob/1ce3fc7/src/app/components/filter-controls/filter-controls.component.spec.ts#L18)*





___



## Object literal: shortDate2




###  day

**●  day**:  *`null`*  =  null

*Defined in [app/components/filter-controls/filter-controls.component.spec.ts:38](https://github.com/WilliamRADFunk/cryptobot-interface/blob/1ce3fc7/src/app/components/filter-controls/filter-controls.component.spec.ts#L38)*





___


###  month

**●  month**:  *`null`*  =  null

*Defined in [app/components/filter-controls/filter-controls.component.spec.ts:37](https://github.com/WilliamRADFunk/cryptobot-interface/blob/1ce3fc7/src/app/components/filter-controls/filter-controls.component.spec.ts#L37)*





___


###  year

**●  year**:  *`null`*  =  null

*Defined in [app/components/filter-controls/filter-controls.component.spec.ts:36](https://github.com/WilliamRADFunk/cryptobot-interface/blob/1ce3fc7/src/app/components/filter-controls/filter-controls.component.spec.ts#L36)*





___



## Object literal: shortDate3




###  day

**●  day**:  *`number`*  =  reallyOldDate.getDate()

*Defined in [app/components/filter-controls/filter-controls.component.spec.ts:56](https://github.com/WilliamRADFunk/cryptobot-interface/blob/1ce3fc7/src/app/components/filter-controls/filter-controls.component.spec.ts#L56)*





___


###  month

**●  month**:  *`number`*  =  reallyOldDate.getMonth() + 1

*Defined in [app/components/filter-controls/filter-controls.component.spec.ts:55](https://github.com/WilliamRADFunk/cryptobot-interface/blob/1ce3fc7/src/app/components/filter-controls/filter-controls.component.spec.ts#L55)*





___


###  year

**●  year**:  *`number`*  =  reallyOldDate.getFullYear()

*Defined in [app/components/filter-controls/filter-controls.component.spec.ts:54](https://github.com/WilliamRADFunk/cryptobot-interface/blob/1ce3fc7/src/app/components/filter-controls/filter-controls.component.spec.ts#L54)*





___



## Object literal: shortTime1




###  hour

**●  hour**:  *`null`*  =  null

*Defined in [app/components/filter-controls/filter-controls.component.spec.ts:28](https://github.com/WilliamRADFunk/cryptobot-interface/blob/1ce3fc7/src/app/components/filter-controls/filter-controls.component.spec.ts#L28)*





___


###  minute

**●  minute**:  *`null`*  =  null

*Defined in [app/components/filter-controls/filter-controls.component.spec.ts:29](https://github.com/WilliamRADFunk/cryptobot-interface/blob/1ce3fc7/src/app/components/filter-controls/filter-controls.component.spec.ts#L29)*





___



## Object literal: shortTime2




###  hour

**●  hour**:  *`null`*  =  null

*Defined in [app/components/filter-controls/filter-controls.component.spec.ts:46](https://github.com/WilliamRADFunk/cryptobot-interface/blob/1ce3fc7/src/app/components/filter-controls/filter-controls.component.spec.ts#L46)*





___


###  minute

**●  minute**:  *`null`*  =  null

*Defined in [app/components/filter-controls/filter-controls.component.spec.ts:47](https://github.com/WilliamRADFunk/cryptobot-interface/blob/1ce3fc7/src/app/components/filter-controls/filter-controls.component.spec.ts#L47)*





___



## Object literal: shortTime3




###  hour

**●  hour**:  *`number`*  =  reallyOldDate.getHours()

*Defined in [app/components/filter-controls/filter-controls.component.spec.ts:59](https://github.com/WilliamRADFunk/cryptobot-interface/blob/1ce3fc7/src/app/components/filter-controls/filter-controls.component.spec.ts#L59)*





___


###  minute

**●  minute**:  *`number`*  =  reallyOldDate.getMinutes()

*Defined in [app/components/filter-controls/filter-controls.component.spec.ts:60](https://github.com/WilliamRADFunk/cryptobot-interface/blob/1ce3fc7/src/app/components/filter-controls/filter-controls.component.spec.ts#L60)*





___



## Object literal: subscribeReturn1




###  subscribe

► **subscribe**(fn: *`any`*): `void`



*Defined in [app/services/gdax-data.service.spec.ts:8](https://github.com/WilliamRADFunk/cryptobot-interface/blob/1ce3fc7/src/app/services/gdax-data.service.spec.ts#L8)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| fn | `any`   |  - |





**Returns:** `void`





___



## Object literal: subscribeReturn2




###  subscribe

► **subscribe**(fn: *`any`*): `void`



*Defined in [app/services/gdax-data.service.spec.ts:13](https://github.com/WilliamRADFunk/cryptobot-interface/blob/1ce3fc7/src/app/services/gdax-data.service.spec.ts#L13)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| fn | `any`   |  - |





**Returns:** `void`





___


