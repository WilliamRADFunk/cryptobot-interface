import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { timer } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';

const INTERFACE_URL = 'http://www.williamrobertfunk.com';
const DATA_URL = 'http://167.99.149.6:3000/';

@Injectable()
export class AutobotControlsService {

  constructor(private readonly http: HttpClient) { }

  getMarketPriceStream(curr) {
    return timer(0, 2000)
      .pipe(
        switchMap(() => this.http.get<any>(`${DATA_URL}market/${curr}`))
      );
  }

  getMaxBuyMoneyStream(curr) {
    return timer(200, 5000)
      .pipe(
        switchMap(() => this.http.get<any>(`${DATA_URL}maximum-buy-money/${curr}`))
      );
  }

  getMaxBuyPriceStream(curr) {
    return timer(400, 5000)
      .pipe(
        switchMap(() => this.http.get<any>(`${DATA_URL}maximum-buy-price/${curr}`))
      );
  }

  getMaxNumberOfScrumsStream(curr) {
    return timer(600, 5000)
      .pipe(
        switchMap(() => this.http.get<any>(`${DATA_URL}maximum-number-of-scrums/${curr}`))
      );
  }

  setMaxBuyMoney(curr, amount) {
    this.http.put<any>(`${DATA_URL}maximum-buy-money/${curr}`, { amount })
      .pipe(take(1))
      .subscribe(res => {});
  }

  setMaxBuyPrice(curr, price) {
    this.http.put<any>(`${DATA_URL}maximum-buy-price/${curr}`, { price })
      .pipe(take(1))
      .subscribe(res => {});
  }

  setMaxNumberOfScrums(curr, scrums) {
    this.http.put<any>(`${DATA_URL}maximum-number-of-scrums/${curr}`, { scrums })
      .pipe(take(1))
      .subscribe(res => {});
  }

  startBot(currency: string): void {
    this.http.get<boolean>(`${DATA_URL}start/${currency}`)
      .pipe(take(1))
      .subscribe(res => {});
  }

  stopBot(currency: string): void {
    this.http.get<boolean>(`${DATA_URL}stop/${currency}`)
      .pipe(take(1))
      .subscribe(res => {});
  }

}
