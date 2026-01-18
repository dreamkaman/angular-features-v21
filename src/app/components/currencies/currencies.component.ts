import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { Currencies } from '../../types/currencies';
import { CurrencyService } from '../../core/services/currency.service';


@Component({
  selector: 'app-currencies',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './currencies.component.html',
})
export class CurrenciesComponent {
  private readonly currencyService = inject(CurrencyService);

  readonly currencies = toSignal(
    this.currencyService.getCurrencies(),
    { initialValue: [] as Currencies },
  );
}
