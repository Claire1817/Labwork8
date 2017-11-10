import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { User } from '../../models/user';
import { AngularFireAuth } from 'angularfire2/auth';
import { TabsPage } from '../tabs/tabs';

/* 
Pierre Munin 1106420
Claire Gizard 1106363
 */
@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  user = {} as User;  
  
  constructor(private aFAuth: AngularFireAuth, private nav: NavController, private toast: ToastController) { } 
  
  async register(user: User) { 
     
    /**
     * Call to the database for the registration
     * of an account
     * send the email and the password
     */
    try { 
    const result =  await this.aFAuth.auth.createUserWithEmailAndPassword(user.email, user.password); 
    this.nav.setRoot(TabsPage);    
    console.log(result); 
  }  
    catch(e) {
      /**
       * catch the errors if the database call
       * fail
       */
      this.toast.create({ 
        message: 'Error:', 
        duration: 3000 
       }).present(); 
      console.log(e);
      }
    } 
}
