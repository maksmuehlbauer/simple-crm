import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {provideNativeDateAdapter} from '@angular/material/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
// import { initializeAppCheck, ReCaptchaEnterpriseProvider, provideAppCheck } from '@angular/fire/app-check';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { getMessaging, provideMessaging } from '@angular/fire/messaging';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { getRemoteConfig, provideRemoteConfig } from '@angular/fire/remote-config';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideAnimationsAsync(), 
    provideNativeDateAdapter(), 
    provideFirebaseApp(() => initializeApp({
      "projectId":"simple-crm-d274f",
      "appId":"1:465755090674:web:2086b7174b5b39223baa6b",
      "storageBucket":"simple-crm-d274f.appspot.com",
      "apiKey":"AIzaSyALTWvSEaoTNzpVpW8aFGVYbQpEzb0ap1M",
      "authDomain":"simple-crm-d274f.firebaseapp.com",
      "messagingSenderId":"465755090674"})), 
      provideAuth(() => getAuth()),
//       , provideAppCheck(() => {
//   // TODO get a reCAPTCHA Enterprise here https://console.cloud.google.com/security/recaptcha?project=_
//   const provider = new ReCaptchaEnterpriseProvider(/* reCAPTCHA Enterprise site key */);
//   return initializeAppCheck(undefined, { provider, isTokenAutoRefreshEnabled: true });
// }), 
provideFirestore(() => getFirestore()), 
provideDatabase(() => getDatabase()), 
provideMessaging(() => getMessaging()), 
provideStorage(() => getStorage()), 
provideRemoteConfig(() => getRemoteConfig())]
};
