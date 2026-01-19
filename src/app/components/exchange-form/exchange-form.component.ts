import { Component } from '@angular/core';
import { CurrencyService } from '../../core/services/currency.service';

@Component({
  selector: 'app-exchange-form',
  standalone: true,
  imports: [],
  templateUrl: './exchange-form.component.html',
})
export class ExchangeFormComponent {
  readonly currencies = this.currencyService.currencies;

  constructor(private currencyService: CurrencyService) {
    this.currencyService.loadCurrencies().subscribe();
  }
}
