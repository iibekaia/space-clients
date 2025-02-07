import {Component, Inject, OnInit, Optional} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'clients';

  constructor(
    @Optional()
    @Inject('CONFIG')
    public CONFIG: { API_URL: string },
    private http: HttpClient,
  ) {
    if (!this.CONFIG) {
      this.CONFIG = {API_URL: '/',};
    }
  }

  ngOnInit() {
    // this.addUser({name: 'new imedaaa', email: 'imedaaa@gmail.com'}).subscribe();
    setTimeout(() => {
      this.loadUsers();
    }, 100)

  }

  loadUsers() {
    this.http.get<any>(`${this.CONFIG.API_URL}/users`).subscribe()
  }

  addUser(user: { name: string; email: string }): Observable<any> {
    return this.http.post(`${this.CONFIG.API_URL}/users`, user);
  }
}
