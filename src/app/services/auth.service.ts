import { inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  Auth,
  authState,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  User,
  UserCredential,
} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  firebaseAuth = inject(Auth);

  private currentUser$ = authState(this.firebaseAuth);
  currentUser = toSignal<null | User>(this.currentUser$);

  login(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(this.firebaseAuth, email, password);
  }

  signUp(email: string, password: string): Promise<UserCredential> {
    return createUserWithEmailAndPassword(this.firebaseAuth, email, password);
  }

  setDisplayName(user: User, name: string): Promise<void> {
    return updateProfile(user, { displayName: name });
  }

  logout(): Promise<void> {
    return signOut(this.firebaseAuth);
  }
}
