import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfitPortfolioComponent } from './profit-portfolio.component';

describe('ProfitPortfolioComponent', () => {
  let component: ProfitPortfolioComponent;
  let fixture: ComponentFixture<ProfitPortfolioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfitPortfolioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfitPortfolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
