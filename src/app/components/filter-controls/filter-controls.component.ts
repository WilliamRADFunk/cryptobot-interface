import { Component, OnInit } from '@angular/core';

import { GdaxDataService } from '../../services/gdax-data.service';

@Component({
  selector: 'app-filter-controls',
  templateUrl: './filter-controls.component.html',
  styleUrls: ['./filter-controls.component.scss']
})
export class FilterControlsComponent implements OnInit {
  timeInterval: number = 3600;
  timeIntervals: {label: string, value: number}[] = [
    {
      label: '1 minute',
      value: 60
    },
    {
      label: '5 minutes',
      value: 300
    },
    {
      label: '15 minutes',
      value: 900
    },
    {
      label: '1 hour',
      value: 3600
    },
    {
      label: '6 hours',
      value: 21600
    },
    {
      label: '1 day',
      value: 86400
    }
  ];
  endDate: Date = new Date();
  startDate: Date = new Date(this.endDate.getTime() - 86400000);
  constructor(private gdaxDataService: GdaxDataService) { }

  ngOnInit() {
    console.log(this.startDate, this.endDate);
  }

  changedTimeInterval(event) {
    console.log(event);
    this.timeInterval = event;
    this.gdaxDataService.changeTimeInterval(this.timeInterval);
  }

}
