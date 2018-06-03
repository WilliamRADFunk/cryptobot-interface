import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, UrlSegment } from '@angular/router';

import { Chart } from 'angular-highcharts';

import { GdaxDataService } from '../../services/gdax-data.service';
import { CurrencyPipe } from '@angular/common';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-profit-portfolio',
  templateUrl: './profit-portfolio.component.html',
  styleUrls: ['./profit-portfolio.component.scss']
})
export class ProfitPortfolioComponent implements OnDestroy, OnInit {
  /**
  * Makes unsubscribing from this variable possible in OnDestroy
  */
  busySubscription: Subscription;
  /**
  * The main chart object to be constructed whenever new
  * data is returned from the service.
  */
  chart: Chart;
  /**
  * Makes unsubscribing from this variable possible in OnDestroy
  */
  chartDataSubscription: Subscription;
  /**
  * Checks with service to see if it's busy in a query,
  * and puts table in standby mode until it's ready.
  */
  isBusy: boolean = true;
  /**
  * Flag to let ui show no data returned message
  */
  isEmpty: boolean;
  /**
  * The initial path state passed in by the activatedRouter.
  * Keeps track of what currency the chart should be viewing.
  */
  pathState: string = 'BTC-USD';
  /**
  * Makes unsubscribing from this variable possible in OnDestroy
  */
  urlSubscription: Subscription;

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
  * @private
  * Triggered when component is destroyed, but before it's officially dead
  * this runs cleanup functionality to protect against misfired queries.
  */
  ngOnDestroy() {
    if (this.busySubscription) {
      this.busySubscription.unsubscribe();
      this.busySubscription = null;
    }
    if (this.chartDataSubscription) {
      this.chartDataSubscription.unsubscribe();
      this.chartDataSubscription = null;
    }
    if (this.urlSubscription) {
      this.urlSubscription.unsubscribe();
      this.urlSubscription = null;
    }
    this.gdaxDataService.kill();
  }
  /**
  * Triggered when component is loaded, but before it is viewed.
  * Gets REST path info, and updates the profit chart.
  */
  ngOnInit(): void {
    this.busySubscription = this.gdaxDataService.isBusy
      .subscribe(data => {
        this.isBusy = data;
      });
    this.urlSubscription = this.activatedRouter.url
      .subscribe((segments: UrlSegment[]) => {
        this.pathState = segments[0]['path'];
        this.gdaxDataService.changeCurrencyType(this.pathState, 'profit-portfolio', true);
      });
    this.chartDataSubscription = this.gdaxDataService.chartData
      .subscribe(this.updateChart.bind(this));
  }
  /**
  * When new data is received, it's passed to this function.
  * Here the chart details assembled, and the chartReady flag is released.
  * @param data queried market data passed from the GdaxDataService.
  */
  updateChart(data: number[][]): void {
    this.isEmpty = false;
    if (!data.length) {
      this.isEmpty = true;
      return;
    }
    data = data.reverse();
    const options = {};
    options['chart'] = {
      type: 'column',
      backgroundColor: 'rgba(255, 255, 255, 0)'
    };
    options['title'] = {
      text: this.pathState
    };
    options['credits'] = {
      enabled: false
    };
    if (this.pathState === 'ALL') {
      options['series'] = [
        {
          name: 'BTC-USD',
          color: '#2d2d31',
          data: []
        },
        {
          name: 'LTC-USD',
          color: '#ff0000',
          data: []
        },
        {
          name: 'ETH-USD',
          color: '#ffff00',
          data: []
        }
      ];
    } else {
      const spend = [];
      const earn = [];
      const profit = [];
      for (let i = 0; i < data.length; i++) {
        if (!data[i][3]) {
          continue;
        }
        spend.push(data[i][0]);
        earn.push(data[i][1]);
        profit.push(data[i][2]);
      }
      options['series'] = [
      {
        name: 'Spent',
        data: spend
      }, {
        name: 'Earned',
        data: earn
      }, {
        name: 'Profit',
        data: profit
      }];
    }
    options['xAxis'] = {
      title: {
        text: null
      },
      labels: {
        formatter: function() {
          return data && data[this.value] && data[this.value][3];
        },
        shared: true
      }
    };
    options['yAxis'] = {
      title: {
        text: null
      }
    };
    options['tooltip'] = {
      formatter: function() {
        const moneyPipe = new CurrencyPipe('en-US');
        const fun = val => {
          return `
            <table>
              <tr>
                <td>Date:</td><td>${data[val][3]}</td>
              </tr>
              <tr>
                <td>${this.series.name}:</td><td>${moneyPipe.transform(this.y)}</td>
              </tr>
            </table>`;
        };
        const label = fun(this.x);
        return label;
      },
      useHTML: true
    };
    this.chart = new Chart(options);
  }
}
