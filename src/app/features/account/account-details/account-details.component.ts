import {Component, inject, signal, WritableSignal} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {IClient} from '../../../core/models/clients.model';
import {AccountFormComponent} from "./account-form/account-form.component";

@Component({
    selector: 'app-account-details',
    imports: [
        AccountFormComponent,
    ],
    templateUrl: './account-details.component.html',
    styleUrl: './account-details.component.scss'
})
export class AccountDetailsComponent {
    private _route = inject(ActivatedRoute);
    public clients: WritableSignal<IClient[]> = signal(this._route.snapshot.data['clients']);
}
