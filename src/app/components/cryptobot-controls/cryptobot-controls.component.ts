import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';
import { distinctUntilChanged } from 'rxjs/operators';
import { Options } from 'ng5-slider';

import { GdaxDataService } from '../../services/gdax-data.service';
import { AutobotControlsService } from '../../services/autobot-controls.service';
import { FormControl } from '@angular/forms';

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
  public readonly maxBuyMoney: { currencyType: string; id: string; label: string; options: Options; value: FormControl; }[] = [
    {
      currencyType: 'btc-usd',
      id: 'max-buy-money-btc',
      label: 'BTC',
      options: {
        floor: 0,
        ceil: 500
      },
      value: new FormControl(20),
    },
    {
      currencyType: 'ltc-usd',
      id: 'max-buy-money-ltc',
      label: 'LTC',
      options: {
        floor: 0,
        ceil: 500
      },
      value: new FormControl(20),
    },
    {
      currencyType: 'eth-usd',
      id: 'max-buy-money-etc',
      label: 'ETC',
      options: {
        floor: 0,
        ceil: 500
      },
      value: new FormControl(20),
    }
  ];
  public readonly maxBuyPrices: { currencyType: string; id: string; label: string; options: Options; value: FormControl; }[] = [
    {
      currencyType: 'btc-usd',
      id: 'max-buy-price-btc',
      label: 'BTC',
      options: {
        floor: 0,
        ceil: 12000
      },
      value: new FormControl(10999),
    },
    {
      currencyType: 'ltc-usd',
      id: 'max-buy-price-ltc',
      label: 'LTC',
      options: {
        floor: 0,
        ceil: 135
      },
      value: new FormControl(80),
    },
    {
      currencyType: 'eth-usd',
      id: 'max-buy-price-etc',
      label: 'ETC',
      options: {
        floor: 0,
        ceil: 330
      },
      value: new FormControl(200),
    }
  ];
  public readonly maxNumberOfScrums: { currencyType: string; id: string; label: string; options: Options; value: FormControl; }[] = [
    {
      currencyType: 'btc-usd',
      id: 'max-buy-price-btc',
      label: 'BTC',
      options: {
        floor: 0,
        ceil: 10
      },
      value: new FormControl(0),
    },
    {
      currencyType: 'ltc-usd',
      id: 'max-buy-price-ltc',
      label: 'LTC',
      options: {
        floor: 0,
        ceil: 10
      },
      value: new FormControl(0),
    },
    {
      currencyType: 'eth-usd',
      id: 'max-buy-price-etc',
      label: 'ETC',
      options: {
        floor: 0,
        ceil: 10
      },
      value: new FormControl(0),
    }
  ];
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
    this.autobotControlsService.startBot('btc-usd');
    this._subs.push(
      this.maxBuyMoney[0].value.valueChanges.subscribe(newVal => {
        if (this.maxBuyMoney[0].value.dirty) {
          console.log(`Changing ${this.maxBuyMoney[0].currencyType} max buy money to`, newVal);
          this.autobotControlsService.setMaxBuyMoney(this.maxBuyMoney[0].currencyType, newVal);
        }
      }),
      this.maxBuyMoney[1].value.valueChanges.subscribe(newVal => {
        if (this.maxBuyMoney[1].value.dirty) {
          console.log(`Changing ${this.maxBuyMoney[1].currencyType} max buy money to`, newVal);
          this.autobotControlsService.setMaxBuyMoney(this.maxBuyMoney[1].currencyType, newVal);
        }
      }),
      this.maxBuyMoney[2].value.valueChanges.subscribe(newVal => {
        if (this.maxBuyMoney[2].value.dirty) {
          console.log(`Changing ${this.maxBuyMoney[2].currencyType} max buy money to`, newVal);
          this.autobotControlsService.setMaxBuyMoney(this.maxBuyMoney[2].currencyType, newVal);
        }
      }),
      this.maxBuyPrices[0].value.valueChanges.subscribe(newVal => {
        if (this.maxBuyPrices[0].value.dirty) {
          console.log(`Changing ${this.maxBuyPrices[0].currencyType} max buy price to`, newVal);
          this.autobotControlsService.setMaxBuyPrice(this.maxBuyPrices[0].currencyType, newVal);
        }
      }),
      this.maxBuyPrices[1].value.valueChanges.subscribe(newVal => {
        if (this.maxBuyPrices[1].value.dirty) {
          console.log(`Changing ${this.maxBuyPrices[1].currencyType} max buy price to`, newVal);
          this.autobotControlsService.setMaxBuyPrice(this.maxBuyPrices[1].currencyType, newVal);
        }
      }),
      this.maxBuyPrices[2].value.valueChanges.subscribe(newVal => {
        if (this.maxBuyPrices[2].value.dirty) {
          console.log(`Changing ${this.maxBuyPrices[2].currencyType} max buy price to`, newVal);
          this.autobotControlsService.setMaxBuyPrice(this.maxBuyPrices[2].currencyType, newVal);
        }
      }),
      this.maxNumberOfScrums[0].value.valueChanges.subscribe(newVal => {
        if (this.maxNumberOfScrums[0].value.dirty) {
          console.log(`Changing ${this.maxNumberOfScrums[0].currencyType} max number of scrums to`, newVal);
          this.autobotControlsService.setMaxNumberOfScrums(this.maxNumberOfScrums[0].currencyType, newVal);
        }
      }),
      this.maxNumberOfScrums[1].value.valueChanges.subscribe(newVal => {
        if (this.maxNumberOfScrums[1].value.dirty) {
          console.log(`Changing ${this.maxNumberOfScrums[1].currencyType} max number of scrums to`, newVal);
          this.autobotControlsService.setMaxNumberOfScrums(this.maxNumberOfScrums[1].currencyType, newVal);
        }
      }),
      this.maxNumberOfScrums[2].value.valueChanges.subscribe(newVal => {
        if (this.maxNumberOfScrums[2].value.dirty) {
          console.log(`Changing ${this.maxNumberOfScrums[2].currencyType} max number of scrums to`, newVal);
          this.autobotControlsService.setMaxNumberOfScrums(this.maxNumberOfScrums[2].currencyType, newVal);
        }
      }),
      this.autobotControlsService.getMarketPriceStream('btc-usd')
        .pipe(distinctUntilChanged((valA, valB) => valA.price === valB.price))
        .subscribe((data: { price: number }) => {
          console.log('btc market price', data.price);
        }),
      // this.autobotControlsService.getMarketPriceStream('ltc-usd')
      //   .subscribe((data: { price: number }) => {
      //     console.log('ltc market price', data.price);
      //   }),
      // this.autobotControlsService.getMarketPriceStream('eth-usd')
      //   .subscribe((data: { price: number }) => {
      //     console.log('eth market price', data.price);
      //   }),
      this.autobotControlsService.getMaxBuyMoneyStream('btc-usd')
        .pipe(distinctUntilChanged((valA, valB) => valA.amount === valB.amount))
        .subscribe((data: { amount: number }) => {
          console.log('btc max spend amount per scrum', data.amount);
          this.maxBuyMoney[0].value.setValue(data.amount, { emitEvent: false });
        }),
      this.autobotControlsService.getMaxBuyMoneyStream('ltc-usd')
        .pipe(distinctUntilChanged((valA, valB) => valA.amount === valB.amount))
        .subscribe((data: { amount: number }) => {
          console.log('ltc max spend amount per scrum', data.amount);
          this.maxBuyMoney[1].value.setValue(data.amount, { emitEvent: false });
        }),
      this.autobotControlsService.getMaxBuyMoneyStream('eth-usd')
        .pipe(distinctUntilChanged((valA, valB) => valA.amount === valB.amount))
        .subscribe((data: { amount: number }) => {
          console.log('eth max spend amount per scrum', data.amount);
          this.maxBuyMoney[2].value.setValue(data.amount, { emitEvent: false });
        }),
      this.autobotControlsService.getMaxBuyPriceStream('btc-usd')
        .pipe(distinctUntilChanged((valA, valB) => valA.price === valB.price))
        .subscribe((data: { price: number }) => {
          console.log('btc max buy price', data.price);
          this.maxBuyPrices[0].value.setValue(data.price, { emitEvent: false });
        }),
      this.autobotControlsService.getMaxBuyPriceStream('ltc-usd')
        .pipe(distinctUntilChanged((valA, valB) => valA.price === valB.price))
        .subscribe((data: { price: number }) => {
          console.log('ltc max buy price', data.price);
          this.maxBuyPrices[1].value.setValue(data.price, { emitEvent: false });
        }),
      this.autobotControlsService.getMaxBuyPriceStream('eth-usd')
        .pipe(distinctUntilChanged((valA, valB) => valA.price === valB.price))
        .subscribe((data: { price: number }) => {
          console.log('eth max buy price', data.price);
          this.maxBuyPrices[2].value.setValue(data.price, { emitEvent: false });
        }),
      this.autobotControlsService.getMaxNumberOfScrumsStream('btc-usd')
        .pipe(distinctUntilChanged((valA, valB) => valA.scrums === valB.scrums))
        .subscribe((data: { scrums: number }) => {
          console.log('btc max number of scrums', data.scrums);
          this.maxNumberOfScrums[0].value.setValue(data.scrums, { emitEvent: false });
        }),
      this.autobotControlsService.getMaxNumberOfScrumsStream('ltc-usd')
        .pipe(distinctUntilChanged((valA, valB) => valA.scrums === valB.scrums))
        .subscribe((data: { scrums: number }) => {
          console.log('ltc max number of scrums', data.scrums);
          this.maxNumberOfScrums[1].value.setValue(data.scrums, { emitEvent: false });
        }),
      this.autobotControlsService.getMaxNumberOfScrumsStream('eth-usd')
        .pipe(distinctUntilChanged((valA, valB) => valA.scrums === valB.scrums))
        .subscribe((data: { scrums: number }) => {
          console.log('eth max number of scrums', data.scrums);
          this.maxNumberOfScrums[2].value.setValue(data.scrums, { emitEvent: false });
        }));
  }
}
