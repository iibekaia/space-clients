import {Component, computed, inject, Signal, signal, WritableSignal} from '@angular/core';
import {Card} from 'primeng/card';
import {ActivatedRoute} from '@angular/router';
import {IClient} from '../../../core/models/clients.model';

@Component({
  selector: 'app-account-details',
  imports: [
    Card,
  ],
  templateUrl: './account-details.component.html',
  styleUrl: './account-details.component.scss'
})
export class AccountDetailsComponent {
  private _route = inject(ActivatedRoute);
  public accounts: WritableSignal<IClient[]> = signal(this._route.snapshot.data['accounts']);
  public account: Signal<any> = computed(() => {
    return this.accounts() !== undefined && this.accounts()[0];
  });
}
