import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

// import * as gdax from '../../../node_modules/gdax/lib';
// const publicClient = new Gdax.PublicClient();

@Injectable()
export class GdaxDataService {
  // chartData: number[][] = [];
  currency: string = 'BTC-USD';
  interval: number = 3600;
  endDate: Date = new Date();
  startDate: Date = new Date(this.endDate.getTime() - 86400000);
  chartData: BehaviorSubject<number[][]> = new BehaviorSubject<number[][]>([]);

  constructor(private http: HttpClient) { }

  getLatestGdaxData() {
    const headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json');
    const params = new HttpParams()
      .set('granularity', this.interval.toString());
    return this.http.get<any>(`https://api.gdax.com/products/${this.currency}/candles`, {headers, params});
  }

  changeTimeInterval(interval: number) {
    this.interval = interval;
    this.getLatestGdaxData().subscribe(data => {
      this.chartData.next(data);
    });
  }

  changeStartDateTime(date: Date) {
    this.startDate = date;
    this.getLatestGdaxData().subscribe(data => {
      this.chartData.next(data);
    });
  }

  changeEndDateTime(date: Date) {
    this.endDate = date;
    this.getLatestGdaxData().subscribe(data => {
      this.chartData.next(data);
    });
  }

  changeCurrencyType(currency: string) {
    this.currency = currency;
    this.getLatestGdaxData().subscribe(data => {
      this.chartData.next(data);
    });
  }

  refreshData() {
    this.getLatestGdaxData().subscribe(data => {
      this.chartData.next(data);
    });
  }
}
