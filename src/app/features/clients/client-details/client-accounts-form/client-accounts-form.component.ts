import {Component, input, InputSignal, signal, WritableSignal} from '@angular/core';
import {ReactiveFormsModule} from "@angular/forms";
import {TableModule} from "primeng/table";
import {CURRENCIES, STATUSES, TYPES} from '../../../../core/models/accounts.model';

@Component({
  selector: 'app-client-accounts-form',
  imports: [
    ReactiveFormsModule,
    TableModule
  ],
  templateUrl: './client-accounts-form.component.html',
  styleUrl: './client-accounts-form.component.scss'
})
export class ClientAccountsFormComponent {
  public accounts: InputSignal<any> = input();
  public currencies: WritableSignal<any> = signal(CURRENCIES);
  public statuses: WritableSignal<any> = signal(STATUSES);
  public types: WritableSignal<any> = signal(TYPES);

  constructor() {
    setTimeout(() => {
      console.log(this.accounts())
    })
  }
}
