import {Component, signal, WritableSignal} from '@angular/core';
import {ButtonDirective} from 'primeng/button';
import {Card} from 'primeng/card';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {InputText} from 'primeng/inputtext';
import {NotificationService} from '../../../../core/services/notification.service';
import {EGender, Genders} from '../../../../core/models/IClient';
import {RadioButton} from 'primeng/radiobutton';

@Component({
  selector: 'app-client-form',
  imports: [
    ButtonDirective,
    Card,
    FormsModule,
    InputText,
    ReactiveFormsModule,
    RadioButton
  ],
  templateUrl: './client-form.component.html',
  styleUrl: './client-form.component.scss'
})
export class ClientFormComponent {
  public form: WritableSignal<FormGroup> = signal(undefined);
  public genders: WritableSignal<{ value: EGender, name: string }[]> = signal(Genders);

  constructor(
    private fb: FormBuilder,
    private _notifier: NotificationService
  ) {
    this.createForm();
  }

  onSubmit() {
    console.log("log => form value: ", this.form().getRawValue())
    this.form().markAllAsTouched();
    if (this.form().invalid) {
      this._notifier.sayError('ფორმა შევსებულია ხარვეზით');
      return;
    }
  }

  private createForm() {
    this.form.set(this.fb.group({
      clientNumber: ['', Validators.pattern(/^\d+$/)],
      name: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50),
        Validators.pattern(/^(?!.*[ა-ჰ].*[a-zA-Z])(?!.*[a-zA-Z].*[ა-ჰ])([ა-ჰ]+|[a-zA-Z]+)$/)
      ]],
      lastName: ['', Validators.required],
      gender: ['', Validators.required],
      identificationNumber: ['', Validators.required],
      mobile: ['', Validators.required],
      legalAddress: ['', Validators.required],
      actualAddress: ['', Validators.required],
    }));
  }
}
