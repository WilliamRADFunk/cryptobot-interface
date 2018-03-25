import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LiveViewComponent } from './components/live-view/live-view.component';
import { TradingHistoryComponent } from './components/trading-history/trading-history.component';
import { ProfitPortfolioComponent } from './components/profit-portfolio/profit-portfolio.component';
import { CryptobotControlsComponent } from './components/cryptobot-controls/cryptobot-controls.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/live-view/BTC-USD', pathMatch: 'full' },
  { path: 'live-view', children: [
    { path: '', redirectTo: '/live-view/BTC-USD', pathMatch: 'full' },
    { path: 'BTC-USD', component: LiveViewComponent },
    { path: 'LTC-USD', component: LiveViewComponent },
    { path: 'ETH-USD', component: LiveViewComponent },
    { path: 'ALL', component: LiveViewComponent }
  ] },
  { path: 'trading-history', children: [
    { path: '', redirectTo: '/trading-history/BTC-USD', pathMatch: 'full' },
    { path: 'BTC-USD', component: TradingHistoryComponent },
    { path: 'LTC-USD', component: TradingHistoryComponent },
    { path: 'ETH-USD', component: TradingHistoryComponent },
    { path: 'ALL', component: TradingHistoryComponent }
  ] },
  { path: 'profit-portfolio', children: [
    { path: '', redirectTo: '/profit-portfolio/BTC-USD', pathMatch: 'full' },
    { path: 'BTC-USD', component: ProfitPortfolioComponent },
    { path: 'LTC-USD', component: ProfitPortfolioComponent },
    { path: 'ETH-USD', component: ProfitPortfolioComponent },
    { path: 'ALL', component: ProfitPortfolioComponent }
  ] },
  { path: 'cryptobot-controls', children: [
    { path: '', redirectTo: '/cryptobot-controls/BTC-USD', pathMatch: 'full' },
    { path: 'BTC-USD', component: CryptobotControlsComponent },
    { path: 'LTC-USD', component: CryptobotControlsComponent },
    { path: 'ETH-USD', component: CryptobotControlsComponent },
    { path: 'ALL', component: CryptobotControlsComponent }
  ] }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
