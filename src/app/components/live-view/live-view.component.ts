import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { Chart, Highcharts } from 'angular-highcharts';

import { GdaxDataService } from '../../services/gdax-data.service';
import { CurrencyPipe } from '@angular/common';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-live-view',
  templateUrl: './live-view.component.html',
  styleUrls: ['./live-view.component.scss']
})
export class LiveViewComponent implements OnDestroy, OnInit {
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
  * Flag to prevent chart compilation until after chart is created.
  */
  chartReady: boolean = false;
  /**
  * Checks with service to see if it's busy in a query,
  * and puts table in standby mode until it's ready.
  */
  isBusy: boolean = true;
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
  * Constructor for the class. Injects Angular's ActivatedRoute, Router, and GdaxDataService services
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
    console.log('diieeeeee!!!', 'live-view');
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
        this.gdaxDataService.changeCurrencyType(this.pathState, 'live-view', true);
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
    if (!data.length) {
      return;
    }
    const options = {};
    options['chart'] = {
      type: 'line',
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
      options['series'] = [{
        name: this.pathState,
        color: '#2d2d31',
        data: []
      }];
    }
    options['xAxis'] = {
      title: {
        text: null
      },
      // step: 20,
      labels: {
        formatter: function() {
          const fun = val => {
            return new Date(val * 1000).toISOString();
          };
          const label = fun(this.value);
          return label;
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
        const dateOptions = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
        const fun = val => {
          return `
            <table>
              <tr>
                <td>Date:</td><td>${new Date(val * 1000).toLocaleString('en-US', dateOptions)}</td>
              </tr>
              <tr>
                <td>Price:</td><td>${moneyPipe.transform(this.y)}</td>
              </tr>
            </table>`;
        };
        const label = fun(this.x);
        return label;
      },
      useHTML: true
    };
    const tempChart = new Chart(options);
    const dps1 = [];
    const dps2 = [];
    const dps3 = [];
    data.forEach((element) => {
      const dp = {
        value: element[0],
        x: element[0],
        y: element[4],
      };
      if (element.length > 6) {
        if (element[6] === 0) {
          dps1.push(dp);
        } else if (element[6] === 1) {
          dps2.push(dp);
        } else if (element[6] === 2) {
          dps3.push(dp);
        }
      } else {
        dps1.push(dp);
      }
    });
    dps1.reverse();
    dps2.reverse();
    dps3.reverse();
    dps1.forEach(element => {
      tempChart.addPoint(element, 0);
    });
    dps2.forEach(element => {
      tempChart.addPoint(element, 1);
    });
    dps3.forEach(element => {
      tempChart.addPoint(element, 2);
    });
    this.chart = tempChart;
    this.chartReady = true;
  }
}
