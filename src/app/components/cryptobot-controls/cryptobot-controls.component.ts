import { Component, OnInit } from '@angular/core';

import { GdaxDataService } from '../../services/gdax-data.service';

@Component({
  selector: 'app-cryptobot-controls',
  templateUrl: './cryptobot-controls.component.html',
  styleUrls: ['./cryptobot-controls.component.scss']
})
export class CryptobotControlsComponent implements OnInit {
  /**
  * Constructor for the CryptobotControlsComponent class.
  * @param gdaxDataService Internal service to get queried market data.
  */
  constructor(private gdaxDataService: GdaxDataService) { }
  /**
  * Triggered when component is loaded, but before it is viewed.
  */
  ngOnInit() {
    this.gdaxDataService.changeCurrencyType(null, 'cryptobot-controls');
  }

}
