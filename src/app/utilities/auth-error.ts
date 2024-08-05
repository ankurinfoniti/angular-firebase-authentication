import { FirebaseError } from '@angular/fire/app';

export const getFirebaseErrorMessage = ({ code }: FirebaseError): string => {
  let message = '';

  switch (code) {
    case 'auth/wrong-password':
      message = 'Your password is incorrect';
      break;
    case 'auth/user-not-found':
      message = 'The user was not found';
      break;
    default:
      message =
        'An unspecified error occured. Please contact the system administrator';
  }

  return message;
};
