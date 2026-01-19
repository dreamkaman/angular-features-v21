import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CurrencyService } from '../../core/services/currency.service';

@Component({
  selector: 'app-exchange-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './exchange-form.component.html',
})
export class ExchangeFormComponent {
  currencyCalculatorFormGroup = new FormGroup({
    iHaveSum: new FormControl<number>(1),
    iHaveCurrency: new FormControl('UAH'),
    iNeedSum: new FormControl<number>(1),
    iNeedCurrency: new FormControl('UAH'),
  });

  readonly currencies = this.currencyService.currencies;

  constructor(private currencyService: CurrencyService) {
    this.currencyService.loadCurrencies().subscribe();
  }

  calculate() {
    const iHaveSum =
      this.currencyCalculatorFormGroup.get('iHaveSum')?.value ?? 0;
    const iHaveCurrency =
      this.currencyCalculatorFormGroup.get('iHaveCurrency')?.value??'UAH';
    const iNeedCurrency = this.currencyCalculatorFormGroup.get('iNeedCurrency')?.value??'UAH';

    const newValue = this.currencyService.calculate({
      iHaveSum,
      iHaveCurrency,
      iNeedCurrency,
    });

    this.currencyCalculatorFormGroup.patchValue({ iNeedSum: newValue });
  }
}
