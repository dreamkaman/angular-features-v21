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

  calculate({
    iHaveCurrency,
    iHaveSum,
    iNeedCurrency,
  }: {
    iHaveCurrency: string;
    iHaveSum: number;
    iNeedCurrency: string;
  }) {
    if (
      iHaveCurrency !== 'UAH' &&
      iNeedCurrency !== 'UAH' &&
      iHaveCurrency !== iNeedCurrency
    ) {
      const iNeedCurrencyInfo = this.currencies().find(
        (currency) => currency.ccy === iNeedCurrency,
      );
      const iHaveCurrencyInfo = this.currencies().find(
        (currency) => currency.ccy === iHaveCurrency,
      );

      if (!iNeedCurrencyInfo || !iHaveCurrencyInfo) {
        return 0;
      }

      return (iHaveSum * iHaveCurrencyInfo.buy) / iNeedCurrencyInfo.sale;
    }

    if (iHaveCurrency !== 'UAH' && iNeedCurrency === 'UAH') {

      const iHaveCurrencyInfo = this.currencies().find(
        (currency) => currency.ccy === iHaveCurrency,
      );

      console.log(iHaveCurrencyInfo);

      if (!iHaveCurrencyInfo) {
        return 0;
      }

      return iHaveSum * iHaveCurrencyInfo.buy;
    }

    if (iHaveCurrency === 'UAH' && iNeedCurrency !== 'UAH') {
      const iNeedCurrencyInfo = this.currencies().find(
        (currency) => currency.ccy === iNeedCurrency,
      );
      if (!iNeedCurrencyInfo) {
        return 0;
      }

      return iHaveSum / iNeedCurrencyInfo.sale;
    }

    return iHaveSum;
  }

  private handleError(error: HttpErrorResponse) {
    const message =
      error.error?.message ?? `HTTP ${error.status}: ${error.statusText}`;
    return throwError(() => new Error(message));
  }
}
