import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, UrlSegment } from '@angular/router';

import { GdaxDataService } from '../../services/gdax-data.service';

@Component({
  selector: 'app-trading-history',
  templateUrl: './trading-history.component.html',
  styleUrls: ['./trading-history.component.scss']
})
export class TradingHistoryComponent implements OnInit {
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
        this.timeoutId = setTimeout(() => {
          this.isBusy = data;
        }, 1000);
      });
    this.activatedRouter.url
      .subscribe((segments: UrlSegment[]) => {
        this.pathState = segments[0]['path'];
        this.gdaxDataService.changeCurrencyType(this.pathState, 'trading-history');
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
      this.isBusy = true;
      this.page = 1;
      this.gdaxDataService.changeRowsPerPage(this.rowsPerPage);
    }
  }
  /**
  * When new data is received, it's passed to this function.
  * Here the table details are assembled, and the tableReady flag is released.
  * @param data queried trading history data passed from the GdaxDataService.
  */
  updateTable(data: {}[]): void {
    this.tableReady = false;
    if (!data.length) {
      this.table = [];
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
