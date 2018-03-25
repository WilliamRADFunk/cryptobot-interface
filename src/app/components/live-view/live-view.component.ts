import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { Chart, Highcharts } from 'angular-highcharts';

import { GdaxDataService } from '../../services/gdax-data.service';

@Component({
  selector: 'app-live-view',
  templateUrl: './live-view.component.html',
  styleUrls: ['./live-view.component.scss']
})
export class LiveViewComponent implements OnInit {
  chart: Chart;
  pathState: string = 'BTC-USD';

  constructor(
    private activatedRouter: ActivatedRoute,
    private router: Router,
    private gdaxDataService: GdaxDataService) { }

  ngOnInit() {
    this.activatedRouter.url
      .subscribe((segments: UrlSegment[]) => {
        this.pathState = segments[0]['path'];
      });
    this.gdaxDataService.getLatestGdaxData('BTC-USD')
      .subscribe(data => {
        console.log(data);
        this.chart = new Chart({
          chart: {
            type: 'line',
            backgroundColor: 'rgba(255, 255, 255, 0)'
          },
          title: {
            text: this.pathState
          },
          credits: {
            enabled: false
          },
          series: [{
            name: this.pathState,
            color: '#2d2d31',
            data: []
          }],
          xAxis: {
            title: {
              text: null
            }
          },
          yAxis: {
            title: {
              text: null
            }
          }
        });
        const dps = [];
        data.forEach(element => {
          const dp = {
            value: element[4],
            x: new Date(element[0] * 1000),
            y: element[4],
          };
          dps.push(dp);
        });
        dps.reverse();
        dps.forEach(element => {
          this.chart.addPoint(element);
        });
      });
  }
}
