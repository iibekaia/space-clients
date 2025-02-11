import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IClient} from '../models/clients.model';
import {CONFIG} from '../../app.config';
import {map, Observable} from 'rxjs';
import {IAccount} from '../models/accounts.model';

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

  getClients(params: any): Observable<any> {
    return this.http.get<IClient[]>(`${this._config.API_URL}/clients`, {params, observe: 'response'}).pipe(
      map(response => {
        const count = Number(response.headers.get('X-Total-Count')) || 0;
        return {data: response.body || [], count};
      })
    );
  }

  getAccountByClientId(clientId: string): Observable<IAccount[]> {
    return this.http.get<IAccount[]>(`${this._config.API_URL}/accounts`, {params: {clientId}})
  }

  addClientAccount(params: { clientId: number, accounts: IAccount[] }): Observable<IClient> {
    return this.http.post<IClient>(`${this._config.API_URL}/accounts`, params)
  }

  getClientById(id: string): Observable<any> {
    return this.http.get<IClient>(`${this._config.API_URL}/clients`, {params: {id}})
  }

  updateClientDetails(params: any): Observable<any> {
    return this.http.patch<IClient>(`${this._config.API_URL}/clients/${params.id}`, params)
  }

  updateClient(params: IClient): Observable<IClient> {
    return this.http.put<IClient>(`${this._config.API_URL}/clients/${params.id}`, params)
  }

  addClient(params: IClient): Observable<IClient> {
    return this.http.post<IClient>(`${this._config.API_URL}/clients`, params)
  }

  deleteClient(id: string): Observable<any> {
    return this.http.delete<IClient>(`${this._config.API_URL}/clients/${id}`)
  }

  uploadImage(imageData: { filename: string; data: string }): Observable<any> {
    return this.http.post(`${this._config.API_URL}/images`, imageData);
  }

  getImage(id: any): Observable<any> {
    return this.http.get(`${this._config.API_URL}/images/${id}`);
  }

}
