import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyService } from '../../core/services/currency.service';

@Component({
  selector: 'app-currencies',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './currencies.component.html',
})
export class CurrenciesComponent {
  readonly currencies = this.currencyService.currencies;

  constructor(private currencyService: CurrencyService) {
    this.currencyService.loadCurrencies().subscribe();
  }
}
