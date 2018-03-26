import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChartModule } from 'angular-highcharts';

import { FilterControlsComponent } from './filter-controls.component';
import { GdaxDataService } from '../../services/gdax-data.service';

let gdaxDataService;
const date = new Date('2018-03-25T03:55:00.000Z');
const shortDate: { year: number, month: number, day: number} = {
  year: date.getFullYear(),
  month: date.getMonth() + 1,
  day: date.getDate()
};
const shortTime: { hour: number, minute: number } = {
  hour: date.getHours(),
  minute: date.getMinutes()
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
      component.eDate = shortDate;
      component.eTime = shortTime;
      component.onEndDateChange();
      expect(gdaxDataService.changeEndDateTime).toHaveBeenCalledWith(date);
    });
  });
  describe('onEndTimeChange', () => {
    it(`should call gdaxDataService.changeTimeInterval with expected date`, () => {
      component.eDate = shortDate;
      component.eTime = shortTime;
      component.onEndTimeChange();
      expect(gdaxDataService.changeEndDateTime).toHaveBeenCalledWith(date);
    });
  });
  describe('onStartDateChange', () => {
    it(`should call gdaxDataService.changeTimeInterval with expected date`, () => {
      component.sDate = shortDate;
      component.sTime = shortTime;
      component.onStartDateChange();
      expect(gdaxDataService.changeStartDateTime).toHaveBeenCalledWith(date);
    });
  });
  describe('onStartTimeChange', () => {
    it(`should call gdaxDataService.changeTimeInterval with expected date`, () => {
      component.sDate = shortDate;
      component.sTime = shortTime;
      component.onStartTimeChange();
      expect(gdaxDataService.changeStartDateTime).toHaveBeenCalledWith(date);
    });
  });
});
