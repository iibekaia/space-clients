import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IClient} from '../models/clients.model';
import {CONFIG} from '../../app.config';

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  private _config = inject(CONFIG);
  private http = inject(HttpClient);

  constructor() {
    if (!this._config) {
      this._config = {API_URL: '/',};
    }
  }

  getClients() {
     return this.http.get<IClient[]>(`${this._config.API_URL}/clients`)
  }

  getClientById(id: string) {
    return this.http.get<IClient>(`${this._config.API_URL}/clients`, {params: {id}})
  }

  updateClient(params: IClient) {
    return this.http.put<IClient>(`${this._config.API_URL}/clients/${params.id}`, params)
  }

  addClient(client: IClient) {}
}
