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
  * Keeps track of the index for current currency within currTypes for
  * trading history 'ALL' fetches.
  */
  private _currIndex: number = 0;
  /**
  * Contains the types of currency, which allows trading history fetch to iterate
  * through all currencies in the 'ALL' currency type. Dynamically switches API
  * params when one currency type runs out but more results are needed.
  */
  private readonly _currTypes: string[] = ['btc', 'ltc', 'eth'];
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
  * The flag to designate component destruction for preventing accidental query calls.
  */
  private _isKilled: boolean = false;
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
  historySubscription: Subscription;
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
  * Makes unsubscribing from this variable possible in OnDestroy
  */
  profitSubscription: Subscription;
  /**
   * Public observable version of _tableDataBSubject
   */
  public readonly tableData: Observable<{}[]> = this._tableDataBSubject.asObservable();
  /**
  * Makes unsubscribing from this variable possible in OnDestroy
  */
  usdSubscription: Subscription;

  /**
  * Constructor for the class. Injects Angular's HttpClient service
  * @param http Angular's HttpClient service for making http calls
  */
  constructor(private readonly http: HttpClient) { }
  /**
  * Calculates the months after the last profit transaction, adds 0 values
  * and the label, which allows the user to have data for the range they want
  * even if there was no profit or loss during those months. Prettier charts.
  * @return the compiled array of blank data and month-year label
  */
  private _calculateAfterProfitMonths(): number[][] {
    let diffYears;
    let diffMonths;
    const lastResult = this._validProfitResults[0];
    const date = new Date(lastResult['created_at']);
    if (date.getFullYear() === this._endDate.getFullYear()) {
      diffYears = 0;
      diffMonths = this._endDate.getMonth() - date.getMonth();
    } else {
      diffYears = this._endDate.getFullYear() - date.getFullYear();
      diffMonths = (12 * (diffYears - 1)) + (this._endDate.getMonth()) + (11 - date.getMonth());
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
  private _calculateBeforeProfitMonths(): number[][] {
    let diffYears;
    let diffMonths;
    const firstResult = this._validProfitResults[this._validProfitResults.length - 1];
    const date = new Date(firstResult['created_at']);
    if (date.getFullYear() === this._startDate.getFullYear()) {
      diffYears = 0;
      diffMonths = date.getMonth() - this._startDate.getMonth() - 1;
    } else {
      diffYears = date.getFullYear() - this._startDate.getFullYear();
      diffMonths = (12 * (diffYears - 1)) + (11 - this._startDate.getMonth()) + (date.getMonth());
    }
    let year = this._startDate.getFullYear();
    const tempChartData = [];
    for (let m = 0; m < diffMonths + 1; m++) {
      const datapoint = [];
      datapoint[0] = 0;
      datapoint[1] = 0;
      datapoint[2] = 0;
      datapoint[3] = `${MONTH_NAMES[(this._startDate.getMonth() + m) % 12].substr(0, 3)}-${year}`;
      tempChartData.push(datapoint);

      if ((this._startDate.getMonth() + m) % 12 === 11) {
        year++;
      }
    }
    return tempChartData.reverse();
  }
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
                  if (!this._isKilled) {
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
          if (!this._isKilled) {
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
    if (this._currency === 'ALL') {
      this.historySubscription = this.http.get<any>(`${DATA_URL}history/${this._currTypes[this._currIndex]}`, {headers, params})
        .pipe(take(1))
        .subscribe(originalData => {
          // Added protection from recursive or lingering query calls.
          if (!this._isKilled) {
            this._handleHistoryResults(originalData);
          }
        });
    } else {
      const curr: string = this._currency.split('-')[0].toLowerCase();
      this.historySubscription = this.http.get<any>(`${DATA_URL}history/${curr}`, {headers, params})
        .pipe(take(1))
        .subscribe(originalData => {
          // Added protection from recursive or lingering query calls.
          if (!this._isKilled) {
            this._handleHistoryResults(originalData);
          }
        });
    }
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
        .set(`after`, `${this._bookmark}`);
    }
    if (this._currency === 'ALL') {

    } else {
      const curr: string = this._currency.split('-')[0].toLowerCase();
      this.profitSubscription = this.http.get<any>(`${DATA_URL}history/${curr}`, {headers, params})
        .pipe(take(1))
        .subscribe(originalData => {
          // Added protection from recursive or lingering query calls.
          if (!this._isKilled) {
            this._handleProfitResults(originalData, this.profitSubscription);
          }
        });
    }
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
        .set(`after`, `${this._bookmark}`);
    }
    if (this._currency === 'ALL') {

    } else {
      this.usdSubscription = this.http.get<any>(`${DATA_URL}history/usd`, {headers, params})
        .pipe(take(1))
        .subscribe(originalData => {
          // Added protection from recursive or lingering query calls.
          if (!this._isKilled) {
            this._handleUSDResults(originalData, this.usdSubscription);
          }
        });
    }
  }
  /**
  * Recursive query maker until desired results are found
  * @param originalData data used to check against to see if current results are sufficient
  */
  private _handleHistoryResults(originalData: {}[]): void {
    // Added protection from recursive or lingering query calls.
    if (this._isKilled) {
      return;
    }
    // No data returned. No more data.
    // If 'ALL' and other currencies left, try those.
    if (!originalData.length
      && this._currency === 'ALL'
      && this._currIndex < this._currTypes.length - 1) {
      this._currIndex++;
      this._bookmark = null;
      setTimeout(() => {
        this._getLatestGdaxHistoryData();
      }, 500);
      return;
    // No data returned. No more data.
    // Return what has been collected.
    } else if (!originalData.length) {
      this._tableDataBSubject.next(this._tableResults);
      setTimeout(() => {
        this._isBusyBSubject.next(false);
      }, 300);
      return;
    // Looking at data older than the earliest desired
    // date (passed filter range)
    // Return what has been collected.
    } else if (
      originalData[0]
      && originalData[0]['created_at']
      && new Date(originalData[0]['created_at']).getTime() < this._startDate.getTime()) {
      if (this._currency === 'ALL' && this._currIndex < this._currTypes.length - 1) {
        this._currIndex++;
        this._bookmark = null;
        setTimeout(() => {
          this._getLatestGdaxHistoryData();
        }, 500);
        return;
      } else {
        this._bookmark = null;
        this._tableDataBSubject.next(this._tableResults);
        setTimeout(() => {
          this._isBusyBSubject.next(false);
        }, 300);
        return;
      }
    }
    // See how much of the data is usedful.
    const data = this._filterByDate(originalData);
    // None of the data fits, book mark last and keep moving.
    if (!data.length) {
      this._bookmark = originalData[originalData.length - 1]['id'];
      setTimeout(() => {
        this._getLatestGdaxHistoryData();
      }, 500);
      return;
    // All returned results were good.
    // Take what is needed to fill the page.
    } else if (originalData.length === data.length) {
      const formatedData = this._formatProduct(data);
      // No previously stored results. Results less than needed.
      // Currency type 'ALL' and still have currencies left.
      if (!this._tableResults.length
        && data.length < (this._rowsPerPage + 1)
        && this._currency === 'ALL'
        && this._currIndex < this._currTypes.length - 1) {
        this._currIndex++;
        this._tableResults = this._tableResults.concat(formatedData);
        this._bookmark = null;
        setTimeout(() => {
          this._getLatestGdaxHistoryData();
        }, 500);
        return;
      // No previously stored results. Send everything from query.
      } else if (!this._tableResults.length) {
        this._bookmark = formatedData[formatedData.length - 2]['id'];
        this._tableResults = this._tableResults.concat(formatedData);
        this._tableDataBSubject.next(this._tableResults);
        setTimeout(() => {
          this._isBusyBSubject.next(false);
        }, 300);
        return;
      // Has previously stored results. Results less than needed.
      // Currency type 'ALL' and still have currencies left.
      } else if (
        this._tableResults.length
        && data.length < (this._rowsPerPage + 1)
        && this._currency === 'ALL'
        && this._currIndex < this._currTypes.length - 1) {
        this._currIndex++;
        this._tableResults = this._tableResults.concat(formatedData);
        this._bookmark = null;
        setTimeout(() => {
          this._getLatestGdaxHistoryData();
        }, 500);
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
    } else {
      const deficit = (this._rowsPerPage + 1) - this._tableResults.length;
      const formatedData = this._formatProduct(data);
      // No/some previously stored results, but not enough to fulfil page.
      // Add everything to results and run query again for more.
      if (!this._tableResults.length && deficit > formatedData.length) {
        this._tableResults = this._tableResults.concat(formatedData);
        this._bookmark = formatedData[formatedData.length - 1]['id'];
        setTimeout(() => {
          this._getLatestGdaxHistoryData();
        }, 500);
        return;
      // Some results previously stored. Take only what's needed.
      } else if (deficit > formatedData.length) {
        this._tableResults = this._tableResults.concat(formatedData.slice(0, deficit));
        this._bookmark = this._tableResults[this._tableResults.length - 2]['id'];
        this._tableDataBSubject.next(this._tableResults);
        setTimeout(() => {
          this._isBusyBSubject.next(false);
        }, 300);
        return;
      }
    }
  }
  /**
  * Recursive query maker until desired results are found
  * @param originalData data used to check against to see if current results are sufficient
  */
  private _handleProfitResults(originalData: {}[], subscription): void {
    subscription.unsubscribe();
    // Added protection from recursive or lingering query calls.
    if (this._isKilled) {
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
      if (dateTime < this._startDate.getTime()) {
        this._organizeProfitData();
        this._chartDataBSubject.next(this._profitChartData.slice());
        this._bookmark = null;
        setTimeout(() => {
          this._isBusyBSubject.next(false);
        }, 300);
        return;
      // Found a valid result, add it to the pile.
      } else if (dateTime < this._endDate.getTime()) {
        this._bookmark = id;
        this._validProfitResults.push(originalData[i]);
      // Result is too early, mark it and move on.
      } else {
        this._bookmark = id;
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
  private _handleUSDResults(originalData: {}[], subscription): void {
    subscription.unsubscribe();
    // Added protection from recursive or lingering query calls.
    if (this._isKilled) {
      return;
    }
    // Unexpectedly ran out of for-loop results. Move on.
    if (!originalData.length) {
      this._bookmark = null;
      this._getLatestGdaxProfitData();
      return;
    }
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
      if (dateTime < this._startDate.getTime()) {
        this._bookmark = null;
        this._getLatestGdaxProfitData();
        return;
      // Found a valid result, add it to the pile.
      } else if (dateTime < this._endDate.getTime()) {
        this._bookmark = id;
        this._validUSDResults.push(originalData[i]);
      // Result is too early, mark it and move on.
      } else {
        this._bookmark = id;
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
    if (this._isKilled) {
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
    this._profitChartData = this._calculateAfterProfitMonths().slice();
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
      // It's a new month. Tally up the month and send it in before resetting
      // everything and establishing the new current month and year.
      if (currMonth !== date.getMonth() || currYear !== date.getFullYear()) {
        const datapoint = [];
        datapoint[0] = monthlySpendTally;
        datapoint[1] = monthlyEarnTally;
        datapoint[2] = monthlyEarnTally - monthlySpendTally;
        datapoint[3] = `${MONTH_NAMES[currMonth].substr(0, 3)}-${currYear}`;
        this._profitChartData.push(datapoint);
        currMonth = date.getMonth();
        currYear = date.getFullYear();
        monthlySpendTally = 0;
        monthlyEarnTally = 0;
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
        currMonth = date.getMonth();
        currYear = date.getFullYear();
        const datapoint = [];
        datapoint[0] = monthlySpendTally;
        datapoint[1] = monthlyEarnTally;
        datapoint[2] = monthlyEarnTally - monthlySpendTally;
        datapoint[3] = `${MONTH_NAMES[currMonth].substr(0, 3)}-${currYear}`;
        this._profitChartData.push(datapoint);
      }
    }
    // Fill in blank months that come before first result.
    this._profitChartData = this._profitChartData.concat(this._calculateBeforeProfitMonths().slice());
    // Rest temp variables, though this is handled elsewhere in the code.
    // Better to be safe in case one of those things accidentally changes.
    this._validUSDResults = [];
    this._validProfitResults = [];
  }
  /**
  * Determines which data api to use based off of basePath, and calls it.
  * @param isPageChange flag to make sure currIndex isn't reset on page change.
  */
  private _refreshData(isPageChange?: boolean): void {
    this._isKilled = false;
    if (this._basePath === 'live-view') {
      this._isRelevantBSubject.next(true);
      this._getLatestGdaxData();
    } else if (this._basePath === 'trading-history') {
      if (!isPageChange) {
        this._currIndex = 0;
      }
      this._isRelevantBSubject.next(false);
      this._getLatestGdaxHistoryData();
    } else if (this._basePath === 'profit-portfolio') {
      this._chartDataBSubject.next([]);
      this._validUSDResults = [];
      this._validProfitResults = [];
      this._isRelevantBSubject.next(false);
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
    if (refresh && !this._firstTime.some(el => el)) {
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
      this._currIndex = this._currTypes.indexOf(this._tableDataBSubject.value[0]['product'].toLowerCase());
      this._bookmark = -this._tableDataBSubject.value[0]['id'];
    } else {
      // One extra result is captured, but ignored in table (for isNoNextPage),
      // But, don't want to lose the result when next page is clicked.
      this._bookmark = this._tableDataBSubject.value[this._tableDataBSubject.value.length - 2]['id'];
    }
    this._pageBSubject.next(page);
    this._refreshData(true);
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
    if (!this._firstTime.some(el => el)) {
      this._refreshData();
    }
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
    this._isKilled = true;
    if (isFilter) {
      this._firstTime = [this._firstTime[0], true, true, true];
    } else {
      this._firstTime[0] = true;
    }
    this._pageBSubject.next(1);
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
    this._chartDataBSubject.next([]);
    this._tableDataBSubject.next([]);
  }
}
