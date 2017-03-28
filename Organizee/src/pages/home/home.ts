import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth';
import { AuthHomePage } from '../../pages/auth/auth-home/auth-home';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  error: any;
  constructor(public navCtrl: NavController, private auth: AuthProvider) {
  }

  logout(){
    this.auth.logout()
    this.navCtrl.setRoot(AuthHomePage);
  }

}
