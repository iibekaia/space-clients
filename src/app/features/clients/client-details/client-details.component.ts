import {Component, computed, inject, Signal, signal, WritableSignal} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {ClientFormComponent} from './client-form/client-form.component';
import {ActivatedRoute} from '@angular/router';
import {IClient} from '../../../core/models/clients.model';
import {Card} from 'primeng/card';

@Component({
    selector: 'app-client-details',
  imports: [
    ReactiveFormsModule,
    ClientFormComponent,
    Card,
  ],
    templateUrl: './client-details.component.html',
    styleUrl: './client-details.component.scss'
})
export class ClientDetailsComponent {
    private _route = inject(ActivatedRoute);
    public clients: WritableSignal<IClient[]> = signal(this._route.snapshot.data['clients']);
    public client: Signal<any> = computed(() => {
        return this.clients() !== undefined && this.clients()[0];
    });

    // this.addUser({name: 'new imedaa', email: 'imedaaa@gmail.com'}).subscribe();
}
