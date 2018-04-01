import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router, UrlSegment } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChartModule } from 'angular-highcharts';

import { TradingHistoryComponent } from './trading-history.component';
import { GdaxDataService } from '../../services/gdax-data.service';

let gdaxDataService;

describe('TradingHistoryComponent', () => {
  let component: TradingHistoryComponent;
  let fixture: ComponentFixture<TradingHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NgbModule.forRoot(),
        ChartModule
      ],
      declarations: [ TradingHistoryComponent ],
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
    fixture = TestBed.createComponent(TradingHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
