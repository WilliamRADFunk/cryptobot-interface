import { Component, Input, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';

import { GdaxDataService } from '../../services/gdax-data.service';

@Component({
  selector: 'app-side-panel',
  templateUrl: './side-panel.component.html',
  styleUrls: ['./side-panel.component.scss']
})
export class SidePanelComponent implements OnDestroy, OnInit {
  /**
   * Subscriptions to unsubscribe from onDestroy
   */
  private readonly _subs: Subscription[] = [];
  /**
  * Checks with service to see if it's busy in a query,
  * and disables controls when it is.
  */
  public isBusy: boolean = true;
  /**
  * The initial pathstate passed in by the main view.
  * When these controls trigger a currency view change, and
  * this component is replaced by its counterpart, this bound
  * variable is what is updated to make relevant button 'active'
  */
  @Input() pathState: string = 'BTC-USD';
  /**
  * Constructor for the class.
  * @param gdaxDataService data service for accessing UI relevant gdax api.
  */
  constructor(private readonly gdaxDataService: GdaxDataService) { }
  /**
  * Triggered when component is destroyed, but before it's officially dead
  * this runs cleanup functionality to protect against misfired queries.
  */
  ngOnDestroy(): void {
    this._subs.forEach(s => s && s.unsubscribe());
    this._subs.length = 0;
  }
  /**
  * Triggered when component is loaded, but before it is viewed.
  * Gets service busy signal to disable buttons when necessary.
  */
  ngOnInit(): void {
    this._subs.push(this.gdaxDataService.isBusy.subscribe(data => {
      this.isBusy = data;
    }));
  }
}
