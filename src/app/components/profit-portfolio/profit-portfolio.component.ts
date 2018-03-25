import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, UrlSegment } from '@angular/router';

import { Chart } from 'angular-highcharts';

@Component({
  selector: 'app-profit-portfolio',
  templateUrl: './profit-portfolio.component.html',
  styleUrls: ['./profit-portfolio.component.scss']
})
export class ProfitPortfolioComponent implements OnInit {
  chart: Chart;
  pathState: string = 'BTC-USD';

  constructor(
    private activatedRouter: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.activatedRouter.url
      .subscribe((segments: UrlSegment[]) => {
        this.pathState = segments[0]['path'];
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
