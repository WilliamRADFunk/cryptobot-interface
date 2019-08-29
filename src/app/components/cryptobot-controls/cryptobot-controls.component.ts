import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { of } from 'rxjs';
import { Subscription } from 'rxjs/Subscription';
import { catchError, distinctUntilChanged, map } from 'rxjs/operators';
import { Options } from 'ng5-slider';
import { Chart } from 'angular-highcharts';

import { GdaxDataService } from '../../services/gdax-data.service';
import { AutobotControlsService, ProductBookResponse } from '../../services/autobot-controls.service';

export interface CurrencyControl {
  currencyType: string;
  id: string;
  label: string;
  mainOptions?: Options;
  options?: Options;
  mainControl: FormControl;
  secondaryOptions?: Options;
  secondaryControl?: FormControl;
}

export interface MaxBuyPriceControl extends CurrencyControl {
  marketPrice: string;
}

export interface MaxNumberOfScrums extends CurrencyControl {
  currentNumber: number;
}

@Component({
  selector: 'app-cryptobot-controls',
  templateUrl: './cryptobot-controls.component.html',
  styleUrls: ['./cryptobot-controls.component.scss']
})
export class CryptobotControlsComponent implements OnDestroy, OnInit {
  /**
   * Subscriptions to unsubscribe from onDestroy
   */
  private readonly _subs: Subscription[] = [];
  /**
  * The main chart object to be constructed whenever new
  * data is returned from the service.
  */
  public chart: Chart;
  /**
  * Flag to prevent chart compilation until after chart is created.
  */
  public chartReady: boolean = false;
  public readonly maxBuyMoney: CurrencyControl[] = [
    {
      currencyType: 'btc-usd',
      id: 'max-buy-money-btc',
      label: 'BTC',
      options: {
        floor: 0,
        ceil: 500,
        showSelectionBar: true,
        translate: (value: number): string => {
          return '$' + value;
        }
      },
      mainControl: new FormControl(20),
    },
    {
      currencyType: 'ltc-usd',
      id: 'max-buy-money-ltc',
      label: 'LTC',
      options: {
        floor: 0,
        ceil: 500,
        showSelectionBar: true,
        translate: (value: number): string => {
          return '$' + value;
        }
      },
      mainControl: new FormControl(20),
    },
    {
      currencyType: 'eth-usd',
      id: 'max-buy-money-etc',
      label: 'ETC',
      options: {
        floor: 0,
        ceil: 500,
        showSelectionBar: true,
        translate: (value: number): string => {
          return '$' + value;
        }
      },
      mainControl: new FormControl(20),
    }
  ];
  public readonly maxBuyPrices: MaxBuyPriceControl[] = [
    {
      currencyType: 'btc-usd',
      id: 'max-buy-price-btc',
      label: 'BTC',
      marketPrice: 'N/A',
      options: {
        floor: 0,
        ceil: 12000,
        showSelectionBar: true,
        translate: (value: number): string => {
          return '$' + value;
        }
      },
      mainControl: new FormControl(10999),
    },
    {
      currencyType: 'ltc-usd',
      id: 'max-buy-price-ltc',
      label: 'LTC',
      marketPrice: 'N/A',
      options: {
        floor: 0,
        ceil: 135,
        showSelectionBar: true,
        translate: (value: number): string => {
          return '$' + value;
        }
      },
      mainControl: new FormControl(80),
    },
    {
      currencyType: 'eth-usd',
      id: 'max-buy-price-etc',
      label: 'ETC',
      marketPrice: 'N/A',
      options: {
        floor: 0,
        ceil: 330,
        showSelectionBar: true,
        translate: (value: number): string => {
          return '$' + value;
        }
      },
      mainControl: new FormControl(200),
    }
  ];
  public readonly maxNumberOfScrums: MaxNumberOfScrums[] = [
    {
      currentNumber: 0,
      currencyType: 'btc-usd',
      id: 'max-number-of-scrums-btc',
      label: 'BTC',
      options: {
        floor: 0,
        ceil: 10,
        showSelectionBar: true
      },
      mainControl: new FormControl(0),
    },
    {
      currentNumber: 0,
      currencyType: 'ltc-usd',
      id: 'max-number-of-scrums-ltc',
      label: 'LTC',
      options: {
        floor: 0,
        ceil: 10,
        showSelectionBar: true
      },
      mainControl: new FormControl(0),
    },
    {
      currentNumber: 0,
      currencyType: 'eth-usd',
      id: 'max-number-of-scrums-etc',
      label: 'ETC',
      options: {
        floor: 0,
        ceil: 10,
        showSelectionBar: true
      },
      mainControl: new FormControl(0),
    }
  ];
  public readonly profitThreshold: CurrencyControl[] = [
    {
      currencyType: 'btc-usd',
      id: 'profit-threshold-btc',
      label: 'BTC',
      mainOptions: {
        floor: 0,
        ceil: 99,
        showSelectionBar: true,
        step: 1,
        translate: (value: number): string => {
          return '$' + value;
        }
      },
      secondaryOptions: {
        floor: 0.00,
        ceil: 0.99,
        showSelectionBar: true,
        step: 0.01,
        translate: (value: number): string => {
          return '\xA2' + value;
        }
      },
      mainControl: new FormControl(0),
      secondaryControl: new FormControl(0.10),
    },
    {
      currencyType: 'ltc-usd',
      id: 'profit-threshold-ltc',
      label: 'LTC',
      mainOptions: {
        floor: 0,
        ceil: 99,
        showSelectionBar: true,
        step: 1,
        translate: (value: number): string => {
          return '$' + value;
        }
      },
      secondaryOptions: {
        floor: 0.00,
        ceil: 0.99,
        showSelectionBar: true,
        step: 0.01,
        translate: (value: number): string => {
          return '\xA2' + value;
        }
      },
      mainControl: new FormControl(0),
      secondaryControl: new FormControl(0.10),
    },
    {
      currencyType: 'eth-usd',
      id: 'profit-threshold-etc',
      label: 'ETC',
      mainOptions: {
        floor: 0,
        ceil: 99,
        showSelectionBar: true,
        step: 1,
        translate: (value: number): string => {
          return '$' + value;
        }
      },
      secondaryOptions: {
        floor: 0.00,
        ceil: 0.99,
        showSelectionBar: true,
        step: 0.01,
        translate: (value: number): string => {
          return '\xA2' + value;
        }
      },
      mainControl: new FormControl(0),
      secondaryControl: new FormControl(0.10),
    }
  ];
  public readonly activeBots: {currencyType: string; label: string; state: boolean}[] = [
    {
      currencyType: 'btc-usd',
      label: 'BTC',
      state: false
    },
    {
      currencyType: 'ltc-usd',
      label: 'LTC',
      state: false
    },
    {
      currencyType: 'eth-usd',
      label: 'ETH',
      state: false
    }
  ];
  public readonly marketTrends: {currencyType: string; id: string; label: string; previousStates: number[]; state: string}[] = [
    {
      currencyType: 'btc-usd',
      id: 'market-trend-btc',
      label: 'BTC',
      previousStates: [0, 10, 10, 10, 0],
      state: 'Buying'
    },
    {
      currencyType: 'ltc-usd',
      id: 'market-trend-ltc',
      label: 'LTC',
      previousStates: [10, 20, 10, 20, 10],
      state: 'Buying'
    },
    {
      currencyType: 'eth-usd',
      id: 'market-trend-eth',
      previousStates: [10, 10, 10, 10, 10],
      label: 'ETH',
      state: 'Buying'
    }
  ];
  public state: { [key: string]: string; } = {
    marketTrendCurrent: 'btc-usd',
    maxBuyMoneyCurrent: 'btc-usd',
    maxBuyPriceCurrent: 'btc-usd',
    maxNumberOfScrumsCurrent: 'btc-usd',
    profitThresholdCurrent: 'btc-usd',
    usdBalanceCurrent: 'N/A'
  };
  /**
  * Constructor for the CryptobotControlsComponent class.
  * @param gdaxDataService Internal service to get queried market data.
  */
  constructor(
    private readonly autobotControlsService: AutobotControlsService,
    private readonly gdaxDataService: GdaxDataService) { }
  /**
  * Triggered when component is destroyed, but before it's officially dead
  * this runs cleanup functionality to protect against misfired queries.
  */
  ngOnDestroy(): void {
    this._subs.forEach(s => s && s.unsubscribe());
    this._subs.length = 0;
    this.gdaxDataService.kill();
  }
  /**
  * Triggered when component is loaded, but before it is viewed.
  */
  ngOnInit(): void {
    this.gdaxDataService.changeCurrencyType('BTC-USD', 'cryptobot-controls', false);
    this._subs.push(
      this.maxBuyMoney[0].mainControl.valueChanges.subscribe(newVal => {
        if (this.maxBuyMoney[0].mainControl.dirty) {
          console.log(`Changing ${this.maxBuyMoney[0].currencyType} max buy money to`, newVal);
          this.autobotControlsService.setMaxBuyMoney(this.maxBuyMoney[0].currencyType, newVal);
        }
      }),
      this.maxBuyMoney[1].mainControl.valueChanges.subscribe(newVal => {
        if (this.maxBuyMoney[1].mainControl.dirty) {
          console.log(`Changing ${this.maxBuyMoney[1].currencyType} max buy money to`, newVal);
          this.autobotControlsService.setMaxBuyMoney(this.maxBuyMoney[1].currencyType, newVal);
        }
      }),
      this.maxBuyMoney[2].mainControl.valueChanges.subscribe(newVal => {
        if (this.maxBuyMoney[2].mainControl.dirty) {
          console.log(`Changing ${this.maxBuyMoney[2].currencyType} max buy money to`, newVal);
          this.autobotControlsService.setMaxBuyMoney(this.maxBuyMoney[2].currencyType, newVal);
        }
      }),
      this.maxBuyPrices[0].mainControl.valueChanges.subscribe(newVal => {
        if (this.maxBuyPrices[0].mainControl.dirty) {
          console.log(`Changing ${this.maxBuyPrices[0].currencyType} max buy price to`, newVal);
          this.autobotControlsService.setMaxBuyPrice(this.maxBuyPrices[0].currencyType, newVal);
        }
      }),
      this.maxBuyPrices[1].mainControl.valueChanges.subscribe(newVal => {
        if (this.maxBuyPrices[1].mainControl.dirty) {
          console.log(`Changing ${this.maxBuyPrices[1].currencyType} max buy price to`, newVal);
          this.autobotControlsService.setMaxBuyPrice(this.maxBuyPrices[1].currencyType, newVal);
        }
      }),
      this.maxBuyPrices[2].mainControl.valueChanges.subscribe(newVal => {
        if (this.maxBuyPrices[2].mainControl.dirty) {
          console.log(`Changing ${this.maxBuyPrices[2].currencyType} max buy price to`, newVal);
          this.autobotControlsService.setMaxBuyPrice(this.maxBuyPrices[2].currencyType, newVal);
        }
      }),
      this.maxNumberOfScrums[0].mainControl.valueChanges.subscribe(newVal => {
        if (this.maxNumberOfScrums[0].mainControl.dirty) {
          console.log(`Changing ${this.maxNumberOfScrums[0].currencyType} max number of scrums to`, newVal);
          this.autobotControlsService.setMaxNumberOfScrums(this.maxNumberOfScrums[0].currencyType, newVal);
        }
      }),
      this.maxNumberOfScrums[1].mainControl.valueChanges.subscribe(newVal => {
        if (this.maxNumberOfScrums[1].mainControl.dirty) {
          console.log(`Changing ${this.maxNumberOfScrums[1].currencyType} max number of scrums to`, newVal);
          this.autobotControlsService.setMaxNumberOfScrums(this.maxNumberOfScrums[1].currencyType, newVal);
        }
      }),
      this.maxNumberOfScrums[2].mainControl.valueChanges.subscribe(newVal => {
        if (this.maxNumberOfScrums[2].mainControl.dirty) {
          console.log(`Changing ${this.maxNumberOfScrums[2].currencyType} max number of scrums to`, newVal);
          this.autobotControlsService.setMaxNumberOfScrums(this.maxNumberOfScrums[2].currencyType, newVal);
        }
      }),
      this.profitThreshold[0].mainControl.valueChanges.subscribe(newVal => {
        if (this.profitThreshold[0].mainControl.dirty) {
          const convertToFullVal = Math.floor(newVal) + this.profitThreshold[0].secondaryControl.value;
          console.log(`Changing ${this.profitThreshold[0].currencyType} profit threshold to`, convertToFullVal);
          this.autobotControlsService.setProfitThreshold(this.profitThreshold[0].currencyType, convertToFullVal);
        }
      }),
      this.profitThreshold[0].secondaryControl.valueChanges.subscribe(newVal => {
        if (this.profitThreshold[0].secondaryControl.dirty) {
          const convertToFullVal = this.profitThreshold[0].mainControl.value + Number((newVal % 1).toFixed(2));
          console.log(`Changing ${this.profitThreshold[0].currencyType} profit threshold to`, convertToFullVal);
          this.autobotControlsService.setProfitThreshold(this.profitThreshold[0].currencyType, convertToFullVal);
        }
      }),
      this.profitThreshold[1].mainControl.valueChanges.subscribe(newVal => {
        if (this.profitThreshold[1].mainControl.dirty) {
          const convertToFullVal = Math.floor(newVal) + this.profitThreshold[1].secondaryControl.value;
          console.log(`Changing ${this.profitThreshold[1].currencyType} max number of scrums to`, convertToFullVal);
          this.autobotControlsService.setProfitThreshold(this.profitThreshold[1].currencyType, convertToFullVal);
        }
      }),
      this.profitThreshold[1].secondaryControl.valueChanges.subscribe(newVal => {
        if (this.profitThreshold[1].secondaryControl.dirty) {
          const convertToFullVal = this.profitThreshold[1].mainControl.value + Number((newVal % 1).toFixed(2));
          console.log(`Changing ${this.profitThreshold[1].currencyType} max number of scrums to`, convertToFullVal);
          this.autobotControlsService.setProfitThreshold(this.profitThreshold[1].currencyType, convertToFullVal);
        }
      }),
      this.profitThreshold[2].mainControl.valueChanges.subscribe(newVal => {
        if (this.profitThreshold[2].mainControl.dirty) {
          const convertToFullVal = Math.floor(newVal) + this.profitThreshold[2].secondaryControl.value;
          console.log(`Changing ${this.profitThreshold[2].currencyType} max number of scrums to`, convertToFullVal);
          this.autobotControlsService.setProfitThreshold(this.profitThreshold[2].currencyType, convertToFullVal);
        }
      }),
      this.profitThreshold[2].secondaryControl.valueChanges.subscribe(newVal => {
        if (this.profitThreshold[2].secondaryControl.dirty) {
          const convertToFullVal = this.profitThreshold[2].mainControl.value + Number((newVal % 1).toFixed(2));
          console.log(`Changing ${this.profitThreshold[2].currencyType} max number of scrums to`, convertToFullVal);
          this.autobotControlsService.setProfitThreshold(this.profitThreshold[2].currencyType, convertToFullVal);
        }
      }),
      this.autobotControlsService.isBotActive('btc-usd')
        .pipe(
          catchError(err => {
            return of({ isActive: false });
          }),
          distinctUntilChanged((valA, valB) => valA.isActive === valB.isActive))
        .subscribe((data: { isActive: boolean }) => {
          console.log('btc bot active:', data.isActive);
          this.activeBots[0].state = data.isActive || false;
        }),
      this.autobotControlsService.isBotActive('ltc-usd')
        .pipe(
          catchError(err => {
            return of({ isActive: false });
          }),
          distinctUntilChanged((valA, valB) => valA.isActive === valB.isActive))
        .subscribe((data: { isActive: boolean }) => {
          console.log('ltc bot active:', data.isActive);
          this.activeBots[1].state = data.isActive || false;
        }),
      this.autobotControlsService.isBotActive('eth-usd')
        .pipe(
          catchError(err => {
            return of({ isActive: false });
          }),
          distinctUntilChanged((valA, valB) => valA.isActive === valB.isActive))
        .subscribe((data: { isActive: boolean }) => {
          console.log('eth bot active:', data.isActive);
          this.activeBots[2].state = data.isActive || false;
        }),
      this.autobotControlsService.getMarketPriceStream('btc-usd')
        .pipe(
          catchError(err => {
            return of({ sequence: '0', bids: [[ 0, 0, 0 ]], asks: [[ 0, 0, 0 ]]});
          }),
          distinctUntilChanged((valA, valB) => (valA.bids[0] === valB.bids[0]) || (valA.asks[0] === valB.asks[0])))
        .subscribe((data: ProductBookResponse) => {
          const currBuyPrice = Number(data.bids[0][0]);
          const currSellPrice = Number(data.asks[0][0]);
          const avg = (currSellPrice + currBuyPrice) / 2;
          const fixedAvg = avg.toFixed(2);
          // console.log('btc market price', fixedAvg);
          this.maxBuyPrices[0].marketPrice = avg ? fixedAvg : 'N/A';
        }),
      this.autobotControlsService.getMarketPriceStream('ltc-usd')
        .pipe(
          catchError(err => {
            return of({ sequence: '0', bids: [[ 0, 0, 0 ]], asks: [[ 0, 0, 0 ]]});
          }),
          distinctUntilChanged((valA, valB) => (valA.bids[0] === valB.bids[0]) || (valA.asks[0] === valB.asks[0])))
        .subscribe((data: ProductBookResponse) => {
          const currBuyPrice = Number(data.bids[0][0]);
          const currSellPrice = Number(data.asks[0][0]);
          const avg = (currSellPrice + currBuyPrice) / 2;
          const fixedAvg = avg.toFixed(2);
          // console.log('ltc market price', fixedAvg);
          this.maxBuyPrices[1].marketPrice = avg ? fixedAvg : 'N/A';
        }),
      this.autobotControlsService.getMarketPriceStream('eth-usd')
        .pipe(
          catchError(err => {
            return of({ sequence: '0', bids: [[ 0, 0, 0 ]], asks: [[ 0, 0, 0 ]]});
          }),
          distinctUntilChanged((valA, valB) => (valA.bids[0] === valB.bids[0]) || (valA.asks[0] === valB.asks[0])))
        .subscribe((data: ProductBookResponse) => {
          const currBuyPrice = Number(data.bids[0][0]);
          const currSellPrice = Number(data.asks[0][0]);
          const avg = (currSellPrice + currBuyPrice) / 2;
          const fixedAvg = avg.toFixed(2);
          // console.log('eth market price', fixedAvg);
          this.maxBuyPrices[2].marketPrice = avg ? fixedAvg : 'N/A';
        }),
      this.autobotControlsService.getMaxBuyMoneyStream('btc-usd')
        .pipe(distinctUntilChanged((valA, valB) => valA.amount === valB.amount))
        .subscribe((data: { amount: number }) => {
          console.log('btc max spend amount per scrum', data.amount);
          this.maxBuyMoney[0].mainControl.setValue(data.amount, { emitEvent: false });
        }),
      this.autobotControlsService.getMaxBuyMoneyStream('ltc-usd')
        .pipe(distinctUntilChanged((valA, valB) => valA.amount === valB.amount))
        .subscribe((data: { amount: number }) => {
          console.log('ltc max spend amount per scrum', data.amount);
          this.maxBuyMoney[1].mainControl.setValue(data.amount, { emitEvent: false });
        }),
      this.autobotControlsService.getMaxBuyMoneyStream('eth-usd')
        .pipe(distinctUntilChanged((valA, valB) => valA.amount === valB.amount))
        .subscribe((data: { amount: number }) => {
          console.log('eth max spend amount per scrum', data.amount);
          this.maxBuyMoney[2].mainControl.setValue(data.amount, { emitEvent: false });
        }),
      this.autobotControlsService.getMaxBuyPriceStream('btc-usd')
        .pipe(distinctUntilChanged((valA, valB) => valA.price === valB.price))
        .subscribe((data: { price: number }) => {
          console.log('btc max buy price', data.price);
          this.maxBuyPrices[0].mainControl.setValue(data.price, { emitEvent: false });
        }),
      this.autobotControlsService.getMaxBuyPriceStream('ltc-usd')
        .pipe(distinctUntilChanged((valA, valB) => valA.price === valB.price))
        .subscribe((data: { price: number }) => {
          console.log('ltc max buy price', data.price);
          this.maxBuyPrices[1].mainControl.setValue(data.price, { emitEvent: false });
        }),
      this.autobotControlsService.getMaxBuyPriceStream('eth-usd')
        .pipe(distinctUntilChanged((valA, valB) => valA.price === valB.price))
        .subscribe((data: { price: number }) => {
          console.log('eth max buy price', data.price);
          this.maxBuyPrices[2].mainControl.setValue(data.price, { emitEvent: false });
        }),
      this.autobotControlsService.getCurrentNumberOfScrumsStream('btc-usd')
        .pipe(distinctUntilChanged((valA, valB) => valA.scrums === valB.scrums))
        .subscribe((data: { scrums: number }) => {
          console.log('btc current number of scrums', data.scrums);
          this.maxNumberOfScrums[0].currentNumber = data.scrums;
        }),
      this.autobotControlsService.getCurrentNumberOfScrumsStream('ltc-usd')
        .pipe(distinctUntilChanged((valA, valB) => valA.scrums === valB.scrums))
        .subscribe((data: { scrums: number }) => {
          console.log('ltc current number of scrums', data.scrums);
          this.maxNumberOfScrums[1].currentNumber = data.scrums;
        }),
      this.autobotControlsService.getCurrentNumberOfScrumsStream('eth-usd')
        .pipe(distinctUntilChanged((valA, valB) => valA.scrums === valB.scrums))
        .subscribe((data: { scrums: number }) => {
          console.log('eth current number of scrums', data.scrums);
          this.maxNumberOfScrums[2].currentNumber = data.scrums;
        }),
      this.autobotControlsService.getMaxNumberOfScrumsStream('btc-usd')
        .pipe(distinctUntilChanged((valA, valB) => valA.scrums === valB.scrums))
        .subscribe((data: { scrums: number }) => {
          console.log('btc max number of scrums', data.scrums);
          this.maxNumberOfScrums[0].mainControl.setValue(data.scrums, { emitEvent: false });
        }),
      this.autobotControlsService.getMaxNumberOfScrumsStream('ltc-usd')
        .pipe(distinctUntilChanged((valA, valB) => valA.scrums === valB.scrums))
        .subscribe((data: { scrums: number }) => {
          console.log('ltc max number of scrums', data.scrums);
          this.maxNumberOfScrums[1].mainControl.setValue(data.scrums, { emitEvent: false });
        }),
      this.autobotControlsService.getMaxNumberOfScrumsStream('eth-usd')
        .pipe(distinctUntilChanged((valA, valB) => valA.scrums === valB.scrums))
        .subscribe((data: { scrums: number }) => {
          console.log('eth max number of scrums', data.scrums);
          this.maxNumberOfScrums[2].mainControl.setValue(data.scrums, { emitEvent: false });
        }),
      this.autobotControlsService.getProfitThresholdStream('btc-usd')
        .pipe(distinctUntilChanged((valA, valB) => valA.price === valB.price))
        .subscribe((data: { price: number }) => {
          console.log('btc profit threshold', data.price);
          this.profitThreshold[0].mainControl.setValue(data.price, { emitEvent: false });
        }),
      this.autobotControlsService.getProfitThresholdStream('ltc-usd')
        .pipe(distinctUntilChanged((valA, valB) => valA.price === valB.price))
        .subscribe((data: { price: number }) => {
          console.log('ltc profit threshold', data.price);
          this.profitThreshold[1].mainControl.setValue(data.price, { emitEvent: false });
        }),
      this.autobotControlsService.getProfitThresholdStream('eth-usd')
        .pipe(distinctUntilChanged((valA, valB) => valA.price === valB.price))
        .subscribe((data: { price: number }) => {
          console.log('eth profit threshold', data.price);
          this.profitThreshold[2].mainControl.setValue(data.price, { emitEvent: false });
        }),
      this.autobotControlsService.getMarketTrend('btc-usd')
        .pipe(
          catchError(err => {
            return of({ trend: -10 });
          }))
        .subscribe((data: { trend: number }) => {
          console.log('btc market trend', data.trend);
          this.marketTrends[0].state = this._getState(data.trend);
          this.marketTrends[0].previousStates.shift();
          this.marketTrends[0].previousStates.push(data.trend);
          this._updateChart();
        }),
      this.autobotControlsService.getMarketTrend('ltc-usd')
        .pipe(
          catchError(err => {
            return of({ trend: -10 });
          }))
        .subscribe((data: { trend: number }) => {
          console.log('ltc market trend', data.trend);
          this.marketTrends[1].state = this._getState(data.trend);
          this.marketTrends[1].previousStates.shift();
          this.marketTrends[1].previousStates.push(data.trend);
          this._updateChart();
        }),
      this.autobotControlsService.getMarketTrend('eth-usd')
        .pipe(
          catchError(err => {
            return of({ trend: -10 });
          }))
        .subscribe((data: { trend: number }) => {
          console.log('eth market trend', data.trend);
          this.marketTrends[2].state = this._getState(data.trend);
          this.marketTrends[2].previousStates.shift();
          this.marketTrends[2].previousStates.push(data.trend);
          this._updateChart();
        }),
      this.autobotControlsService.getUSDBalanceStream()
        .pipe(
          catchError(err => {
            console.log('getUSDBalanceStream', 'error', err);
            return of({ balance: NaN });
          }),
          distinctUntilChanged((valA, valB) => valA.balance === valB.balance))
        .subscribe((data: { balance: number }) => {
          const amount = Number(data.balance) || NaN;
          console.log('usd balance', amount);
          this.state.usdBalanceCurrent = isNaN(amount) ? 'N/A' : `$${amount.toFixed(2)}`;
        }));
      this._updateChart();
  }

