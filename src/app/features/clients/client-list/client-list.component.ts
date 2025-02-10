import {Component, DestroyRef, inject, Signal, signal, WritableSignal} from '@angular/core';
import {TableModule} from 'primeng/table';
import {Button, ButtonDirective} from 'primeng/button';
import {ActivatedRoute, Router} from '@angular/router';
import {ClientsService} from '../../../core/services/clients.service';
import {IClient} from '../../../core/models/clients.model';
import {Card} from 'primeng/card';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {Paginator} from 'primeng/paginator';
import {NotificationService} from '../../../core/services/notification.service';

@Component({
  selector: 'app-client-list',
  imports: [
    TableModule,
    Button,
    Card,
    ButtonDirective,
    Paginator,
  ],
  templateUrl: './client-list.component.html',
  styleUrl: './client-list.component.scss'
})
export class ClientListComponent {
  private _notifier = inject(NotificationService);
  private _route = inject(ActivatedRoute);
  private _router = inject(Router);
  private _destroyRef = inject(DestroyRef);
  private _clientsService = inject(ClientsService);
  private _snapshot: Signal<{ _page: any, _limit: any } | any> = signal(this._route.snapshot.queryParams)
  public clients: WritableSignal<any[]> = signal([]);
  public total: WritableSignal<number> = signal(0);
  public columns: WritableSignal<{ value: string; title: string }[]> = signal([
    {value: 'clientNumber', title: 'კლიენტის N'},
    {value: 'name', title: 'სახელი'},
    {value: 'lastName', title: 'გვარი'},
    {value: 'personalNumber', title: 'პ/ნ'},
    {value: 'gender', title: 'სქესი'},
    {value: 'mobile', title: 'ტელ:'},
    {value: '_actions', title: 'ქმედება'}
  ])
  public _page: WritableSignal<number> = signal(this._snapshot()?._page || 0);
  public _limit: WritableSignal<number> = signal(this._snapshot()?._limit || 10);

  constructor() {
    this.getClients();
  }

  onAdd() {
    this._router.navigate(['dashboard', 'add'])
  }

  onDelete(id: string) {
    this._clientsService.deleteClient(id)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(() => {
        this._notifier.saySuccess('წაიშალა წარმატებით');
        this.getClients();
      })
  }

  onEdit(id: string) {
    this._router.navigate(['dashboard', 'edit', id])
  }

  onPageChange(event: any) {
    let queryParams: any = {};
    if (event.first !== this._page()) {
      this._page.set(event.first);
      queryParams = {...queryParams, _page: this._page()}
    }
    if (event.rows !== this._page()) {
      this._limit.set(event.rows);
      queryParams = {...queryParams, _limit: this._limit()}
    }
    this._router.navigate([], {
      relativeTo: this._route,
      queryParams: queryParams,
      queryParamsHandling: 'merge',
    });
    this.getClients();
  }

  private getClients() {
    this._clientsService.getClients({_page: this._page(), _limit: this._limit()})
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe((response: { data: IClient[], count: number }) => {
        this.clients.set(response.data);
        this.total.set(response.count);
      })
  }
}
