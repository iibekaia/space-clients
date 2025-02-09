import {Component, inject, signal, WritableSignal} from '@angular/core';
import {TableModule} from 'primeng/table';
import {Button, ButtonDirective} from 'primeng/button';
import {Router} from '@angular/router';
import {ClientsService} from '../../../core/services/clients.service';
import {IClient} from '../../../core/models/clients.model';
import {Card} from 'primeng/card';

@Component({
  selector: 'app-client-list',
  imports: [
    TableModule,
    Button,
    Card,
    ButtonDirective,
  ],
  templateUrl: './client-list.component.html',
  styleUrl: './client-list.component.scss'
})
export class ClientListComponent {
  private _router = inject(Router);
  private _clientsService = inject(ClientsService);
  public clients: WritableSignal<any[]> = signal([]);
  public columns: WritableSignal<{value: string; title: string}[]> = signal([
    {value: 'clientNumber', title: 'კლიენტის N'},
    {value: 'name', title: 'სახელი'},
    {value: 'lastName', title: 'გვარი'},
    {value: 'personalNumber', title: 'პ/ნ'},
    {value: 'gender', title: 'სქესი'},
    {value: 'mobile', title: 'ტელ:'},
    {value: '_actions', title: 'ქმედება'}
  ])

  constructor() {
    this._clientsService.getClients()
      .subscribe((clients: IClient[])=>{
        this.clients.set(clients)
      })
  }

  onAdd() {
    this._router.navigate(['add'])
  }

  onEdit(id: string) {
    this._router.navigate(['edit', id])
  }
}
