import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

// import * as gdax from '../../../node_modules/gdax/lib';
// const publicClient = new Gdax.PublicClient();

@Injectable()
export class GdaxDataService {

  constructor(private http: HttpClient) { }

  getLatestGdaxData(currency: string) {
    const headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json');
    const params = new HttpParams()
      .set('granularity', '300');
    return this.http.get<any>(`https://api.gdax.com/products/${currency}/candles`, {headers, params});
  }

}
