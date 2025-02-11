import {Component, input, InputSignal, signal, WritableSignal} from '@angular/core';
import {ReactiveFormsModule} from "@angular/forms";
import {TableModule} from "primeng/table";
import {CURRENCIES_MAP, STATUSES_MAP, TYPES_MAP} from '../../../../core/models/accounts.model';

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
  public CURRENCIES_MAP = CURRENCIES_MAP;
  public STATUSES_MAP = STATUSES_MAP;
  public TYPES_MAP = TYPES_MAP;

  constructor() {
    setTimeout(() => {
      // console.log(this.accounts())
    })
  }
}
