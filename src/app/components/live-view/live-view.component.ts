import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { Chart, Highcharts } from 'angular-highcharts';

import { GdaxDataService } from '../../services/gdax-data.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-live-view',
  templateUrl: './live-view.component.html',
  styleUrls: ['./live-view.component.scss']
})
export class LiveViewComponent implements OnInit {
  /**
  * The main chart object to be constructed whenever new
  * data is returned from the service.
  */
  chart: Chart;
  /**
  * Flag to prevent chart compilation until after chart is created.
  */
  chartReady: boolean = false;
  /**
  * The initial path state passed in by the activatedRouter.
  * Keeps track of what currency the chart should be viewing.
  */
  pathState: string = 'BTC-USD';

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
  * Triggered when component is loaded, but before it is viewed.
  * Gets REST path info, and updates the profit chart.
  */
  ngOnInit() {
    this.activatedRouter.url
      .subscribe((segments: UrlSegment[]) => {
        this.pathState = segments[0]['path'];
        this.gdaxDataService.changeCurrencyType('BTC-USD');
      });
    this.gdaxDataService.chartData
      .subscribe(this.updateChart.bind(this));
  }
  /**
  * When new data is received, it's passed to this function.
  * Here the chart details assembled, and the chartReady flag is released.
  * @param data queried market data passed from the GdaxDataService.
  */
  updateChart(data: number[][]) {
    if (!data.length) {
      return;
    }
    // console.log('updateChart', data);
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
    options['series'] = [{
      name: this.pathState,
      color: '#2d2d31',
      data: []
    }],
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
    const dps = [];
    data.forEach((element) => {
      const dp = {
        value: element[0],
        x: element[0],
        y: element[4],
      };
      dps.push(dp);
    });
    dps.reverse();
    dps.forEach(element => {
      tempChart.addPoint(element);
    });
    this.chart = tempChart;
    this.chartReady = true;
  }
}
