import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Currencies } from '../../types/currencies';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  private readonly URL = '/api/p24api/pubinfo?json&exchange&coursid=5';

  private currencies = signal<Currencies>([]);

  constructor(private httpClient: HttpClient) {}

  getCurrencies() {
    return this.httpClient.get<Currencies>(this.URL).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'Невідома помилка';

        if (error.error instanceof ErrorEvent) {
          errorMessage = `Client error: ${error.error.message}`;
        } else {
          errorMessage = `Server error (${error.status}): ${error.message}`;
        }

        return throwError(() => new Error(errorMessage));
      }),
    );
  }

  setCurrencies(newCurrencies: Currencies) {
    this.currencies.set(newCurrencies);
  }
}
