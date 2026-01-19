import { Component } from '@angular/core';
import { ExchangeFormComponent } from '../../components/exchange-form/exchange-form.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [ExchangeFormComponent],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {}
