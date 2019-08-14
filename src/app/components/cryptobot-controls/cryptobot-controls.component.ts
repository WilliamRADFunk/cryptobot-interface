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
      label: 'Max BTC Buy Price',
      options: { 
        floor: 1000,
        ceil: 12000
      },
      value: 10999,
    },
    {
      id: 'max-buy-price-ltc',
      label: 'Max LTC Buy Price',
      options: { 
        floor: 1000,
        ceil: 12000
      },
      value: 10999,
    },
    {
      id: 'max-buy-price-etc',
      label: 'Max ETC Buy Price',
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
  }

}
