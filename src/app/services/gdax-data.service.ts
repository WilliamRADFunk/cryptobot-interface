import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class GdaxDataService {
  /*
  * The updated query results for historical trade market data in a format
  * that all of the live views will understand and be able to use.
  */
  chartData: BehaviorSubject<number[][]> = new BehaviorSubject<number[][]>([]);
  /*
  * Currency type which is used as part of the query URL.
  */
  currency: string = 'BTC-USD';
  /*
  * The end datetime used as a parameter in the query URL
  */
  endDate: Date = new Date();
  /*
  * The granularity between data points. Used as a parameter in query URL.
  */
  interval: number = 3600;
  /*
  * The start datetime used as a parameter in the query URL
  */
  startDate: Date = new Date(this.endDate.getTime() - 86400000);

  constructor(private http: HttpClient) { }
  /*
  * Updates the currency type being viewed, and refreshes query results.
  * @param currency the currency string (ie. 'BTC-USD')
  */
  changeCurrencyType(currency: string) {
    this.currency = currency;
    this.getLatestGdaxData().subscribe(data => {
      this.chartData.next(data);
    });
  }
  /*
  * Updates the end datetime being viewed, and refreshes query results.
  * @param date the end datetime object
  */
  changeEndDateTime(date: Date) {
    this.endDate = date;
    this.getLatestGdaxData().subscribe(data => {
      this.chartData.next(data);
    });
  }
  /*
  * Updates the start datetime being viewed, and refreshes query results.
  * @param date the start datetime object
  */
  changeStartDateTime(date: Date) {
    this.startDate = date;
    this.getLatestGdaxData().subscribe(data => {
      this.chartData.next(data);
    });
  }
  /*
  * Updates the granularity of the data points,
  * and refreshes query results.
  * @param interval the granularity to use
  */
  changeTimeInterval(interval: number) {
    this.interval = interval;
    this.getLatestGdaxData().subscribe(data => {
      this.chartData.next(data);
    });
  }
  /*
  * Call to GDAX for historical market data
  * @return an observable that returns market data specific to query params
  */
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
}
