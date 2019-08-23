import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';
import { Options } from 'ng5-slider';

import { GdaxDataService } from '../../services/gdax-data.service';
import { AutobotControlsService } from '../../services/autobot-controls.service';

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
  public readonly maxBuyPrices: { id: string; label: string; options: Options; value: number; }[] = [
    {
      id: 'max-buy-price-btc',
      label: 'BTC',
      options: { 
        floor: 1000,
        ceil: 12000
      },
      value: 10999,
    },
    {
      id: 'max-buy-price-ltc',
      label: 'LTC',
      options: { 
        floor: 1000,
        ceil: 12000
      },
      value: 10999,
    },
    {
      id: 'max-buy-price-etc',
      label: 'ETC',
      options: { 
        floor: 1000,
        ceil: 12000
      },
      value: 10999,
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
    this._subs.push(this.autobotControlsService.getMarketPriceStream('btc-usd')
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
        .subscribe((data: { amount: number }) => {
          console.log('btc max spend amount per scrum', data.amount);
        }),
      this.autobotControlsService.getMaxBuyMoneyStream('ltc-usd')
        .subscribe((data: { amount: number }) => {
          console.log('ltc max spend amount per scrum', data.amount);
        }),
      this.autobotControlsService.getMaxBuyMoneyStream('eth-usd')
        .subscribe((data: { amount: number }) => {
          console.log('eth max spend amount per scrum', data.amount);
        }),
      this.autobotControlsService.getMaxBuyPriceStream('btc-usd')
        .subscribe((data: { price: number }) => {
          console.log('btc max buy price', data.price);
        }),
      this.autobotControlsService.getMaxBuyPriceStream('ltc-usd')
        .subscribe((data: { price: number }) => {
          console.log('ltc max buy price', data.price);
        }),
      this.autobotControlsService.getMaxBuyPriceStream('eth-usd')
        .subscribe((data: { price: number }) => {
          console.log('eth max buy price', data.price);
        }),
      this.autobotControlsService.getMaxNumberOfScrumsStream('btc-usd')
        .subscribe((data: { scrums: number }) => {
          console.log('btc max number of scrums', data.scrums);
        }),
      this.autobotControlsService.getMaxNumberOfScrumsStream('ltc-usd')
        .subscribe((data: { scrums: number }) => {
          console.log('ltc max number of scrums', data.scrums);
        }),
      this.autobotControlsService.getMaxNumberOfScrumsStream('eth-usd')
        .subscribe((data: { scrums: number }) => {
          console.log('eth max number of scrums', data.scrums);
        }));
  }
}
