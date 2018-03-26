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
  chart: Chart;
  chartReady: boolean = false;
  pathState: string = 'BTC-USD';

  constructor(
    private activatedRouter: ActivatedRoute,
    private router: Router,
    private gdaxDataService: GdaxDataService) { }

  ngOnInit() {
    this.activatedRouter.url
      .subscribe((segments: UrlSegment[]) => {
        this.pathState = segments[0]['path'];
        this.gdaxDataService.changeCurrencyType('BTC-USD');
      });
    this.gdaxDataService.chartData
      .subscribe(this.updateChart.bind(this));
  }

  updateChart(data: number[][]) {
    if (!data.length) {
      return;
    }
    console.log('updateChart', data);
    // tslint:disable-next-line:argument-of-type
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
        const fun = val => {
          return `<p>${new Date(val * 1000)}</br>${moneyPipe.transform(this.y)}</p>`;
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