  private _getState(state: number): string {
    switch(state) {
      case 0: {
        return 'Selling';
      }
      case 10: {
        return 'Static';
      }
      case 20: {
        return 'Buying';
      }
    }
  }
  /**
  * When new data is received, it's passed to this function.
  * Here the chart details assembled, and the chartReady flag is released.
  */
  private _updateChart(): void {
    this.chartReady = false;
    this.chart = null;
    const options = {};
    options['chart'] = {
      type: 'line',
      backgroundColor: 'rgb(22, 41, 22)',
      height: '100'
    };
    options['title'] = {
      text: null
    };
    options['credits'] = {
      enabled: false
    };
    options['series'] = [
      {
        animation: false,
        showInLegend: false,
        name: null,
        color: '#8EBA6A',
        data: [],
        visible: true
      },
      {
        animation: false,
        showInLegend: false,
        name: null,
        color: '#8EBA6A',
        data: [],
        visible: false
      },
      {
        animation: false,
        showInLegend: false,
        name: null,
        color: '#8EBA6A',
        data: [],
        visible: false
      }
    ];
    options['tooltip'] = {
      enabled: false
    };
    options['xAxis'] = [{
      className: 'highcharts-color-X',
      labels: {
        enabled: false
      },
      min: 0,
      max: 25,
      showInLegend: false,
      tickLength: 1,
      tickInterval: 5,
      title: {
        text: null
      }
    }];
    options['yAxis'] = {
      className: 'highcharts-color-Y',
      gridLineWidth: 0.5,
      labels: {
        enabled: false
      },
      min: 0,
      max: 20,
      showInLegend: false,
      tickLength: 0,
      tickInterval: 10,
      title: {
        text: null
      }
    };
    const tempChart = new Chart(options);
    const dps1 = [];
    const dps2 = [];
    const dps3 = [];
    const data1 = this.marketTrends[0].previousStates;
    const data2 = this.marketTrends[1].previousStates;
    const data3 = this.marketTrends[2].previousStates;

    for (let i = 0; i < data1.length; i++) {
      const dp11 = {
        value: data1[i],
        x: i * 5,
        y: data1[i],
      };
      dps1.push(dp11);
      const dp12 = {
        value: data1[i],
        x: i * 5 + 5,
        y: data1[i],
      };
      dps1.push(dp12);

      const dp21 = {
        value: data2[i],
        x: i * 5,
        y: data2[i],
      };
      dps2.push(dp21);
      const dp22 = {
        value: data2[i],
        x: i * 5 + 5,
        y: data2[i],
      };
      dps2.push(dp22);

      const dp31 = {
        value: data3[i],
        x: i * 5,
        y: data3[i],
      };
      dps3.push(dp31);
      const dp32 = {
        value: data3[i],
        x: i * 5 + 5,
        y: data3[i],
      };
      dps3.push(dp32);
    }
    dps1.forEach(element => { tempChart.addPoint(element, 0); });
    dps2.forEach(element => { tempChart.addPoint(element, 1); });
    dps3.forEach(element => { tempChart.addPoint(element, 2); });
    this.chart = tempChart;
    this.chartReady = true;
  }

