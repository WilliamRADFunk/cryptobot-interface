import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ActivatedRoute, Router, UrlSegment, RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { SidePanelComponent } from './side-panel.component';
import { GdaxDataService } from '../../services/gdax-data.service';

describe('SidePanelComponent', () => {
  let component: SidePanelComponent;
  let fixture: ComponentFixture<SidePanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        NgbModule.forRoot()
      ],
      declarations: [ SidePanelComponent ],
      providers: [
        {
          provide: GdaxDataService,
          useValue: {
            isBusy: {
              subscribe: fn => {
                fn(true);
              }
            }
          }
        }
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
