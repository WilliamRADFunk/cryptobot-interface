import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

const INTERFACE_URL = 'http://www.williamrobertfunk.com';

@Injectable()
export class GdaxDataService {
  /**
  * Used to determine which of the api to refresh.
  */
  basePath: string = 'live-view';
  /**
  * Used to keep track of paging
  */
  bookmark: number;
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
  page: BehaviorSubject<number> = new BehaviorSubject<number>(1);
  /**
  * The current number for rows per page
  */
  rowsPerPage: number = 10;
  /**
  * The start datetime used as a parameter in the query URL
  */
  startDate: Date = new Date(this.endDate.getTime() - 86400000);
  /**
  * The updated query results for historical trade market data in a format
  * that all of the live views will understand and be able to use.
  */
  tableData: BehaviorSubject<{}[]> = new BehaviorSubject<{}[]>([]);
  tableResults: {}[] = [];

  /**
  * Constructor for the class. Injects Angular's HttpClient service
  * @param http Angular's HttpClient service for making http calls
  */
  constructor(private http: HttpClient) { }
  /**
  * Updates the currency type being viewed, and refreshes query results.
  * @param currency the currency string (ie. 'BTC-USD')
  */
  changeCurrencyType(currency: string, basePath: string): void {
    this.tableResults = [];
    this.page.next(1);
    this.basePath = basePath;
    this.currency = currency;
    this.bookmark = undefined;
    this.refreshData();
  }
  /**
  * Updates the end datetime being viewed, and refreshes query results.
  * @param date the end datetime object
  */
  changeEndDateTime(date: Date): void {
    this.tableResults = [];
    this.page.next(1);
    this.endDate = date;
    this.bookmark = undefined;
    this.refreshData();
  }
  /**
  * Updates the page number,
  * and refreshes query results.
  * @param page the granularity to use
  */
  changePageNumber(page: number): void {
    this.tableResults = [];
    if (page === 1) {
      this.bookmark = undefined;
    } else if (page < this.page.value) {
      // TODO: Set currType for trading-history 'ALL' walking to
      // whatever the curr type of this.tableData.value[0]['id'] is.
      this.bookmark = -this.tableData.value[0]['id'];
    } else {
      // One extra result is captured, but ignored in table (for isNoNextPage),
      // But, don't want to lose the result when next page is clicked.
      this.bookmark = this.tableData.value[this.tableData.value.length - 2]['id'];
    }
    this.page.next(page);
    this.refreshData();
  }
  /**
  * Updates the number of rows per page,
  * and refreshes query results.
  * @param rowsPerPage the granularity to use
  */
  changeRowsPerPage(rowsPerPage: number): void {
    this.tableResults = [];
    this.rowsPerPage = rowsPerPage;
    this.page.next(1);
    this.bookmark = undefined;
    this.refreshData();
  }
  /**
  * Updates the start datetime being viewed, and refreshes query results.
  * @param date the start datetime object
  */
  changeStartDateTime(date: Date): void {
    this.tableResults = [];
    this.page.next(1);
    this.startDate = date;
    this.bookmark = undefined;
    this.refreshData();
  }
  /**
  * Updates the granularity of the data points,
  * and refreshes query results.
  * @param interval the granularity to use
  */
  changeTimeInterval(interval: number): void {
    this.interval = interval;
    this.refreshData();
  }
  /**
  * Only returns elements of data array that fit within user specified time range.
  * @param data array of data objects to be formatted
  * @return     filtered data array
  */
  filterByDate(data: {}[]): {}[] {
    data = data || [];
    const newData: {}[] = [];
    data.forEach(element => {
      if (element['created_at']) {
        const date = new Date(element['created_at']);
        if (date.getTime() >= this.startDate.getTime()
          && date.getTime() <= this.endDate.getTime()) {
          newData.push(element);
        }
      }
    });
    return newData;
  }
  /**
  * Pulls out and formats the product from gdax query results.
  * @param data array of data objects to be formatted
  * @return     formatted data array
  */
  formatProduct(data: {}[]): {}[] {
    const d1: {}[] = [];
    data.forEach(element => {
      const e1 = element;
      if (e1['details']
      && e1['details']['product_id']
      && e1['details']['product_id'].split('-').length > 1) {
        e1['product'] = e1['details']['product_id'].split('-')[0];
      } else {
        e1['product'] = 'BTC';
      }
      if (e1['type'] === 'transfer'
        && e1['details']
        && e1['details']['transfer_type']) {
        e1['type'] = e1['details']['transfer_type'];
      }
      d1.push(e1);
    });
    return d1;
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
  getLatestGdaxHistoryData(): void {
    this.isBusy.next(true);
    const headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('Access-Control-Allow-Origin', INTERFACE_URL)
      .set('Access-Control-Allow-Methods', 'POST, GET')
      .set('Access-Control-Allow-Headers', 'X-PINGOTHER, Content-Type')
      .set('Access-Control-Max-Age', '86400');
    let params;
    if (!this.bookmark) {
      params = new HttpParams()
        .set(`limit`, `${this.rowsPerPage + 1}`);
    } else if (this.bookmark < 0) {
      params = new HttpParams()
        .set(`before`, `${Math.abs(this.bookmark)}`)
        .set(`limit`, `${this.rowsPerPage + 1}`);
    } else {
      params = new HttpParams()
        .set(`after`, `${this.bookmark}`)
        .set(`limit`, `${this.rowsPerPage + 1}`);
    }
    // TODO: reduce query to one that walks an array of currType.
    // currType increments inside handleHistoryResults under special run out
    // conditions, and are reset when rowsPerPage, startDate, endDate
    // or currency type are changed.
    if (this.currency === 'ALL') {
      this.http.get<any>(`http://167.99.149.6:3000/history/btc`, {headers, params})
        .subscribe(originalData1 => {
          const data1 = this.filterByDate(originalData1);
          const formatedData1 = this.formatProduct(data1);
          if (formatedData1.length < (this.rowsPerPage + 1)) {
            params.set(`limit`, `${this.rowsPerPage + 1 - formatedData1.length}`);
            this.http.get<any>(`http://167.99.149.6:3000/history/ltc`, {headers, params})
              .subscribe(originalData2 => {
                const data2 = this.filterByDate(originalData2);
                const formatedData2 = formatedData1.concat(this.formatProduct(data2));
                if (formatedData2.length < (this.rowsPerPage + 1)) {
                  params.set(`limit`, `${this.rowsPerPage + 1 - formatedData2.length}`);
                  this.http.get<any>(`http://167.99.149.6:3000/history/eth`, {headers, params})
                    .subscribe(originalData3 => {
                      const data3 = this.filterByDate(originalData3);
                      const formatedData3 = formatedData2.concat(this.formatProduct(data3));
                      this.tableData.next(formatedData3);
                      this.isBusy.next(false);
                    });
                } else {
                  this.tableData.next(formatedData2);
                  this.isBusy.next(false);
                }
              });
          } else {
            this.tableData.next(formatedData1);
            this.isBusy.next(false);
          }
        });
    } else {
      const curr: string = this.currency.split('-')[0].toLowerCase();
      this.http.get<any>(`http://167.99.149.6:3000/history/${curr}`, {headers, params})
        .subscribe(originalData => {
          this.handleHistoryResults(originalData);
        });
    }
  }
  // TODO: When data runs out, but more is needed (and 'ALL' is currency type),
  // use currType array to increment to next currType.
  handleHistoryResults(originalData: {}[]): void {
    // No data returned. No more data.
    // Return what has been collected.
    if (!originalData.length) {
      this.tableData.next(this.tableResults);
      this.isBusy.next(false);
      return;
    // Looking at data older than the earliest desired
    // date (passed filter range)
    // Return what has been collected.
    } else if (
      originalData[0]
      && originalData[0]['created_at']
      && new Date(originalData[0]['created_at']).getTime() < this.startDate.getTime()) {
      this.tableData.next(this.tableResults);
      this.isBusy.next(false);
      return;
    }
    // See how much of the data is usedful.
    const data = this.filterByDate(originalData);
    // None of the data fits, book mark last and keep moving.
    if (!data.length) {
      this.bookmark = originalData[originalData.length - 1]['id'];
      setTimeout(() => {
        this.getLatestGdaxHistoryData();
      }, 500);
      return;
    // All returned results were good.
    // Take what is needed to fill the page.
    } else if (originalData.length === data.length) {
      const formatedData = this.formatProduct(data);
      // No previously stored results. Send everything from query.
      if (!this.tableResults.length) {
        this.bookmark = formatedData[formatedData.length - 2]['id'];
        this.tableData.next(formatedData);
        this.isBusy.next(false);
        return;
      // Some results previously stored. Take only what's needed.
      } else {
        const deficit = (this.rowsPerPage + 1) - this.tableResults.length;
        this.tableResults = this.tableResults.concat(formatedData.slice(0, deficit));
        this.bookmark = this.tableResults[this.tableResults.length - 2]['id'];
        this.tableData.next(this.tableResults);
        this.isBusy.next(false);
        return;
      }
    } else {
      const deficit = (this.rowsPerPage + 1) - this.tableResults.length;
      const formatedData = this.formatProduct(data);
      // No/some previously stored results, but not enough to fulfil page.
      // Add everything to results and run query again for more.
      if (!this.tableResults.length || deficit > formatedData.length) {
        this.tableResults = this.tableResults.concat(formatedData);
        this.bookmark = formatedData[formatedData.length - 1]['id'];
        setTimeout(() => {
          this.getLatestGdaxHistoryData();
        }, 500);
        return;
      // Some results previously stored. Take only what's needed.
      } else if (deficit > formatedData.length) {
        this.tableResults = this.tableResults.concat(formatedData.slice(0, deficit));
        this.bookmark = this.tableResults[this.tableResults.length - 2]['id'];
        this.tableData.next(this.tableResults);
        this.isBusy.next(false);
        return;
      }
    }
  }
  /**
  * Call to GDAX for profit data
  */
  getLatestGdaxProfitData(): void {

  }
  /**
  * Call to GDAX for cryptobot data
  */
  getLatestCryptoBotData(): void {

  }
  /**
  * Determines which data api to use based off of basePath, and calls it.
  */
  refreshData(): void {
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
