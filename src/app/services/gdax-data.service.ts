import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class GdaxDataService {
  chartData: BehaviorSubject<number[][]> = new BehaviorSubject<number[][]>([]);
  currency: string = 'BTC-USD';
  endDate: Date = new Date();
  interval: number = 3600;
  startDate: Date = new Date(this.endDate.getTime() - 86400000);

  constructor(private http: HttpClient) { }

  changeCurrencyType(currency: string) {
    this.currency = currency;
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

  changeStartDateTime(date: Date) {
    this.startDate = date;
    this.getLatestGdaxData().subscribe(data => {
      this.chartData.next(data);
    });
  }

  changeTimeInterval(interval: number) {
    this.interval = interval;
    this.getLatestGdaxData().subscribe(data => {
      this.chartData.next(data);
    });
  }

  getLatestGdaxData() {
    const headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json');
    const params = new HttpParams()
      .set('granularity', this.interval.toString())
      .set('start', this.startDate.toISOString())
      .set('end', this.endDate.toISOString());
    return this.http.get<any>(`https://api.gdax.com/products/${this.currency}/candles`, {headers, params});
  }

  refreshData() {
    this.getLatestGdaxData().subscribe(data => {
      this.chartData.next(data);
    });
  }
}
