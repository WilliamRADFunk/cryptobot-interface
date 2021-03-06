import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, UrlSegment, ParamMap } from '@angular/router';

import { GdaxDataService } from '../../services/gdax-data.service';
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'app-trading-history',
  templateUrl: './trading-history.component.html',
  styleUrls: ['./trading-history.component.scss']
})
export class TradingHistoryComponent implements OnDestroy, OnInit {
  /**
  * Contains the types of currency.
  */
  private readonly currTypes: string[] = ['btc-usd', 'ltc-usd', 'eth-usd'];
  /**
  * Array of flags to determine if initial param and url pull is done
  * before triggering the service to query for data. First is currencyType.
  * Second is rowsPerPage.
  */
  private readonly firstTime: boolean[] = [true, true];
  /**
  * Holds query params to check against in other parts of component
  */
  private _params: ParamMap;
  /**
   * Subscriptions to unsubscribe from onDestroy
   */
  private readonly _subs: Subscription[] = [];
  /**
  * Checks with service to see if it's busy in a query,
  * and puts table in standby mode until it's ready.
  */
  public isBusy: boolean = true;
  /**
  * Flag to disable next page button if there is no more data.
  */
  public isNoNextPage: boolean = false;
  /**
  * Flag to disable previous page button if user is on first page.
  */
  public isNoPrevPage: boolean = true;
  /**
  * The initial path state passed in by the activatedRouter.
  * Keeps track of what currency the chart should be viewing.
  */
  public pathState: string = 'BTC-USD';
  /**
  * Current page number
  */
  public page: number = 1;
  /**
  * Number of rows to show per page
  */
  public rowsPerPage: number = 0;
  /**
  * Options for number of rows to show per page
  */
  public rowAmounts: number[] = [10, 25, 50, 75];
  /**
  * The main table object to be constructed whenever new
  * data is returned from the service.
  */
  public table: {}[] = [];
  /**
  * The initial path state passed in by the activatedRouter.
  * Keeps track of what currency the chart should be viewing.
  */
  public tableReady: boolean = false;
  /**
  * Constructor for the class. Injects Angular's ActivatedRoute,
  * and Router services.
  * @param activatedRouter Angular's service for knowing current route
  * @param router Angular's Router service for changing route
  * @param gdaxDataService Internal service to get queried market data.
  */
  constructor(
    private readonly activatedRouter: ActivatedRoute,
    private readonly router: Router,
    private readonly gdaxDataService: GdaxDataService) { }
  /**
  * Triggered when component is destroyed, but before it's officially dead
  * this runs cleanup functionality to protect against misfired queries.
  */
  ngOnDestroy(): void {
    this._subs.forEach(s => s && s.unsubscribe());
    this._subs.length = 0;
    this.gdaxDataService.kill();
  }
  /**
  * Triggered when component is loaded, but before it is viewed.
  * Gets REST path info, and updates the history table.
  */
  ngOnInit(): void {
    this._subs.push(
      this.gdaxDataService.isBusy
        .subscribe(data => {
          this.isBusy = data;
        }),
      this.activatedRouter.url
        .subscribe((segments: UrlSegment[]) => {
          this.pathState = segments[0]['path'];
          if (this.firstTime[1]) {
            this.gdaxDataService.changeCurrencyType(this.pathState, 'trading-history', false);
          } else {
            this.gdaxDataService.changeCurrencyType(this.pathState, 'trading-history', true);
          }
          // Mark the first time as false to signal rows section query can be made.
          this.firstTime[0] = false;
        }),
      this.activatedRouter.queryParamMap
        .subscribe((params: ParamMap) => {
          this._params = params;
          this._handleRowsPerPageParam();
          // Whether rows is a parameter or not, mark the firsttime as false to let
          // currencyType know it's ready for query.
          this.firstTime[1] = false;
        }),
      this.gdaxDataService.page
        .subscribe(data => {
          this.page = data;
          if (this.page === 1) {
            this.isNoPrevPage = true;
          } else {
            this.isNoPrevPage = false;
          }
        }),
      this.gdaxDataService.tableData
        .subscribe(this._updateTable.bind(this)));
  }

