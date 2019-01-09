import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Credentials } from '../../models/userCred';
import { AuthService } from '../../Services/authService';
import { DatabaseService } from '../../Services/databaseService';
import { Observable } from 'rxjs/Observable';
import { MessageService } from '../../Services/messageService';
import { LoginPage } from '../login/login';


@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  user : Credentials = {
    name : '',
    email : '',
    password : '',
    phoneNo : undefined,
    photoURL : '',
    phyProfileExits : false,
  }
  imgsrc :string;
  usersList$: Observable<Credentials[]>; 
  constructor(private mesService:MessageService,public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController,private authServ:AuthService,private dbServe:DatabaseService) {
      // this.user.email = this.authServ.getCurrentUser().email;
      this.usersList$ = this.dbServe
          .getUsersList()
          .snapshotChanges()
          .map(
            changes => {
              return changes.map(c => ({
                key: c.payload.key, ...c.payload.val()
              }))
            }
          )
  }

ionViewDidLoad() {
 this.imgsrc = "http://downloadicons.net/sites/default/files/contacts-icon-64397.png";
}

close() {
this.viewCtrl.dismiss();
}

  async updateProfile(updatedData : Credentials,tarUser : Credentials)
  {
    // console.log(tarUser,'<<--->>>',updatedData)
    this.mesService.showLoading('updating your profile...');
     let count : number = 0;
     let emailChangeConfirm : number; 
    if(updatedData.name)
    {
       console.log(tarUser.name,' same?? as ',updatedData.name)
       if(tarUser.name != updatedData.name)
        tarUser.name = updatedData.name;
        else
        count++;
    }
    /*if(updatedData.email)
    {
       if(tarUser.email != updatedData.email)
        {  
           this.mesService.loading.dismiss();
           await this.updateEmailAllProcessing().then(result => {
             console.log('Reauth result is ',result);
          if(result)
          { 
            emailChangeConfirm = result;
            console.log(emailChangeConfirm);
            if(result == 1)
            tarUser.email = updatedData.email;
            else if(result == 0)
            {
               this.mesService.loading.dismiss();
               //this.mesService.showAlert('Profile not saved','you failed to give a valid password');
            }
            else if(result == 2)
            {
               this.mesService.loading.dismiss();
               this.mesService.presentToast('Invalid Password');
            }
            else
            {
               this.mesService.loading.dismiss();
               this.mesService.showAlert('oops!','something went wrong');
            }
          } 
           }) 
        }
        else
        count++;
    }*/
    if(updatedData.phoneNo)
    {
       if(tarUser.phoneNo != updatedData.phoneNo)
        tarUser.phoneNo = updatedData.phoneNo;
        else
        count++;
    }

   /* if(updatedData.photoURL)
    {
       if(tarUser.photoURL != updatedData.photoURL)
        tarUser.photoURL = updatedData.photoURL;
        else
        count++;
    }*/
      console.log('Count==>',count)

      
    if(count)
    {
      this.mesService.loading.dismiss();
      this.mesService.showAlert('oops!!','you cannot update profile with same data');
    }
   /* else if(emailChangeConfirm == 1)
    {
      await this.authServ.updateEmail(tarUser.email).then(result => {
          if(result == 1)
          {
             this.dbServe.editUser(tarUser).then(result => {
                if(result)
                {
                  console.log("User Edited Successfully with email change too");
                  this.authServ.logout().then(result => {
                       if(result == 1)
                       {
                        this.navCtrl.setRoot(LoginPage).then(() => 
                        {
                           this.mesService.showAlert('Success!!','Your profile is updated, please login with the new email');
                        }); 
                      }
                  })
                }
            })
          }
      }).catch(error => {
        if(error == 2)
        {
          this.mesService.loading.dismiss();
          //this.close();
          this.mesService.presentToast('Email already in use');
        }
        else if(error == 3)
        {
          this.mesService.loading.dismiss(); 
          //this.close();
          this.mesService.presentToast('invalid Email address');
        }
        else
        {
          this.mesService.loading.dismiss();
          //  this.close();
          this.mesService.presentToast('email not updated, somthing went wrong');
        }
      })
      // this.dbServe.editUser(tarUser).then(() =>
      // {
      //     console.log("User Edited Successfully with email change too");
      //     this.authServ.updateEmail(tarUser.email).then(() => 
      //     {
      //         console.log('login email updated');
      //         this.navCtrl.setRoot(LoginPage)
      //         this.authServ.logout().then(() => {
      //                    this.mesService.showAlert('Success!!','Your profile is updated, please login with the new email');
      //              });
      //     })
      //     //this.close();
      // })
    } */
    else
    {
      this.dbServe.editUser(tarUser).then(result =>
      {
        if(result)
        {
        this.mesService.loading.dismiss();
        console.log("User Edited Successfully with No email change");
        //this.close();
        }
      }).catch(error => {
         if(error)
         {
           this.mesService.loading.dismiss();
           this.mesService.showAlert('somthing went wrong ','profile not updated please check your connection');
         }
      })
    }
  }

   updateEmailAllProcessing()
  {
    return new Promise<number>((resolve, reject) => {
    let alert = this.mesService.emailChangeConfirmation();
    alert.present();
    alert.onDidDismiss((data) => {
      console.log('data->',data);
          if(data)
          {
          let alert1 = this.mesService.passwordPrompt();
          alert1.present();
          alert1.onDidDismiss((data1) => 
            {
              console.log('password->',data1);
              if(data1.password == "")
              {
                //console.log('yesssss');
                resolve(2);
              }
              else if(data1)
              {
                this.mesService.showLoading('please wait...');
                this.authServ.reauthenticateUser(data1.password).then(result =>
                {
                  if(result==1){
                  console.log('User Reauth Done');
                  resolve(1);
                  }
                }).catch( error => {
                    if(error==2)
                    resolve(2);
                    else if(error == 0)
                    resolve(3);
                })
              }
              else
              resolve(3);
            })
          }
          else
              resolve(0);
    })
  });
  }
  
  

}
