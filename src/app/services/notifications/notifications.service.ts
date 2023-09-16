import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SECOND } from '../../shared/constants';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  show(message: string) {
    this._snackbar.open(message, 'close', {duration: SECOND * 3})
  }

  constructor(private _snackbar: MatSnackBar) { }
}
