import {Component, effect, inject, input, InputSignal, signal, WritableSignal} from '@angular/core';
import {Select} from 'primeng/select';
import {FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {Card} from 'primeng/card';
import {IClient} from '../../../../core/models/clients.model';
import {TableModule} from 'primeng/table';
import {InputText} from 'primeng/inputtext';
import {Button} from 'primeng/button';
import {Router} from '@angular/router';
import {NotificationService} from '../../../../core/services/notification.service';

@Component({
  selector: 'app-account-form',
  imports: [
    Select,
    FormsModule,
    Card,
    TableModule,
    InputText,
    ReactiveFormsModule,
    Button
  ],
  templateUrl: './account-form.component.html',
  styleUrl: './account-form.component.scss'
})
export class AccountFormComponent {
  private _notifier = inject(NotificationService);
  private _fb = inject(FormBuilder);
  private _router = inject(Router);
  public currencies: WritableSignal<any> = signal([
    {name: "GEL", value: 1},
    {name: "USD", value: 2},
    {name: "EUR", value: 3},
  ]);
  public statuses: WritableSignal<any> = signal([
    {name: "აქტიური", value: 1},
    {name: "გახურული", value: 2},
  ]);
  public types: WritableSignal<any> = signal([
    {name: "მიმდინარე", value: 1},
    {name: "შემნახველი", value: 2},
    {name: "დაგროვებითი", value: 3},
  ]);
  public clients: InputSignal<any> = input();
  public selectedClient: WritableSignal<IClient | undefined> = signal(undefined);
  public formArray: WritableSignal<FormArray> = signal(this._fb.array([]));
  public form: WritableSignal<FormGroup> = signal(this._fb.group({
    rows: this.formArray()
  }));

  constructor() {
    effect(() => {
      if (this.selectedClient()) {
        this.resetFormArray();
      }
    });
  }

  onSubmit() {
    if (this.formArray().invalid) {
      this.formArray().markAllAsTouched();
      this._notifier.sayError('ფორმა შევსებულია ხარვეზით');
      return;
    }
  }

  goToBack() {
    this._router.navigate(['/']);
  }

  onAddRow() {
    this.formArray().push(this._fb.group({
      number: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      type: ['', [Validators.required]],
      currency: ['', [Validators.required]],
      status: ['', [Validators.required]]
    }));
  }

  private resetFormArray() {
    this.formArray.set(this._fb.array([]))
  }
}
