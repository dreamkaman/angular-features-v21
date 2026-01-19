import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, signal, computed } from '@angular/core';
import { Currencies } from '../../types/currencies';
import { catchError, tap, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CurrencyService {
  private readonly URL = '/api/p24api/pubinfo?json&exchange&coursid=5';

  private readonly _currencies = signal<Currencies>([]);

  readonly currencies = this._currencies.asReadonly();

  constructor(private http: HttpClient) {}

  loadCurrencies() {
    return this.http.get<Currencies>(this.URL).pipe(
      tap((data) => this._currencies.set(data)),
      catchError(this.handleError),
    );
  }

  calculate(iHave: string, iNeed: string) {
    const iHaveCurrency = this.currencies().filter((currency) => currency.ccy === iHave);
    const iNeedCurrency = this.currencies().filter((currency) => currency.ccy === iNeed);
    
    return;
  }

  private handleError(error: HttpErrorResponse) {
    const message =
      error.error?.message ?? `HTTP ${error.status}: ${error.statusText}`;
    return throwError(() => new Error(message));
  }
}
