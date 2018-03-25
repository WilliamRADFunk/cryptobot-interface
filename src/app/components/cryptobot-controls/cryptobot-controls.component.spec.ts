import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router, UrlSegment } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChartModule } from 'angular-highcharts';

import { CryptobotControlsComponent } from './cryptobot-controls.component';

describe('CryptobotControlsComponent', () => {
  let component: CryptobotControlsComponent;
  let fixture: ComponentFixture<CryptobotControlsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NgbModule.forRoot(),
        ChartModule
      ],
      declarations: [ CryptobotControlsComponent ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {snapshot: {children: [{url: ['BTC-USD']}]}}
        },
        {
          provide: Router,
          useClass: class { navigate: {} = jasmine.createSpy('navigate'); }
        }
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CryptobotControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
