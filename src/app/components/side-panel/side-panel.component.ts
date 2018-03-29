import { Component, Input, OnInit } from '@angular/core';

import { GdaxDataService } from '../../services/gdax-data.service';

@Component({
  selector: 'app-side-panel',
  templateUrl: './side-panel.component.html',
  styleUrls: ['./side-panel.component.scss']
})
export class SidePanelComponent implements OnInit {
  /**
  * The initial pathstate passed in by the main view.
  * When these controls trigger a currency view change, and
  * this component is replaced by its counterpart, this bound
  * variable is what is updated to make relevant button 'active'
  */
  @Input() pathState: string = 'BTC-USD';
  /**
  * Checks with service to see if it's busy in a query,
  * and disables controls when it is.
  */
  isBusy: boolean = true;
  /**
  * Constructor for the class.
  */
  constructor(private gdaxDataService: GdaxDataService) { }

  ngOnInit() {
    this.gdaxDataService.isBusy
      .subscribe(data => {
        this.isBusy = data;
      });
  }
}
