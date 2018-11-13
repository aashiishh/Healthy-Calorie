//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController,ToastController, LoadingController,Loading} from 'ionic-angular';


@Injectable()
export class MessageService {
  loading: Loading;
  constructor(public alertctrl:AlertController,private toastCtrl: ToastController,private loadingCtrl: LoadingController) {
    console.log('Hello MessageProvider Provider');
  }

  showAlert(mes1,mes2) {
    const alert = this.alertctrl.create({
      title: mes1,
      subTitle: mes2,
      buttons: ['OK']
    });
    alert.present();
    return alert;
  }

  presentToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'bottom'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }

  emailChangeConfirmation()
  {   
      let alert = this.alertctrl.create({
        title: 'Confirmation',
        message: 'Do you really want to change email?',
        buttons: [
          {
            text: 'No',
            handler: () => {
              alert.dismiss(false);
             return false;
            }
          },
          {
            text: 'Yes',
            handler: () => {
              alert.dismiss(true);
              return false;
            }
          }
        ]
      });
     return alert;
      
    }

    passwordPrompt()
    {
       let alert = this.alertctrl.create({
         subTitle : 'provide your account password to change the email address',
          inputs : [
             {
               name : 'password',
               type : 'password',
               placeholder : 'password'
             }
          ],
          buttons :
          [
            {
              text: 'Submit',
              handler: data => {
                    alert.dismiss(data);
                    return false;
              }
            } 
          ]
       })
       return alert;
    }
    showLoading(message) {
      this.loading = this.loadingCtrl.create({
        content: message,
        dismissOnPageChange: true
      });
      this.loading.present();
    }

}
