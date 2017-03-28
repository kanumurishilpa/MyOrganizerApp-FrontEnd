import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../../providers/auth';
import { HomePage } from '../../home/home';
import { LoginEmailPage } from '../login-email/login-email';
import { SignUpPage } from '../sign-up/sign-up';
import { TermsOfServicePage } from '../../terms-of-service/terms-of-service';

@Component({
  selector: 'auth-auth-home',
  templateUrl: 'auth-home.html'
})
export class AuthHomePage {
  error: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,   private auth: AuthProvider) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad AuthHomePage');
  }

  openSignUpPage() {
    this.navCtrl.push(SignUpPage);
  }

  openLoginPage() {
    this.navCtrl.push(LoginEmailPage);
  }

  openTermsOfService() {
    this.navCtrl.push(TermsOfServicePage);
  }

  loginUserWithFacebook() {
    this.auth.loginWithFacebook().subscribe(data => {
      this.navCtrl.setRoot(HomePage);
    }, err => {
      this.error = err;
    });
  }

  loginUserWithGoogle() {
    this.auth.loginWithGoogle().subscribe(data => {
      this.navCtrl.setRoot(HomePage);
    }, err => {
      this.error = err;
    });
  }

}
