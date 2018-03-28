import { Component, OnInit, ViewChild } from '@angular/core';

import { NgbTimepickerConfig, NgbTooltip } from '@ng-bootstrap/ng-bootstrap';

import { GdaxDataService } from '../../services/gdax-data.service';

@Component({
  selector: 'app-filter-controls',
  templateUrl: './filter-controls.component.html',
  styleUrls: ['./filter-controls.component.scss'],
  providers: [ NgbTimepickerConfig ]
})
export class FilterControlsComponent implements OnInit {
  @ViewChild('t') public tooltip: NgbTooltip;
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
  * Max date a dropdown from end date ngb-tooltip should show.
  */
  maxEndDate: { year: number, month: number, day: number};
  /**
  * Max date a dropdown from start date ngb-tooltip should show.
  */
  maxStartDate: { year: number, month: number, day: number};
  /**
  * Min date a dropdown from end date ngb-tooltip should show.
  */
  minEndDate: { year: number, month: number, day: number};
  /**
  * Min date a dropdown from start date ngb-tooltip should show.
  */
  minStartDate: { year: number, month: number, day: number};
  /**
  * Maintains the start date in actual Javascript Date form
  */
  startDate: Date = new Date(this.endDate.getTime() - 87600000);
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
  * Message to use if start datetime is invalid
  */
  warningMessage: string[] = [
    'Start datetime must be before End datetime.',
    'Datetimes must be at least more than 10 minutes apart.',
    'Datetimes must be less than 299 days apart.'
  ];

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
  * @private
  * Triggered when component is loaded, but before it is viewed.
  * Gets REST path info, and updates the profit chart.
  */
  ngOnInit(): void {
    this.resetMinMax();
    this.adjustGranularityOptions();
  }
  /**
  * Checks which of the time intervals have no more than the gdax max of 300
  * results between start and end datetimes
  */
  adjustGranularityOptions(): void {
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
  changedTimeInterval(event): void {
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
      this.checkValidYear(this.sDate) &&
      this.checkValidYear(this.eDate) &&
      this.checkValidMonth(this.sDate) &&
      this.checkValidMonth(this.eDate) &&
      this.checkValidDay(this.sDate) &&
      this.checkValidDay(this.eDate) &&
      this.checkValidHours(this.sTime) &&
      this.checkValidHours(this.eTime) &&
      this.checkValidMinutes(this.sTime) &&
      this.checkValidMinutes(this.eTime) &&
      this.checkValidDateTimeOrder()
    );
  }
  /**
  * Checks to make sure end datetime isn't before the start datetime
  * @return True is valid | False if invalid
  */
  checkValidDateTimeOrder(): boolean {
    const beforeDate = new Date(this.sDate.year, this.sDate.month - 1, this.sDate.day, this.sTime.hour, this.sTime.minute);
    const afterDate = new Date(this.eDate.year, this.eDate.month - 1, this.eDate.day, this.eTime.hour, this.eTime.minute);

    // Needs to be at least two minutes apart to have at least one granularity option.
    if (afterDate.getTime() > new Date().getTime() + 1000) {
      return false;
    } else if (beforeDate.getTime() >= afterDate.getTime() - 600000) {
      return false;
    } else if (afterDate.getTime() - beforeDate.getTime() >= 25833600000) {
      return false;
    } else {
      return true;
    }
  }
  /**
  * Checks to make sure day is valid
  * @return True is valid | False if invalid
  */
  checkValidDay(date: { year: number, month: number, day: number}): boolean {
    if (!date || !date['day'] || isNaN(Number(date['day']))) {
      return false;
    }
    if (date['day'] < 1 || date['day'] > 31) {
      return false;
    }
    return true;
  }
  /**
  * Checks to make sure hour is valid
  * @return True is valid | False if invalid
  */
  checkValidHours(time: { hour: number, minute: number }): boolean {
    if (!time || null ===  time['hour'] || isNaN(Number(time['hour']))) {
      return false;
    }
    if (time['hour'] < 0 || time['hour'] > 23) {
      return false;
    }
    return true;
  }
  /**
  * Checks to make sure minute is valid
  * @return True is valid | False if invalid
  */
  checkValidMinutes(time: { hour: number, minute: number }): boolean {
    if (!time || null ===  time['minute'] || isNaN(Number(time['minute']))) {
      return false;
    }
    if (time['minute'] < 0 || time['minute'] > 59) {
      return false;
    }
    return true;
  }
  /**
  * Checks to make sure month is valid
  * @return True is valid | False if invalid
  */
  checkValidMonth(date: { year: number, month: number, day: number}): boolean {
    if (!date || !date['month'] || isNaN(Number(date['month']))) {
      return false;
    }
    if (date['month'] < 1 || date['month'] > 12) {
      return false;
    }
    return true;
  }
  /**
  * Checks to make sure year is valid
  * @return True is valid | False if invalid
  */
  checkValidYear(date: { year: number, month: number, day: number}): boolean {
    if (!date || !date['year'] || isNaN(Number(date['year']))) {
      return false;
    }
    if (date['year'] < 1970 || date['year'] > 2199) {
      return false;
    }
    return true;
  }
  closeTooltip() {
    const isOpen = this.tooltip.isOpen();
    if (isOpen) {
      this.tooltip.close();
    }
  }
  openTooltip() {
    const isOpen = this.tooltip.isOpen();
    if (!isOpen) {
      this.tooltip.open(this.warningMessage);
    }
  }
  /**
  * Triggered when user changes end date choice.
  * Updates the service variable.
  */
  onEndDateChange(): void {
    if (this.checkValidDateTime()) {
      this.invalidEndDatetime = false;
      this.invalidStartDatetime = false;
      this.closeTooltip();
      this.adjustGranularityOptions();
      const changedDateTime: Date = new Date(this.eDate.year, this.eDate.month - 1, this.eDate.day, this.eTime.hour, this.eTime.minute);
      this.gdaxDataService.changeEndDateTime(changedDateTime);
      this.resetMinMax();
    } else {
      this.openTooltip();
      this.invalidEndDatetime = true;
    }
  }
  /**
  * Triggered when user changes end time choice.
  * Updates the service variable.
  */
  onEndTimeChange(): void {
    if (this.checkValidDateTime()) {
      this.invalidEndDatetime = false;
      this.invalidStartDatetime = false;
      this.closeTooltip();
      this.adjustGranularityOptions();
      const changedDateTime: Date = new Date(this.eDate.year, this.eDate.month - 1, this.eDate.day, this.eTime.hour, this.eTime.minute);
      this.gdaxDataService.changeEndDateTime(changedDateTime);
      this.resetMinMax();
    } else {
      this.openTooltip();
      this.invalidEndDatetime = true;
    }
  }
  /**
  * Triggered when user changes start date choice.
  * Updates the service variable.
  */
  onStartDateChange(): void {
    if (this.checkValidDateTime()) {
      this.invalidEndDatetime = false;
      this.invalidStartDatetime = false;
      this.closeTooltip();
      this.adjustGranularityOptions();
      const changedDateTime: Date = new Date(this.sDate.year, this.sDate.month - 1, this.sDate.day, this.sTime.hour, this.sTime.minute);
      this.gdaxDataService.changeStartDateTime(changedDateTime);
      this.resetMinMax();
    } else {
      this.openTooltip();
      this.invalidStartDatetime = true;
    }
  }
  /**
  * Triggered when user changes start time choice.
  * Updates the service variable.
  */
  onStartTimeChange(): void {
    if (this.checkValidDateTime()) {
      this.invalidEndDatetime = false;
      this.invalidStartDatetime = false;
      this.closeTooltip();
      this.adjustGranularityOptions();
      const changedDateTime: Date = new Date(this.sDate.year, this.sDate.month - 1, this.sDate.day, this.sTime.hour, this.sTime.minute);
      this.gdaxDataService.changeStartDateTime(changedDateTime);
      this.resetMinMax();
    } else {
      this.openTooltip();
      this.invalidStartDatetime = true;
    }
  }
  /**
  * Changes the min and max dates for both datepickers when one changes.
  */
  resetMinMax(): void {
    this.maxEndDate = {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      day: new Date().getDate()
    };
    this.minEndDate = {
      year: this.sDate['year'],
      month: this.sDate['month'],
      day: this.sDate['day']
    };
    this.maxStartDate = {
      year: this.eDate['year'],
      month: this.eDate['month'],
      day: this.eDate['day']
    };

    const afterDate = new Date(this.eDate.year, this.eDate.month - 1, this.eDate.day, this.eTime.hour, this.eTime.minute);
    const earliestDate = new Date(afterDate.getTime() - 25833600000);
    this.minStartDate = {
      year: earliestDate.getFullYear(),
      month: earliestDate.getMonth() + 1,
      day: earliestDate.getDate()
    };
  }
}
