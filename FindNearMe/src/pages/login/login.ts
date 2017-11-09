import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { User } from '../../models/user';
import { AngularFireAuth } from 'angularfire2/auth';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  
  userTest = {} as User;
  
  constructor(private afAuth: AngularFireAuth, private nav: NavController, public navParams: NavParams) {
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
}
