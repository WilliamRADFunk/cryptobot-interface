import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router, UrlSegment } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChartModule, Chart } from 'angular-highcharts';

import { LiveViewComponent } from './live-view.component';
import { GdaxDataService } from '../../services/gdax-data.service';

let gdaxDataService;

describe('LiveViewComponent', () => {
  let component: LiveViewComponent;
  let fixture: ComponentFixture<LiveViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NgbModule.forRoot(),
        ChartModule
      ],
      declarations: [ LiveViewComponent ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {children: [{url: ['BTC-USD']}]},
            url: {
              subscribe: fn => {
                fn([{path: 'BTC-USD'}]);
              }
            }
          }
        },
        {
          provide: Router,
          useClass: class { navigate: {} = jasmine.createSpy('navigate'); }
        },
        {
          provide: GdaxDataService,
          useValue: {
            changeCurrencyType: () => {},
            chartData: {
              subscribe: (fn) => {
                fn([1, 2, 3, 4, 5, 6]);
              }
            },
          }
        }
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    });
    gdaxDataService = TestBed.get(GdaxDataService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  describe('updateChart', () => {
    it('should return without updating chart or chartReady', () => {
      component.chart = undefined;
      component.chartReady = false;
      component.updateChart([]);
      expect(component.chart).toBe(undefined);
      expect(component.chartReady).toBe(false);
    });
    it('should set chart object to a Chart object and chartReady to true', () => {
      component.chart = undefined;
      component.chartReady = false;
      component.updateChart([[new Date().getTime(), 2, 3, 4, 5]]);
      expect(component.chart instanceof Chart).toBe(true);
      expect(component.chartReady).toBe(true);
    });
    it('should set chart object to a Chart object and chartReady to true', () => {
      component.chart = undefined;
      component.chartReady = false;
      component.pathState = 'ALL';
      component.updateChart([
        [new Date().getTime(), 2, 3, 4, 5, 6, 0],
        [new Date().getTime(), 2, 3, 4, 5, 6, 1],
        [new Date().getTime(), 2, 3, 4, 5, 6, 2]
      ]);
      expect(component.chart instanceof Chart).toBe(true);
      expect(component.chartReady).toBe(true);
    });
    it('should set chart object to a Chart object and chartReady to true', () => {
      component.chart = undefined;
      component.chartReady = false;
      component.pathState = 'ALL';
      component.updateChart([
        [new Date().getTime(), 2, 3, 4, 5, 6, 0],
        [new Date().getTime(), 2, 3, 4, 5, 6, 1],
        [new Date().getTime(), 2, 3, 4, 5, 6, 3]
      ]);
      expect(component.chart instanceof Chart).toBe(true);
      expect(component.chartReady).toBe(true);
    });
  });
});
