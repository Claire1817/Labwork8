import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { User } from '../../models/user';
import { AngularFireAuth } from 'angularfire2/auth';
import { Facebook } from '@ionic-native/facebook';
import firebase from 'firebase';
/* 
Pierre Munin 1106420
Claire Gizard 1106363
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  
  userTest = {} as User;
  userProfile: any = null;
  
  constructor(private afAuth: AngularFireAuth, private nav: NavController, public navParams: NavParams,  private facebook: Facebook) {
  }

  public createAccount() {
    this.nav.push('RegisterPage');
  
  }
  
  async login(user: User) {
    
/**
 * Call to the database for the connection
 * of an account
 * send the email and the password
 */
  try {
    const result = this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
    console.log(result);
    if (result) {
      this.nav.setRoot(TabsPage);        
    }
  } catch (e) {
  /**
   * catch the errors if the database call
   * fail
   */
    console.log(e);
  }
}
/**
 * function to login with facebook
 */
  public loginWithFacebook() {
    this.facebook.login(['email']).then( (response) => {
      const facebookCredential = firebase.auth.FacebookAuthProvider
        .credential(response.authResponse.accessToken);

      firebase.auth().signInWithCredential(facebookCredential)
        .then((success) => {
          console.log("Firebase success: " + JSON.stringify(success));
          this.userProfile = success;
          this.nav.setRoot(TabsPage);
        })
        .catch((error) => {
          console.log("Firebase failure: " + JSON.stringify(error));
      });

    }).catch((error) => { console.log("ERROR" + error) });
  }

}
