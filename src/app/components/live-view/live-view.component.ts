import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { Chart } from 'angular-highcharts';

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
            data: []
          }]
        });
        data.forEach(element => {
          this.chart.addPoint(element[4]);
        });
      });
  }
}