  public calcSalePriceForProfit(currentBuy: number, maxMoney: number, profitThreshold: number): string {
    const actualBuyPrice = Number(currentBuy) - 0.02;
    const buySize = Number((maxMoney / actualBuyPrice).toFixed(6)) + 0.000001;
    let buyBase = Number((buySize * actualBuyPrice).toFixed(2));
    const feeCalulated = Number((0.0025 * buyBase).toFixed(2));
    buyBase += feeCalulated;

    const sellBase = (buyBase + feeCalulated + profitThreshold);
    return isNaN(sellBase) ? 'N/A' : '$' + (sellBase / buySize).toFixed(2);
  }

  public toggleMarketTrend(currency: string) {
    this.state.marketTrendCurrent = currency;
    switch(currency) {
      case 'btc-usd': {
        this.chart.ref.series[0].show();
        this.chart.ref.series[1].hide();
        this.chart.ref.series[2].hide();
        break;
      }
      case 'ltc-usd': {
        this.chart.ref.series[0].hide();
        this.chart.ref.series[1].show();
        this.chart.ref.series[2].hide();
        break;
      }
      case 'eth-usd': {
        this.chart.ref.series[0].hide();
        this.chart.ref.series[1].hide();
        this.chart.ref.series[2].show();
        break;
      }
    }
    console.log(currency, this.state.marketTrendCurrent);
  }

  public toggleMaxBuyMoney(currency: string) {
    this.state.maxBuyMoneyCurrent = currency;
    console.log(currency, this.state.maxBuyMoneyCurrent);
  }

  public toggleMaxBuyPrice(currency: string) {
    this.state.maxBuyPriceCurrent = currency;
    console.log(currency, this.state.maxBuyPriceCurrent);
  }

  public toggleMaxNumberOfScrums(currency: string) {
    this.state.maxNumberOfScrumsCurrent = currency;
    console.log(currency, this.state.maxNumberOfScrumsCurrent);
  }

  public toggleProfitThreshold(currency: string) {
    this.state.profitThresholdCurrent = currency;
    console.log(currency, this.state.profitThresholdCurrent);
  }

  public turnBotOn(currency: string) {
    console.log(`Turning ${currency} autobot on`);
    this.autobotControlsService.startBot(currency);
  }

  public turnBotOff(currency: string) {
    console.log(`Turning ${currency} autobot off`);
    this.autobotControlsService.stopBot(currency);
  }
}
