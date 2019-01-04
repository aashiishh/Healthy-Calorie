import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Credentials } from '../../models/userCred';
import { DashboardPage } from '../dashboard/dashboard';
import { MessageService } from '../../Services/messageService';
import { AuthService } from '../../Services/authService';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public user : Credentials = {
        name : '',
        email : '',
        password : '',
        phoneNo : undefined,
        photoURL : '' ,
        phyProfileExits : false
  };
  constructor(public alertCtrl:AlertController,public navCtrl: NavController, public navParams: NavParams, public mesServ: MessageService,public authService:AuthService) {
    this.user.email = 'chaturvedi.ashish728@gmail.com';
    this.user.password ='123123';
}

ionViewDidLoad() {
  console.log('ionViewDidLoad LoginPage');
}

forPass()
{
  let alert = this.alertCtrl.create({
    title: 'Change Password',
    inputs: [
      {
        name: 'email',
        placeholder: 'enter your email'
      },
   /*   {
        name: 'password',
        placeholder: 'Password',
        type: 'password'
      }*/
    ],
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: data => {
         this.mesServ.presentToast("change password request cancelled.")
        }
      },
      {
        text: 'Send',
        handler: data => {

        this.authService.sendPasswordResetLink(data.email).then(result => {
          if(result)
          this.mesServ.presentToast("Reset password link has been sent on your email address")
          else
          {
            this.mesServ.showAlert("oop!","entered email address is not registered")
            console.log(result);
          }
        });
        
        }
      }
    ]
  });
  alert.present();
}

async login(user: Credentials){
  this.mesServ.showLoading('please wait...');
   await this.authService.signIn(user).then(result1 => {
      if(result1 == 1)
      {
        if(this.authService.getCurrentUser().emailVerified)
         this.navCtrl.setRoot(DashboardPage);
         else
         {
          this.mesServ.loading.dismiss();
          this.mesServ.showAlert('Email not Verified','Please verify your email first');
          this.authService.emailverification();
         }

      }
    }).catch(error => {  
          if(error == 2)
          {
            this.mesServ.loading.dismiss();
            this.mesServ.presentToast('Invalid Email address');
          }
          else if(error == 3)
          {
            this.mesServ.loading.dismiss();
            this.mesServ.presentToast('User not found');
          }
          else if(error == 4)
          {
            this.mesServ.loading.dismiss();
            this.mesServ.presentToast('Wrong Credentials');
          }
            else
          {
            this.mesServ.loading.dismiss();
            this.mesServ.presentToast('Somthing went wrong');
          } 
     });        

    }
}
