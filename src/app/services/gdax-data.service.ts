import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class GdaxDataService {
  /**
  * The updated query results for historical trade market data in a format
  * that all of the live views will understand and be able to use.
  */
  chartData: BehaviorSubject<number[][]> = new BehaviorSubject<number[][]>([]);
  /**
  * The updated query results for historical trade market data in a format
  * that all of the live views will understand and be able to use.
  */
  tableData: BehaviorSubject<number[][]> = new BehaviorSubject<number[][]>([]);
  /**
  * Currency type which is used as part of the query URL.
  */
  currency: string = 'BTC-USD';
  /**
  * The end datetime used as a parameter in the query URL
  */
  endDate: Date = new Date();
  /**
  * The granularity between data points. Used as a parameter in query URL.
  */
  interval: number = 3600;
  isBusy: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  /**
  * The start datetime used as a parameter in the query URL
  */
  startDate: Date = new Date(this.endDate.getTime() - 86400000);

  /**
  * Constructor for the class. Injects Angular's HttpClient service
  * @param http Angular's HttpClient service for making http calls
  */
  constructor(private http: HttpClient) { }
  /**
  * Updates the currency type being viewed, and refreshes query results.
  * @param currency the currency string (ie. 'BTC-USD')
  */
  changeCurrencyType(currency: string) {
    this.currency = currency;
    this.getLatestGdaxData();
    this.getLatestGdaxHistoryData();
  }
  /**
  * Updates the end datetime being viewed, and refreshes query results.
  * @param date the end datetime object
  */
  changeEndDateTime(date: Date) {
    this.endDate = date;
    this.getLatestGdaxData();
  }
  /**
  * Updates the start datetime being viewed, and refreshes query results.
  * @param date the start datetime object
  */
  changeStartDateTime(date: Date) {
    this.startDate = date;
    this.getLatestGdaxData();
  }
  /**
  * Updates the granularity of the data points,
  * and refreshes query results.
  * @param interval the granularity to use
  */
  changeTimeInterval(interval: number) {
    this.interval = interval;
    this.getLatestGdaxData();
  }
  /**
  * Call to GDAX for historical market data
  * @return an observable that returns market data specific to query params
  */
  getLatestGdaxData(): void {
    this.isBusy.next(true);
    this.chartData.next([]);
    const headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json');
    const params = new HttpParams()
      .set('granularity', this.interval.toString())
      .set('start', this.startDate.toISOString())
      .set('end', this.endDate.toISOString());
    if (this.currency === 'ALL') {
      this.http.get<any>(`https://api.gdax.com/products/BTC-USD/candles`, {headers, params})
        .subscribe(data1 => {
          this.http.get<any>(`https://api.gdax.com/products/LTC-USD/candles`, {headers, params})
            .subscribe(data2 => {
              this.http.get<any>(`https://api.gdax.com/products/ETH-USD/candles`, {headers, params})
                .subscribe(data3 => {
                  for (let i = 0 ; i < data1.length; i++) {
                    data1[i].push(0);
                  }
                  for (let j = 0 ; j < data2.length; j++) {
                    data2[j].push(1);
                  }
                  for (let a = 0 ; a < data2.length; a++) {
                    data1.push(data2[a]);
                  }
                  for (let k = 0 ; k < data3.length; k++) {
                    data3[k].push(2);
                  }
                  for (let b = 0 ; b < data3.length; b++) {
                    data1.push(data3[b]);
                  }
                  this.chartData.next(data1);
                  this.isBusy.next(false);
                });
            });
        });
    } else {
      this.http.get<any>(`https://api.gdax.com/products/${this.currency}/candles`, {headers, params})
        .subscribe(data => {
          this.chartData.next(data);
          this.isBusy.next(false);
        });
    }
  }
  getLatestGdaxHistoryData() {
    this.isBusy.next(true);
    const headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('Access-Control-Allow-Origin', 'http://localhost:4200')
      .set('Access-Control-Allow-Methods', 'POST, GET')
      .set('Access-Control-Allow-Headers', 'X-PINGOTHER, Content-Type')
      .set('Access-Control-Max-Age', '86400');
    const params = new HttpParams()
      .set('granularity', this.interval.toString())
      .set('start', this.startDate.toISOString())
      .set('end', this.endDate.toISOString());
    this.http.get<any>(`http://167.99.149.6:3000/history/${this.currency.split('-')[0].toLowerCase()}`, {headers, params})
      .subscribe(data => {
        console.log(data);
        this.tableData.next(data);
        this.isBusy.next(false);
      });
  }
}
