[cryptobot-interface](../README.md) > [GdaxDataService](../classes/gdaxdataservice.md)



# Class: GdaxDataService

## Index

### Constructors

* [constructor](gdaxdataservice.md#markdown-header-constructor)


### Properties

* [chartData](gdaxdataservice.md#markdown-header-chartdata)
* [currency](gdaxdataservice.md#markdown-header-currency)
* [endDate](gdaxdataservice.md#markdown-header-enddate)
* [http](gdaxdataservice.md#markdown-header-private-http)
* [interval](gdaxdataservice.md#markdown-header-interval)
* [startDate](gdaxdataservice.md#markdown-header-startdate)


### Methods

* [changeCurrencyType](gdaxdataservice.md#markdown-header-changecurrencytype)
* [changeEndDateTime](gdaxdataservice.md#markdown-header-changeenddatetime)
* [changeStartDateTime](gdaxdataservice.md#markdown-header-changestartdatetime)
* [changeTimeInterval](gdaxdataservice.md#markdown-header-changetimeinterval)
* [getLatestGdaxData](gdaxdataservice.md#markdown-header-getlatestgdaxdata)



---
## Constructors



### ⊕ **new GdaxDataService**(http: *`HttpClient`*): [GdaxDataService](gdaxdataservice.md)


*Defined in [app/services/gdax-data.service.ts:27](https://github.com/WilliamRADFunk/cryptobot-interface/blob/a24c33f/src/app/services/gdax-data.service.ts#L27)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| http | `HttpClient`   |  - |





**Returns:** [GdaxDataService](gdaxdataservice.md)

---


## Properties


###  chartData

**●  chartData**:  *`BehaviorSubject`.<`number`[][]>*  =  new BehaviorSubject<number[][]>([])

*Defined in [app/services/gdax-data.service.ts:11](https://github.com/WilliamRADFunk/cryptobot-interface/blob/a24c33f/src/app/services/gdax-data.service.ts#L11)*





___



###  currency

**●  currency**:  *`string`*  = "BTC-USD"

*Defined in [app/services/gdax-data.service.ts:15](https://github.com/WilliamRADFunk/cryptobot-interface/blob/a24c33f/src/app/services/gdax-data.service.ts#L15)*





___



###  endDate

**●  endDate**:  *`Date`*  =  new Date()

*Defined in [app/services/gdax-data.service.ts:19](https://github.com/WilliamRADFunk/cryptobot-interface/blob/a24c33f/src/app/services/gdax-data.service.ts#L19)*





___



### «Private» http

**●  http**:  *`HttpClient`* 

*Defined in [app/services/gdax-data.service.ts:33](https://github.com/WilliamRADFunk/cryptobot-interface/blob/a24c33f/src/app/services/gdax-data.service.ts#L33)*





___



###  interval

**●  interval**:  *`number`*  = 3600

*Defined in [app/services/gdax-data.service.ts:23](https://github.com/WilliamRADFunk/cryptobot-interface/blob/a24c33f/src/app/services/gdax-data.service.ts#L23)*





___



###  startDate

**●  startDate**:  *`Date`*  =  new Date(this.endDate.getTime() - 86400000)

*Defined in [app/services/gdax-data.service.ts:27](https://github.com/WilliamRADFunk/cryptobot-interface/blob/a24c33f/src/app/services/gdax-data.service.ts#L27)*





___


## Methods


###  changeCurrencyType

► **changeCurrencyType**(currency: *`string`*): `void`



*Defined in [app/services/gdax-data.service.ts:38](https://github.com/WilliamRADFunk/cryptobot-interface/blob/a24c33f/src/app/services/gdax-data.service.ts#L38)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| currency | `string`   |  - |





**Returns:** `void`





___



###  changeEndDateTime

► **changeEndDateTime**(date: *`Date`*): `void`



*Defined in [app/services/gdax-data.service.ts:48](https://github.com/WilliamRADFunk/cryptobot-interface/blob/a24c33f/src/app/services/gdax-data.service.ts#L48)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| date | `Date`   |  - |





**Returns:** `void`





___



###  changeStartDateTime

► **changeStartDateTime**(date: *`Date`*): `void`



*Defined in [app/services/gdax-data.service.ts:58](https://github.com/WilliamRADFunk/cryptobot-interface/blob/a24c33f/src/app/services/gdax-data.service.ts#L58)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| date | `Date`   |  - |





**Returns:** `void`





___



###  changeTimeInterval

► **changeTimeInterval**(interval: *`number`*): `void`



*Defined in [app/services/gdax-data.service.ts:69](https://github.com/WilliamRADFunk/cryptobot-interface/blob/a24c33f/src/app/services/gdax-data.service.ts#L69)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| interval | `number`   |  - |





**Returns:** `void`





___



###  getLatestGdaxData

► **getLatestGdaxData**(): `Observable`.<`any`>



*Defined in [app/services/gdax-data.service.ts:79](https://github.com/WilliamRADFunk/cryptobot-interface/blob/a24c33f/src/app/services/gdax-data.service.ts#L79)*





**Returns:** `Observable`.<`any`>





___


