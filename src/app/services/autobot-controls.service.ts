import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';

const INTERFACE_URL = 'http://www.williamrobertfunk.com';
const DATA_URL = 'http://167.99.149.6:3000/';

@Injectable()
export class AutobotControlsService {

  constructor(private readonly http: HttpClient) { }

  getMarketPriceStream(curr) {
    return timer(0, 2000)
      .pipe(
        switchMap(() => this.http.get<any>(`${DATA_URL}market/${curr}`))
      );
  }

}
