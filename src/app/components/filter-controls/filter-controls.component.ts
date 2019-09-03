import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';

import { NgbTimepickerConfig, NgbTooltip } from '@ng-bootstrap/ng-bootstrap';

import { GdaxDataService } from '../../services/gdax-data.service';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-filter-controls',
  templateUrl: './filter-controls.component.html',
  styleUrls: ['./filter-controls.component.scss'],
  providers: [ NgbTimepickerConfig ]
})
export class FilterControlsComponent implements OnDestroy, OnInit {
  /**
  * Maintains the end date in actual Javascript Date form
  */
  private _endDate: Date = new Date((new Date()).getTime() - 360000);
  /**
  * Skips change detections on start and end dates until inital settings are finished.
  */
  private _isInitialized: boolean = false;
  /**
  * Holds query params to check against in other parts of component
  */
  private _params: ParamMap;
  /**
  * Maintains the start date in actual Javascript Date form
  */
  private _startDate: Date = new Date(this._endDate.getTime() - 87600000);
  /**
   * Subscriptions to unsubscribe from onDestroy
   */
  private readonly _subs: Subscription[] = [];
  /**
  * Maintains current granularity level (ie. 3600)
  */
  private _timeInterval: number = 3600;
  /**
  * Contains all possible granularity levels
  */
  private readonly _timeIntervalOptions: {label: string, value: number}[] = [
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
   * NgbTooltip reference with which to manually open/close.
   */
  @ViewChild('t') public readonly tooltip: NgbTooltip;
  /**
  * Maintains the end date for 'End Date:' datepicker
  */
  public eDate: { year: number, month: number, day: number} = {
    year: this._endDate.getFullYear(),
    month: this._endDate.getMonth() + 1,
    day: this._endDate.getDate()
  };
  /**
  * Maintains the end time for 'End Time:' timepicker
  */
  public eTime: { hour: number, minute: number } = {
    hour: this._endDate.getHours(),
    minute: this._endDate.getMinutes()
  };
  /**
  * Checks with service to see if it's busy in a query,
  * and disables controls when it is.
  */
  public isBusy: boolean = true;
  /**
  * Flag to determine whether or not to display red for start datetime
  */
  public invalidStartDatetime: boolean = false;
  /**
  * Flag to determine whether or not to display red for end datetime
  */
  public invalidEndDatetime: boolean = false;
  /**
  * Max date a dropdown from end date ngb-tooltip should show
  */
  public maxEndDate: { year: number, month: number, day: number};
  /**
  * Max date a dropdown from start date ngb-tooltip should show
  */
  public maxStartDate: { year: number, month: number, day: number};
  /**
  * Min date a dropdown from end date ngb-tooltip should show
  */
  public minEndDate: { year: number, month: number, day: number};
  /**
  * Min date a dropdown from start date ngb-tooltip should show
  */
  public minStartDate: { year: number, month: number, day: number};
  /**
  * Maintains the start date for 'Start Date:' datepicker
  */
  public sDate: { year: number, month: number, day: number} = {
    year: this._startDate.getFullYear(),
    month: this._startDate.getMonth() + 1,
    day: this._startDate.getDate()
  };
  /**
  * Maintains the start time for 'Start Time:' timepicker
  */
  public sTime: { hour: number, minute: number } = {
    hour: this._startDate.getHours(),
    minute: this._startDate.getMinutes()
  };
  /**
  * Maintains current granularity level label (ie. '1 hour')
  */
  public timeIntervalLabel: string = '1 hour';
  /**
  * Contains all possible granularity levels available to end user
  */
  public timeIntervals: {label: string, value: number}[] = this._timeIntervalOptions.slice();
  /**
  * Message to use if start datetime is invalid
  */
  public readonly warningMessage: string[] = [
    'Start datetime must be before End datetime.',
    'Datetimes must be at least more than 10 minutes apart.',
    'Datetimes must be less than 299 days apart.'
  ];

  /**
  * Constructor for the class
  * @param activatedRouter Angular's ActivatedRoute service for knowing current route
  * @param router Angular's Router service for changing route
  * @param config Configuration service for ngb's timepicker
  * @param gdaxDataService Internal service to get queried market data.
  */
  constructor(
    private readonly activatedRouter: ActivatedRoute,
    private readonly router: Router,
    private readonly gdaxDataService: GdaxDataService,
    private config: NgbTimepickerConfig) {
      config.seconds = false;
      config.spinners = false;
    }
  /**
  * Triggered when component is destroyed, but before it's officially dead
  * this runs cleanup functionality to protect against misfired queries.
  */
  ngOnDestroy(): void {
    this._subs.forEach(s => s && s.unsubscribe());
    this._subs.length = 0;
    this._isInitialized = false;
    this.gdaxDataService.kill(true);
  }
  /**
  * @private
  * Triggered when component is loaded, but before it is viewed
  * Gets REST path info, and updates the profit chart
  */
  ngOnInit(): void {
    this._subs.push(
      this.gdaxDataService.isBusy
        .subscribe(data => {
          this.isBusy = data;
        }),
      this.activatedRouter.queryParamMap
        .subscribe((params: ParamMap) => {
          this._params = params;
          if (!this._isInitialized) {
            this.handleStartDateTimeParam();
            this.handleEndDateTimeParam();
            this.handleIncorrectDateTimeParams();
            // Dates are done, release the change detection functions.
            this._isInitialized = true;
            this.handleGranularityParam();
            this.resetMinMax();
            this.handleInitialParamUpdate();
          }
        }));
  }
  /**
  * Checks which of the time intervals have no more than the gdax max of 300
  * results between start and end datetimes
  * @param forcedChangedTimeInterval signals whether to force a changedTimeInterval call
  */
  adjustGranularityOptions(forcedChangedTimeInterval?: boolean): void {
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
    this._timeIntervalOptions.forEach(element => {
      const maxPeriods = totalPossibleSeconds / element['value'];
      if (Math.ceil(maxPeriods) <= 300 && Math.floor(maxPeriods) > 1) {
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
      if (element['value'] === this._timeInterval) {
        isCurrentGranularityValid = true;
      }
    });
    if (!isCurrentGranularityValid) {
      this._timeInterval = this.timeIntervals[0]['value'];
      this.timeIntervalLabel = this.timeIntervals[0]['label'];
    }
    if (!isCurrentGranularityValid && !forcedChangedTimeInterval) {
      this.changedTimeInterval({
        label: this.timeIntervalLabel,
        value: this._timeInterval
      });
    } else if (forcedChangedTimeInterval) {
      this.changedTimeInterval({
        label: this.timeIntervalLabel,
        value: this._timeInterval
      }, true);
    }
  }
  /**
  * Triggered when user changes granularity choice
  * Updates the service variable
  * @param event label/value object containing granularity label and value
  * @param initChange signals service that this is the OnInit value change.
  */
  changedTimeInterval(event, initChange?: boolean): void {
    this._timeInterval = event['value'];
    this.timeIntervalLabel = event['label'];
    if (!initChange) {
      this.updateParams({
        ...this.activatedRouter.snapshot.queryParams,
        endDateTime: this._endDate.toISOString(),
        granularity: this._timeInterval,
        startDateTime: this._startDate.toISOString()
      });
    }
    this.gdaxDataService.changeTimeInterval(this._timeInterval, initChange);
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
    const beforeDate = new Date(
      this.sDate.year,
      this.sDate.month - 1,
      this.sDate.day,
      this.sTime.hour,
      this.sTime.minute
    );
    const afterDate = new Date(
      this.eDate.year,
      this.eDate.month - 1,
      this.eDate.day,
      this.eTime.hour,
      this.eTime.minute
    );

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
  /**
  * Closes the datetime warning tooltip if it's open
  */
  closeTooltip(): void {
    if (!this.tooltip) {
      return;
    }
    const isOpen = this.tooltip.isOpen();
    if (isOpen) {
      this.tooltip.close();
    }
  }
  /**
  * @private
  * Checks if url params contain endDateTime and use it if valid.
  * If invalid or not present, fallback to the component default.
  */
  handleEndDateTimeParam(): void {
    const prevDateTime = this.gdaxDataService.getEndDateTime();
    // If valid option for endDateTime, use it, and signal the service
    if (this._params.has('endDateTime')) {
      const endDateTime = new Date(this._params.get('endDateTime'));
      if (!isNaN(endDateTime.getTime())) {
        this.setADateTime(endDateTime, this.eDate, this.eTime);
        this._endDate = endDateTime;
        this.gdaxDataService.changeEndDateTime(endDateTime, true);
      // If no url param option for endDateTime,
      // but the service does. Use it.
      } else if (prevDateTime) {
        this.setADateTime(prevDateTime, this.eDate, this.eTime);
        this._endDate = prevDateTime;
        // Change from one main nav choice to next.
        // This ensures the all is loaded signals are fired correctly.
        if (!this._isInitialized) {
          this.gdaxDataService.changeEndDateTime(this._endDate, true);
        }
      // If no url param option for endDateTime, and service
      // has no previous endDateTime, use fallback,
      // adjust params, and signal the service
      } else {
        this.gdaxDataService.changeEndDateTime(this._endDate, true);
      }
    // If no url param option for endDateTime,
    // but the service does. Use it.
    } else if (prevDateTime) {
      this.setADateTime(prevDateTime, this.eDate, this.eTime);
      this._endDate = prevDateTime;
      // Change from one main nav choice to next.
      // This ensures the all is loaded signals are fired correctly.
      if (!this._isInitialized) {
        this.gdaxDataService.changeEndDateTime(this._endDate, true);
      }
    // If no url param option for endDateTime, and service
    // has no previous endDateTime, use fallback,
    // adjust params, and signal the service
    } else {
      this.gdaxDataService.changeEndDateTime(this._endDate, true);
    }
  }
  /**
  * @private
  * Checks if url params contain granularity and use it if valid.
  * If invalid or not present, fallback to the component default
  * through the use of adjustGranularityOptions(true), which self-corrects.
  */
  handleGranularityParam(): void {
    // If valid option for rowsPerPage, use it, and signal the service
    if (this._params.has('granularity') && Number(this._params.get('granularity'))) {
      // Determine if valid granularity
      this._timeIntervalOptions.forEach(element => {
        if (element['value'] === Number(this._params.get('granularity'))) {
          this._timeInterval = element['value'];
          this.timeIntervalLabel = element['label'];
        }
      });
    }
    this.adjustGranularityOptions(true);
  }
  /**
  * @private
  * After a final check if start and end datetime fit all criteria, and are
  * found lacking, this calculates a fallback for both before the param update.
  */
  handleIncorrectDateTimeParams(): void {
    // The start and end dates are invalid, fall back to default method
    if (!this.checkValidDateTime()) {
      this._endDate = new Date();
      this._startDate = new Date(this._endDate.getTime() - 87600000);
      this.setADateTime(this._startDate, this.sDate, this.sTime);
      this.setADateTime(this._endDate, this.eDate, this.eTime);
      this.gdaxDataService.changeStartDateTime(this._startDate, true);
      this.gdaxDataService.changeEndDateTime(this._endDate, true);
    }
  }
  /**
  * @private
  * Called when all initialization of url param pulling is complete and
  * it's time to update the parameters relevant to the current component view.
  */
  handleInitialParamUpdate(): void {
    // Update the url params only after they've been checked
    // formatted, and corrected if need be.
    this.updateParams({
      ...this.activatedRouter.snapshot.queryParams,
      endDateTime: this._endDate.toISOString(),
      granularity: this._timeInterval,
      startDateTime: this._startDate.toISOString()
    });
  }
  /**
  * @private
  * Checks if url params contain startDateTime and use it if valid.
  * If invalid or not present, fallback to the component default.
  */
  handleStartDateTimeParam(): void {
    const prevDateTime = this.gdaxDataService.getStartDateTime();
    // If valid option for startDateTime, use it, and signal the service
    if (this._params.has('startDateTime')) {
      const startDateTime = new Date(this._params.get('startDateTime'));
      if (!isNaN(startDateTime.getTime())) {
        this.setADateTime(startDateTime, this.sDate, this.sTime);
        this._startDate = startDateTime;
        this.gdaxDataService.changeStartDateTime(startDateTime, true);
      // If no url param option for startDateTime,
      // but the service does. Use it.
      } else if (prevDateTime) {
        this.setADateTime(prevDateTime, this.sDate, this.sTime);
        this._startDate = prevDateTime;
        // Change from one main nav choice to next.
        // This ensures the all is loaded signals are fired correctly.
        if (!this._isInitialized) {
          this.gdaxDataService.changeStartDateTime(this._startDate, true);
        }
      // If no url param option for startDateTime, and service
      // has no previous startDateTime, use fallback,
      // adjust params, and signal the service
      } else {
        this.gdaxDataService.changeStartDateTime(this._startDate, true);
      }
    // If no url param option for startDateTime,
    // but the service does. Use it.
    } else if (prevDateTime) {
      this.setADateTime(prevDateTime, this.sDate, this.sTime);
      this._startDate = prevDateTime;
      // Change from one main nav choice to next.
      // This ensures the all is loaded signals are fired correctly.
      if (!this._isInitialized) {
        this.gdaxDataService.changeStartDateTime(this._startDate, true);
      }
    // If no url param option for startDateTime, and service
    // has no previous startDateTime, use fallback,
    // adjust params, and signal the service
    } else {
      this.gdaxDataService.changeStartDateTime(this._startDate, true);
    }
  }
  /**
  * Tells whether or not the warningMessage tooltip is open or not
  * @return True if the warning tooltip is open } False if not
  */
  isTooltipOpen(): boolean {
    if (!this.tooltip) {
      return false;
    }
    return this.tooltip.isOpen();
  }
  /**
  * Triggered when user changes end datetime choice
  * Updates the service variable
  */
 onEndDateTimeChange(): void {
    if (!this._isInitialized && this.checkValidDateTime()) {
      return;
    }
    if (this.checkValidDateTime()) {
      this.invalidEndDatetime = false;
      this.invalidStartDatetime = false;
      this.closeTooltip();
      this.adjustGranularityOptions();
      const changedDateTime: Date = new Date(
        this.eDate.year,
        this.eDate.month - 1,
        this.eDate.day,
        this.eTime.hour,
        this.eTime.minute
      );
      this.updateParams({
        ...this.activatedRouter.snapshot.queryParams,
        endDateTime: changedDateTime.toISOString()
      });
      this.gdaxDataService.changeEndDateTime(changedDateTime);
      this.resetMinMax();
    } else {
      this.openTooltip();
      this.invalidEndDatetime = true;
    }
  }
  /**
  * Triggered when user changes start datetime choice
  * Updates the service variable
  */
 onStartDateTimeChange(): void {
    if (!this._isInitialized && this.checkValidDateTime()) {
      return;
    }
    if (this.checkValidDateTime()) {
      this.invalidEndDatetime = false;
      this.invalidStartDatetime = false;
      this.closeTooltip();
      this.adjustGranularityOptions();
      const changedDateTime: Date = new Date(
        this.sDate.year,
        this.sDate.month - 1,
        this.sDate.day,
        this.sTime.hour,
        this.sTime.minute
      );
      this.updateParams({
        ...this.activatedRouter.snapshot.queryParams,
        startDateTime: changedDateTime.toISOString()
      });
      this.gdaxDataService.changeStartDateTime(changedDateTime);
      this.resetMinMax();
    } else {
      this.openTooltip();
      this.invalidStartDatetime = true;
    }
  }
  /**
  * Opens the datetime warning tooltip if it's closed
  */
  openTooltip(): void {
    if (!this.tooltip) {
      return;
    }
    const isOpen = this.tooltip.isOpen();
    if (!isOpen) {
      this.tooltip.open(this.warningMessage);
    }
  }
  /**
  * Changes the min and max dates for both datepickers when one changes
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

    const afterDate = new Date(
      this.eDate.year,
      this.eDate.month - 1,
      this.eDate.day,
      this.eTime.hour,
      this.eTime.minute
    );
    const earliestDate = new Date(afterDate.getTime() - 25833600000);
    this.minStartDate = {
      year: earliestDate.getFullYear(),
      month: earliestDate.getMonth() + 1,
      day: earliestDate.getDate()
    };
  }
  /**
  * Updates the date and time objects based on dateObject Date parameter
  * @param dateObject Date used to update the dateVarToUpdate & timeVarToUpdate objects
  * @param dateVarToUpdate ngbDatepicker friendly object used as either start or end date
  * @param timeVarToUpdate ngbTimepicker friendly object used as either start or end time
  */
  setADateTime(
    dateObject: Date,
    dateVarToUpdate: { year: number, month: number, day: number},
    timeVarToUpdate: { hour: number, minute: number }) {
    dateVarToUpdate.year = dateObject.getFullYear();
    dateVarToUpdate.month = dateObject.getMonth() + 1;
    dateVarToUpdate.day = dateObject.getDate();
    timeVarToUpdate.hour = dateObject.getHours();
    timeVarToUpdate.minute = dateObject.getMinutes();
  }
  /**
  * Called when params need updating. Avoids repetition.
  * @param params param object used to update queryParams
  */
  updateParams(params: {}) {
    this.router.navigate([], {
      queryParams: params,
      queryParamsHandling: 'merge'
    });
  }
}
