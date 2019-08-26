import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { timer, Observable } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';

const INTERFACE_URL = 'http://www.williamrobertfunk.com';
const DATA_URL = 'http://167.99.149.6:3000/';

@Injectable()
export class AutobotControlsService {

  constructor(private readonly http: HttpClient) { }

  public getMarketPriceStream(curr: string): Observable<{price: number}> {
    return timer(0, 2000)
      .pipe(
        switchMap(() => this.http.get<any>(`${DATA_URL}market/${curr}`))
      );
  }

  public getMaxBuyMoneyStream(curr: string): Observable<{amount: number}> {
    return timer(200, 5000)
      .pipe(
        switchMap(() => this.http.get<any>(`${DATA_URL}maximum-buy-money/${curr}`))
      );
  }

  public getMaxBuyPriceStream(curr: string): Observable<{price: number}> {
    return timer(400, 5000)
      .pipe(
        switchMap(() => this.http.get<any>(`${DATA_URL}maximum-buy-price/${curr}`))
      );
  }

  public getMaxNumberOfScrumsStream(curr: string): Observable<{scrums: number}> {
    return timer(600, 5000)
      .pipe(
        switchMap(() => this.http.get<any>(`${DATA_URL}maximum-number-of-scrums/${curr}`))
      );
  }

  public isBotActive(curr: string): Observable<{isActive: boolean}> {
    return timer(800, 5000)
      .pipe(
        switchMap(() => this.http.get<any>(`${DATA_URL}bot-activity/${curr}`))
      );
  }

  public setMaxBuyMoney(curr: string, amount: number): void {
    this.http.put<any>(`${DATA_URL}maximum-buy-money/${curr}`, { amount })
      .pipe(take(1))
      .subscribe(res => {});
  }

  public setMaxBuyPrice(curr: string, price: number): void {
    this.http.put<any>(`${DATA_URL}maximum-buy-price/${curr}`, { price })
      .pipe(take(1))
      .subscribe(res => {});
  }

  public setMaxNumberOfScrums(curr: string, scrums: number): void {
    this.http.put<any>(`${DATA_URL}maximum-number-of-scrums/${curr}`, { scrums })
      .pipe(take(1))
      .subscribe(res => {});
  }

  public startBot(currency: string): void {
    this.http.get<boolean>(`${DATA_URL}start/${currency}`)
      .pipe(take(1))
      .subscribe(res => {});
  }

  public stopBot(currency: string): void {
    this.http.get<boolean>(`${DATA_URL}stop/${currency}`)
      .pipe(take(1))
      .subscribe(res => {});
  }

}
