
import { Injectable, EventEmitter, Inject} from '@angular/core';
import { Platform } from 'ionic-angular';
import { AngularFire, AuthProviders, AuthMethods, FirebaseAuthState, FirebaseApp } from 'angularfire2';
import { Observable } from 'rxjs/Observable';
import { Facebook } from 'ionic-native';
import { GooglePlus } from 'ionic-native';
import { auth } from 'firebase';

// Providers
import {DataProvider} from './data';

@Injectable()
export class AuthProvider {
  user: any;
  private authState: FirebaseAuthState;
  public onAuth: EventEmitter<FirebaseAuthState> = new EventEmitter();
  public firebase : any;

  constructor(private angFire: AngularFire, @Inject(FirebaseApp)firebase: any, private data: DataProvider, private platform: Platform) {
    this.firebase = firebase;
    this.angFire.auth.subscribe((state: FirebaseAuthState) => {
      this.authState = state;
      this.onAuth.emit(state);
    });
    this.angFire.database.list('pushTest').push({
      teste: 'teste'
    }).then((data) => {
      console.log(data);
    });
  }

  getUserData() {
    return Observable.create(observer => {
      this.angFire.auth.subscribe(authData => {
        if (authData) {
          this.data.object('users/' + authData.uid).subscribe(userData => {
            console.log(userData);
            this.user = userData;
            observer.next(userData);
          });
        } else {
          observer.error();
        }
      });
    });
  }

  registerUser(credentials: any) {
    return Observable.create(observer => {
      this.angFire.auth.createUser(credentials).then((authData: any) => {
        this.angFire.database.list('users').update(authData.uid, {
          name: authData.auth.email,
          email: authData.auth.email,
          emailVerified: false,
          provider: 'email',
          image: 'https://freeiconshop.com/files/edd/person-solid.png'
        });
        credentials.created = true;
        observer.next(credentials);
      }).catch((error: any) => {
        if (error) {
          switch (error.code) {
            case 'INVALID_EMAIL':
              observer.error('E-mail inválido.');
              break;
            case 'EMAIL_TAKEN':
              observer.error('Este e-mail já está sendo utilizado.');
              break;
            case 'NETWORK_ERROR':
              observer.error('Aconteceu algum erro ao tentar se conectar ao servidor, tente novamente mais tarde.');
              break;
            default:
              observer.error(error);
          }
        }
      });
    });
  }

  loginWithEmail(credentials) {
    return Observable.create(observer => {
      this.angFire.auth.login(credentials, {
        provider: AuthProviders.Password,
        method: AuthMethods.Password
      }).then((authData) => {
        observer.next(authData);
      }).catch((error) => {
        observer.error(error);
      });
    });
  }

  loginWithFacebook() {
    return Observable.create(observer => {
      if (this.platform.is('cordova')) {
        Facebook.login(['public_profile', 'email']).then(facebookData => {
          let provider = firebase.auth.FacebookAuthProvider.credential(facebookData.authResponse.accessToken);
          firebase.auth().signInWithCredential(provider).then(firebaseData => {
            this.angFire.database.list('users').update(firebaseData.uid, {
              name: firebaseData.displayName,
              email: firebaseData.email,
              provider: 'facebook',
              image: firebaseData.photoURL
            });
            observer.next();
          });
        }, error => {
          observer.error(error);
        });
      } else {
        this.angFire.auth.login({
          provider: AuthProviders.Facebook,
          method: AuthMethods.Popup
        }).then((facebookData) => {
          this.angFire.database.list('users').update(facebookData.auth.uid, {
            name: facebookData.auth.displayName,
            email: facebookData.auth.email,
            provider: 'facebook',
            image: facebookData.auth.photoURL
          });
          observer.next();
        }).catch((error) => {
          console.info("error", error);
          observer.error(error);
        });
      }
    });
  }

  loginWithGoogle() {
    return Observable.create(observer => {
      if (this.platform.is('cordova')) {
       return GooglePlus.login({
          'webClientId':'******************.apps.googleusercontent.com' //your Android reverse client id
        }).then(userData => {
          var token = userData.idToken;
          const googleCredential = auth.GoogleAuthProvider.credential(token, null);
          this.firebase.auth().signInWithCredential(googleCredential).then((success)=>{
            observer.next(success);
          }).catch(error => {
            //console.log(error);
            observer.error(error);
          });
        }).catch(error => {
            //console.log(error);
            observer.error(error);
        });
      } else {
        return this.angFire.auth.login({
          provider: AuthProviders.Google,
          method: AuthMethods.Popup
          }).then(()=>{
            observer.next();
          }).catch(error => {
            //console.log(error);
            observer.error(error);
        });
      }
    });
  }

  sendPasswordResetEmail(email) {
    return Observable.create(observer => {
      firebase.auth().sendPasswordResetEmail(email).then(function() {
        observer.next();
        // Email sent.
      }, function(error) {
        observer.error(error);
        // An error happened.
      });
    });
  }

  logout() {
    this.angFire.auth.logout();
  }
}
