import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { MyApp } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
//Pages
import { AuthHomePage } from '../pages/auth/auth-home/auth-home';
import { LoginEmailPage } from '../pages/auth/login-email/login-email';
import { SignUpPage } from '../pages/auth/sign-up/sign-up';
import { HomePage } from '../pages/home/home';
import { TermsOfServicePage } from '../pages/terms-of-service/terms-of-service';
import { RemaindersPage } from '../pages/remainders/remainders';
import { CalenderPage } from '../pages/calender/calender';
import { ListPage } from '../pages/list/list';
import { ToDoPage } from '../pages/to-do/to-do';
import { ForgotPasswordPage } from '../pages/auth/forgot-password/forgot-password';
// Providers
import { AngularFireModule } from 'angularfire2';
import { AuthProviders, AuthMethods } from 'angularfire2';
import { DataProvider } from '../providers/data';
import { AuthProvider } from '../providers/auth';

export const firebaseConfig = {
  apiKey: "AIzaSyCiHRu2VJEeupQA_DSfnTxuaSTJ1R0pUio",
    authDomain: "organizee-1bb4e.firebaseapp.com",
    databaseURL: "https://organizee-1bb4e.firebaseio.com",
    storageBucket: "organizee-1bb4e.appspot.com",
    messagingSenderId: "255439311501"
};

@NgModule({
  declarations: [
    MyApp,
    AuthHomePage,
    ForgotPasswordPage,
    LoginEmailPage,
    SignUpPage,
    HomePage,
    CalenderPage,
    ListPage,
    ToDoPage,
    RemaindersPage,
    TermsOfServicePage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig, {
      provider: AuthProviders.Google,
      method: AuthMethods.Popup
    }),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AuthHomePage,
    ForgotPasswordPage,
    LoginEmailPage,
    SignUpPage,
    HomePage,
    CalenderPage,
    ListPage,
    ToDoPage,
    RemaindersPage,
    TermsOfServicePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},DataProvider, AuthProvider
  ],
  exports: [
    BrowserModule,
  ]
})
export class AppModule {}
