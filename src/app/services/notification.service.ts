import { inject, Injectable, signal } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

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
}
