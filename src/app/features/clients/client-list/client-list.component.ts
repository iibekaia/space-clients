import {Component, DestroyRef, inject, signal, WritableSignal} from '@angular/core';
import {TableModule} from 'primeng/table';
import {Button} from 'primeng/button';
import {ActivatedRoute, Router} from '@angular/router';
import {ClientsService} from '../../../core/services/clients.service';
import {Card} from 'primeng/card';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {Paginator} from 'primeng/paginator';
import {GENDERS_MAP} from '../../../core/models/clients.model';
import {Store} from '@ngrx/store';
import {DELETE_CLIENT, LOAD_CLIENTS} from '../../../state/client/client.actions';

@Component({
  selector: 'app-client-list',
  imports: [
    TableModule,
    Button,
    Card,
    Paginator,
  ],
  templateUrl: './client-list.component.html',
  styleUrl: './client-list.component.scss'
})
export class ClientListComponent {
  private _store = inject(Store);
  private _route = inject(ActivatedRoute);
  private _router = inject(Router);
  private _destroyRef = inject(DestroyRef);
  private _clientsService = inject(ClientsService);
  private _snapshot: WritableSignal<{
    _page: any,
    _limit: any,
    field: string,
    order: number
  } | any> = signal(this.generateSnapShot);
  public clients: WritableSignal<any[]> = signal([]);
  public total: WritableSignal<number> = signal(0);
  public columns: WritableSignal<{ value: string; title: string }[]> = signal([
    {value: 'name', title: 'სახელი'},
    {value: 'lastName', title: 'გვარი'},
    {value: 'personalNumber', title: 'პ/ნ'},
    {value: 'gender', title: 'სქესი'},
    {value: 'mobile', title: 'ტელ:'},
    {value: '_actions', title: 'ქმედება'}
  ])
  public first: WritableSignal<number> = signal(((this._snapshot()?.page - 1) * this._snapshot()?.limit) || 0);
  public page: WritableSignal<number> = signal(this._snapshot()?.page || 0);
  public limit: WritableSignal<number> = signal(this._snapshot()?.limit || 10);
  public sortField: WritableSignal<string> = signal(this._snapshot()?.field || undefined)
  public sortOrder: WritableSignal<number> = signal(+this._snapshot()?.order || undefined)
  public hasFilter: WritableSignal<boolean> = signal(false);
  public GENDERS_MAP = GENDERS_MAP;

  constructor() {
    if (this._clientsService.isFirstLoad()) {
      this.dispatchClients();
    }
    this.listenToClients();
  }

  onSort(event: { field: string, order: number }) {
    const hasSort = event !== null;
    this.sortField.set(hasSort ? event.field : undefined);
    this.sortOrder.set(hasSort ? event.order : undefined);
    const {field, order, ...rest} = this.generateSnapShot;
    this._router.navigate([], {
      relativeTo: this._route,
      queryParams: !hasSort ? {...rest} : {field: this.sortField(), order: this.sortOrder()},
      queryParamsHandling: !hasSort ? 'replace' : 'merge',
    }).then(() => {
      this._snapshot.set(this.generateSnapShot);
      this.hasFilter.set(this._snapshot()?.field || this._snapshot()?.order);
    })
  }

  onAddAccount() {
    this._router.navigate(['account', 'add'])
  }

  onAddClient() {
    this._router.navigate(['client', 'add'])
  }

  onDelete(id: string) {
    this._store.dispatch(DELETE_CLIENT({id}));
  }

  onEdit(id: string) {
    this._router.navigate(['client', 'edit', id])
  }

  onPageChange(event: any) {
    let queryParams: any = {};
    this.first.set(event.first)
    const page = event.page + 1;
    if (page !== this.page()) {
      this.page.set(page);
      queryParams = {...queryParams, page: this.page()}
    }
    if (event.rows !== this.limit()) {
      this.limit.set(event.rows);
      queryParams = {...queryParams, limit: this.limit()}
    }
    this._router.navigate([], {
      relativeTo: this._route,
      queryParams: queryParams,
      queryParamsHandling: 'merge',
    });
    this.dispatchClients();
  }

  get generateSnapShot() {
    return this._route.snapshot.queryParams;
  }

  private listenToClients() {
    this._store.select('clients')
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(response => {
        this._clientsService.isFirstLoad.set(false);
        this.clients.set(response.data);
        this.total.set(response.count);
      })
  }

  private dispatchClients() {
    this._store.dispatch(LOAD_CLIENTS({page: this.page(), limit: this.limit()}));
  }
}
