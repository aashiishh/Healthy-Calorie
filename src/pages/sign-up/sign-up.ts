import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Credentials } from '../../models/userCred';
import { AuthService } from '../../Services/authService';
import { MessageService } from '../../Services/messageService';
import { DatabaseService } from '../../Services/databaseService';
import { LoginPage } from '../login/login';



@IonicPage()
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {

 public user : Credentials = {
        name : '',
        email : '',
        password : '',
        phoneNo : 0,
        photoURL : '',
        phyProfileExits : false
 };
  cpass : string;
  constructor(public navCtrl: NavController, public navParams: NavParams,private authServ:AuthService,private messServ:MessageService,private dbServ:DatabaseService) {
  }

  ionViewDidLoad() {
    
  }

  goToLogin()
  {
    this.navCtrl.push(LoginPage);
  }

  async signUp(localUser : Credentials)
  {
     this.messServ.showLoading('creating account...');
     localUser.photoURL="http://downloadicons.net/sites/default/files/contacts-icon-64397.png";
    await this.authServ.signUp(localUser).then(result =>{
      if(result == 1)
    //this.navCtrl.setRoot(HomePage);  
      {
        this.messServ.loading.dismiss();
        this.messServ.showAlert('Congrats!','You are registered successfully, please verify your account by clicking on the link sent on your email.'); 
        // this.user.name='';
        this.user.email='';
        this.user.password='';
        this.cpass='';
      }
    }).catch(error => {
      if(error == 2)
      {
        this.messServ.loading.dismiss();
      this.messServ.presentToast('Weak Password');
      }
      else if(error == 3)
      {
        this.messServ.loading.dismiss();
      this.messServ.presentToast('Email already in use');
      }
      else if(error == 4)
      {
        this.messServ.loading.dismiss(); 
      this.messServ.presentToast('Invalid Email address');
      }
      else
      {
        this.messServ.loading.dismiss();
      this.messServ.presentToast('Somthing went wrong');
      }
    });
    // this.authServ.signup(this.user.email,this.user.password).then(result1 =>{
    //   //console.log("my signed Up: "+result);
    //   if(result1 == 1)
    //   {
    //       //this.mesServ.showAlert('gg',user.username+user.phoneno+user.password+user.email);
    //      this.dbServ.addUser(this.user).then(result => {
    //     if(result)        
    //    { 
        //  this.navCtrl.push(LoginPage);
        //  this.messServ.showAlert('Congrats!','You are registered successfully, please verify your account by clicking on the link sent on your email.'); 
        //  this.user.name='';
        //  this.user.email='';
        //  this.user.password='';
    //     }
    // });
    //  }
    //   else 
      // {
      //     if(result1 == 2)
      //     this.messServ.presentToast('Weak Password');
      //     else if(result1 == 3)
      //     this.messServ.presentToast('Email already in use');
      //     else if(result1 == 4)
      //     this.messServ.presentToast('Invalid Email address');
      //     else
      //     this.messServ.presentToast('Somthing went wrong');
    //   }        
    //       });
 
  }

}

