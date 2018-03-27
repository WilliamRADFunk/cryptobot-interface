import { Component, OnInit } from '@angular/core';

import { NgbTimepickerConfig } from '@ng-bootstrap/ng-bootstrap';

import { GdaxDataService } from '../../services/gdax-data.service';

@Component({
  selector: 'app-filter-controls',
  templateUrl: './filter-controls.component.html',
  styleUrls: ['./filter-controls.component.scss'],
  providers: [ NgbTimepickerConfig ]
})
export class FilterControlsComponent implements OnInit {
  /**
  * Flag to determine whether or not to show invalid data colors
  * inside the datetime filters.
  */
  isInvalid: boolean = false;
  /**
  * Maintains current granularity level (ie. 3600)
  */
  timeInterval: number = 3600;
  /**
  * Maintains current granularity level label (ie. '1 hour')
  */
  timeIntervalLabel: string = '1 hour';
  /**
  * Contains all possible granularity levels available to end user.
  */
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
  /**
  * Maintains the end date in actual Javascript Date form
  */
  endDate: Date = new Date();
  /**
  * Maintains the start date in actual Javascript Date form
  */
  startDate: Date = new Date(this.endDate.getTime() - 86400000);
  /**
  * Maintains the start date for 'Start Date:' datepicker
  */
  sDate: { year: number, month: number, day: number} = {
    year: this.startDate.getFullYear(),
    month: this.startDate.getMonth() + 1,
    day: this.startDate.getDate()
  };
  /**
  * Maintains the start time for 'Start Time:' timepicker
  */
  sTime: { hour: number, minute: number } = {
    hour: this.startDate.getHours(),
    minute: this.startDate.getMinutes()
  };
  /**
  * Maintains the end date for 'End Date:' datepicker
  */
  eDate: { year: number, month: number, day: number} = {
    year: this.endDate.getFullYear(),
    month: this.endDate.getMonth() + 1,
    day: this.endDate.getDate()
  };
  /**
  * Maintains the end time for 'End Time:' timepicker
  */
  eTime: { hour: number, minute: number } = {
    hour: this.endDate.getHours(),
    minute: this.endDate.getMinutes()
  };
  invalidStartDatetime: boolean = false;
  invalidEndDatetime: boolean = false;

  /**
  * Constructor for the class.
  */
  constructor(
    private gdaxDataService: GdaxDataService,
    private config: NgbTimepickerConfig) {
      config.seconds = false;
      config.spinners = false;
    }
  /**
  * Triggered when component is loaded, but before it is viewed.
  * Gets REST path info, and updates the profit chart.
  */
  ngOnInit() { }
  /**
  * Triggered when user changes granularity choice.
  * Updates the service variable.
  * @param event label/value object containing granularity label and value
  */
  changedTimeInterval(event) {
    this.timeInterval = event['value'];
    this.timeIntervalLabel = event['label'];
    this.gdaxDataService.changeTimeInterval(this.timeInterval);
  }
  /**
  * Triggered when user changes end date choice.
  * Updates the service variable.
  */
  onEndDateChange() {
    if (this.checkValidDateTime()) {
      this.invalidEndDatetime = false;
      this.invalidStartDatetime = false;
      const changedDateTime: Date = new Date(this.eDate.year, this.eDate.month - 1, this.eDate.day, this.eTime.hour, this.eTime.minute);
      this.gdaxDataService.changeEndDateTime(changedDateTime);
    } else {
      this.invalidEndDatetime = true;
    }
  }
  /**
  * Triggered when user changes end time choice.
  * Updates the service variable.
  */
  onEndTimeChange() {
    if (this.checkValidDateTime()) {
      this.invalidEndDatetime = false;
      this.invalidStartDatetime = false;
      const changedDateTime: Date = new Date(this.eDate.year, this.eDate.month - 1, this.eDate.day, this.eTime.hour, this.eTime.minute);
      this.gdaxDataService.changeEndDateTime(changedDateTime);
    } else {
      this.invalidEndDatetime = true;
    }
  }
  /**
  * Triggered when user changes start date choice.
  * Updates the service variable.
  */
  onStartDateChange() {
    if (this.checkValidDateTime()) {
      this.invalidEndDatetime = false;
      this.invalidStartDatetime = false;
      const changedDateTime: Date = new Date(this.sDate.year, this.sDate.month - 1, this.sDate.day, this.sTime.hour, this.sTime.minute);
      this.gdaxDataService.changeStartDateTime(changedDateTime);
    } else {
      this.invalidStartDatetime = true;
    }
  }
  /**
  * Triggered when user changes start time choice.
  * Updates the service variable.
  */
  onStartTimeChange() {
    if (this.checkValidDateTime()) {
      this.invalidEndDatetime = false;
      this.invalidStartDatetime = false;
      const changedDateTime: Date = new Date(this.sDate.year, this.sDate.month - 1, this.sDate.day, this.sTime.hour, this.sTime.minute);
      this.gdaxDataService.changeStartDateTime(changedDateTime);
    } else {
      this.invalidStartDatetime = true;
    }
  }

  checkValidDateTime(): boolean {
    return (
      this.checkValidYear(this.sDate.year) &&
      this.checkValidYear(this.eDate.year) &&
      this.checkValidMonth(this.sDate.month) &&
      this.checkValidMonth(this.eDate.month) &&
      this.checkValidDay(this.sDate.day) &&
      this.checkValidDay(this.eDate.day) &&
      this.checkValidHours(this.sTime.hour) &&
      this.checkValidHours(this.eTime.hour) &&
      this.checkValidMinutes(this.sTime.minute) &&
      this.checkValidMinutes(this.eTime.minute) &&
      this.checkValidDateTimeOrder()
    );
  }

  checkValidYear(year: number): boolean {
    if (!year || isNaN(Number(year))) {
      return false;
    }
    if (year < 1970 || year > 2199) {
      return false;
    }
    return true;
  }

  checkValidMonth(month: number): boolean {
    if (!month || isNaN(Number(month))) {
      return false;
    }
    if (month < 1 || month > 12) {
      return false;
    }
    return true;
  }

  checkValidDay(day: number): boolean {
    if (!day || isNaN(Number(day))) {
      return false;
    }
    if (day < 1 || day > 31) {
      return false;
    }
    return true;
  }

  checkValidHours(hours: number): boolean {
    if (undefined ===  hours || isNaN(Number(hours))) {
      return false;
    }
    if (hours < 0 || hours > 23) {
      return false;
    }
    return true;
  }

  checkValidMinutes(minutes: number): boolean {
    if (undefined ===  minutes || isNaN(Number(minutes))) {
      return false;
    }
    if (minutes < 0 || minutes > 59) {
      return false;
    }
    return true;
  }

  checkValidDateTimeOrder(): boolean {
    const beforeDate = new Date(this.sDate.year, this.sDate.month, this.sDate.day, this.sTime.hour, this.sTime.minute);
    const afterDate = new Date(this.eDate.year, this.eDate.month, this.eDate.day, this.eTime.hour, this.eTime.minute);

    if (beforeDate.getTime() < afterDate.getTime()) {
      return true;
    } else {
      return false;
    }
  }
}
