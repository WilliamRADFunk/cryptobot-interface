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
  * Maintains the end date in actual Javascript Date form
  */
  endDate: Date = new Date();
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
  /**
  * Flag to determine whether or not to show invalid data colors
  * inside the datetime filters.
  */
  isInvalid: boolean = false;
  /**
  * Flag to determine whether or not to display red for start datetime
  */
  invalidStartDatetime: boolean = false;
  /**
  * Flag to determine whether or not to display red for end datetime
  */
  invalidEndDatetime: boolean = false;
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
  * Maintains current granularity level (ie. 3600)
  */
  timeInterval: number = 3600;
  /**
  * Maintains current granularity level label (ie. '1 hour')
  */
  timeIntervalLabel: string = '1 hour';
  /**
  * Contains all possible granularity levels.
  */
  timeIntervalOptions: {label: string, value: number}[] = [
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
  * Contains all possible granularity levels available to end user.
  */
  timeIntervals: {label: string, value: number}[] = this.timeIntervalOptions.slice();

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
  ngOnInit() {
    this.adjustGranularityOptions();
  }
  /**
  * Checks which of the time intervals have no more than the gdax max of 300
  * results between start and end datetimes
  */
  adjustGranularityOptions() {
    const timeIntervalLabelOld = this.timeIntervalLabel;
    const tempTimeIntervals = [];
    const endDate = new Date(
      this.eDate.year,
      this.eDate.month - 1,
      this.eDate.day,
      this.eTime.hour,
      this.eTime.minute);
    const startDate = new Date(
      this.sDate.year,
      this.sDate.month - 1,
      this.sDate.day,
      this.sTime.hour,
      this.sTime.minute);
    const totalPossibleSeconds = (endDate.getTime() - startDate.getTime()) / 1000;
    this.timeIntervalOptions.forEach(element => {
      const maxPeriods = totalPossibleSeconds / element['value'];
      if (maxPeriods <= 300 && maxPeriods > 1) {
        const granule: { label: string, value: number } = {
          label: element['label'],
          value: element['value']
        };
        tempTimeIntervals.push(granule);
      }
    });
    this.timeIntervals = tempTimeIntervals;
    let isCurrentGranularityValid: boolean = false;
    this.timeIntervals.forEach(element => {
      if (element['value'] === this.timeInterval) {
        isCurrentGranularityValid = true;
      }
    });
    if (!isCurrentGranularityValid) {
      this.timeInterval = this.timeIntervals[0]['value'];
      this.timeIntervalLabel = this.timeIntervals[0]['label'];
      this.changedTimeInterval({
        label: this.timeIntervalLabel,
        value: this.timeInterval
      });
    }
  }
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
  * Checks all aspects of both datetimes to make sure everything is valid
  * @return True is valid datetimes | False if something is wrong with one of them
  */
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
  /**
  * Checks to make sure end datetime isn't before the start datetime
  * @return True is valid | False if invalid
  */
  checkValidDateTimeOrder(): boolean {
    const beforeDate = new Date(this.sDate.year, this.sDate.month, this.sDate.day, this.sTime.hour, this.sTime.minute);
    const afterDate = new Date(this.eDate.year, this.eDate.month, this.eDate.day, this.eTime.hour, this.eTime.minute);

    // Needs to be at least two minutes apart to have at least one granularity option.
    if (beforeDate.getTime() < afterDate.getTime() - 600000) {
      return true;
    } else {
      return false;
    }
  }
  /**
  * Checks to make sure day is valid
  * @return True is valid | False if invalid
  */
  checkValidDay(day: number): boolean {
    if (!day || isNaN(Number(day))) {
      return false;
    }
    if (day < 1 || day > 31) {
      return false;
    }
    return true;
  }
  /**
  * Checks to make sure hour is valid
  * @return True is valid | False if invalid
  */
  checkValidHours(hours: number): boolean {
    if (null ===  hours || isNaN(Number(hours))) {
      return false;
    }
    if (hours < 0 || hours > 23) {
      return false;
    }
    return true;
  }
  /**
  * Checks to make sure minute is valid
  * @return True is valid | False if invalid
  */
  checkValidMinutes(minutes: number): boolean {
    if (null ===  minutes || isNaN(Number(minutes))) {
      return false;
    }
    if (minutes < 0 || minutes > 59) {
      return false;
    }
    return true;
  }
  /**
  * Checks to make sure month is valid
  * @return True is valid | False if invalid
  */
  checkValidMonth(month: number): boolean {
    if (!month || isNaN(Number(month))) {
      return false;
    }
    if (month < 1 || month > 12) {
      return false;
    }
    return true;
  }
  /**
  * Checks to make sure year is valid
  * @return True is valid | False if invalid
  */
  checkValidYear(year: number): boolean {
    if (!year || isNaN(Number(year))) {
      return false;
    }
    if (year < 1970 || year > 2199) {
      return false;
    }
    return true;
  }
  /**
  * Triggered when user changes end date choice.
  * Updates the service variable.
  */
  onEndDateChange() {
    if (this.checkValidDateTime()) {
      this.invalidEndDatetime = false;
      this.invalidStartDatetime = false;
      this.adjustGranularityOptions();
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
      this.adjustGranularityOptions();
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
      this.adjustGranularityOptions();
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
      this.adjustGranularityOptions();
      const changedDateTime: Date = new Date(this.sDate.year, this.sDate.month - 1, this.sDate.day, this.sTime.hour, this.sTime.minute);
      this.gdaxDataService.changeStartDateTime(changedDateTime);
    } else {
      this.invalidStartDatetime = true;
    }
  }
}
