import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { AppComponent } from './app.component';
import { LiveViewComponent } from './components/live-view/live-view.component';
import { TradingHistoryComponent } from './components/trading-history/trading-history.component';
import { ProfitPortfolioComponent } from './components/profit-portfolio/profit-portfolio.component';
import { CryptobotControlsComponent } from './components/cryptobot-controls/cryptobot-controls.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    LiveViewComponent,
    TradingHistoryComponent,
    ProfitPortfolioComponent,
    CryptobotControlsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule.forRoot(),
    AppRoutingModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
