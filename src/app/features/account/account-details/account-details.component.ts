import {Component, inject, signal, WritableSignal} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {IClient} from '../../../core/models/clients.model';
import {AccountFormComponent} from "./account-form/account-form.component";
import {Store} from '@ngrx/store';
import {LOAD_CLIENTS} from '../../../state/client/client.actions';

@Component({
  selector: 'app-account-details',
  imports: [
    AccountFormComponent,
  ],
  templateUrl: './account-details.component.html',
  styleUrl: './account-details.component.scss'
})
export class AccountDetailsComponent {
  private _store = inject(Store);
  private _route = inject(ActivatedRoute);
  public clients: WritableSignal<IClient[]> = signal(this._route.snapshot.data['clients']);

  constructor() {
    this._store.dispatch(LOAD_CLIENTS(null));
    this.listenToClients();
  }

  private listenToClients() {
    this._store.select('clients').subscribe(response => {
      this.clients.set((response.data || [])
        .map((client: IClient) => ({...client, fullName: `${client.name} ${client.lastName}`}))
        .filter((client: IClient) => !client?.accountsId));
    })
  }
}
