import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscriber } from 'rxjs/Subscriber';
import { Observer } from 'rxjs/Observer';
import { Subscription } from 'rxjs/Subscription';

const INTERFACE_URL = 'http://www.williamrobertfunk.com';
const DATA_URL = 'http://167.99.149.6:3000/';

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

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
  * Keeps track of the index for current currency within currTypes for
  * trading history 'ALL' fetches.
  */
  currIndex: number = 0;
  /**
  * Contains the types of currency, which allows trading history fetch to iterate
  * through all currencies in the 'ALL' currency type. Dynamically switches API
  * params when one currency type runs out but more results are needed.
  */
  currTypes: string[] = ['btc', 'ltc', 'eth'];
  /**
  * The end datetime used as a parameter in the query URL
  */
  endDate: Date = null;
  /**
  * Array of flags to determine if initial filtering params have called in
  * the service to query for data. First is route component params.
  * Second is granularity, Third is startDateTime. Fourth is endDateTime.
  */
  firstTime: boolean[] = [true, true, true, true];
  historySubscription: Subscription;
  /**
  * The granularity between data points. Used as a parameter in query URL
  */
  interval: number = 3600;
  /**
  * The flag to designate if query is busy
  */
  isBusy: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  /**
  * The flag to designate component destruction for preventing accidental query calls.
  */
  isKilled: boolean = false;
  /**
  * The flag to designate if granularity is relevant for basePath api
  */
  isRelevant: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  /**
  * The current number for page in results.
  */
  page: BehaviorSubject<number> = new BehaviorSubject<number>(1);
  /**
  * Temporary holder for profit portfolio data until recursive search is completed.
  */
  profitChartData: number[][] = [];
  /**
  * Makes unsubscribing from this variable possible in OnDestroy
  */
  profitSubscription: Subscription;
  /**
  * The current number for rows per page
  */
  rowsPerPage: number = 10;
  /**
  * The start datetime used as a parameter in the query URL
  */
  startDate: Date = null;
  /**
  * The updated query results for historical trade market data in a format
  * that all of the live views will understand and be able to use.
  */
  tableData: BehaviorSubject<{}[]> = new BehaviorSubject<{}[]>([]);
  /**
  * Temporary holder for trading history table data until recursive search is completed.
  */
  tableResults: {}[] = [];
  /**
  * Makes unsubscribing from this variable possible in OnDestroy
  */
  usdSubscription: Subscription;
  /**
  * Contains list of profit results that reside inside filter zone.
  * Used later in organizeProfitData function.
  */
  validProfitResults: {}[] = [];
  /**
  * Contains list of usd transaction results that reside inside filter zone.
  * Used later for price of purchase or sale in organizeProfitData function.
  */
  validUSDResults: {}[] = [];

  /**
  * Constructor for the class. Injects Angular's HttpClient service
  * @param http Angular's HttpClient service for making http calls
  */
  constructor(private http: HttpClient) { }
  /**
  * Calculates the months after the last profit transaction, adds 0 values
  * and the label, which allows the user to have data for the range they want
  * even if there was no profit or loss during those months. Prettier charts.
  * @return the compiled array of blank data and month-year label
  */
  calculateAfterProfitMonths() {
    let diffYears;
    let diffMonths;
    const lastResult = this.validProfitResults[0];
    const date = new Date(lastResult['created_at']);
    if (date.getFullYear() === this.endDate.getFullYear()) {
      diffYears = 0;
      diffMonths = this.endDate.getMonth() - date.getMonth();
    } else {
      diffYears = this.endDate.getFullYear() - date.getFullYear();
      diffMonths = (12 * (diffYears - 1)) + (this.endDate.getMonth()) + (11 - date.getMonth());
    }
    let year = date.getFullYear();
    const tempChartData = [];
    for (let m = 0; m < diffMonths; m++) {
      const datapoint = [];
      datapoint[0] = 0;
      datapoint[1] = 0;
      datapoint[2] = 0;
      datapoint[3] = `${MONTH_NAMES[(date.getMonth() + m + 1) % 12].substr(0, 3)}-${year}`;
      tempChartData.push(datapoint);

      if ((date.getMonth() + m) % 12 === 11) {
        year++;
      }
    }
    return tempChartData;
  }
  /**
  * Calculates the months before the first profit transaction, adds 0 values
  * and the label, which allows the user to have data for the range they want
  * even if there was no profit or loss during those months. Prettier charts.
  * @return the compiled array of blank data and month-year label
  */
  calculateBeforeProfitMonths() {
    let diffYears;
    let diffMonths;
    const firstResult = this.validProfitResults[this.validProfitResults.length - 1];
    const date = new Date(firstResult['created_at']);
    if (date.getFullYear() === this.startDate.getFullYear()) {
      diffYears = 0;
      diffMonths = date.getMonth() - this.startDate.getMonth() - 1;
    } else {
      diffYears = date.getFullYear() - this.startDate.getFullYear();
      diffMonths = (12 * (diffYears - 1)) + (11 - this.startDate.getMonth()) + (date.getMonth());
    }
    let year = this.startDate.getFullYear();
    const tempChartData = [];
    for (let m = 0; m < diffMonths + 1; m++) {
      const datapoint = [];
      datapoint[0] = 0;
      datapoint[1] = 0;
      datapoint[2] = 0;
      datapoint[3] = `${MONTH_NAMES[(this.startDate.getMonth() + m) % 12].substr(0, 3)}-${year}`;
      tempChartData.push(datapoint);

      if ((this.startDate.getMonth() + m) % 12 === 11) {
        year++;
      }
    }
    return tempChartData.reverse();
  }
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
    this.bookmark = null;
    if (refresh) {
      this.firstTime[0] = false;
    }
    if (refresh && !this.firstTime.some(el => el)) {
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
    this.bookmark = null;
    if (initChange) {
      this.firstTime[3] = false;
    }
    if (!this.firstTime.some(el => el)) {
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
      this.bookmark = null;
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
    this.bookmark = null;
    if (initChange) {
      this.firstTime[0] = false;
    }
    if (!this.firstTime.some(el => el)) {
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
    this.bookmark = null;
    if (initChange) {
      this.firstTime[2] = false;
    }
    if (!this.firstTime.some(el => el)) {
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
    if (!this.firstTime.some(el => el)) {
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
  * Returns the service stored endDatetime
  * @return endDate stored on service from previous entry.
  */
  getEndDateTime(): Date {
    return this.endDate;
  }
  /**
  * Call to GDAX for cryptobot data
  */
  getLatestCryptoBotData(): void {

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
      let subscription = this.http.get<any>(`https://api.gdax.com/products/BTC-USD/candles`, {headers, params})
        .subscribe(data1 => {
          subscription.unsubscribe();
          subscription = this.http.get<any>(`https://api.gdax.com/products/LTC-USD/candles`, {headers, params})
            .subscribe(data2 => {
              subscription.unsubscribe();
              subscription = this.http.get<any>(`https://api.gdax.com/products/ETH-USD/candles`, {headers, params})
                .subscribe(data3 => {
                  subscription.unsubscribe();
                  // Added protection from recursive or lingering query calls.
                  if (!this.isKilled) {
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
                  }
                });
            });
        });
    } else {
      const subscription = this.http.get<any>(`https://api.gdax.com/products/${this.currency}/candles`, {headers, params})
        .subscribe(data => {
          subscription.unsubscribe();
          // Added protection from recursive or lingering query calls.
          if (!this.isKilled) {
            this.chartData.next(data);
            setTimeout(() => {
              this.isBusy.next(false);
            }, 1000);
          }
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
      this.historySubscription = this.http.get<any>(`${DATA_URL}history/${this.currTypes[this.currIndex]}`, {headers, params})
        .subscribe(originalData => {
          // Added protection from recursive or lingering query calls.
          if (!this.isKilled) {
            this.handleHistoryResults(originalData);
          }
        });
    } else {
      const curr: string = this.currency.split('-')[0].toLowerCase();
      this.historySubscription = this.http.get<any>(`${DATA_URL}history/${curr}`, {headers, params})
        .subscribe(originalData => {
          // Added protection from recursive or lingering query calls.
          if (!this.isKilled) {
            this.handleHistoryResults(originalData);
          }
        });
    }
  }
  /**
  * Call to GDAX for profit data
  */
  getLatestGdaxProfitData(): void {
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
      params = new HttpParams();
    } else {
      params = new HttpParams()
        .set(`after`, `${this.bookmark}`);
    }
    if (this.currency === 'ALL') {

    } else {
      const curr: string = this.currency.split('-')[0].toLowerCase();
      this.profitSubscription = this.http.get<any>(`${DATA_URL}history/${curr}`, {headers, params})
        .subscribe(originalData => {
          // Added protection from recursive or lingering query calls.
          if (!this.isKilled) {
            this.handleProfitResults(originalData, this.profitSubscription);
          }
        });
    }
  }
  /**
  * Call to GDAX for USD results to later
  * compare crypto profit data against
  */
  getLatestGdaxUSDData(): void {
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
      params = new HttpParams();
    } else {
      params = new HttpParams()
        .set(`after`, `${this.bookmark}`);
    }
    if (this.currency === 'ALL') {

    } else {
      this.usdSubscription = this.http.get<any>(`${DATA_URL}history/usd`, {headers, params})
        .subscribe(originalData => {
          // Added protection from recursive or lingering query calls.
          if (!this.isKilled) {
            this.handleUSDResults(originalData, this.usdSubscription);
          }
        });
    }
  }
  /**
  * Returns the service stored startDatetime
  * @return startDate stored on service from previous entry.
  */
  getStartDateTime(): Date {
    return this.startDate;
  }
  /**
  * Recursive query maker until desired results are found
  * @param originalData data used to check against to see if current results are sufficient
  */
  handleHistoryResults(originalData: {}[]): void {
    // Added protection from recursive or lingering query calls.
    if (this.isKilled) {
      return;
    }
    // No data returned. No more data.
    // If 'ALL' and other currencies left, try those.
    if (!originalData.length
      && this.currency === 'ALL'
      && this.currIndex < this.currTypes.length - 1) {
      this.currIndex++;
      this.bookmark = null;
      setTimeout(() => {
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
        this.bookmark = null;
        setTimeout(() => {
          this.getLatestGdaxHistoryData();
        }, 500);
        return;
      } else {
        this.bookmark = null;
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
        this.bookmark = null;
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
        this.bookmark = null;
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
      if (!this.tableResults.length && deficit > formatedData.length) {
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
  * Recursive query maker until desired results are found
  * @param originalData data used to check against to see if current results are sufficient
  */
  handleProfitResults(originalData: {}[], subscription): void {
    subscription.unsubscribe();
    // Added protection from recursive or lingering query calls.
    if (this.isKilled) {
      return;
    }
    // Unexpectedly ran out of for-loop results.
    // Compute what's there and return.
    if (!originalData.length) {
      this.organizeProfitData();
      this.chartData.next(this.profitChartData.slice());
      this.bookmark = null;
      setTimeout(() => {
        this.isBusy.next(false);
      }, 300);
      return;
    }
    for (let i = 0; i < originalData.length; i++) {
      const date = originalData[i]['created_at'] || null;
      const id = originalData[i]['id'] || null;
      // If it has no "create_at" or "id" it's garbage.
      // Move onto next result to avoid errors.
      if (!date || !id) {
        continue;
      }
      // Comparative value of the date value.
      const dateTime = new Date(date).getTime();
      // Stop looking. We've exceeded our search
      if (dateTime < this.startDate.getTime()) {
        this.organizeProfitData();
        this.chartData.next(this.profitChartData.slice());
        this.bookmark = null;
        setTimeout(() => {
          this.isBusy.next(false);
        }, 300);
        return;
      // Found a valid result, add it to the pile.
      } else if (dateTime < this.endDate.getTime()) {
        this.bookmark = id;
        this.validProfitResults.push(originalData[i]);
      // Result is too early, mark it and move on.
      } else {
        this.bookmark = id;
      }
    }
    // Ran out of results for this pull, but haven't hit an end case.
    // Call the query, which will use the updated bookmark to grab newer batch.
    setTimeout(() => {
      this.getLatestGdaxProfitData();
    }, 400);
  }
  /**
  * Recursive query maker until desired results are found
  * @param originalData data used to check against to see if current results are sufficient
  */
  handleUSDResults(originalData: {}[], subscription): void {
    subscription.unsubscribe();
    // Added protection from recursive or lingering query calls.
    if (this.isKilled) {
      return;
    }
    // Unexpectedly ran out of for-loop results. Move on.
    if (!originalData.length) {
      this.bookmark = null;
      this.getLatestGdaxProfitData();
      return;
    }
    for (let i = 0; i < originalData.length; i++) {
      const date = originalData[i]['created_at'] || null;
      const id = originalData[i]['id'] || null;
      // If it has no "create_at" or "id" it's garbage.
      // Move onto next result to avoid errors.
      if (!date || !id) {
        this.bookmark = null;
        continue;
      }
      // Comparative value of the date value.
      const dateTime = new Date(date).getTime();
      // Stop looking. We've exceeded our search.
      if (dateTime < this.startDate.getTime()) {
        this.bookmark = null;
        this.getLatestGdaxProfitData();
        return;
      // Found a valid result, add it to the pile.
      } else if (dateTime < this.endDate.getTime()) {
        this.bookmark = id;
        this.validUSDResults.push(originalData[i]);
      // Result is too early, mark it and move on.
      } else {
        this.bookmark = id;
      }
    }
    // Ran out of results for this pull, but haven't hit an end case.
    // Call the query, which will use the updated bookmark to grab newer batch.
    setTimeout(() => {
      this.getLatestGdaxUSDData();
    }, 400);
  }
  /**
  * Resets initialization flags, unsubscribes from all subscriptions,
  * and halts any current queries.
  */
  kill() {
    console.log('keel dem!');
    this.isKilled = true;
    this.firstTime = [true, true, true, true];
    this.page.next(1);
    if (this.profitSubscription) {
      this.profitSubscription.unsubscribe();
      this.profitSubscription = null;
    }
    if (this.usdSubscription) {
      this.usdSubscription.unsubscribe();
      this.usdSubscription = null;
    }
    if (this.historySubscription) {
      this.historySubscription.unsubscribe();
      this.historySubscription = null;
    }
    if (this.usdSubscription) {
      this.usdSubscription.unsubscribe();
      this.usdSubscription = null;
    }
  }
  /**
  * Assembles the data into a format suitable for the profit portfolio page.
  */
  organizeProfitData() {
    if (this.isKilled) {
      return;
    }
    this.profitChartData = [];
    if (!this.validProfitResults.length || !this.validUSDResults.length) {
      return;
    }
    let usdIndex = 0;
    let costGainTally = 0;
    // GDAX API still leaves much to be desired when it comes to transaction
    // history. It doesn't actually say how much USD was gained or spent in
    // the purchase or sale of the cryptocurrency. This takes data from the USD
    // account and matches by date. Adds up balance change and fees, then injects
    // the "profit" value into the cryptocurrency transaction.
    for (let i = 0; i < this.validProfitResults.length; i++) {
      let found = false;
      for (let j = usdIndex; j < this.validUSDResults.length; j++) {
        if (this.validProfitResults[i]['created_at'] === this.validUSDResults[j]['created_at']) {
          found = true;
          usdIndex = j + 1;
          costGainTally += Number(this.validUSDResults[j]['amount']);
        } else if (found) {
          usdIndex = j + 1;
          this.validProfitResults[i]['profit'] = costGainTally;
          costGainTally = 0;
          break;
        }
      }
    }
    // Fill in blank months that come after last result.
    this.profitChartData = this.calculateAfterProfitMonths().slice();
    // Now that the profit/loss amount is tied into the transaction,
    // we can sort the data by time category (month).
    let currMonth = -1;
    let currYear = -1;
    let monthlySpendTally = 0;
    let monthlyEarnTally = 0;
    for (let k = 0; k < this.validProfitResults.length; k++) {
      const date = new Date(this.validProfitResults[k]['created_at']);
      // First iteration. Set current month and year for the first time.
      if (currMonth < 0) {
        currMonth = date.getMonth();
        currYear = date.getFullYear();
      }
      // It's a new month. Tally up the month and send it in before resetting
      // everything and establishing the new current month and year.
      if (currMonth !== date.getMonth() || currYear !== date.getFullYear()) {
        const datapoint = [];
        datapoint[0] = monthlySpendTally;
        datapoint[1] = monthlyEarnTally;
        datapoint[2] = monthlyEarnTally - monthlySpendTally;
        datapoint[3] = `${MONTH_NAMES[currMonth].substr(0, 3)}-${currYear}`;
        this.profitChartData.push(datapoint);
        currMonth = date.getMonth();
        currYear = date.getFullYear();
        monthlySpendTally = 0;
        monthlyEarnTally = 0;
      }
      // Just a normal iteration. The following if-elseif prevents
      // null or undefined from making its way into the calculation.
      const profit = this.validProfitResults[k]['profit'];
      if (profit < 0) {
        monthlySpendTally += Math.abs(profit);
      } else if (profit >= 0) {
        monthlyEarnTally += Math.abs(profit);
      }
      // Last result. Capture data before leaving the for-loop
      if (k >= this.validProfitResults.length - 1) {
        currMonth = date.getMonth();
        currYear = date.getFullYear();
        const datapoint = [];
        datapoint[0] = monthlySpendTally;
        datapoint[1] = monthlyEarnTally;
        datapoint[2] = monthlyEarnTally - monthlySpendTally;
        datapoint[3] = `${MONTH_NAMES[currMonth].substr(0, 3)}-${currYear}`;
        this.profitChartData.push(datapoint);
      }
    }
    // Fill in blank months that come before first result.
    this.profitChartData = this.profitChartData.concat(this.calculateBeforeProfitMonths().slice());
    // Rest temp variables, though this is handled elsewhere in the code.
    // Better to be safe in case one of those things accidentally changes.
    this.validUSDResults = [];
    this.validProfitResults = [];
  }
  /**
  * Determines which data api to use based off of basePath, and calls it.
  * @param isPageChange flag to make sure currIndex isn't reset on page change.
  */
  refreshData(isPageChange?: boolean): void {
    this.isKilled = false;
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
      this.chartData.next([]);
      this.validUSDResults = [];
      this.validProfitResults = [];
      this.isRelevant.next(false);
      this.getLatestGdaxUSDData();
    } else if (this.basePath === 'cryptobot-controls') {
      this.isRelevant.next(false);
      this.getLatestCryptoBotData();
    }
  }
}
