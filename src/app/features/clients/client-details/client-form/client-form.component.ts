import {Component, computed, inject, input, InputSignal, signal, WritableSignal} from '@angular/core';
import {ButtonDirective} from 'primeng/button';
import {Card} from 'primeng/card';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {InputText} from 'primeng/inputtext';
import {NotificationService} from '../../../../core/services/notification.service';
import {EGender, Genders} from '../../../../core/models/clients.model';
import {RadioButton} from 'primeng/radiobutton';
import {Router} from '@angular/router';

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
  private _fb = inject(FormBuilder);
  private _notifier = inject(NotificationService);
  private _router = inject(Router);
  public data: InputSignal<any> = input();
  public form: WritableSignal<FormGroup> = signal(this._fb.group({
    clientNumber: ['', Validators.pattern(/^\d+$/)],
    name: ['', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(50),
      Validators.pattern(/^(?!.*[ა-ჰ].*[a-zA-Z])(?!.*[a-zA-Z].*[ა-ჰ])([ა-ჰ]+|[a-zA-Z]+)$/)
    ]],
    lastName: ['', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(50),
      Validators.pattern(/^(?!.*[ა-ჰ].*[a-zA-Z])(?!.*[a-zA-Z].*[ა-ჰ])([ა-ჰ]+|[a-zA-Z]+)$/)
    ]],
    gender: ['', Validators.required],
    personalNumber: ['', [
      Validators.required,
      Validators.pattern(/^\d{11}$/)
    ]],
    mobile: ['', [
      Validators.required,
      Validators.pattern(/^5\d{8}$/)
    ]],
    legalAddress: this._fb.group({
      country: ['', Validators.required],
      city: ['', Validators.required],
      address: ['', Validators.required]
    }),
    actualAddress:  this._fb.group({
      country: ['', Validators.required],
      city: ['', Validators.required],
      address: ['', Validators.required]
    }),
  }));
  public genders: WritableSignal<{ value: EGender, name: string }[]> = signal(Genders);

  onSubmit() {
    console.log("log => form value: ", this.form().getRawValue())
    this.form().markAllAsTouched();
    if (this.form().invalid) {
      this._notifier.sayError('ფორმა შევსებულია ხარვეზით');
      return;
    }
  }
  goToBack(){
    this._router.navigate(['/']);
  }
}
