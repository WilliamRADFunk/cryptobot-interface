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
const shortDate1: { year: number, month: number, day: number} = {
  year: date1.getFullYear(),
  month: date1.getMonth() + 1,
  day: date1.getDate()
};
const shortTime1: { hour: number, minute: number } = {
  hour: date1.getHours(),
  minute: date1.getMinutes()
};
const shortDate2: { year: number, month: number, day: number} = {
  year: date2.getFullYear(),
  month: date2.getMonth() + 1,
  day: date2.getDate()
};
const shortTime2: { hour: number, minute: number } = {
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
    it(`should call gdaxDataService.changeTimeInterval with expected date`, () => {
      component.sDate = shortDate1;
      component.sTime = shortTime1;
      component.eDate = shortDate2;
      component.eTime = shortTime2;
      component.onEndDateChange();
      expect(gdaxDataService.changeEndDateTime).toHaveBeenCalledWith(date2);
    });
  });
  describe('onEndTimeChange', () => {
    it(`should call gdaxDataService.changeTimeInterval with expected date`, () => {
      component.sDate = shortDate1;
      component.sTime = shortTime1;
      component.eDate = shortDate2;
      component.eTime = shortTime2;
      component.onEndTimeChange();
      expect(gdaxDataService.changeEndDateTime).toHaveBeenCalledWith(date2);
    });
  });
  describe('onStartDateChange', () => {
    it(`should call gdaxDataService.changeTimeInterval with expected date`, () => {
      component.sDate = shortDate1;
      component.sTime = shortTime1;
      component.eDate = shortDate2;
      component.eTime = shortTime2;
      component.onStartDateChange();
      expect(gdaxDataService.changeStartDateTime).toHaveBeenCalledWith(date1);
    });
  });
  describe('onStartTimeChange', () => {
    it(`should call gdaxDataService.changeTimeInterval with expected date`, () => {
      component.sDate = shortDate1;
      component.sTime = shortTime1;
      component.eDate = shortDate2;
      component.eTime = shortTime2;
      component.onStartTimeChange();
      expect(gdaxDataService.changeStartDateTime).toHaveBeenCalledWith(date1);
    });
  });
});
