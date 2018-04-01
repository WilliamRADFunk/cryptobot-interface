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
  ngOnInit() {
    this.activatedRouter.url
      .subscribe((segments: UrlSegment[]) => {
        this.pathState = segments[0]['path'];
        this.gdaxDataService.changeCurrencyType(this.pathState, 'profit-portfolio');
      });
    this.chart = new Chart({
      chart: {
        type: 'line'
      },
      title: {
        text: 'BTC-USD'
      },
      credits: {
        enabled: false
      },
      series: [{
        name: 'BTC-USD',
        data: [1, 2, 3]
      }]
    });
  }
}
