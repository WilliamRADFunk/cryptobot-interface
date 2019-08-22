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

  getMaxBuyMoneyStream(curr) {
    return timer(100, 5000)
      .pipe(
        switchMap(() => this.http.get<any>(`${DATA_URL}maximum-buy-money/${curr}`))
      );
  }

  getMaxBuyPriceStream(curr) {
    return timer(200, 5000)
      .pipe(
        switchMap(() => this.http.get<any>(`${DATA_URL}maximum-buy-price/${curr}`))
      );
  }

  getMaxNumberOfScrumsStream(curr) {
    return timer(300, 5000)
      .pipe(
        switchMap(() => this.http.get<any>(`${DATA_URL}maximum-number-of-scrums/${curr}`))
      );
  }

}
