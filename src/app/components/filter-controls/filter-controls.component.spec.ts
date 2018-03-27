import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChartModule } from 'angular-highcharts';

import { FilterControlsComponent } from './filter-controls.component';
import { GdaxDataService } from '../../services/gdax-data.service';

let gdaxDataService;
const date1 = new Date('2018-03-25T03:55:00.000Z');
const date2 = new Date('2018-03-26T03:55:00.000Z');
let shortDate1: { year: number, month: number, day: number} = {
  year: null,
  month: null,
  day: null
};
shortDate1 = {
  year: date1.getFullYear(),
  month: date1.getMonth() + 1,
  day: date1.getDate()
};
let shortTime1: { hour: number, minute: number } = {
  hour: null,
  minute: null
};
shortTime1 = {
  hour: date1.getHours(),
  minute: date1.getMinutes()
};
let shortDate2: { year: number, month: number, day: number} = {
  year: null,
  month: null,
  day: null
};
shortDate2 = {
  year: date2.getFullYear(),
  month: date2.getMonth() + 1,
  day: date2.getDate()
};
let shortTime2: { hour: number, minute: number } = {
  hour: null,
  minute: null
};
shortTime2 = {
  hour: date2.getHours(),
  minute: date2.getMinutes()
};

describe('FilterControlsComponent', () => {
  let component: FilterControlsComponent;
  let fixture: ComponentFixture<FilterControlsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        NgbModule.forRoot(),
        ChartModule
      ],
      declarations: [ FilterControlsComponent ],
      providers: [
        {
          provide: GdaxDataService,
          useValue: {
            changeTimeInterval: (value) => {
              return { };
            },
            changeStartDateTime: () => {
              return { };
            },
            changeEndDateTime: () => {
              return { };
            }
          }
        }
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    });
    gdaxDataService = TestBed.get(GdaxDataService);
  }));

  beforeEach(() => {
    spyOn(gdaxDataService, 'changeTimeInterval').and.callThrough();
    spyOn(gdaxDataService, 'changeEndDateTime').and.callThrough();
    spyOn(gdaxDataService, 'changeStartDateTime').and.callThrough();
    fixture = TestBed.createComponent(FilterControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  describe('changedTimeInterval', () => {
    it(`should change timeInterval and timeIntervalLabel,
      plus call gdaxDataService.changeTimeInterval with expected granularity value`, () => {
      component.changedTimeInterval({label: '6 hours', value: 21600});
      expect(component.timeInterval).toBe(21600);
      expect(component.timeIntervalLabel).toBe('6 hours');
      expect(gdaxDataService.changeTimeInterval).toHaveBeenCalledWith(21600);
    });
  });
  describe('onEndDateChange', () => {
    beforeEach(() => {
      spyOn(component, 'adjustGranularityOptions').and.returnValue(true);
    });
    it(`should call gdaxDataService.changeEndDateTime with expected date,
      and set warning flags to false.`, () => {
      spyOn(component, 'checkValidDateTime').and.returnValue(true);
      component.eDate = shortDate2;
      component.eTime = shortTime2;
      component.onEndDateChange();
      expect(component.invalidEndDatetime).toBe(false);
      expect(component.invalidStartDatetime).toBe(false);
      expect(component.adjustGranularityOptions).toHaveBeenCalled();
      expect(gdaxDataService.changeEndDateTime).toHaveBeenCalledWith(date2);
    });
    it(`should not call gdaxDataService.changeEndDateTime with expected date,
      and set end datetime warning flag to true.`, () => {
      spyOn(component, 'checkValidDateTime').and.returnValue(false);
      component.onEndDateChange();
      expect(component.invalidEndDatetime).toBe(true);
      expect(component.invalidStartDatetime).toBe(false);
      expect(component.adjustGranularityOptions).not.toHaveBeenCalled();
      expect(gdaxDataService.changeEndDateTime).not.toHaveBeenCalledWith(date2);
    });
  });
  describe('onEndTimeChange', () => {
    beforeEach(() => {
      spyOn(component, 'adjustGranularityOptions').and.returnValue(true);
    });
    it(`should call gdaxDataService.changeEndDateTime with expected date,
    and set warning flags to false.`, () => {
      spyOn(component, 'checkValidDateTime').and.returnValue(true);
      component.eDate = shortDate2;
      component.eTime = shortTime2;
      component.onEndTimeChange();
      expect(component.invalidEndDatetime).toBe(false);
      expect(component.invalidStartDatetime).toBe(false);
      expect(gdaxDataService.changeEndDateTime).toHaveBeenCalledWith(date2);
    });
    it(`should call gdaxDataService.changeEndDateTime with expected date,
    and set end datetime warning flag to true.`, () => {
      spyOn(component, 'checkValidDateTime').and.returnValue(false);
      component.onEndTimeChange();
      expect(component.invalidEndDatetime).toBe(true);
      expect(component.invalidStartDatetime).toBe(false);
      expect(component.adjustGranularityOptions).not.toHaveBeenCalled();
      expect(gdaxDataService.changeEndDateTime).not.toHaveBeenCalledWith(date2);
    });
  });
  describe('onStartDateChange', () => {
    beforeEach(() => {
      spyOn(component, 'adjustGranularityOptions').and.returnValue(true);
    });
    it(`should call gdaxDataService.changeStartDateTime with expected date,
    and set warning flags to false.`, () => {
      spyOn(component, 'checkValidDateTime').and.returnValue(true);
      component.sDate = shortDate1;
      component.sTime = shortTime1;
      component.onStartDateChange();
      expect(component.invalidEndDatetime).toBe(false);
      expect(component.invalidStartDatetime).toBe(false);
      expect(gdaxDataService.changeStartDateTime).toHaveBeenCalledWith(date1);
    });
    it(`should call gdaxDataService.changeStartDateTime with expected date,
    and set start datetime warning flag to true.`, () => {
      spyOn(component, 'checkValidDateTime').and.returnValue(false);
      component.onStartDateChange();
      expect(component.invalidEndDatetime).toBe(false);
      expect(component.invalidStartDatetime).toBe(true);
      expect(component.adjustGranularityOptions).not.toHaveBeenCalled();
      expect(gdaxDataService.changeStartDateTime).not.toHaveBeenCalledWith(date1);
    });
  });
  describe('onStartTimeChange', () => {
    beforeEach(() => {
      spyOn(component, 'adjustGranularityOptions').and.returnValue(true);
    });
    it(`should call gdaxDataService.changeStartDateTime with expected date,
    and set warning flags to false.`, () => {
      spyOn(component, 'checkValidDateTime').and.returnValue(true);
      component.sDate = shortDate1;
      component.sTime = shortTime1;
      component.onStartTimeChange();
      expect(component.invalidEndDatetime).toBe(false);
      expect(component.invalidStartDatetime).toBe(false);
      expect(gdaxDataService.changeStartDateTime).toHaveBeenCalledWith(date1);
    });
    it(`should call gdaxDataService.changeStartDateTime with expected date,
    and set start datetime warning flag to true.`, () => {
      spyOn(component, 'checkValidDateTime').and.returnValue(false);
      component.onStartTimeChange();
      expect(component.invalidEndDatetime).toBe(false);
      expect(component.invalidStartDatetime).toBe(true);
      expect(component.adjustGranularityOptions).not.toHaveBeenCalled();
      expect(gdaxDataService.changeStartDateTime).not.toHaveBeenCalledWith(date1);
    });
  });
  describe('checkValidYear', () => {
    it(`should return false`, () => {
      expect(component.checkValidYear(null)).toBe(false);
    });
    it(`should return false`, () => {
      expect(component.checkValidYear(undefined)).toBe(false);
    });
    it(`should return false`, () => {
      expect(component.checkValidYear(1969)).toBe(false);
    });
    it(`should return false`, () => {
      expect(component.checkValidYear(2200)).toBe(false);
    });
    it(`should return true`, () => {
      expect(component.checkValidYear(1970)).toBe(true);
    });
    it(`should return true`, () => {
      expect(component.checkValidYear(2199)).toBe(true);
    });
    it(`should return true`, () => {
      expect(component.checkValidYear(2018)).toBe(true);
    });
  });
  describe('checkValidMonth', () => {
    it(`should return false`, () => {
      expect(component.checkValidMonth(null)).toBe(false);
    });
    it(`should return false`, () => {
      expect(component.checkValidMonth(undefined)).toBe(false);
    });
    it(`should return false`, () => {
      expect(component.checkValidMonth(0)).toBe(false);
    });
    it(`should return false`, () => {
      expect(component.checkValidMonth(13)).toBe(false);
    });
    it(`should return true`, () => {
      expect(component.checkValidMonth(1)).toBe(true);
    });
    it(`should return true`, () => {
      expect(component.checkValidMonth(12)).toBe(true);
    });
    it(`should return true`, () => {
      expect(component.checkValidMonth(3)).toBe(true);
    });
  });
  describe('checkValidMinutes', () => {
    it(`should return false`, () => {
      expect(component.checkValidMinutes(null)).toBe(false);
    });
    it(`should return false`, () => {
      expect(component.checkValidMinutes(undefined)).toBe(false);
    });
    it(`should return false`, () => {
      expect(component.checkValidMinutes(-1)).toBe(false);
    });
    it(`should return false`, () => {
      expect(component.checkValidMinutes(60)).toBe(false);
    });
    it(`should return true`, () => {
      expect(component.checkValidMinutes(0)).toBe(true);
    });
    it(`should return true`, () => {
      expect(component.checkValidMinutes(59)).toBe(true);
    });
    it(`should return true`, () => {
      const foo: number = '00' as any;
      expect(component.checkValidMinutes(foo)).toBe(true);
    });
  });
  describe('checkValidHours', () => {
    it(`should return false`, () => {
      expect(component.checkValidHours(null)).toBe(false);
    });
    it(`should return false`, () => {
      expect(component.checkValidHours(undefined)).toBe(false);
    });
    it(`should return false`, () => {
      expect(component.checkValidHours(-1)).toBe(false);
    });
    it(`should return false`, () => {
      expect(component.checkValidHours(24)).toBe(false);
    });
    it(`should return true`, () => {
      expect(component.checkValidHours(0)).toBe(true);
    });
    it(`should return true`, () => {
      expect(component.checkValidHours(23)).toBe(true);
    });
    it(`should return true`, () => {
      const foo: number = '00' as any;
      expect(component.checkValidHours(foo)).toBe(true);
    });
  });
  describe('checkValidDay', () => {
    it(`should return false`, () => {
      expect(component.checkValidDay(null)).toBe(false);
    });
    it(`should return false`, () => {
      expect(component.checkValidDay(undefined)).toBe(false);
    });
    it(`should return false`, () => {
      expect(component.checkValidDay(0)).toBe(false);
    });
    it(`should return false`, () => {
      expect(component.checkValidDay(32)).toBe(false);
    });
    it(`should return true`, () => {
      expect(component.checkValidDay(1)).toBe(true);
    });
    it(`should return true`, () => {
      expect(component.checkValidDay(31)).toBe(true);
    });
    it(`should return true`, () => {
      expect(component.checkValidDay(26)).toBe(true);
    });
  });
  describe('checkValidDateTimeOrder', () => {
    it(`should return false`, () => {
      component.sDate = shortDate2;
      component.sTime = shortTime2;
      component.eDate = shortDate1;
      component.eTime = shortTime1;
      expect(component.checkValidDateTimeOrder()).toBe(false);
    });
    it(`should return false`, () => {
      component.sDate = shortDate2;
      component.sTime = shortTime2;
      component.eDate = shortDate2;
      component.eTime = shortTime2;
      expect(component.checkValidDateTimeOrder()).toBe(false);
    });
    it(`should return true`, () => {
      component.sDate = shortDate1;
      component.sTime = shortTime1;
      component.eDate = shortDate2;
      component.eTime = shortTime2;
      expect(component.checkValidDateTimeOrder()).toBe(true);
    });
  });
  describe('checkValidDateTime', () => {
    it(`should return true`, () => {
      spyOn(component, 'checkValidYear').and.returnValue(true);
      spyOn(component, 'checkValidMonth').and.returnValue(true);
      spyOn(component, 'checkValidDay').and.returnValue(true);
      spyOn(component, 'checkValidHours').and.returnValue(true);
      spyOn(component, 'checkValidMinutes').and.returnValue(true);
      spyOn(component, 'checkValidDateTimeOrder').and.returnValue(true);
      expect(component.checkValidDateTime()).toBe(true);
    });
    it(`should return false`, () => {
      spyOn(component, 'checkValidYear').and.returnValues(true, false);
      spyOn(component, 'checkValidMonth').and.returnValue(true);
      spyOn(component, 'checkValidDay').and.returnValue(true);
      spyOn(component, 'checkValidHours').and.returnValue(true);
      spyOn(component, 'checkValidMinutes').and.returnValue(true);
      spyOn(component, 'checkValidDateTimeOrder').and.returnValue(true);
      expect(component.checkValidDateTime()).toBe(false);
    });
    it(`should return false`, () => {
      spyOn(component, 'checkValidYear').and.returnValues(true, true);
      spyOn(component, 'checkValidMonth').and.returnValues(true, false);
      spyOn(component, 'checkValidDay').and.returnValue(true);
      spyOn(component, 'checkValidHours').and.returnValue(true);
      spyOn(component, 'checkValidMinutes').and.returnValue(true);
      spyOn(component, 'checkValidDateTimeOrder').and.returnValue(true);
      expect(component.checkValidDateTime()).toBe(false);
    });
    it(`should return false`, () => {
      spyOn(component, 'checkValidYear').and.returnValues(true, true);
      spyOn(component, 'checkValidMonth').and.returnValues(true, true);
      spyOn(component, 'checkValidDay').and.returnValues(true, false);
      spyOn(component, 'checkValidHours').and.returnValue(true);
      spyOn(component, 'checkValidMinutes').and.returnValue(true);
      spyOn(component, 'checkValidDateTimeOrder').and.returnValue(true);
      expect(component.checkValidDateTime()).toBe(false);
    });
    it(`should return false`, () => {
      spyOn(component, 'checkValidYear').and.returnValues(true, true);
      spyOn(component, 'checkValidMonth').and.returnValues(true, true);
      spyOn(component, 'checkValidDay').and.returnValues(true, true);
      spyOn(component, 'checkValidHours').and.returnValues(true, false);
      spyOn(component, 'checkValidMinutes').and.returnValue(true);
      spyOn(component, 'checkValidDateTimeOrder').and.returnValue(true);
      expect(component.checkValidDateTime()).toBe(false);
    });
    it(`should return false`, () => {
      spyOn(component, 'checkValidYear').and.returnValues(true, true);
      spyOn(component, 'checkValidMonth').and.returnValues(true, true);
      spyOn(component, 'checkValidDay').and.returnValues(true, true);
      spyOn(component, 'checkValidHours').and.returnValues(true, true);
      spyOn(component, 'checkValidMinutes').and.returnValues(true, false);
      spyOn(component, 'checkValidDateTimeOrder').and.returnValue(true);
      expect(component.checkValidDateTime()).toBe(false);
    });
  });
  describe('adjustGranularityOptions', () => {
    it(`should not call changedTimeInterval, and alter granularity list`, () => {
      spyOn(component, 'changedTimeInterval').and.returnValue(true);
      component.sDate = shortDate1;
      component.sTime = shortTime1;
      component.eDate = shortDate2;
      component.eTime = shortTime2;
      component.adjustGranularityOptions();
      expect(component.changedTimeInterval).not.toHaveBeenCalled();
      expect(component.timeInterval).toBe(3600);
      expect(component.timeIntervalLabel).toBe('1 hour');
      expect(component.timeIntervals).toEqual([
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
        }
      ]);
    });
    it(`should call changedTimeInterval, and alter granularity list`, () => {
      spyOn(component, 'changedTimeInterval').and.returnValue(true);
      shortDate1['day'] -= 14;
      component.sDate = shortDate1;
      component.sTime = shortTime1;
      component.eDate = shortDate2;
      component.eTime = shortTime2;
      component.adjustGranularityOptions();
      expect(component.changedTimeInterval).toHaveBeenCalled();
      expect(component.timeInterval).toBe(21600);
      expect(component.timeIntervalLabel).toBe('6 hours');
      expect(component.timeIntervals).toEqual([
        {
          label: '6 hours',
          value: 21600
        },
        {
          label: '1 day',
          value: 86400
        }
      ]);
    });
  });
});
