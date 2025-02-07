import {Component} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {ClientFormComponent} from './client-form/client-form.component';

@Component({
  selector: 'app-client-details',
  imports: [
    ReactiveFormsModule,
    ClientFormComponent,
  ],
  templateUrl: './client-details.component.html',
  styleUrl: './client-details.component.scss'
})
export class ClientDetailsComponent {
}
