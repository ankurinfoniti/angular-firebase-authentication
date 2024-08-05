import { inject, Injectable, signal } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FirebaseError } from '@angular/fire/app';

import { getFirebaseErrorMessage } from '../utilities/auth-error';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  snackbar = inject(MatSnackBar);

  loading = signal(false);

  showLoading() {
    this.loading.update(() => true);
  }

  hideLoading() {
    this.loading.update(() => false);
  }

  success(message: string) {
    this.snackbar.open(message, undefined, {
      duration: 2000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });
  }

  error(message: string) {
    this.snackbar.open(message, 'Close', {
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });
  }

  firebaseError(err: FirebaseError) {
    this.error(getFirebaseErrorMessage(err));
  }
}
