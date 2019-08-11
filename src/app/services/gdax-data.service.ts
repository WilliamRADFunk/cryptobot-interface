import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

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
  private _basePath: string = 'live-view';
  /**
  * Used to keep track of paging
  */
  private _bookmark: number;
  /**
  * The updated query results for historical trade market data in a format
  * that all of the live views will understand and be able to use.
  */
  private readonly _chartDataBSubject: BehaviorSubject<number[][]> = new BehaviorSubject<number[][]>([]);
  /**
  * Currency type which is used as part of the query URL.
  */
  private _currency: string = 'BTC-USD';
  /**
  * The end datetime used as a parameter in the query URL
  */
  private _endDate: Date = null;
  /**
  * Array of flags to determine if initial filtering params have called in
  * the service to query for data. First is route component params.
  * Second is granularity, Third is startDateTime. Fourth is endDateTime.
  */
  private _firstTime: boolean[] = [true, true, true, true];
  /**
  * The granularity between data points. Used as a parameter in query URL
  */
  private _interval: number = 3600;
  /**
  * The flag to designate if query is busy
  */
  private readonly _isBusyBSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  /**
  * The flag to designate if granularity is relevant for basePath api
  */
  private readonly _isRelevantBSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  /**
  * The current number for page in results.
  */
  private readonly _pageBSubject: BehaviorSubject<number> = new BehaviorSubject<number>(1);
  /**
  * Temporary holder for profit portfolio data until recursive search is completed.
  */
  private _profitChartData: number[][] = [];
  /**
  * The current number for rows per page
  */
  private _rowsPerPage: number = 10;
  /**
  * The start datetime used as a parameter in the query URL
  */
  private _startDate: Date = null;
  /**
   * Subscriptions to unsubscribe from onDestroy
   */
  private readonly _subs: Subscription[] = [];
  /**
  * The updated query results for historical trade market data in a format
  * that all of the live views will understand and be able to use.
  */
  private readonly _tableDataBSubject: BehaviorSubject<{}[]> = new BehaviorSubject<{}[]>([]);
  /**
  * Temporary holder for trading history table data until recursive search is completed.
  */
  private _tableResults: {}[] = [];
  /**
  * Contains list of profit results that reside inside filter zone.
  * Used later in organizeProfitData function.
  */
  private _validProfitResults: {}[] = [];
  /**
  * Contains list of usd transaction results that reside inside filter zone.
  * Used later for price of purchase or sale in organizeProfitData function.
  */
  private _validUSDResults: {}[] = [];
  /**
   * Public observable version of _chartDataBSubject
   */
  public readonly chartData: Observable<number[][]> = this._chartDataBSubject.asObservable();
  /**
   * Public observable version of _isBusyBSubject
   */
  public readonly isBusy: Observable<boolean> = this._isBusyBSubject.asObservable();
  /**
   * Public observable version of _isRelevantBSubject
   */
  public readonly isRelevant: Observable<boolean> = this._isRelevantBSubject.asObservable();
  /**
   * Public observable version of _pageBSubject
   */
  public readonly page: Observable<number> = this._pageBSubject.asObservable();
  /**
   * Public observable version of _tableDataBSubject
   */
  public readonly tableData: Observable<{}[]> = this._tableDataBSubject.asObservable();

  /**
  * Constructor for the class. Injects Angular's HttpClient service
  * @param http Angular's HttpClient service for making http calls
  */
  constructor(private readonly http: HttpClient) { }
  /**
  * Only returns elements of data array that fit within user specified time range.
  * @param data array of data objects to be formatted
  * @return     filtered data array
  */
  private _filterByDate(data: {}[]): {}[] {
    data = data || [];
    const newData: {}[] = [];
    data.forEach(element => {
      if (element['created_at']) {
        const date = new Date(element['created_at']);
        if (date.getTime() >= this._startDate.getTime()
          && date.getTime() <= this._endDate.getTime()) {
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
  private _formatProduct(data: {}[]): {}[] {
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
  private _getLatestGdaxData(): void {
    this._isBusyBSubject.next(true);
    this._chartDataBSubject.next([]);
    const headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json');
    const params = new HttpParams()
      .set('granularity', this._interval.toString())
      .set('start', this._startDate.toISOString())
      .set('end', this._endDate.toISOString());
    if (this._currency === 'ALL') {
      this.http.get<any>(`https://api.gdax.com/products/BTC-USD/candles`, {headers, params})
        .pipe(take(1))
        .subscribe(data1 => {
          this.http.get<any>(`https://api.gdax.com/products/LTC-USD/candles`, {headers, params})
            .pipe(take(1))
            .subscribe(data2 => {
              this.http.get<any>(`https://api.gdax.com/products/ETH-USD/candles`, {headers, params})
                .pipe(take(1))
                .subscribe(data3 => {
                  // Added protection from recursive or lingering query calls.
                  if (this._basePath === 'live-view') {
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
                    this._chartDataBSubject.next(data1);
                    setTimeout(() => {
                      this._isBusyBSubject.next(false);
                    }, 300);
                  }
                });
            });
        });
    } else {
      this.http.get<any>(`https://api.gdax.com/products/${this._currency}/candles`, {headers, params})
        .pipe(take(1))
        .subscribe(data => {
          // Added protection from recursive or lingering query calls.
          if (this._basePath === 'live-view') {
            this._chartDataBSubject.next(data);
            setTimeout(() => {
              this._isBusyBSubject.next(false);
            }, 1000);
          }
        });
    }
  }
  /**
  * Call to GDAX for trading history data
  */
  private _getLatestGdaxHistoryData(): void {
    this._isBusyBSubject.next(true);
    const headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('Access-Control-Allow-Origin', INTERFACE_URL)
      .set('Access-Control-Allow-Methods', 'POST, GET')
      .set('Access-Control-Allow-Headers', 'X-PINGOTHER, Content-Type')
      .set('Access-Control-Max-Age', '86400');
    let params;
    if (!this._bookmark) {
      params = new HttpParams()
        .set(`limit`, `${this._rowsPerPage + 1}`);
    } else if (this._bookmark < 0) {
      params = new HttpParams()
        .set(`before`, `${Math.abs(this._bookmark)}`)
        .set(`limit`, `${this._rowsPerPage + 1}`);
    } else {
      params = new HttpParams()
        .set(`after`, `${this._bookmark}`)
        .set(`limit`, `${this._rowsPerPage + 1}`);
    }
    const curr: string = this._currency.split('-')[0].toLowerCase();
    this._subs.push(this.http.get<any>(`${DATA_URL}history/${curr}`, {headers, params})
      .pipe(take(1))
      .subscribe(originalData => {
        // Added protection from recursive or lingering query calls.
        if (this._basePath === 'trading-history') {
          this._handleHistoryResults(originalData);
        }
      }));
  }
  /**
  * Call to GDAX for profit data
  */
  private _getLatestGdaxProfitData(): void {
    this._isBusyBSubject.next(true);
    const headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('Access-Control-Allow-Origin', INTERFACE_URL)
      .set('Access-Control-Allow-Methods', 'POST, GET')
      .set('Access-Control-Allow-Headers', 'X-PINGOTHER, Content-Type')
      .set('Access-Control-Max-Age', '86400');
    let params;
    if (!this._bookmark) {
      params = new HttpParams();
    } else {
      params = new HttpParams()
        .set('after', `${this._bookmark}`)
        .set('limit', '100');
    }
    const curr: string = this._currency.split('-')[0].toLowerCase();
    this._subs.push(this.http.get<any>(`${DATA_URL}history/${curr}`, {headers, params})
      .pipe(take(1))
      .subscribe(originalData => {
        // Added protection from recursive or lingering query calls.
        if (this._basePath === 'profit-portfolio') {
          this._handleProfitResults(originalData);
        }
      }));
  }
  /**
  * Call to GDAX for USD results to later
  * compare crypto profit data against
  */
  private _getLatestGdaxUSDData(): void {
    this._isBusyBSubject.next(true);
    const headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('Access-Control-Allow-Origin', INTERFACE_URL)
      .set('Access-Control-Allow-Methods', 'POST, GET')
      .set('Access-Control-Allow-Headers', 'X-PINGOTHER, Content-Type')
      .set('Access-Control-Max-Age', '86400');
    let params;
    if (!this._bookmark) {
      params = new HttpParams();
    } else {
      params = new HttpParams()
        .set('after', `${this._bookmark}`)
        .set('limit', '100');
    }
    this._subs.push(this.http.get<any>(`${DATA_URL}history/usd`, {headers, params})
      .pipe(take(1))
      .subscribe(originalData => {
        // Added protection from recursive or lingering query calls.
        if (this._basePath === 'profit-portfolio') {
          this._handleUSDResults(originalData);
        }
      }));
  }
  /**
  * Recursive query maker until desired results are found
  * @param originalData data used to check against to see if current results are sufficient
  */
  private _handleHistoryResults(originalData: {}[]): void {
    // Added protection from recursive or lingering query calls.
    if (this._basePath !== 'trading-history') {
      return;
    }
    // No data returned. No more data.
    // Return what has been collected.
    if (!originalData.length) {
      this._tableDataBSubject.next(this._tableResults);
      setTimeout(() => {
        this._isBusyBSubject.next(false);
      }, 300);
      return;
    }
    // All returned results were good.
    // Take what is needed to fill the page.
    const formatedData = this._formatProduct(originalData);
    // No previously stored results. Send everything from query.
    if (!this._tableResults.length) {
      this._bookmark = formatedData[formatedData.length - 2]['id'];
      this._tableResults = this._tableResults.concat(formatedData);
      this._tableDataBSubject.next(this._tableResults);
      setTimeout(() => {
        this._isBusyBSubject.next(false);
      }, 300);
      return;
    // Some results previously stored. Take only what's needed.
    } else {
      const deficit = (this._rowsPerPage + 1) - this._tableResults.length;
      this._tableResults = this._tableResults.concat(formatedData.slice(0, deficit));
      this._bookmark = this._tableResults[this._tableResults.length - 2]['id'];
      this._tableDataBSubject.next(this._tableResults);
      setTimeout(() => {
        this._isBusyBSubject.next(false);
      }, 300);
      return;
    }
  }
  /**
  * Recursive query maker until desired results are found
  * @param originalData data used to check against to see if current results are sufficient
  */
  private _handleProfitResults(originalData: {}[]): void {
    // Added protection from recursive or lingering query calls.
    if (this._basePath !== 'profit-portfolio') {
      return;
    }
    // Unexpectedly ran out of for-loop results.
    // Compute what's there and return.
    if (!originalData.length) {
      this._organizeProfitData();
      this._chartDataBSubject.next(this._profitChartData.slice());
      this._bookmark = null;
      setTimeout(() => {
        this._isBusyBSubject.next(false);
      }, 300);
      return;
    }
    const dateTimeAtStartOfYear = Date.UTC((new Date()).getUTCFullYear(), (new Date()).getMonth());
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
      if (dateTime < dateTimeAtStartOfYear) {
        this._organizeProfitData();
        this._chartDataBSubject.next(this._profitChartData.slice());
        this._bookmark = null;
        setTimeout(() => {
          this._isBusyBSubject.next(false);
        }, 300);
        return;
      // Found a valid result, add it to the pile.
      } else {
        this._bookmark = id;
        this._validProfitResults.push(originalData[i]);
      }
    }
    // Ran out of results for this pull, but haven't hit an end case.
    // Call the query, which will use the updated bookmark to grab newer batch.
    setTimeout(() => {
      this._getLatestGdaxProfitData();
    }, 400);
  }
  /**
  * Recursive query maker until desired results are found
  * @param originalData data used to check against to see if current results are sufficient
  */
  private _handleUSDResults(originalData: {}[]): void {
    // Added protection from recursive or lingering query calls.
    if (this._basePath !== 'profit-portfolio') {
      return;
    }
    // Unexpectedly ran out of for-loop results. Move on.
    if (!originalData.length) {
      this._bookmark = null;
      this._getLatestGdaxProfitData();
      return;
    }
    const dateTimeAtStartOfYear = Date.UTC((new Date()).getUTCFullYear(), (new Date()).getMonth());
    for (let i = 0; i < originalData.length; i++) {
      const date = originalData[i]['created_at'] || null;
      const id = originalData[i]['id'] || null;
      // If it has no "create_at" or "id" it's garbage.
      // Move onto next result to avoid errors.
      if (!date || !id) {
        this._bookmark = null;
        continue;
      }
      // Comparative value of the date value.
      const dateTime = new Date(date).getTime();
      // Stop looking. We've exceeded our search.
      if (dateTime < dateTimeAtStartOfYear) {
        this._bookmark = null;
        this._getLatestGdaxProfitData();
        return;
      // Found a valid result, add it to the pile.
      } else {
        this._bookmark = id;
        this._validUSDResults.push(originalData[i]);
      }
    }
    // Ran out of results for this pull, but haven't hit an end case.
    // Call the query, which will use the updated bookmark to grab newer batch.
    setTimeout(() => {
      this._getLatestGdaxUSDData();
    }, 400);
  }
  /**
  * Assembles the data into a format suitable for the profit portfolio page.
  */
  private _organizeProfitData(): void {
    if (this._basePath !== 'profit-portfolio') {
      return;
    }
    this._profitChartData = [];
    if (!this._validProfitResults.length || !this._validUSDResults.length) {
      return;
    }
    let usdIndex = 0;
    let costGainTally = 0;
    // GDAX API still leaves much to be desired when it comes to transaction
    // history. It doesn't actually say how much USD was gained or spent in
    // the purchase or sale of the cryptocurrency. This takes data from the USD
    // account and matches by date. Adds up balance change and fees, then injects
    // the "profit" value into the cryptocurrency transaction.
    for (let i = 0; i < this._validProfitResults.length; i++) {
      let found = false;
      for (let j = usdIndex; j < this._validUSDResults.length; j++) {
        if (this._validProfitResults[i]['created_at'] === this._validUSDResults[j]['created_at']) {
          found = true;
          usdIndex = j + 1;
          costGainTally += Number(this._validUSDResults[j]['amount']);
        } else if (found) {
          usdIndex = j + 1;
          this._validProfitResults[i]['profit'] = costGainTally;
          costGainTally = 0;
          break;
        }
      }
    }
    // Fill in blank months that come after last result.
    // Now that the profit/loss amount is tied into the transaction,
    // we can sort the data by time category (month).
    let currMonth = -1;
    let currYear = -1;
    let monthlySpendTally = 0;
    let monthlyEarnTally = 0;
    for (let k = 0; k < this._validProfitResults.length; k++) {
      const date = new Date(this._validProfitResults[k]['created_at']);
      // First iteration. Set current month and year for the first time.
      if (currMonth < 0) {
        currMonth = date.getMonth();
        currYear = date.getFullYear();
      }
      // Just a normal iteration. The following if-elseif prevents
      // null or undefined from making its way into the calculation.
      const profit = this._validProfitResults[k]['profit'];
      if (profit < 0) {
        monthlySpendTally += profit;
      } else if (profit >= 0) {
        monthlyEarnTally += profit;
      }
      // Last result. Capture data before leaving the for-loop
      if (k >= this._validProfitResults.length - 1) {
        const datapoint = [];
        datapoint[0] = monthlySpendTally;
        datapoint[1] = monthlyEarnTally;
        datapoint[2] = monthlyEarnTally - monthlySpendTally;
        datapoint[3] = `${MONTH_NAMES[currMonth].substr(0, 3)}-${currYear}`;
        this._profitChartData.push(datapoint);
      }
    }
    // Fill in blank months that come before first result.
    // Rest temp variables, though this is handled elsewhere in the code.
    // Better to be safe in case one of those things accidentally changes.
    this._validUSDResults = [];
    this._validProfitResults = [];
  }
  /**
  * Determines which data api to use based off of basePath, and calls it.
  */
  private _refreshData(): void {
    if (this._basePath === 'live-view') {
      this._isRelevantBSubject.next(true);
      this._getLatestGdaxData();
    } else if (this._basePath === 'trading-history') {
      this._isRelevantBSubject.next(false);
      this._getLatestGdaxHistoryData();
    } else if (this._basePath === 'profit-portfolio') {
      this._isRelevantBSubject.next(false);
      this._chartDataBSubject.next([]);
      this._validUSDResults = [];
      this._validProfitResults = [];
      this._getLatestGdaxUSDData();
    } else if (this._basePath === 'cryptobot-controls') {
      this._isRelevantBSubject.next(false);
      this.getLatestCryptoBotData();
    }
  }
  /**
  * Updates the currency type being viewed, and refreshes query results.
  * @param currency the currency string (ie. 'BTC-USD')
  * @param basePath keeps track of basepath to determine which options to turn on and off
  * @param refresh flag to refresh the query. Helps to wait until all url details are pulled
  */
  public changeCurrencyType(currency: string, basePath: string, refresh?: boolean): void {
    this._tableResults = [];
    this._pageBSubject.next(1);
    this._basePath = basePath;
    this._currency = currency;
    this._bookmark = null;
    if (refresh) {
      this._firstTime[0] = false;
    }
    if (!refresh) {
      return;
    }
    if (!this._firstTime.some(el => el) || this._basePath !== 'live-view') {
      this._refreshData();
    }
  }
  /**
  * Updates the end datetime being viewed, and refreshes query results.
  * @param date the end datetime object
  * @param initChange flag to signal it's an original change (prevents multiple query calls onInit)
  */
  public changeEndDateTime(date: Date, initChange?: boolean): void {
    this._tableResults = [];
    this._pageBSubject.next(1);
    this._endDate = date;
    this._bookmark = null;
    if (initChange) {
      this._firstTime[3] = false;
    }
    if (!this._firstTime.some(el => el)) {
      this._refreshData();
    }
  }
  /**
  * Updates the page number,
  * and refreshes query results.
  * @param page the granularity to use
  */
  public changePageNumber(page: number): void {
    this._tableResults = [];
    if (page === 1) {
      this._bookmark = null;
    } else if (page < this._pageBSubject.value) {
      this._bookmark = -this._tableDataBSubject.value[0]['id'];
    } else {
      // One extra result is captured, but ignored in table (for isNoNextPage),
      // But, don't want to lose the result when next page is clicked.
      this._bookmark = this._tableDataBSubject.value[this._tableDataBSubject.value.length - 2]['id'];
    }
    this._pageBSubject.next(page);
    this._refreshData();
  }
  /**
  * Updates the number of rows per page, and refreshes query results.
  * @param rowsPerPage the granularity to use
  * @param initChange flag to signal it's an original change (prevents multiple query calls onInit)
  */
  public changeRowsPerPage(rowsPerPage: number, initChange?: boolean): void {
    this._tableResults = [];
    this._rowsPerPage = rowsPerPage;
    this._pageBSubject.next(1);
    this._bookmark = null;
    if (initChange) {
      this._firstTime[0] = false;
    }
    this._refreshData();
  }
  /**
  * Updates the start datetime being viewed, and refreshes query results.
  * @param date the start datetime object
  * @param initChange flag to signal it's an original change (prevents multiple query calls onInit)
  */
  public changeStartDateTime(date: Date, initChange?: boolean): void {
    this._tableResults = [];
    this._pageBSubject.next(1);
    this._startDate = date;
    this._bookmark = null;
    if (initChange) {
      this._firstTime[2] = false;
    }
    if (!this._firstTime.some(el => el)) {
      this._refreshData();
    }
  }
  /**
  * Updates the granularity of the data points,
  * and refreshes query results.
  * @param interval the granularity to use
  * @param initChange flag to signal it's an original change (prevents multiple query calls onInit)
  */
  public changeTimeInterval(interval: number, initChange?: boolean): void {
    this._interval = interval;
    if (initChange) {
      this._firstTime[1] = false;
    }
    if (!this._firstTime.some(el => el)) {
      this._refreshData();
    }
  }
  /**
  * Returns the service stored endDatetime
  * @return endDate stored on service from previous entry.
  */
  public getEndDateTime(): Date {
    return this._endDate;
  }
  /**
  * Call to GDAX for cryptobot data
  */
  public getLatestCryptoBotData(): void {

  }
  /**
  * Returns the service stored startDatetime
  * @return startDate stored on service from previous entry.
  */
  public getStartDateTime(): Date {
    return this._startDate;
  }
  /**
  * Resets initialization flags, unsubscribes from all subscriptions,
  * and halts any current queries.
  */
  public kill(isFilter?: boolean) {
    if (isFilter) {
      this._firstTime = [this._firstTime[0], true, true, true];
    } else {
      this._firstTime[0] = true;
    }
    this._pageBSubject.next(1);
    this._subs.forEach(s => s && s.unsubscribe());
    this._subs.length = 0;
    this._chartDataBSubject.next([]);
    this._tableDataBSubject.next([]);
  }
}
