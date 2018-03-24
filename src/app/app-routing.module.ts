import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LiveViewComponent } from './components/live-view/live-view.component';
import { TradingHistoryComponent } from './components/trading-history/trading-history.component';
import { ProfitPortfolioComponent } from './components/profit-portfolio/profit-portfolio.component';
import { CryptobotControlsComponent } from './components/cryptobot-controls/cryptobot-controls.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/live-view', pathMatch: 'full' },
  { path: 'live-view', component: LiveViewComponent },
  { path: 'trading-history', component: TradingHistoryComponent },
  { path: 'profit-portfolio', component: ProfitPortfolioComponent },
  { path: 'cryptobot-controls', component: CryptobotControlsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
