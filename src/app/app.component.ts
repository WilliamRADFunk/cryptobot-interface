import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  /**
   * Whether or not to show the dropdown menu
   */
  public showState: boolean;

  /**
   * Solves the collapse of the mobile nav dropdown
   * without illegally accessing the html dom references.
   */ 
  public mobileCollapseState(): void {
    this.showState = false;
  }
  /**
   * Keeps track of collapsed state in order to apply show: false
   * when user selects option form mobile dropdown van menu.
   */ 
  public toggleCollapseState(): void {
    setTimeout(() => {
      if (this.showState === undefined) {
        this.showState = true;
      } else {
        this.showState = !this.showState;
      }
    }, 200);
  }
}
