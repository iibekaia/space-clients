import {Component, effect, inject, input, InputSignal, signal, WritableSignal} from '@angular/core';
import {Select} from 'primeng/select';
import {FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {Card} from 'primeng/card';
import {IClient} from '../../../../core/models/clients.model';
import {TableModule} from 'primeng/table';
import {Button} from 'primeng/button';
import {ActivatedRoute, Router} from '@angular/router';
import {NotificationService} from '../../../../core/services/notification.service';
import {CURRENCIES, IAccount, STATUSES, TYPES} from "../../../../core/models/accounts.model";
import {Store} from '@ngrx/store';
import {ADD_CLIENT_ACCOUNT} from '../../../../state/account/account.actions';

@Component({
  selector: 'app-account-form',
  imports: [
    Select,
    FormsModule,
    Card,
    TableModule,
    ReactiveFormsModule,
    Button
  ],
  templateUrl: './account-form.component.html',
  styleUrl: './account-form.component.scss'
})
export class AccountFormComponent {
  private _store = inject(Store);
  private _notifier = inject(NotificationService);
  private _fb = inject(FormBuilder);
  private _router = inject(Router);
  private _route = inject(ActivatedRoute);
  public currencies: WritableSignal<any> = signal(CURRENCIES);
  public statuses: WritableSignal<any> = signal(STATUSES);
  public types: WritableSignal<any> = signal(TYPES);
  public clients: InputSignal<any> = input();
  public clientsSignal: WritableSignal<any> = signal([]);
  public selectedClient: WritableSignal<IClient | undefined> = signal(undefined);
  public formArray: WritableSignal<FormArray> = signal(this._fb.array([]));
  public form: WritableSignal<FormGroup> = signal(this._fb.group({
    rows: this.formArray()
  }));
  public clientId = signal(this._route.snapshot?.params['clientId'])

  constructor() {
    effect(() => {
      const clients = this.clients();
      setTimeout(() => {
        this.clientsSignal.set(clients);
      })
    });
    effect(() => {
      if (this.selectedClient()) {
        this.resetFormArray();
      }
    });
    effect(() => {
      if (this.clientId()) {
        this.selectedClient.set(this.clientsSignal().find((client: IClient) => client.id == this.clientId()));
      }
    });
  }

  onSubmit() {
    const formValues: any = this.formArray().getRawValue();
    if (this.formArray().invalid) {
      this.formArray().controls.forEach(control => control.markAllAsTouched());
      this._notifier.sayError('ფორმა შევსებულია ხარვეზით');
      return;
    }

    const accounts: IAccount[] = (formValues || []).map((account: any) => ({
      currencyId: account.currency?.value,
      statusId: account.status?.value,
      typeId: account.type?.value,
    }));
    const params: any = {clientId: this.clientId() || this.selectedClient()?.id, accounts}
    this._store.dispatch(ADD_CLIENT_ACCOUNT(params));
  }

  goToBack() {
    this._router.navigate(['/']);
  }

  onAddRow() {
    this.formArray().push(this._fb.group({
      type: ['', [Validators.required]],
      currency: ['', [Validators.required]],
      status: ['', [Validators.required]]
    }));
  }

  private resetFormArray() {
    this.formArray.set(this._fb.array([]))
  }
}
