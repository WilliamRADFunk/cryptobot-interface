import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-side-panel',
  templateUrl: './side-panel.component.html',
  styleUrls: ['./side-panel.component.scss']
})
export class SidePanelComponent {
  /**
  * The initial pathstate passed in by the main view.
  * When these controls trigger a currency view change, and
  * this component is replaced by its counterpart, this bound
  * variable is what is updated to make relevant button 'active'
  */
  @Input() pathState: string = 'BTC-USD';

  /**
  * Constructor for the class.
  */
  constructor() { }
}