  /**
  * Checks if url params contain rows and use it if valid.
  * If invalid or not present, fallback to the component default.
  * Then update the params and service to know the outcome.
  */
 private _handleRowsPerPageParam(): void {
  // If valid option for rowsPerPage, use it, and signal the service
  if (this._params.has('rows')
    && Number(this._params.get('rows'))
    && this.rowAmounts.indexOf(Number(this._params.get('rows'))) > -1) {
    // If current rowsPerPage is the same as params version,
    // assume it was component that triggered the change.
    if (this.rowsPerPage === Number(this._params.get('rows'))) {
      return;
    }
    this.rowsPerPage = Number(this._params.get('rows'));
  // If invalid option for rowsPerPage, or not present in params,
  // fall back to first option, and signal the service
  } else {
    this.rowsPerPage = this.rowAmounts[0];
  }

  this._updateParams({
    rows: this.rowsPerPage.toString()
  });

  if (this.firstTime[0]) {
    this.gdaxDataService.changeRowsPerPage(this.rowsPerPage, false);
  } else {
    this.gdaxDataService.changeRowsPerPage(this.rowsPerPage, true);
  }
}
/**
* Called when params need updating. Avoids repetition.
* @param params param object used to update queryParams
*/
private _updateParams(params: {}) {
  this.router.navigate([], {
    queryParams: params
  });
}
/**
* When new data is received, it's passed to this function.
* Here the table details are assembled, and the tableReady flag is released.
* @param data queried trading history data passed from the GdaxDataService.
*/
private _updateTable(data: {}[]): void {
  this.tableReady = false;
  this.table = [];
  if (!data.length) {
    this.isNoNextPage = true;
    this.tableReady = true;
    return;
  } else {
    if (data.length <= this.rowsPerPage) {
      this.isNoNextPage = true;
    } else {
      this.isNoNextPage = false;
      data = data.slice(0, -1);
    }
    const tempTable: {}[] = [];
    data.forEach(element => {
      const row = {};
      row['id'] = element['id'];
      if (element['created_at']) {
        const dateOptions = {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric'
        };
        row['date'] = new Date(element['created_at']).toLocaleString('en-US', dateOptions);
      } else {
        row['date'] = 'N/A';
      }
      row['product'] = element['product'];
      if (element['amount']
        && element['type'] !== 'deposit'
        && element['type'] !== 'withdrawal') {
        row['buysell'] = element['amount'] >= 0 ? 'buy' : 'sell';
      } else if (element['amount']) {
        row['buysell'] = '-';
      } else {
        row['buysell'] = 'N/A';
      }
      row['amount'] = Math.abs(element['amount']);
      row['balance'] = element['balance'];
      row['type'] = element['type'];
      tempTable.push(row);
    });
    this.table = tempTable;
    this.tableReady = true;
  }
}
  /**
  * Called when user clicked next or previous page button
  * @param direction  'prev' for previous page, 'next' for next page
  */
  public changedPageNumber(direction: string): void {
    if (direction === 'next' && !this.isNoNextPage) {
      this.page++;
      this.isBusy = true;
      this.gdaxDataService.changePageNumber(this.page);
    } else if (direction === 'prev' && !this.isNoPrevPage) {
      this.page--;
      this.isBusy = true;
      this.gdaxDataService.changePageNumber(this.page);
    }
    if (this.page === 1) {
      this.isNoPrevPage = true;
    } else {
      this.isNoPrevPage = false;
    }
  }
  /**
  * Called when user clicked a different rows per page choice
  * @param newRowsPerPage  new rows per page choice
  */
  public changedRowsPerPage(newRowsPerPage: number): void {
    if (this.rowsPerPage !== newRowsPerPage) {
      this.rowsPerPage = newRowsPerPage;
      this.page = 1;
      this.isBusy = true;
      this._updateParams({
        rows: this.rowsPerPage.toString()
      });
      this.gdaxDataService.changeRowsPerPage(this.rowsPerPage);
    }
  }
}
