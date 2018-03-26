import { Component, OnInit } from '@angular/core';

import { GdaxDataService } from '../../services/gdax-data.service';

@Component({
  selector: 'app-filter-controls',
  templateUrl: './filter-controls.component.html',
  styleUrls: ['./filter-controls.component.scss']
})
export class FilterControlsComponent implements OnInit {
  timeInterval: number = 3600;
  timeIntervalLabel: string = '1 hour';
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
  sDate: { year: number, month: number, day: number} = {
    year: 2018,
    month: 3,
    day: 24
  };
  sTime: { hour: number, minute: number } = {
    hour: 21,
    minute: 50
  };
  eDate: { year: number, month: number, day: number} = {
    year: 2018,
    month: 3,
    day: 25
  };
  eTime: { hour: number, minute: number } = {
    hour: 21,
    minute: 50
  };
  constructor(private gdaxDataService: GdaxDataService) { }

  ngOnInit() { }

  changedTimeInterval(event) {
    this.timeInterval = event['value'];
    this.timeIntervalLabel = event['label'];
    this.gdaxDataService.changeTimeInterval(this.timeInterval);
  }

  onEndDateChange() {
    const changedDateTime: Date = new Date(this.eDate.year, this.eDate.month - 1, this.eDate.day, this.eTime.hour, this.eTime.minute);
    this.gdaxDataService.changeEndDateTime(changedDateTime);
  }

  onEndTimeChange() {
    const changedDateTime: Date = new Date(this.eDate.year, this.eDate.month - 1, this.eDate.day, this.eTime.hour, this.eTime.minute);
    this.gdaxDataService.changeEndDateTime(changedDateTime);
  }

  onStartDateChange() {
    const changedDateTime: Date = new Date(this.sDate.year, this.sDate.month - 1, this.sDate.day, this.sTime.hour, this.sTime.minute);
    this.gdaxDataService.changeStartDateTime(changedDateTime);
  }

  onStartTimeChange() {
    const changedDateTime: Date = new Date(this.sDate.year, this.sDate.month - 1, this.sDate.day, this.sTime.hour, this.sTime.minute);
    this.gdaxDataService.changeStartDateTime(changedDateTime);
  }

}
