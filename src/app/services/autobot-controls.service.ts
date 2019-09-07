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

export interface ScrumStateResponse {
  buys: string;
  other: string;
  sells: string;
}

export interface ControlStates {
  maxBuyMoney: number;
  maxBuyPrice: number;
  maxNumberOfScrums: number;
  minTrendDataPoints: number;
  profitThreshold: number;
  waitTimeBtwnBuys: number;
}

export interface TraderStates {
  botActivity: boolean;
  currentNumberOfScrums: number;
  marketTrend: number;
  scrumsStates: ScrumStateResponse;
}

@Injectable()
export class AutobotControlsService {

  constructor(private readonly http: HttpClient) { }

  public isSandbox(): Observable<{isSandbox: boolean}> {
    return this.http.get<any>(`${DATA_URL}version`).pipe(take(1));
  }

  public getMarketPriceStream(curr: string, isSandbox: boolean): Observable<ProductBookResponse> {
    return timer(0, 1000).pipe(
      switchMap(() => this.http.get<any>(`${isSandbox ? SANDBOX_URL : REAL_URL}products/${curr.toUpperCase()}/book`))
    );
  }

  public getControlStates(curr: string): Observable<ControlStates> {
    return timer(100, 2000).pipe(switchMap(() => this.http.get<any>(`${DATA_URL}control-states/${curr}`)));
  }

  public getTraderStates(curr: string): Observable<TraderStates> {
    return timer(300, 2000).pipe(switchMap(() => this.http.get<any>(`${DATA_URL}trader-states/${curr}`)));
  }

  public getMaxBuyMoneyStream(curr: string): Observable<{amount: number}> {
    return timer(400, 5000).pipe(switchMap(() => this.http.get<any>(`${DATA_URL}maximum-buy-money/${curr}`)));
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

  public getMinTrendDataPointsStream(curr: string): Observable<{points: number}> {
    return timer(900, 5000).pipe(switchMap(() => this.http.get<any>(`${DATA_URL}minimum-trend-data-points/${curr}`)));
  }

  public getProfitThresholdStream(curr: string): Observable<{price: number}> {
    return timer(700, 5000).pipe(switchMap(() => this.http.get<any>(`${DATA_URL}profit-threshold/${curr}`)));
  }

  public getUSDBalanceStream(): Observable<{ balance: number }> {
    return timer(800, 5000).pipe(switchMap(() => this.http.get<any>(`${DATA_URL}usd`)));
  }

  public getScrumStatesStream(curr: string): Observable<ScrumStateResponse> {
    return timer(1500, 5000).pipe(switchMap(() => this.http.get<any>(`${DATA_URL}scrum-states/${curr}`)));
  }

  public getWaitTimeBtwnBuysStream(curr: string): Observable<{time: number}> {
    return timer(500, 5000).pipe(switchMap(() => this.http.get<any>(`${DATA_URL}wait-time/${curr}`)));
  }

  public getMarketTrend(curr: string): Observable<{ trend: number }> {
    return timer(2000, 5000).pipe(switchMap(() => this.http.get<any>(`${DATA_URL}market-trend/${curr}`)));
  }

  public isBotActive(curr: string): Observable<{isActive: boolean}> {
    return timer(1000, 5000).pipe(switchMap(() => this.http.get<any>(`${DATA_URL}bot-activity/${curr}`)));
  }

  public getLogs(days: number): Observable<{logs: string[]}> {
    return timer(3000, 10000).pipe(switchMap(() => this.http.get<any>(`${DATA_URL}logs/${days}`)));
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

  public setMinTrendDataPoints(curr: string, points: number): void {
    this.http.put<any>(`${DATA_URL}minimum-trend-data-points/${curr}`, { points })
      .pipe(take(1))
      .subscribe(res => {});
  }

  public setProfitThreshold(curr: string, price: number): void {
    this.http.put<any>(`${DATA_URL}profit-threshold/${curr}`, { price })
      .pipe(take(1))
      .subscribe(res => {});
  }

  public setWaitTimeBtwnBuys(curr: string, time: number): void {
    this.http.put<any>(`${DATA_URL}wait-time/${curr}`, { time })
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
