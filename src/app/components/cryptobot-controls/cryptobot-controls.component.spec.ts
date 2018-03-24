import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CryptobotControlsComponent } from './cryptobot-controls.component';

describe('CryptobotControlsComponent', () => {
  let component: CryptobotControlsComponent;
  let fixture: ComponentFixture<CryptobotControlsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CryptobotControlsComponent ]
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
