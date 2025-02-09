import {Component, signal, WritableSignal} from '@angular/core';
import {ButtonDirective} from 'primeng/button';
import {Card} from 'primeng/card';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {InputText} from 'primeng/inputtext';
import {NotificationService} from '../../../../core/services/notification.service';

@Component({
  selector: 'app-client-form',
  imports: [
    ButtonDirective,
    Card,
    FormsModule,
    InputText,
    ReactiveFormsModule
  ],
  templateUrl: './client-form.component.html',
  styleUrl: './client-form.component.scss'
})
export class ClientFormComponent {
  public form: WritableSignal<FormGroup> = signal(undefined);

  constructor(
    private fb: FormBuilder,
    private _notifier: NotificationService
  ) {
    this.createForm();
  }

  onSubmit() {
    this.form().markAllAsTouched();
    if (this.form().invalid) {
      this._notifier.sayError('ფორმა შევსებულია ხარვეზით');
      return;
    }
  }

  private createForm() {
    this.form.set(this.fb.group({
      clientNumber: ['', Validators.required],
      name: ['', [Validators.required, Validators.email]],
      lastName: ['', Validators.required],
      gender: ['', Validators.required],
      identificationNumber: ['', Validators.required],
      mobile: ['', Validators.required],
      legalAddress: ['', Validators.required],
      actualAddress: ['', Validators.required],
    }));
  }
}
