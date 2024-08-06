import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';

export function passwordsMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (password && confirmPassword && password != confirmPassword) {
      return { passwordsDonotMatch: true };
    }

    return null;
  };
}

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent {
  fb = inject(FormBuilder);
  authService = inject(AuthService);
  notificationService = inject(NotificationService);
  router = inject(Router);

  signUpForm = this.fb.group(
    {
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    },
    { validators: passwordsMatchValidator() }
  );

  async submit() {
    const { name, email, password } = this.signUpForm.value;

    if (!this.signUpForm.valid || !name || !email || !password) {
      return;
    }

    try {
      this.notificationService.showLoading();
      const { user } = await this.authService.signUp(email, password);
      await this.authService.setDisplayName(user, name);
      this.notificationService.success('User created successfully!');
      this.router.navigate(['/home']);
    } catch (error: any) {
      this.notificationService.firebaseError(error);
    } finally {
      this.notificationService.hideLoading();
    }
  }

  name = this.signUpForm.get('name');
  email = this.signUpForm.get('email');
  password = this.signUpForm.get('password');
  confirmPassword = this.signUpForm.get('confirmPassword');
}
