import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CurrenciesComponent } from "../currencies/currencies.component";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CurrenciesComponent],
  templateUrl: './header.component.html',
})
export class HeaderComponent {}
