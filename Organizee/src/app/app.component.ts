import { Component, ViewChild} from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from 'ionic-native';

import { HomePage } from '../pages/home/home';
import { AuthHomePage } from '../pages/auth/auth-home/auth-home';

import { DataProvider } from '../providers/data';
import { AuthProvider } from '../providers/auth';
import { TermsOfServicePage } from '../pages/terms-of-service/terms-of-service';
import { RemaindersPage } from '../pages/remainders/remainders';
import { CalenderPage } from '../pages/calender/calender';
import { ListPage } from '../pages/list/list';
import { ToDoPage } from '../pages/to-do/to-do';


@Component({
  templateUrl: 'app.html',
  selector:'page'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  isAppInitialized: boolean = false;
  user: any;
  rootPage: any = AuthHomePage;
  pages: Array<{title: string, component: any}>;

  constructor(
    private platform: Platform,
    protected data: DataProvider,
    protected auth: AuthProvider) {
    this.user = {
      image: ''
    },
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Calender', component: CalenderPage },
      { title: 'Remainders', component: RemaindersPage },
      { title: 'List', component: ListPage },
      { title: 'ToDo', component: ToDoPage },
      {title: 'Terms', component: TermsOfServicePage }
    ];
  }

  ngOnInit() {
    this.platform.ready().then(() => {
      this.auth.getUserData().subscribe(data => {
        if (!this.isAppInitialized) {
          // Reset the content nav to have just this page
          // we wouldn't want the back button to show in this scenario
          this.nav.setRoot(HomePage);
          //console.log(page +);
          this.isAppInitialized = true;
        }
        this.user = data;
        this.data.list('[pets]').subscribe(data => {
          console.log(data);
        });
      }, err => {
        this.nav.setRoot(AuthHomePage);
      });
      StatusBar.styleDefault();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

}
