import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IClient} from '../models/clients.model';
import {CONFIG} from '../../app.config';
import {map} from 'rxjs';

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

  getClients(params: any) {
    return this.http.get<IClient[]>(`${this._config.API_URL}/clients`, {params, observe: 'response'}).pipe(
      map(response => {
        const count = Number(response.headers.get('X-Total-Count')) || 0;
        return {data: response.body || [], count};
      })
    );
  }

  getClientById(id: string) {
    return this.http.get<IClient>(`${this._config.API_URL}/clients`, {params: {id}})
  }

  updateClient(params: IClient) {
    return this.http.put<IClient>(`${this._config.API_URL}/clients/${params.id}`, params)
  }

  addClient(params: IClient) {
    return this.http.post<IClient>(`${this._config.API_URL}/clients`, params)
  }
}
