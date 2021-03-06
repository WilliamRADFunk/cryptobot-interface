import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { of } from 'rxjs';
import { Subscription } from 'rxjs/Subscription';
import { catchError, distinctUntilChanged, filter, retry } from 'rxjs/operators';
import { Options } from 'ng5-slider';
import { Chart } from 'angular-highcharts';

import { GdaxDataService } from '../../services/gdax-data.service';
import {
  AutobotControlsService,
  ControlStates,
  ProductBookResponse,
  TraderStates } from '../../services/autobot-controls.service';
import { Router } from '@angular/router';

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
  private _logsSub: Subscription;
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
  public logs: string = '';

  public readonly maxBuyMoney: Control[] = [
    {
      currencyType: 'btc-usd',
      id: 'max-buy-money-btc',
      label: 'BTC',
      options: {
        disabled: true,
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
        disabled: true,
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
        disabled: true,
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
        disabled: true,
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
        disabled: true,
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
        disabled: true,
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
        disabled: true,
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
        disabled: true,
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
        disabled: true,
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
        disabled: true,
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
        disabled: true,
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
        disabled: true,
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
        disabled: true,
        floor: 0,
        ceil: 99,
        showSelectionBar: true,
        step: 1,
        translate: (value: number): string => {
          return '$' + value;
        }
      },
      secondaryOptions: {
        disabled: true,
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
        disabled: true,
        floor: 0,
        ceil: 99,
        showSelectionBar: true,
        step: 1,
        translate: (value: number): string => {
          return '$' + value;
        }
      },
      secondaryOptions: {
        disabled: true,
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
        disabled: true,
        floor: 0,
        ceil: 99,
        showSelectionBar: true,
        step: 1,
        translate: (value: number): string => {
          return '$' + value;
        }
      },
      secondaryOptions: {
        disabled: true,
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
        disabled: true,
        floor: 0,
        ceil: 10,
        showSelectionBar: true,
        step: 1,
        translate: (value: number): string => {
          return value + ' minutes';
        }
      },
      secondaryOptions: {
        disabled: true,
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
        disabled: true,
        floor: 0,
        ceil: 10,
        showSelectionBar: true,
        step: 1,
        translate: (value: number): string => {
          return value + ' minutes';
        }
      },
      secondaryOptions: {
        disabled: true,
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
        disabled: true,
        floor: 0,
        ceil: 10,
        showSelectionBar: true,
        step: 1,
        translate: (value: number): string => {
          return value + ' minutes';
        }
      },
      secondaryOptions: {
        disabled: true,
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
    activeCurrency: 'btc-usd',
    activeUnlock: null,
    usdBalanceCurrent: 'N/A'
  };
  /**
  * Constructor for the CryptobotControlsComponent class.
  * @param gdaxDataService Internal service to get queried market data.
  */
  constructor(
    private readonly autobotControlsService: AutobotControlsService,
    private readonly gdaxDataService: GdaxDataService,
    private readonly router: Router) { }
  /**
  * Triggered when component is destroyed, but before it's officially dead
  * this runs cleanup functionality to protect against misfired queries.
  */
  ngOnDestroy(): void {
    this._subs.forEach(s => s && s.unsubscribe());
    this._subs.length = 0;
    if (this._logsSub) {
      this._logsSub.unsubscribe();
      this._logsSub = null;
    }
    this.gdaxDataService.kill();
  }
  /**
  * Triggered when component is loaded, but before it is viewed.
  */
  async ngOnInit(): Promise<void> {
    this.gdaxDataService.changeCurrencyType('BTC-USD', 'cryptobot-controls', false);
    let isSandbox = true;
    await this.autobotControlsService.isSandbox()
    .pipe(
      retry(1),
      catchError((err: any) => {
        this._handleErrorRedirect(err, 'isSandbox');
        return of(null);
      }))
    .toPromise()
    .then(val => { isSandbox = val && val.isSandbox; });
    console.log('sand', isSandbox);
    await this.autobotControlsService.getControlStates('btc-usd')
      .pipe(
        retry(1),
        catchError((err: any) => {
          this._handleErrorRedirect(err, 'getControlStates btc-usd');
          return of(null);
        }))
      .toPromise()
      .then(data => {
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
      });
    await this.autobotControlsService.getControlStates('ltc-usd')
      .pipe(
        retry(1),
        catchError((err: any) => {
          this._handleErrorRedirect(err, 'getControlStates ltc-usd');
          return of(null);
        }))
      .toPromise()
      .then(data => {
        console.log('ltc-usd control states:', JSON.stringify(data));
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
      });
    await this.autobotControlsService.getControlStates('eth-usd')
      .pipe(
        retry(1),
        catchError((err: any) => {
          this._handleErrorRedirect(err, 'getControlStates eth-usd');
          return of(null);
        }))
      .toPromise()
      .then(data => {
        console.log('eth-usd control states:', JSON.stringify(data));
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
      });
    await this.autobotControlsService.getTraderStates('btc-usd')
      .pipe(
        retry(1),
        catchError((err: any) => {
          this._handleErrorRedirect(err, 'getTraderStates btc-usd');
          return of(null);
        }))
      .toPromise()
      .then(data => {
        console.log('btc-usd trader states:', JSON.stringify(data));
        this.activeBots[0].state = data.botActivity || false;
        this.maxNumberOfScrums[0].currentNumber = data.currentNumberOfScrums;
        this.maxNumberOfScrums[0].currentBuys = data.scrumsStates.buys;
        this.maxNumberOfScrums[0].currentSells = data.scrumsStates.sells;
        this.maxNumberOfScrums[0].currentOthers = data.scrumsStates.other;
        this.marketTrends[0].state = this._getState(data.marketTrend);
        this.marketTrends[0].previousStates.shift();
        this.marketTrends[0].previousStates.push(data.marketTrend);
      });
    await this.autobotControlsService.getTraderStates('ltc-usd')
      .pipe(
        retry(1),
        catchError((err: any) => {
          this._handleErrorRedirect(err, 'getTraderStates ltc-usd');
          return of(null);
        }))
      .toPromise()
      .then(data => {
        console.log('ltc-usd trader states:', JSON.stringify(data));
        this.activeBots[1].state = data.botActivity || false;
        this.maxNumberOfScrums[1].currentNumber = data.currentNumberOfScrums;
        this.maxNumberOfScrums[1].currentBuys = data.scrumsStates.buys;
        this.maxNumberOfScrums[1].currentSells = data.scrumsStates.sells;
        this.maxNumberOfScrums[1].currentOthers = data.scrumsStates.other;
        this.marketTrends[1].state = this._getState(data.marketTrend);
        this.marketTrends[1].previousStates.shift();
        this.marketTrends[1].previousStates.push(data.marketTrend);
      });
    await this.autobotControlsService.getTraderStates('eth-usd')
      .pipe(
        retry(1),
        catchError((err: any) => {
          this._handleErrorRedirect(err, 'getTraderStates eth-usd');
          return of(null);
        }))
      .toPromise()
      .then(data => {
        console.log('eth-usd trader states:', JSON.stringify(data));
        this.activeBots[2].state = data.botActivity || false;
        this.maxNumberOfScrums[2].currentNumber = data.currentNumberOfScrums;
        this.maxNumberOfScrums[2].currentBuys = data.scrumsStates.buys;
        this.maxNumberOfScrums[2].currentSells = data.scrumsStates.sells;
        this.maxNumberOfScrums[2].currentOthers = data.scrumsStates.other;
        this.marketTrends[2].state = this._getState(data.marketTrend);
        this.marketTrends[2].previousStates.shift();
        this.marketTrends[2].previousStates.push(data.marketTrend);
      });

    this._updateChart();

    this._startPolling(isSandbox);

    this._logsSub = this.autobotControlsService.getLogs(Number(this.state.logDaysCurrent))
      .pipe(
        catchError(err => {
          this._handleErrorRedirect(err, 'getLogs');
          return of({ logs: [''] });
        }),
        distinctUntilChanged((valA, valB) => valA.logs === valB.logs),
        filter(data => !!data.logs.length))
      .subscribe((data: { logs: string[] }) => {
        this.logs = data.logs.join('\n') || this.logs;
      });
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

  private _handleErrorRedirect(err: any, funcName: string): void {
    if (err && err.status === 0) {
      this.router.navigateByUrl('/Error/12163');
    } else if (err && err.status === 500) {
      this.router.navigateByUrl('/Error/500');
    } else {
      console.log(`Error in ${funcName}: ${err && err.status}`);
    }
  }

  private _startPolling(isSandbox: boolean) {
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
      this.autobotControlsService.getControlStatesStream('btc-usd')
        .pipe(
          retry(1),
          catchError((err: any) => {
            this._handleErrorRedirect(err, 'getControlStatesStream btc-usd');
            return of(null);
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
      this.autobotControlsService.getControlStatesStream('ltc-usd')
        .pipe(
          retry(1),
          catchError((err: any) => {
            this._handleErrorRedirect(err, 'getControlStatesStream ltc-usd');
            return of(null);
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
          console.log('ltc-usd control states:', JSON.stringify(data));
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
      this.autobotControlsService.getControlStatesStream('eth-usd')
        .pipe(
          retry(1),
          catchError((err: any) => {
            this._handleErrorRedirect(err, 'getControlStatesStream eth-usd');
            return of(null);
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
          console.log('eth-usd control states:', JSON.stringify(data));
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
      this.autobotControlsService.getTraderStatesStream('btc-usd')
        .pipe(
          retry(1),
          catchError((err: any) => {
            this._handleErrorRedirect(err, 'getTraderStatesStream btc-usd');
            return of(null);
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
      this.autobotControlsService.getTraderStatesStream('ltc-usd')
        .pipe(
          retry(1),
          catchError((err: any) => {
            this._handleErrorRedirect(err, 'getTraderStatesStream ltc-usd');
            return of(null);
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
          console.log('ltc-usd trader states:', JSON.stringify(data));
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
      this.autobotControlsService.getTraderStatesStream('eth-usd')
        .pipe(
          retry(1),
          catchError((err: any) => {
            this._handleErrorRedirect(err, 'getTraderStatesStream eth-usd');
            return of(null);
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
          console.log('eth-usd trader states:', JSON.stringify(data));
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
          retry(1),
          catchError((err: any) => {
            this._handleErrorRedirect(err, 'getMarketPriceStream btc-usd');
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
          retry(1),
          catchError((err: any) => {
            this._handleErrorRedirect(err, 'getMarketPriceStream ltc-usd');
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
          retry(1),
          catchError((err: any) => {
            this._handleErrorRedirect(err, 'getMarketPriceStream eth-usd');
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
          retry(1),
          catchError((err: any) => {
            this._handleErrorRedirect(err, 'getUSDBalanceStream');
            return of({ balance: NaN });
          }),
          distinctUntilChanged((valA, valB) => valA.balance === valB.balance))
        .subscribe((data: { balance: number }) => {
          const amount = Number(data.balance) || NaN;
          console.log('usd balance', amount);
          this.state.usdBalanceCurrent = isNaN(amount) ? 'N/A' : `$${amount.toFixed(2)}`;
        }));
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
        visible: this.state.activeCurrency === 'btc-usd'
      },
      {
        animation: false,
        showInLegend: false,
        name: null,
        color: '#8EBA6A',
        data: [],
        visible: this.state.activeCurrency === 'ltc-usd'
      },
      {
        animation: false,
        showInLegend: false,
        name: null,
        color: '#8EBA6A',
        data: [],
        visible: this.state.activeCurrency === 'eth-usd'
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
    const size = maxMoney / currentBuy;
    let buyBase = maxMoney;
    buyBase = Number((currentBuy * size * (1 + 0.005)).toFixed(2));
    buyBase += profitThreshold;

    const interimSellPrice = Number((buyBase / size).toFixed(2));
    const sellBase = Number((interimSellPrice * size * (1 + 0.005)).toFixed(2));
    const sellFee = sellBase - buyBase;
    const sellPrice = Number((interimSellPrice + sellFee - 0.02).toFixed(2));

    return sellPrice.toFixed(2);
  }

  public toggleActiveCurrency(currency: string) {
    this.state.activeCurrency = currency;
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
    console.log(currency, this.state);
  }

  public toggleActiveLock(control: string): void {
    const oldLock = this.state.activeUnlock;
    this.state.activeUnlock = this.state.activeUnlock === control ? null : control;
    const newLock = this.state.activeUnlock;

    const oldControl = (<any>this)[oldLock];
    if (oldLock && oldControl) {
      const options = oldControl[0] && oldControl[0].options;
      if (oldControl && options) {
        oldControl[0].options = Object.assign({}, oldControl[0].options, {disabled: true});
        oldControl[1].options = Object.assign({}, oldControl[1].options, {disabled: true});
        oldControl[2].options = Object.assign({}, oldControl[2].options, {disabled: true});
      } else {
        oldControl[0].mainOptions = Object.assign({}, oldControl[0].mainOptions, {disabled: true});
        oldControl[1].mainOptions = Object.assign({}, oldControl[1].mainOptions, {disabled: true});
        oldControl[2].mainOptions = Object.assign({}, oldControl[2].mainOptions, {disabled: true});
        oldControl[0].secondaryOptions = Object.assign({}, oldControl[0].secondaryOptions, {disabled: true});
        oldControl[1].secondaryOptions = Object.assign({}, oldControl[1].secondaryOptions, {disabled: true});
        oldControl[2].secondaryOptions = Object.assign({}, oldControl[2].secondaryOptions, {disabled: true});
      }
    }

    const newControl = (<any>this)[newLock];
    if (newLock && newControl) {
      const options = newControl[0] && newControl[0].options;
      if (newControl && options) {
        newControl[0].options = Object.assign({}, newControl[0].options, {disabled: false});
        newControl[1].options = Object.assign({}, newControl[1].options, {disabled: false});
        newControl[2].options = Object.assign({}, newControl[2].options, {disabled: false});
      } else {
        newControl[0].mainOptions = Object.assign({}, newControl[0].mainOptions, {disabled: false});
        newControl[1].mainOptions = Object.assign({}, newControl[1].mainOptions, {disabled: false});
        newControl[2].mainOptions = Object.assign({}, newControl[2].mainOptions, {disabled: false});
        newControl[0].secondaryOptions = Object.assign({}, newControl[0].secondaryOptions, {disabled: false});
        newControl[1].secondaryOptions = Object.assign({}, newControl[1].secondaryOptions, {disabled: false});
        newControl[2].secondaryOptions = Object.assign({}, newControl[2].secondaryOptions, {disabled: false});
      }
    }
  }

  public toggleLogDays(days: number) {
    this.state.logDaysCurrent = days;
    console.log('days', this.state.logDaysCurrent);
    if (this._logsSub) {
      this._logsSub.unsubscribe();
      this._logsSub = this.autobotControlsService.getLogs(Number(this.state.logDaysCurrent))
        .pipe(
          catchError(err => {
            console.log('getLogs', 'error', err);
            return of({ logs: [''] });
          }),
          distinctUntilChanged((valA, valB) => valA.logs === valB.logs),
          filter(data => !!data.logs.length))
        .subscribe((data: { logs: string[] }) => {
          this.logs = data.logs.join('\n') || this.logs;
        });
    }
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
