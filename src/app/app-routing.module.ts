import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LiveViewComponent } from './components/live-view/live-view.component';
import { TradingHistoryComponent } from './components/trading-history/trading-history.component';
import { ProfitPortfolioComponent } from './components/profit-portfolio/profit-portfolio.component';
import { CryptobotControlsComponent } from './components/cryptobot-controls/cryptobot-controls.component';
import { ErrorComponent } from './components/error/error.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/live-view/BTC-USD', pathMatch: 'full' },
  {
    path: 'live-view',
    children: [
      { path: '', redirectTo: '/live-view/BTC-USD', pathMatch: 'full' },
      { path: 'BTC-USD', component: LiveViewComponent, pathMatch: 'full' },
      { path: 'LTC-USD', component: LiveViewComponent, pathMatch: 'full' },
      { path: 'ETH-USD', component: LiveViewComponent, pathMatch: 'full' },
      { path: 'ALL', component: LiveViewComponent, pathMatch: 'full' },
      { path: '**', redirectTo: '/live-view/BTC-USD' }
    ]
  },
  {
    path: 'trading-history',
    children: [
      { path: '', redirectTo: '/trading-history/BTC-USD', pathMatch: 'full' },
      { path: 'BTC-USD', component: TradingHistoryComponent, pathMatch: 'full' },
      { path: 'LTC-USD', component: TradingHistoryComponent, pathMatch: 'full' },
      { path: 'ETH-USD', component: TradingHistoryComponent, pathMatch: 'full' },
      { path: '**', redirectTo: '/trading-history/BTC-USD' }
    ]
  },
  {
    path: 'profit-portfolio',
    children: [
      { path: '', redirectTo: '/profit-portfolio/BTC-USD', pathMatch: 'full' },
      { path: 'BTC-USD', component: ProfitPortfolioComponent, pathMatch: 'full' },
      { path: 'LTC-USD', component: ProfitPortfolioComponent, pathMatch: 'full' },
      { path: 'ETH-USD', component: ProfitPortfolioComponent, pathMatch: 'full' },
      { path: '**', redirectTo: '/profit-portfolio/BTC-USD' }
    ]
  },
  {
    path: 'cryptobot-controls',
    children: [
      { path: '', component: CryptobotControlsComponent, pathMatch: 'full' },
      { path: '**', redirectTo: '/cryptobot-controls' }
    ]
  },
  {
    path: 'Error',
    children: [
      { path: '', redirectTo: '/Error/404', pathMatch: 'full' },
      { path: '404', component: ErrorComponent },
      { path: '500', component: ErrorComponent },
      { path: '12163', component: ErrorComponent },
      { path: '**', redirectTo: '/Error/404' }
    ]
  },
  { path: '**', redirectTo: '/Error/404' },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
