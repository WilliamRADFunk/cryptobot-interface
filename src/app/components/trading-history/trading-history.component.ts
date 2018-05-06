import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, UrlSegment, ParamMap } from '@angular/router';

import { GdaxDataService } from '../../services/gdax-data.service';

@Component({
  selector: 'app-trading-history',
  templateUrl: './trading-history.component.html',
  styleUrls: ['./trading-history.component.scss']
})
export class TradingHistoryComponent implements OnInit {
  /**
  * Array of flags to determine if initial param and url pull is done before triggering
  * the service to query for data. First is currencyType. Second is rowsPerPage.
  */
  firstTime: boolean[] = [true, true];
  /**
  * Checks with service to see if it's busy in a query,
  * and puts table in standby mode until it's ready.
  */
  isBusy: boolean = true;
  /**
  * Flag to disable next page button if there is no more data.
  */
  isNoNextPage: boolean = false;
  /**
  * Flag to disable previous page button if user is on first page.
  */
  isNoPrevPage: boolean = true;
  /**
  * Current page number
  */
  page: number = 1;
  /**
  * Holds query params to check against in other parts of component
  */
  params: ParamMap;
  /**
  * The initial path state passed in by the activatedRouter.
  * Keeps track of what currency the chart should be viewing.
  */
  pathState: string = 'BTC-USD';
  /**
  * Number of rows to show per page
  */
  rowsPerPage: number = 10;
  /**
  * Options for number of rows to show per page
  */
  rowAmounts: number[] = [10, 25, 50, 75];
  /**
  * The main table object to be constructed whenever new
  * data is returned from the service.
  */
  table: {}[] = [];
  /**
  * The initial path state passed in by the activatedRouter.
  * Keeps track of what currency the chart should be viewing.
  */
  tableReady: boolean = false;
  /**
  * The main table object to be constructed whenever new
  * data is returned from the service.
  */
  timeoutId: any = null;
  /**
  * Constructor for the class. Injects Angular's ActivatedRoute, and Router services
  * @param activatedRouter Angular's ActivatedRoute service for knowing current route
  * @param router Angular's Router service for changing route
  * @param gdaxDataService Internal service to get queried market data.
  */
  constructor(
    private activatedRouter: ActivatedRoute,
    private router: Router,
    private gdaxDataService: GdaxDataService) { }
  /**
  * Triggered when component is loaded, but before it is viewed.
  * Gets REST path info, and updates the history table.
  */
  ngOnInit(): void {
    this.gdaxDataService.isBusy
      .subscribe(data => {
        this.isBusy = data;
      });
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
      });
    this.activatedRouter.queryParamMap
      .subscribe((params: ParamMap) => {
        this.params = params;
        this.handleRowsPerPageParam();
        // Whether rows is a parameter or not, mark the firsttime as false to let
        // currencyType know it's ready for query.
        this.firstTime[1] = false;
      });
    this.gdaxDataService.page
      .subscribe(data => {
        this.page = data;
        if (this.page === 1) {
          this.isNoPrevPage = true;
        }
      });
    this.gdaxDataService.tableData
      .subscribe(this.updateTable.bind(this));
  }
  /**
  * Called when user clicked next or previous page button
  * @param direction  'prev' for previous page, 'next' for next page
  */
  changedPageNumber(direction: string): void {
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
  changedRowsPerPage(newRowsPerPage: number): void {
    if (this.rowsPerPage !== newRowsPerPage) {
      this.rowsPerPage = newRowsPerPage;
      this.page = 1;
      this.isBusy = true;
      this.updateParams({
        ...this.activatedRouter.snapshot.queryParams,
        rows: this.rowsPerPage.toString()
      });
      this.gdaxDataService.changeRowsPerPage(this.rowsPerPage);
    }
  }
  /**
  * @private
  * Checks if url params contain rows and use it if valid.
  * If invalid or not present, fallback to the component default.
  * Then update the params and service to know the outcome.
  */
  handleRowsPerPageParam() {
    // If valid option for rowsPerPage, use it, and signal the service
    if (this.params.has('rows')
    && Number(this.params.get('rows'))
    && this.rowAmounts.indexOf(Number(this.params.get('rows'))) > -1) {
    this.rowsPerPage = Number(this.params.get('rows'));
    // If invalid option for rowsPerPage, or not present in params,
    // fall back to first option, and signal the service
    } else {
      this.rowsPerPage = this.rowAmounts[0];
    }

    this.updateParams({
      ...this.activatedRouter.snapshot.queryParams,
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
  updateParams(params: {}) {
    this.router.navigate([], {
      queryParams: params,
      queryParamsHandling: 'merge'
    });
  }
  /**
  * When new data is received, it's passed to this function.
  * Here the table details are assembled, and the tableReady flag is released.
  * @param data queried trading history data passed from the GdaxDataService.
  */
  updateTable(data: {}[]): void {
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
          const dateOptions = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
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
}
