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
  * Array of flags to determine if initial filtering params have called in
  * the service to query for data. First is route component params.
  * Second is granularity, Third is startDateTime. Fourth is endDateTime.
  */
  firstTime: boolean[] = [true, true, true, true];
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
  currTypes: string[] = ['btc', 'ltc', 'eth'];
  currIndex: number = 0;

  /**
  * Constructor for the class. Injects Angular's HttpClient service
  * @param http Angular's HttpClient service for making http calls
  */
  constructor(private http: HttpClient) { }
  /**
  * Updates the currency type being viewed, and refreshes query results.
  * @param currency the currency string (ie. 'BTC-USD')
  * @param basePath keeps track of basepath to determine which options to turn on and off
  * @param refresh flag to refresh the query. Helps to wait until all url details are pulled
  */
  changeCurrencyType(currency: string, basePath: string, refresh?: boolean): void {
    this.tableResults = [];
    this.page.next(1);
    this.basePath = basePath;
    this.currency = currency;
    this.bookmark = undefined;
    if (refresh) {
      this.firstTime[0] = false;
    }
    if (refresh && this.firstTime.indexOf(true) < 0) {
      this.refreshData();
    }
  }
  /**
  * Updates the end datetime being viewed, and refreshes query results.
  * @param date the end datetime object
  * @param initChange flag to signal it's an original change (prevents multiple query calls onInit)
  */
  changeEndDateTime(date: Date, initChange?: boolean): void {
    this.tableResults = [];
    this.page.next(1);
    this.endDate = date;
    this.bookmark = undefined;
    if (initChange) {
      this.firstTime[3] = false;
    }
    if (this.firstTime.indexOf(true) < 0) {
      this.refreshData();
    }
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
      this.currIndex = this.currTypes.indexOf(this.tableData.value[0]['product'].toLowerCase());
      this.bookmark = -this.tableData.value[0]['id'];
    } else {
      // One extra result is captured, but ignored in table (for isNoNextPage),
      // But, don't want to lose the result when next page is clicked.
      this.bookmark = this.tableData.value[this.tableData.value.length - 2]['id'];
    }
    this.page.next(page);
    this.refreshData(true);
  }
  /**
  * Updates the number of rows per page,
  * and refreshes query results.
  * @param rowsPerPage the granularity to use
  * @param initChange flag to signal it's an original change (prevents multiple query calls onInit)
  */
  changeRowsPerPage(rowsPerPage: number, initChange?: boolean): void {
    this.tableResults = [];
    this.rowsPerPage = rowsPerPage;
    this.page.next(1);
    this.bookmark = undefined;
    if (initChange) {
      this.firstTime[0] = false;
    }
    if (this.firstTime.indexOf(true) < 0) {
      this.refreshData();
    }
  }
  /**
  * Updates the start datetime being viewed, and refreshes query results.
  * @param date the start datetime object
  * @param initChange flag to signal it's an original change (prevents multiple query calls onInit)
  */
  changeStartDateTime(date: Date, initChange?: boolean): void {
    this.tableResults = [];
    this.page.next(1);
    this.startDate = date;
    this.bookmark = undefined;
    if (initChange) {
      this.firstTime[2] = false;
    }
    if (this.firstTime.indexOf(true) < 0) {
      this.refreshData();
    }
  }
  /**
  * Updates the granularity of the data points,
  * and refreshes query results.
  * @param interval the granularity to use
  * @param initChange flag to signal it's an original change (prevents multiple query calls onInit)
  */
  changeTimeInterval(interval: number, initChange?: boolean): void {
    this.interval = interval;
    if (initChange) {
      this.firstTime[1] = false;
    }
    if (this.firstTime.indexOf(true) < 0) {
      this.refreshData();
    }
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
        e1['product'] = 'USD';
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
                  setTimeout(() => {
                    this.isBusy.next(false);
                  }, 300);
                });
            });
        });
    } else {
      this.http.get<any>(`https://api.gdax.com/products/${this.currency}/candles`, {headers, params})
        .subscribe(data => {
          this.chartData.next(data);
          setTimeout(() => {
            this.isBusy.next(false);
          }, 300);
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
    if (this.currency === 'ALL') {
      this.http.get<any>(`http://167.99.149.6:3000/history/${this.currTypes[this.currIndex]}`, {headers, params})
        .subscribe(originalData => {
          this.handleHistoryResults(originalData);
        });
    } else {
      const curr: string = this.currency.split('-')[0].toLowerCase();
      this.http.get<any>(`http://167.99.149.6:3000/history/${curr}`, {headers, params})
        .subscribe(originalData => {
          this.handleHistoryResults(originalData);
        });
    }
  }
  handleHistoryResults(originalData: {}[]): void {
    // No data returned. No more data.
    // If 'ALL' and other currencies left, try those.
    if (!originalData.length
      && this.currency === 'ALL'
      && this.currIndex < this.currTypes.length - 1) {
      console.log('0');
      this.currIndex++;
      this.bookmark = undefined;
      setTimeout(() => {
        console.log('-0');
        this.getLatestGdaxHistoryData();
      }, 500);
      return;
    // No data returned. No more data.
    // Return what has been collected.
    } else if (!originalData.length) {
      this.tableData.next(this.tableResults);
      setTimeout(() => {
        this.isBusy.next(false);
      }, 300);
      return;
    // Looking at data older than the earliest desired
    // date (passed filter range)
    // Return what has been collected.
    } else if (
      originalData[0]
      && originalData[0]['created_at']
      && new Date(originalData[0]['created_at']).getTime() < this.startDate.getTime()) {
      if (this.currency === 'ALL' && this.currIndex < this.currTypes.length - 1) {
        this.currIndex++;
        this.bookmark = undefined;
        setTimeout(() => {
          this.getLatestGdaxHistoryData();
        }, 500);
        return;
      } else {
        this.bookmark = undefined;
        this.tableData.next(this.tableResults);
        setTimeout(() => {
          this.isBusy.next(false);
        }, 300);
        return;
      }
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
      // No previously stored results. Results less than needed.
      // Currency type 'ALL' and still have currencies left.
      if (!this.tableResults.length
        && data.length < (this.rowsPerPage + 1)
        && this.currency === 'ALL'
        && this.currIndex < this.currTypes.length - 1) {
        this.currIndex++;
        this.tableResults = this.tableResults.concat(formatedData);
        this.bookmark = undefined;
        setTimeout(() => {
          this.getLatestGdaxHistoryData();
        }, 500);
        return;
      // No previously stored results. Send everything from query.
      } else if (!this.tableResults.length) {
        this.bookmark = formatedData[formatedData.length - 2]['id'];
        this.tableResults = this.tableResults.concat(formatedData);
        this.tableData.next(this.tableResults);
        setTimeout(() => {
          this.isBusy.next(false);
        }, 300);
        return;
      // Has previously stored results. Results less than needed.
      // Currency type 'ALL' and still have currencies left.
      } else if (
        this.tableResults.length
        && data.length < (this.rowsPerPage + 1)
        && this.currency === 'ALL'
        && this.currIndex < this.currTypes.length - 1) {
        this.currIndex++;
        this.tableResults = this.tableResults.concat(formatedData);
        this.bookmark = undefined;
        setTimeout(() => {
          this.getLatestGdaxHistoryData();
        }, 500);
        return;
      // Some results previously stored. Take only what's needed.
      } else {
        const deficit = (this.rowsPerPage + 1) - this.tableResults.length;
        this.tableResults = this.tableResults.concat(formatedData.slice(0, deficit));
        this.bookmark = this.tableResults[this.tableResults.length - 2]['id'];
        this.tableData.next(this.tableResults);
        setTimeout(() => {
          this.isBusy.next(false);
        }, 300);
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
        setTimeout(() => {
          this.isBusy.next(false);
        }, 300);
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
  * @param isPageChange flag to make sure currIndex isn't reset on page change.
  */
  refreshData(isPageChange?: boolean): void {
    if (this.basePath === 'live-view') {
      this.isRelevant.next(true);
      this.getLatestGdaxData();
    } else if (this.basePath === 'trading-history') {
      if (!isPageChange) {
        this.currIndex = 0;
      }
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
