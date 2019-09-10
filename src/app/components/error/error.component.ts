import { Component, OnInit } from '@angular/core';
import { UrlSegment, ActivatedRoute } from '@angular/router';

import { take } from 'rxjs/operators';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {
  /**
  * The initial error code passed in by the activatedRouter.
  * Keeps track of what error message to show.
  */
  public errorCode: string = '404';

  constructor(private readonly activatedRouter: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRouter.url
      .pipe(take(1))
      .subscribe((segments: UrlSegment[]) => {
        this.errorCode = segments[0]['path'] || '404';
      });
  }
}
