import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of, timer } from 'rxjs';
import { catchError, map, switchMap, take } from 'rxjs/operators';

const INTERFACE_URL = 'http://www.williamrobertfunk.com';
// const DATA_URL = 'http://167.99.149.6:3000/';
const DATA_URL = 'http://localhost:3000/';
const REAL_URL = 'https://api.pro.coinbase.com/';
const SANDBOX_URL = 'https://api-public.sandbox.pro.coinbase.com/';

export interface ProductBookResponse {
  sequence: string;
  bids: [string, string, string][]; // [price, size, num-orders][]
  asks: [string, string, string][]; // [price, size, num-orders][]
}

@Injectable()
export class AutobotControlsService {

  constructor(private readonly http: HttpClient) { }

  private isSandbox(): Observable<{isSandbox: boolean}> {
    return this.http.get<any>(`${DATA_URL}version`).pipe(take(1));
  }

  public getMarketPriceStream(curr: string): Observable<ProductBookResponse> {
    return timer(0, 1000).pipe(switchMap(() => this.http.get<any>(`${true ? SANDBOX_URL : REAL_URL}products/${curr.toUpperCase()}/book`)));
  }

  public getMaxBuyMoneyStream(curr: string): Observable<{amount: number}> {
    return timer(200, 5000).pipe(switchMap(() => this.http.get<any>(`${DATA_URL}maximum-buy-money/${curr}`)));
  }

  public getMaxBuyPriceStream(curr: string): Observable<{price: number}> {
    return timer(400, 5000).pipe(switchMap(() => this.http.get<any>(`${DATA_URL}maximum-buy-price/${curr}`)));
  }

  public getCurrentNumberOfScrumsStream(curr: string): Observable<{scrums: number}> {
    return timer(500, 5000).pipe(switchMap(() => this.http.get<any>(`${DATA_URL}current-number-of-scrums/${curr}`)));
  }

  public getMaxNumberOfScrumsStream(curr: string): Observable<{scrums: number}> {
    return timer(600, 5000).pipe(switchMap(() => this.http.get<any>(`${DATA_URL}maximum-number-of-scrums/${curr}`)));
  }

  public getProfitThresholdStream(curr: string): Observable<{price: number}> {
    return timer(700, 5000).pipe(switchMap(() => this.http.get<any>(`${DATA_URL}profit-threshold/${curr}`)));
  }

  public getUSDBalanceStream(): Observable<{ balance: number }> {
    return timer(800, 5000).pipe(switchMap(() => this.http.get<any>(`${DATA_URL}usd`)));
  }

  public getMarketTrend(curr: string): Observable<{ trend: number }> {
    return timer(1000, 1000).pipe(switchMap(() => this.http.get<any>(`${DATA_URL}market-trend/${curr}`)));
  }

  public isBotActive(curr: string): Observable<{isActive: boolean}> {
    return timer(1000, 5000).pipe(switchMap(() => this.http.get<any>(`${DATA_URL}bot-activity/${curr}`)));
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

  public setProfitThreshold(curr: string, price: number): void {
    this.http.put<any>(`${DATA_URL}profit-threshold/${curr}`, { price })
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
