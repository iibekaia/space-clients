import {Injectable} from '@angular/core';
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(
    private _toastr: ToastrService,
  ) {
  }

  saySuccess(successMessage: string): void {
    this._toastr.success(successMessage);
  }

  sayError(error: string): void {
    this._toastr.error(error || 'დაფიქსირდა შეცდომა');
  }

  sayWarning(warning: string): void {
    this._toastr.warning(warning);
  }

  sayInfo(info: string): void {
    this._toastr.info(info);
  }

}
