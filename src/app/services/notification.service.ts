import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  loading = signal(false);

  showLoading() {
    this.loading.update(() => true);
  }

  hideLoading() {
    this.loading.update(() => false);
  }
}
