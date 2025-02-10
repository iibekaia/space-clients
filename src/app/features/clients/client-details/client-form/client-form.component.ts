import {
  Component,
  DestroyRef,
  effect,
  inject,
  input,
  InputSignal,
  signal,
  WritableSignal
} from '@angular/core';
import {Button} from 'primeng/button';
import {Card} from 'primeng/card';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {InputText} from 'primeng/inputtext';
import {NotificationService} from '../../../../core/services/notification.service';
import {EGender, Genders, IClient} from '../../../../core/models/clients.model';
import {RadioButton} from 'primeng/radiobutton';
import {Router} from '@angular/router';
import {ClientsService} from '../../../../core/services/clients.service';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {IAccount} from '../../../../core/models/accounts.model';

@Component({
  selector: 'app-client-form',
  imports: [
    Card,
    FormsModule,
    InputText,
    ReactiveFormsModule,
    RadioButton,
    Button
  ],
  templateUrl: './client-form.component.html',
  styleUrl: './client-form.component.scss'
})
export class ClientFormComponent {
  private _destroyRef = inject(DestroyRef);
  private _clientsService = inject(ClientsService);
  private _fb = inject(FormBuilder);
  private _notifier = inject(NotificationService);
  private _router = inject(Router);
  public data: InputSignal<any> = input();
  public accounts: WritableSignal<any> = signal([]);
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
    actualAddress: this._fb.group({
      country: ['', Validators.required],
      city: ['', Validators.required],
      address: ['', Validators.required]
    }),
  }));
  public genders: WritableSignal<{ value: EGender, name: string }[]> = signal(Genders);

  constructor() {
    effect(() => {
      this.updateForm(this.data());
    });
  }

  onSubmit() {
    if (this.form().invalid) {
      this.form().markAllAsTouched();
      this._notifier.sayError('ფორმა შევსებულია ხარვეზით');
      return;
    }
    if (this.data().id) {
      this.updateClient();
    } else {
      this.addClient();
    }
  }

  onDeactivate() {
    this._clientsService.deactivateClient({active: false, id: this.data().id})
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(() => {
        this._notifier.saySuccess('დეაქტივირდა წარმატებით');
        this.goToBack();
      })
  }

  goToBack() {
    this._router.navigate(['/']);
  }

  private addClient() {
    const formValue = this.form().getRawValue();
    this._clientsService.addClient({...formValue, active: true})
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(() => {
        this._notifier.saySuccess('დაემატა წარმატებით');
        this.goToBack();
      })
  }

  private updateClient() {
    const formValue = this.form().getRawValue();

    this._clientsService.updateClient({...formValue, id: this.data().id})
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(() => {
        this._notifier.saySuccess('განახლდა წარმატებით');
        this.goToBack();
      })
  }

  private updateForm(data: IClient) {
    if (data) {
      this.form().get('clientNumber').setValue(data.clientNumber);
      this.form().get('name').setValue(data.name);
      this.form().get('personalNumber').setValue(data.personalNumber);
      this.form().get('lastName').setValue(data.lastName);
      this.form().get('gender').setValue(data.gender);
      this.form().get('mobile').setValue(data.mobile);
      this.form().get('legalAddress').setValue(data.legalAddress);
      this.form().get('actualAddress').setValue(data.actualAddress);

      this.getAccountByClientId();
    }
  }

  private getAccountByClientId(){
    this._clientsService.getAccountByClientId(this.data().id)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe((accounts: IAccount[]) => {
        this.accounts.set(accounts);
    })
  }
}
