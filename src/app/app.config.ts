import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCFACIrh966gbqEh6R_66a3CQyCfe2LVMc',
  authDomain: 'angular-firebase-auth-38698.firebaseapp.com',
  projectId: 'angular-firebase-auth-38698',
  storageBucket: 'angular-firebase-auth-38698.appspot.com',
  messagingSenderId: '604392300527',
  appId: '1:604392300527:web:728a632a413c59dd3f201a',
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
  ],
};
