import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, UrlSegment } from '@angular/router';

import { Chart } from 'angular-highcharts';

import { GdaxDataService } from '../../services/gdax-data.service';

@Component({
  selector: 'app-profit-portfolio',
  templateUrl: './profit-portfolio.component.html',
  styleUrls: ['./profit-portfolio.component.scss']
})
export class ProfitPortfolioComponent implements OnInit {
  /**
  * The main chart object to be constructed whenever new
  * data is returned from the service.
  */
  chart: Chart;
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
  * Gets REST path info, and updates the profit chart.
  */
  ngOnInit(): void {
    this.gdaxDataService.isBusy
      .subscribe(data => {
        this.isBusy = data;
      });
    this.activatedRouter.url
      .subscribe((segments: UrlSegment[]) => {
        this.pathState = segments[0]['path'];
        this.gdaxDataService.changeCurrencyType(this.pathState, 'profit-portfolio', true);
      });
    this.gdaxDataService.chartData
      .subscribe(this.updateChart.bind(this));
  }
  /**
  * When new data is received, it's passed to this function.
  * Here the chart details assembled, and the chartReady flag is released.
  * @param data queried market data passed from the GdaxDataService.
  */
  updateChart(data: number[][]): void {
    // console.log(data);
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
      options['series'] = [
      {
        name: '$ Spent',
        data: [5, 3, 4, 7, 2, 5, 3, 4, 7, 2, 4, 2]
      }, {
        name: '$ Earned',
        data: [2, -2, -3, 2, 1, 2, -2, -3, 2, 1, 8, 1]
      }, {
        name: '$ Profit',
        data: [3, 4, 4, -2, 5, 3, 4, 4, -2, 5, 3, 6]
      }];
    }
    options['xAxis'] = {
      categories: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
      ]
    };
    this.chart = new Chart(options);
  }
}
