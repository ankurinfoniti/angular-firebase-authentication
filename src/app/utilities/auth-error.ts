import { FirebaseError } from '@angular/fire/app';

export const getFirebaseErrorMessage = ({ code }: FirebaseError): string => {
  let message = '';
  console.log(code);
  switch (code) {
    case 'auth/invalid-credential':
      message = 'Invalid credentials';
      break;
    case 'auth/wrong-password':
      message = 'Your password is incorrect';
      break;
    case 'auth/user-not-found':
      message = 'The user was not found';
      break;
    case 'auth/weak-password':
      message = 'Password should be at least 6 characters';
      break;
    case 'auth/email-already-in-use':
      message = 'The user with email already exists';
      break;
    default:
      message =
        'An unspecified error occured. Please contact the system administrator';
  }

  return message;
};
