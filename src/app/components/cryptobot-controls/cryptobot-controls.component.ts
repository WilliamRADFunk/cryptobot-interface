import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { of } from 'rxjs';
import { Subscription } from 'rxjs/Subscription';
import { catchError, distinctUntilChanged, filter } from 'rxjs/operators';
import { Options } from 'ng5-slider';
import { Chart } from 'angular-highcharts';

import { GdaxDataService } from '../../services/gdax-data.service';
import {
  AutobotControlsService,
  ControlStates,
  ProductBookResponse,
  TraderStates } from '../../services/autobot-controls.service';

export interface Control {
  currencyType: string;
  id: string;
  label: string;
  mainOptions?: Options;
  options?: Options;
  mainControl: FormControl;
  secondaryOptions?: Options;
  secondaryControl?: FormControl;
}

export interface MaxBuyPriceControl extends Control {
  marketPrice: string;
}

export interface CurrentNumberControl extends Control {
  currentNumber: number;
}

export interface ScrumControl extends CurrentNumberControl {
  currentBuys: string;
  currentSells: string;
  currentOthers: string;
}

@Component({
  selector: 'app-cryptobot-controls',
  templateUrl: './cryptobot-controls.component.html',
  styleUrls: ['./cryptobot-controls.component.scss']
})
export class CryptobotControlsComponent implements OnDestroy, OnInit {
  private _controlState: ControlStates;
  private _trendState: TraderStates;
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
  public logs: string = 'Doug was here.\nDoug was here.\nDoug was here.\nDoug was here.\nDoug was here.\nDoug was here.';
  public readonly maxBuyMoney: Control[] = [
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
      mainControl: new FormControl(0),
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
      mainControl: new FormControl(0),
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
      mainControl: new FormControl(0),
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
  public readonly maxNumberOfScrums: ScrumControl[] = [
    {
      currentNumber: 0,
      currentBuys: 'N/A',
      currentSells: 'N/A',
      currentOthers: 'N/A',
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
      currentBuys: 'N/A',
      currentSells: 'N/A',
      currentOthers: 'N/A',
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
      currentBuys: 'N/A',
      currentSells: 'N/A',
      currentOthers: 'N/A',
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
  public readonly minTrendDataPoints: CurrentNumberControl[] = [
    {
      currentNumber: 5,
      currencyType: 'btc-usd',
      id: 'min-trend-data-points-btc',
      label: 'BTC',
      options: {
        floor: 5,
        ceil: 100,
        showSelectionBar: true
      },
      mainControl: new FormControl(5),
    },
    {
      currentNumber: 5,
      currencyType: 'ltc-usd',
      id: 'min-trend-data-points-ltc',
      label: 'LTC',
      options: {
        floor: 5,
        ceil: 100,
        showSelectionBar: true
      },
      mainControl: new FormControl(5),
    },
    {
      currentNumber: 5,
      currencyType: 'eth-usd',
      id: 'min-trend-data-points-etc',
      label: 'ETC',
      options: {
        floor: 5,
        ceil: 100,
        showSelectionBar: true
      },
      mainControl: new FormControl(5),
    }
  ];
  public readonly profitThreshold: Control[] = [
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
  public readonly timeBetweenBuys: Control[] = [
    {
      currencyType: 'btc-usd',
      id: 'time-between-buys-btc',
      label: 'BTC',
      mainOptions: {
        floor: 0,
        ceil: 10,
        showSelectionBar: true,
        step: 1,
        translate: (value: number): string => {
          return value + ' minutes';
        }
      },
      secondaryOptions: {
        floor: 0,
        ceil: 59,
        showSelectionBar: true,
        step: 1,
        translate: (value: number): string => {
          return value + ' seconds';
        }
      },
      mainControl: new FormControl(0),
      secondaryControl: new FormControl(0),
    },
    {
      currencyType: 'ltc-usd',
      id: 'time-between-buys-ltc',
      label: 'LTC',
      mainOptions: {
        floor: 0,
        ceil: 10,
        showSelectionBar: true,
        step: 1,
        translate: (value: number): string => {
          return value + ' minutes';
        }
      },
      secondaryOptions: {
        floor: 0,
        ceil: 59,
        showSelectionBar: true,
        step: 1,
        translate: (value: number): string => {
          return value + ' seconds';
        }
      },
      mainControl: new FormControl(0),
      secondaryControl: new FormControl(0),
    },
    {
      currencyType: 'eth-usd',
      id: 'time-between-buys-etc',
      label: 'ETC',
      mainOptions: {
        floor: 0,
        ceil: 10,
        showSelectionBar: true,
        step: 1,
        translate: (value: number): string => {
          return value + ' minutes';
        }
      },
      secondaryOptions: {
        floor: 0,
        ceil: 59,
        showSelectionBar: true,
        step: 1,
        translate: (value: number): string => {
          return value + ' seconds';
        }
      },
      mainControl: new FormControl(0),
      secondaryControl: new FormControl(0),
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
      previousStates: [10, 10, 10, 10, 10],
      state: 'Buying'
    },
    {
      currencyType: 'ltc-usd',
      id: 'market-trend-ltc',
      label: 'LTC',
      previousStates: [10, 10, 10, 10, 10],
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
  public state: { [key: string]: string|number; } = {
    logDaysCurrent: 1,
    marketTrendCurrent: 'btc-usd',
    maxBuyMoneyCurrent: 'btc-usd',
    maxBuyPriceCurrent: 'btc-usd',
    maxNumberOfScrumsCurrent: 'btc-usd',
    minTrendDataPointsCurrent: 'btc-usd',
    profitThresholdCurrent: 'btc-usd',
    timeBetweenBuysCurrent: 'btc-usd',
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
  async ngOnInit(): Promise<void> {
    this.gdaxDataService.changeCurrencyType('BTC-USD', 'cryptobot-controls', false);
    let isSandbox = true;
    await this.autobotControlsService.isSandbox().toPromise().then(val => { isSandbox = val.isSandbox; });
    console.log('sand', isSandbox);
    this._subs.push(
      this.maxBuyMoney[0].mainControl.valueChanges
        .pipe(filter(val => this.maxBuyMoney[0].mainControl.touched))
        .subscribe(newVal => {
          console.log(`Changing ${this.maxBuyMoney[0].currencyType} max buy money to`, newVal);
          this.autobotControlsService.setMaxBuyMoney(this.maxBuyMoney[0].currencyType, newVal);
        }),
      this.maxBuyMoney[1].mainControl.valueChanges
        .pipe(filter(val => this.maxBuyMoney[1].mainControl.touched))
        .subscribe(newVal => {
            console.log(`Changing ${this.maxBuyMoney[1].currencyType} max buy money to`, newVal);
            this.autobotControlsService.setMaxBuyMoney(this.maxBuyMoney[1].currencyType, newVal);
        }),
      this.maxBuyMoney[2].mainControl.valueChanges
        .pipe(filter(val => this.maxBuyMoney[2].mainControl.touched))
        .subscribe(newVal => {
            console.log(`Changing ${this.maxBuyMoney[2].currencyType} max buy money to`, newVal);
            this.autobotControlsService.setMaxBuyMoney(this.maxBuyMoney[2].currencyType, newVal);
        }),
      this.maxBuyPrices[0].mainControl.valueChanges
        .pipe(filter(val => this.maxBuyPrices[0].mainControl.touched))
        .subscribe(newVal => {
            console.log(`Changing ${this.maxBuyPrices[0].currencyType} max buy price to`, newVal);
            this.autobotControlsService.setMaxBuyPrice(this.maxBuyPrices[0].currencyType, newVal);
        }),
      this.maxBuyPrices[1].mainControl.valueChanges
        .pipe(filter(val => this.maxBuyPrices[1].mainControl.touched))
        .subscribe(newVal => {
            console.log(`Changing ${this.maxBuyPrices[1].currencyType} max buy price to`, newVal);
            this.autobotControlsService.setMaxBuyPrice(this.maxBuyPrices[1].currencyType, newVal);
        }),
      this.maxBuyPrices[2].mainControl.valueChanges
        .pipe(filter(val => this.maxBuyPrices[2].mainControl.touched))
        .subscribe(newVal => {
          console.log(`Changing ${this.maxBuyPrices[2].currencyType} max buy price to`, newVal);
          this.autobotControlsService.setMaxBuyPrice(this.maxBuyPrices[2].currencyType, newVal);
        }),
      this.maxNumberOfScrums[0].mainControl.valueChanges
        .pipe(filter(val => this.maxNumberOfScrums[0].mainControl.touched))
        .subscribe(newVal => {
          console.log(`Changing ${this.maxNumberOfScrums[0].currencyType} max number of scrums to`, newVal);
          this.autobotControlsService.setMaxNumberOfScrums(this.maxNumberOfScrums[0].currencyType, newVal);
        }),
      this.maxNumberOfScrums[1].mainControl.valueChanges
        .pipe(filter(val => this.maxNumberOfScrums[1].mainControl.touched))
        .subscribe(newVal => {
            console.log(`Changing ${this.maxNumberOfScrums[1].currencyType} max number of scrums to`, newVal);
            this.autobotControlsService.setMaxNumberOfScrums(this.maxNumberOfScrums[1].currencyType, newVal);
        }),
      this.maxNumberOfScrums[2].mainControl.valueChanges
        .pipe(filter(val => this.maxNumberOfScrums[2].mainControl.touched))
        .subscribe(newVal => {
            console.log(`Changing ${this.maxNumberOfScrums[2].currencyType} max number of scrums to`, newVal);
            this.autobotControlsService.setMaxNumberOfScrums(this.maxNumberOfScrums[2].currencyType, newVal);
        }),
      this.minTrendDataPoints[0].mainControl.valueChanges
        .pipe(filter(val => this.minTrendDataPoints[0].mainControl.touched))
        .subscribe(newVal => {
            console.log(`Changing ${this.minTrendDataPoints[0].currencyType} min trend data points to`, newVal);
            this.autobotControlsService.setMinTrendDataPoints(this.minTrendDataPoints[0].currencyType, newVal);
        }),
      this.minTrendDataPoints[1].mainControl.valueChanges
        .pipe(filter(val => this.minTrendDataPoints[1].mainControl.touched))
        .subscribe(newVal => {
            console.log(`Changing ${this.minTrendDataPoints[1].currencyType} min trend data points to`, newVal);
            this.autobotControlsService.setMinTrendDataPoints(this.minTrendDataPoints[1].currencyType, newVal);
        }),
      this.minTrendDataPoints[2].mainControl.valueChanges
        .pipe(filter(val => this.minTrendDataPoints[2].mainControl.touched))
        .subscribe(newVal => {
            console.log(`Changing ${this.minTrendDataPoints[2].currencyType} min trend data points to`, newVal);
            this.autobotControlsService.setMinTrendDataPoints(this.minTrendDataPoints[2].currencyType, newVal);
        }),
      this.profitThreshold[0].mainControl.valueChanges
        .pipe(filter(val => this.profitThreshold[0].mainControl.touched))
        .subscribe(newVal => {
            const convertToFullVal = Math.floor(newVal) + this.profitThreshold[0].secondaryControl.value;
            console.log(`Changing ${this.profitThreshold[0].currencyType} profit threshold to`, convertToFullVal);
            this.autobotControlsService.setProfitThreshold(this.profitThreshold[0].currencyType, convertToFullVal);
        }),
      this.profitThreshold[0].secondaryControl.valueChanges
        .pipe(filter(val => this.profitThreshold[0].secondaryControl.touched))
        .subscribe(newVal => {
            const convertToFullVal = this.profitThreshold[0].mainControl.value + Number((newVal % 1).toFixed(2));
            console.log(`Changing ${this.profitThreshold[0].currencyType} profit threshold to`, convertToFullVal);
            this.autobotControlsService.setProfitThreshold(this.profitThreshold[0].currencyType, convertToFullVal);
        }),
      this.profitThreshold[1].mainControl.valueChanges
        .pipe(filter(val => this.profitThreshold[1].mainControl.touched))
        .subscribe(newVal => {
            const convertToFullVal = Math.floor(newVal) + this.profitThreshold[1].secondaryControl.value;
            console.log(`Changing ${this.profitThreshold[1].currencyType} profit threshold to`, convertToFullVal);
            this.autobotControlsService.setProfitThreshold(this.profitThreshold[1].currencyType, convertToFullVal);
        }),
      this.profitThreshold[1].secondaryControl.valueChanges
        .pipe(filter(val => this.profitThreshold[1].secondaryControl.touched))
        .subscribe(newVal => {
            const convertToFullVal = this.profitThreshold[1].mainControl.value + Number((newVal % 1).toFixed(2));
            console.log(`Changing ${this.profitThreshold[1].currencyType} profit threshold to`, convertToFullVal);
            this.autobotControlsService.setProfitThreshold(this.profitThreshold[1].currencyType, convertToFullVal);
        }),
      this.profitThreshold[2].mainControl.valueChanges
        .pipe(filter(val => this.profitThreshold[2].mainControl.touched))
        .subscribe(newVal => {
            const convertToFullVal = Math.floor(newVal) + this.profitThreshold[2].secondaryControl.value;
            console.log(`Changing ${this.profitThreshold[2].currencyType} profit threshold to`, convertToFullVal);
            this.autobotControlsService.setProfitThreshold(this.profitThreshold[2].currencyType, convertToFullVal);
        }),
      this.profitThreshold[2].secondaryControl.valueChanges
        .pipe(filter(val => this.profitThreshold[2].secondaryControl.touched))
        .subscribe(newVal => {
            const convertToFullVal = this.profitThreshold[2].mainControl.value + Number((newVal % 1).toFixed(2));
            console.log(`Changing ${this.profitThreshold[2].currencyType} profit threshold to`, convertToFullVal);
            this.autobotControlsService.setProfitThreshold(this.profitThreshold[2].currencyType, convertToFullVal);
        }),
      this.timeBetweenBuys[0].mainControl.valueChanges
        .pipe(filter(val => this.timeBetweenBuys[0].mainControl.touched))
        .subscribe(newVal => {
            const convertToFullVal = ((newVal * 60) + this.timeBetweenBuys[0].secondaryControl.value) * 1000;
            console.log(`Changing ${this.timeBetweenBuys[0].currencyType} wait time to`, convertToFullVal);
            this.autobotControlsService.setWaitTimeBtwnBuys(this.timeBetweenBuys[0].currencyType, convertToFullVal);
        }),
      this.timeBetweenBuys[0].secondaryControl.valueChanges
        .pipe(filter(val => this.timeBetweenBuys[0].secondaryControl.touched))
        .subscribe(newVal => {
            const convertToFullVal = ((this.timeBetweenBuys[0].mainControl.value * 60) + newVal) * 1000;
            console.log(`Changing ${this.timeBetweenBuys[0].currencyType} wait time to`, convertToFullVal);
            this.autobotControlsService.setWaitTimeBtwnBuys(this.timeBetweenBuys[0].currencyType, convertToFullVal);
        }),
      this.timeBetweenBuys[1].mainControl.valueChanges
        .pipe(filter(val => this.timeBetweenBuys[1].mainControl.touched))
        .subscribe(newVal => {
            const convertToFullVal = ((newVal * 60) + this.timeBetweenBuys[1].secondaryControl.value) * 1000;
            console.log(`Changing ${this.timeBetweenBuys[1].currencyType} wait time to`, convertToFullVal);
            this.autobotControlsService.setWaitTimeBtwnBuys(this.timeBetweenBuys[1].currencyType, convertToFullVal);
        }),
      this.timeBetweenBuys[1].secondaryControl.valueChanges
        .pipe(filter(val => this.timeBetweenBuys[1].secondaryControl.touched))
        .subscribe(newVal => {
            const convertToFullVal = ((this.timeBetweenBuys[1].mainControl.value) + newVal) * 1000;
            console.log(`Changing ${this.timeBetweenBuys[1].currencyType} wait time to`, convertToFullVal);
            this.autobotControlsService.setWaitTimeBtwnBuys(this.timeBetweenBuys[1].currencyType, convertToFullVal);
        }),
      this.timeBetweenBuys[2].mainControl.valueChanges
        .pipe(filter(val => this.timeBetweenBuys[2].mainControl.touched))
        .subscribe(newVal => {
            const convertToFullVal = ((newVal * 60) + this.timeBetweenBuys[2].secondaryControl.value) * 1000;
            console.log(`Changing ${this.timeBetweenBuys[2].currencyType} wait time to`, convertToFullVal);
            this.autobotControlsService.setWaitTimeBtwnBuys(this.timeBetweenBuys[2].currencyType, convertToFullVal);
        }),
      this.timeBetweenBuys[2].secondaryControl.valueChanges
        .pipe(filter(val => this.timeBetweenBuys[2].secondaryControl.touched))
        .subscribe(newVal => {
            const convertToFullVal = ((this.timeBetweenBuys[2].mainControl.value) + newVal) * 1000;
            console.log(`Changing ${this.timeBetweenBuys[2].currencyType} wait time to`, convertToFullVal);
            this.autobotControlsService.setWaitTimeBtwnBuys(this.timeBetweenBuys[2].currencyType, convertToFullVal);
        }),
      this.autobotControlsService.getControlStates('btc-usd')
        .pipe(
          catchError(err => {
            return of({
              maxBuyMoney: 0,
              maxBuyPrice: 0,
              maxNumberOfScrums: 0,
              minTrendDataPoints: 5,
              profitThreshold: 0,
              waitTimeBtwnBuys: 0
            });
          }),
          distinctUntilChanged((valA, valB) => {
            return (
              valA.maxBuyMoney === valB.maxBuyMoney &&
              valA.maxBuyPrice === valB.maxBuyPrice &&
              valA.maxNumberOfScrums === valB.maxNumberOfScrums &&
              valA.minTrendDataPoints === valB.minTrendDataPoints &&
              valA.profitThreshold === valB.profitThreshold &&
              valA.waitTimeBtwnBuys === valB.waitTimeBtwnBuys
            );
          }))
        .subscribe((data: ControlStates) => {
          console.log('btc-usd control states:', JSON.stringify(data));
          this.maxBuyMoney[0].mainControl.setValue(data.maxBuyMoney, { emitEvent: false });
          this.maxBuyPrices[0].mainControl.setValue(data.maxBuyPrice, { emitEvent: false });
          this.maxNumberOfScrums[0].mainControl.setValue(data.maxNumberOfScrums, { emitEvent: false });
          this.minTrendDataPoints[0].mainControl.setValue(data.minTrendDataPoints, { emitEvent: false });
          const dollars = Math.floor(data.profitThreshold);
          const cents = Number((data.profitThreshold % 1).toFixed(2));
          this.profitThreshold[0].mainControl.setValue(dollars, { emitEvent: false });
          this.profitThreshold[0].secondaryControl.setValue(cents, { emitEvent: false });
          const seconds = Math.floor(data.waitTimeBtwnBuys / 1000);
          this.timeBetweenBuys[0].mainControl.setValue(Math.floor(seconds / 60), { emitEvent: false });
          this.timeBetweenBuys[0].secondaryControl.setValue(seconds % 60, { emitEvent: false });
        }),
      this.autobotControlsService.getControlStates('ltc-usd')
        .pipe(
          catchError(err => {
            return of({
              maxBuyMoney: 0,
              maxBuyPrice: 0,
              maxNumberOfScrums: 0,
              minTrendDataPoints: 5,
              profitThreshold: 0,
              waitTimeBtwnBuys: 0
            });
          }),
          distinctUntilChanged((valA, valB) => {
            return (
              valA.maxBuyMoney === valB.maxBuyMoney &&
              valA.maxBuyPrice === valB.maxBuyPrice &&
              valA.maxNumberOfScrums === valB.maxNumberOfScrums &&
              valA.minTrendDataPoints === valB.minTrendDataPoints &&
              valA.profitThreshold === valB.profitThreshold &&
              valA.waitTimeBtwnBuys === valB.waitTimeBtwnBuys
            );
          }))
        .subscribe((data: ControlStates) => {
          console.log('btc-usd control states:', JSON.stringify(data));
          this.maxBuyMoney[1].mainControl.setValue(data.maxBuyMoney, { emitEvent: false });
          this.maxBuyPrices[1].mainControl.setValue(data.maxBuyPrice, { emitEvent: false });
          this.maxNumberOfScrums[1].mainControl.setValue(data.maxNumberOfScrums, { emitEvent: false });
          this.minTrendDataPoints[1].mainControl.setValue(data.minTrendDataPoints, { emitEvent: false });
          const dollars = Math.floor(data.profitThreshold);
          const cents = Number((data.profitThreshold % 1).toFixed(2));
          this.profitThreshold[1].mainControl.setValue(dollars, { emitEvent: false });
          this.profitThreshold[1].secondaryControl.setValue(cents, { emitEvent: false });
          const seconds = Math.floor(data.waitTimeBtwnBuys / 1000);
          this.timeBetweenBuys[1].mainControl.setValue(Math.floor(seconds / 60), { emitEvent: false });
          this.timeBetweenBuys[1].secondaryControl.setValue(seconds % 60, { emitEvent: false });
        }),
      this.autobotControlsService.getControlStates('eth-usd')
        .pipe(
          catchError(err => {
            return of({
              maxBuyMoney: 0,
              maxBuyPrice: 0,
              maxNumberOfScrums: 0,
              minTrendDataPoints: 5,
              profitThreshold: 0,
              waitTimeBtwnBuys: 0
            });
          }),
          distinctUntilChanged((valA, valB) => {
            return (
              valA.maxBuyMoney === valB.maxBuyMoney &&
              valA.maxBuyPrice === valB.maxBuyPrice &&
              valA.maxNumberOfScrums === valB.maxNumberOfScrums &&
              valA.minTrendDataPoints === valB.minTrendDataPoints &&
              valA.profitThreshold === valB.profitThreshold &&
              valA.waitTimeBtwnBuys === valB.waitTimeBtwnBuys
            );
          }))
        .subscribe((data: ControlStates) => {
          console.log('btc-usd control states:', JSON.stringify(data));
          this.maxBuyMoney[2].mainControl.setValue(data.maxBuyMoney, { emitEvent: false });
          this.maxBuyPrices[2].mainControl.setValue(data.maxBuyPrice, { emitEvent: false });
          this.maxNumberOfScrums[2].mainControl.setValue(data.maxNumberOfScrums, { emitEvent: false });
          this.minTrendDataPoints[2].mainControl.setValue(data.minTrendDataPoints, { emitEvent: false });
          const dollars = Math.floor(data.profitThreshold);
          const cents = Number((data.profitThreshold % 1).toFixed(2));
          this.profitThreshold[2].mainControl.setValue(dollars, { emitEvent: false });
          this.profitThreshold[2].secondaryControl.setValue(cents, { emitEvent: false });
          const seconds = Math.floor(data.waitTimeBtwnBuys / 1000);
          this.timeBetweenBuys[2].mainControl.setValue(Math.floor(seconds / 60), { emitEvent: false });
          this.timeBetweenBuys[2].secondaryControl.setValue(seconds % 60, { emitEvent: false });
        }),
      this.autobotControlsService.getTraderStates('btc-usd')
        .pipe(
          catchError(err => {
            return of({
              botActivity: false,
              currentNumberOfScrums: 0,
              marketTrend: 10,
              scrumsStates: {buys: 0, other: 0, sells: 0 }
            });
          }),
          distinctUntilChanged((valA, valB) => {
            return (
              valA.botActivity === valB.botActivity &&
              valA.currentNumberOfScrums === valB.currentNumberOfScrums &&
              valA.marketTrend === valB.marketTrend &&
              valA.scrumsStates.buys === valB.scrumsStates.buys &&
              valA.scrumsStates.other === valB.scrumsStates.other &&
              valA.scrumsStates.sells === valB.scrumsStates.sells
            );
          }))
        .subscribe((data: TraderStates) => {
          console.log('btc-usd trader states:', JSON.stringify(data));
          this.activeBots[0].state = data.botActivity || false;
          this.maxNumberOfScrums[0].currentNumber = data.currentNumberOfScrums;
          this.maxNumberOfScrums[0].currentBuys = data.scrumsStates.buys;
          this.maxNumberOfScrums[0].currentSells = data.scrumsStates.sells;
          this.maxNumberOfScrums[0].currentOthers = data.scrumsStates.other;
          this.marketTrends[0].state = this._getState(data.marketTrend);
          this.marketTrends[0].previousStates.shift();
          this.marketTrends[0].previousStates.push(data.marketTrend);
          this._updateChart();
        }),
      this.autobotControlsService.getTraderStates('ltc-usd')
        .pipe(
          catchError(err => {
            return of({
              botActivity: false,
              currentNumberOfScrums: 0,
              marketTrend: 10,
              scrumsStates: {buys: 0, other: 0, sells: 0 }
            });
          }),
          distinctUntilChanged((valA, valB) => {
            return (
              valA.botActivity === valB.botActivity &&
              valA.currentNumberOfScrums === valB.currentNumberOfScrums &&
              valA.marketTrend === valB.marketTrend &&
              valA.scrumsStates.buys === valB.scrumsStates.buys &&
              valA.scrumsStates.other === valB.scrumsStates.other &&
              valA.scrumsStates.sells === valB.scrumsStates.sells
            );
          }))
        .subscribe((data: TraderStates) => {
          console.log('btc-usd trader states:', JSON.stringify(data));
          this.activeBots[1].state = data.botActivity || false;
          this.maxNumberOfScrums[1].currentNumber = data.currentNumberOfScrums;
          this.maxNumberOfScrums[1].currentBuys = data.scrumsStates.buys;
          this.maxNumberOfScrums[1].currentSells = data.scrumsStates.sells;
          this.maxNumberOfScrums[1].currentOthers = data.scrumsStates.other;
          this.marketTrends[1].state = this._getState(data.marketTrend);
          this.marketTrends[1].previousStates.shift();
          this.marketTrends[1].previousStates.push(data.marketTrend);
          this._updateChart();
        }),
      this.autobotControlsService.getTraderStates('eth-usd')
        .pipe(
          catchError(err => {
            return of({
              botActivity: false,
              currentNumberOfScrums: 0,
              marketTrend: 10,
              scrumsStates: {buys: 0, other: 0, sells: 0 }
            });
          }),
          distinctUntilChanged((valA, valB) => {
            return (
              valA.botActivity === valB.botActivity &&
              valA.currentNumberOfScrums === valB.currentNumberOfScrums &&
              valA.marketTrend === valB.marketTrend &&
              valA.scrumsStates.buys === valB.scrumsStates.buys &&
              valA.scrumsStates.other === valB.scrumsStates.other &&
              valA.scrumsStates.sells === valB.scrumsStates.sells
            );
          }))
        .subscribe((data: TraderStates) => {
          console.log('btc-usd trader states:', JSON.stringify(data));
          this.activeBots[2].state = data.botActivity || false;
          this.maxNumberOfScrums[2].currentNumber = data.currentNumberOfScrums;
          this.maxNumberOfScrums[2].currentBuys = data.scrumsStates.buys;
          this.maxNumberOfScrums[2].currentSells = data.scrumsStates.sells;
          this.maxNumberOfScrums[2].currentOthers = data.scrumsStates.other;
          this.marketTrends[2].state = this._getState(data.marketTrend);
          this.marketTrends[2].previousStates.shift();
          this.marketTrends[2].previousStates.push(data.marketTrend);
          this._updateChart();
        }),
      this.autobotControlsService.getMarketPriceStream('btc-usd', isSandbox)
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
          this.maxBuyPrices[0].marketPrice = avg ? fixedAvg : 'N/A';
        }),
      this.autobotControlsService.getMarketPriceStream('ltc-usd', isSandbox)
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
          this.maxBuyPrices[1].marketPrice = avg ? fixedAvg : 'N/A';
        }),
      this.autobotControlsService.getMarketPriceStream('eth-usd', isSandbox)
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
          this.maxBuyPrices[2].marketPrice = avg ? fixedAvg : 'N/A';
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
    switch (state) {
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
        visible: this.state.marketTrendCurrent === 'btc-usd'
      },
      {
        animation: false,
        showInLegend: false,
        name: null,
        color: '#8EBA6A',
        data: [],
        visible: this.state.marketTrendCurrent === 'ltc-usd'
      },
      {
        animation: false,
        showInLegend: false,
        name: null,
        color: '#8EBA6A',
        data: [],
        visible: this.state.marketTrendCurrent === 'eth-usd'
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
    switch (currency) {
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

  public toggleMinTrendDataPoints(currency: string) {
    this.state.minTrendDataPointsCurrent = currency;
    console.log(currency, this.state.minTrendDataPointsCurrent);
  }

  public toggleProfitThreshold(currency: string) {
    this.state.profitThresholdCurrent = currency;
    console.log(currency, this.state.profitThresholdCurrent);
  }

  public toggleTimeBetweenBuys(currency: string) {
    this.state.timeBetweenBuysCurrent = currency;
    console.log(currency, this.state.timeBetweenBuysCurrent);
  }

  public toggleLogDays(days: number) {
    this.state.logDaysCurrent = days;
    console.log(days, this.state.logDaysCurrent);
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
