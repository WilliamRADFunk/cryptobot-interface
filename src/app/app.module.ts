import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng5SliderModule } from 'ng5-slider';
import { ChartModule } from 'angular-highcharts';

import { AppComponent } from './app.component';
import { LiveViewComponent } from './components/live-view/live-view.component';
import { TradingHistoryComponent } from './components/trading-history/trading-history.component';
import { ProfitPortfolioComponent } from './components/profit-portfolio/profit-portfolio.component';
import { CryptobotControlsComponent } from './components/cryptobot-controls/cryptobot-controls.component';
import { AppRoutingModule } from './app-routing.module';
import { SidePanelComponent } from './components/side-panel/side-panel.component';
import { GdaxDataService } from './services/gdax-data.service';
import { FilterControlsComponent } from './components/filter-controls/filter-controls.component';
import { AutobotControlsService } from './services/autobot-controls.service';

@NgModule({
  declarations: [
    AppComponent,
    LiveViewComponent,
    TradingHistoryComponent,
    ProfitPortfolioComponent,
    CryptobotControlsComponent,
    SidePanelComponent,
    FilterControlsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule.forRoot(),
    Ng5SliderModule,
    ChartModule,
    AppRoutingModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [ AutobotControlsService, GdaxDataService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
