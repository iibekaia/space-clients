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
import {ClientAccountsFormComponent} from '../client-accounts-form/client-accounts-form.component';
import {FloatLabel} from 'primeng/floatlabel';
import {ADD_CLIENT} from '../../../../state/client/client.actions';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-client-form',
  imports: [
    Card,
    FormsModule,
    InputText,
    ReactiveFormsModule,
    RadioButton,
    Button,
    ClientAccountsFormComponent,
    FloatLabel
  ],
  templateUrl: './client-form.component.html',
  styleUrl: './client-form.component.scss'
})
export class ClientFormComponent {
  private _store = inject(Store);
  private _destroyRef = inject(DestroyRef);
  private _clientsService = inject(ClientsService);
  private _fb = inject(FormBuilder);
  private _notifier = inject(NotificationService);
  private _router = inject(Router);
  public data: InputSignal<any> = input();
  public accounts: WritableSignal<any> = signal([]);
  public form: WritableSignal<FormGroup> = signal(this._fb.group({
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
  public imgLoader: WritableSignal<boolean> = signal(false);
  public uploadedFile: WritableSignal<{ filename: string, id: any, data: string }> = signal(undefined);
  public selectedFile: WritableSignal<File | null> = signal(null);

  constructor() {
    effect(() => {
      this.updateForm(this.data());
    });
  }

  onFileSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.imgLoader.set(true);
      this.selectedFile.set(fileInput.files[0]);
      setTimeout(() => {
        this.uploadImage();
      }, 100)
    }
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
    this._clientsService.updateClientDetails({active: false, id: this.data().id})
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(() => {
        this._notifier.saySuccess('კლიენტი დეაქტივირდა წარმატებით');
        this.goToBack();
      })
  }

  goToBack() {
    this._router.navigate(['/']);
  }

  goToAccountsForm() {
    if (this.accounts()?.length) {
      this._router.navigate(['account', 'edit', this.data().id])
    } else {
      this._router.navigate(['account', 'add', this.data().id])
    }
  }

  private addClient() {
    const formValue = this.form().getRawValue();
    this._store.dispatch(ADD_CLIENT({client: {...formValue, active: true, fileId: this.uploadedFile()?.id}}));
  }

  private updateClient() {
    const formValue = this.form().getRawValue();

    let params: any = {
      ...formValue,
      active: (this.data()?.active || false),
      id: this.data().id
    }
    if (this.uploadedFile()?.id) {
      params = {
        ...params,
        fileId: this.uploadedFile()?.id
      }
    }
    this._clientsService.updateClient(params)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(() => {
        this._notifier.saySuccess('კლიენტის დეტალები განახლდა წარმატებით');
        this.goToBack();
      })
  }

  private updateForm(data: IClient) {
    if (data) {
      this.form().get('name').setValue(data.name);
      this.form().get('personalNumber').setValue(data.personalNumber);
      this.form().get('lastName').setValue(data.lastName);
      this.form().get('gender').setValue(data.gender);
      this.form().get('mobile').setValue(data.mobile);
      this.form().get('legalAddress').setValue(data.legalAddress);
      this.form().get('actualAddress').setValue(data.actualAddress);

      this.getAccountByClientId();
      this.getImage();
    }
  }

  private getAccountByClientId() {
    this._clientsService.getAccountByClientId(this.data().id)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe((data: any) => {
        const clientAccounts = (data || [])[0]?.accounts;
        this.accounts.set(clientAccounts);
      })
  }

  private getImage() {
    if (this.data().fileId) {
      this._clientsService.getImage(this.data().fileId)
        .pipe(takeUntilDestroyed(this._destroyRef))
        .subscribe(image => {
          this.uploadedFile.set(image);
        });
    }
  }

  private uploadImage() {
    if (!this.selectedFile()) return;

    const reader = new FileReader();
    reader.readAsDataURL(this.selectedFile());
    reader.onload = () => {
      const base64String = reader.result as string;
      const imageData = {
        filename: this.selectedFile()!.name,
        data: base64String
      };

      this._clientsService.uploadImage(imageData).subscribe({
        next: (file) => {
          this.uploadedFile.set(file)
          this.imgLoader.set(false);
          this._notifier.saySuccess('კლიენტის ფოტო აიტვირთა წარმატებით');
        },
        error: () => {
          this.imgLoader.set(false);
          this._notifier.sayError('კლიენტის ფოტოს ატვირთისას დაფიქსირდა შეცდომა');
        }
      });
    };
  }
}
