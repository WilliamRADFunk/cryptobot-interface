import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class GdaxDataService {
  /**
  * Used to determine which of the api to refresh.
  */
  basePath: string = 'live-view';
  /**
  * The updated query results for historical trade market data in a format
  * that all of the live views will understand and be able to use.
  */
  chartData: BehaviorSubject<number[][]> = new BehaviorSubject<number[][]>([]);
  /**
  * Currency type which is used as part of the query URL.
  */
  currency: string = 'BTC-USD';
  /**
  * The end datetime used as a parameter in the query URL
  */
  endDate: Date = new Date();
  /**
  * The granularity between data points. Used as a parameter in query URL
  */
  interval: number = 3600;
  /**
  * The flag to designate if query is busy
  */
  isBusy: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  /**
  * The flag to designate if granularity is relevant for basePath api
  */
  isRelevant: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  /**
  * The current number for page in results.
  */
  page: number = 1;
  /**
  * The current number for rows per page
  */
  rowsPerPage: number = 100;
  /**
  * The start datetime used as a parameter in the query URL
  */
  startDate: Date = new Date(this.endDate.getTime() - 86400000);
  /**
  * The updated query results for historical trade market data in a format
  * that all of the live views will understand and be able to use.
  */
  tableData: BehaviorSubject<{}[]> = new BehaviorSubject<{}[]>([]);

  /**
  * Constructor for the class. Injects Angular's HttpClient service
  * @param http Angular's HttpClient service for making http calls
  */
  constructor(private http: HttpClient) { }
  /**
  * Updates the currency type being viewed, and refreshes query results.
  * @param currency the currency string (ie. 'BTC-USD')
  */
  changeCurrencyType(currency: string, basePath: string) {
    this.basePath = basePath;
    this.currency = currency;
    this.refreshData();
  }
  /**
  * Updates the end datetime being viewed, and refreshes query results.
  * @param date the end datetime object
  */
  changeEndDateTime(date: Date) {
    this.endDate = date;
    this.refreshData();
  }
  /**
  * Updates the page number,
  * and refreshes query results.
  * @param page the granularity to use
  */
  changePageNumber(page: number) {
    this.page = page;
    this.refreshData();
  }
  /**
  * Updates the number of rows per page,
  * and refreshes query results.
  * @param rowsPerPage the granularity to use
  */
  changeRowsPerPage(rowsPerPage: number) {
    this.rowsPerPage = rowsPerPage;
    this.refreshData();
  }
  /**
  * Updates the start datetime being viewed, and refreshes query results.
  * @param date the start datetime object
  */
  changeStartDateTime(date: Date) {
    this.startDate = date;
    this.refreshData();
  }
  /**
  * Updates the granularity of the data points,
  * and refreshes query results.
  * @param interval the granularity to use
  */
  changeTimeInterval(interval: number) {
    this.interval = interval;
    this.refreshData();
  }
  /**
  * Call to GDAX for historical market data
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
  /**
  * Call to GDAX for trading history data
  */
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
      .set('start', this.startDate.toISOString())
      .set('end', this.endDate.toISOString());
    if (this.currency === 'ALL') {
      this.http.get<any>(`http://167.99.149.6:3000/history/btc`, {headers, params})
        .subscribe(data1 => {
          const d1: {}[] = [];
          data1.forEach(element => {
            const e1 = element;
            if (e1['details']
            && e1['details']['product_id']
            && e1['details']['product_id'].split('-').length > 1) {
              e1['product'] = e1['details']['product_id'].split('-')[0];
            } else {
              e1['product'] = 'BTC';
            }
            d1.push(e1);
          });
          this.http.get<any>(`http://167.99.149.6:3000/history/ltc`, {headers, params})
            .subscribe(data2 => {
              const d2: {}[] = [];
              data2.forEach(element => {
                const e2 = element;
                if (e2['details']
                && e2['details']['product_id']
                && e2['details']['product_id'].split('-').length > 1) {
                  e2['product'] = e2['details']['product_id'].split('-')[0];
                } else {
                  e2['product'] = 'LTC';
                }
                d2.push(e2);
              });
              this.http.get<any>(`http://167.99.149.6:3000/history/eth`, {headers, params})
                .subscribe(data3 => {
                  const d3: {}[] = [];
                  data3.forEach(element => {
                    const e3 = element;
                    if (e3['details']
                    && e3['details']['product_id']
                    && e3['details']['product_id'].split('-').length > 1) {
                      e3['product'] = e3['details']['product_id'].split('-')[0];
                    } else {
                      e3['product'] = 'ETH';
                    }
                    d3.push(e3);
                  });
                  this.tableData.next(d1.concat(d2, d3));
                  this.isBusy.next(false);
                });
            });
        });
    } else {
      const curr: string = this.currency.split('-')[0].toLowerCase();
      this.http.get<any>(`http://167.99.149.6:3000/history/${curr}`, {headers, params})
        .subscribe(data => {
          const d: {}[] = [];
          data.forEach(element => {
            const e = element;
            if (e['details']
            && e['details']['product_id']
            && e['details']['product_id'].split('-').length > 1) {
              e['product'] = e['details']['product_id'].split('-')[0];
            } else {
              e['product'] = curr.toUpperCase();
            }
            d.push(e);
          });
          this.tableData.next(d);
          this.isBusy.next(false);
        });
    }
  }
  /**
  * Call to GDAX for profit data
  */
  getLatestGdaxProfitData() {

  }
  /**
  * Call to GDAX for cryptobot data
  */
  getLatestCryptoBotData() {

  }
  /**
  * Determines which data api to use based off of basePath, and calls it.
  */
  refreshData() {
    if (this.basePath === 'live-view') {
      this.isRelevant.next(true);
      this.getLatestGdaxData();
    } else if (this.basePath === 'trading-history') {
      this.isRelevant.next(false);
      this.getLatestGdaxHistoryData();
    } else if (this.basePath === 'profit-portfolio') {
      this.isRelevant.next(false);
      this.getLatestGdaxProfitData();
    } else if (this.basePath === 'cryptobot-controls') {
      this.isRelevant.next(false);
      this.getLatestCryptoBotData();
    }
  }
}
