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

  presentToastTop(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'top'
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

    aboutPrompt(){
      let alert = this.alertctrl.create({
        title: 'About',
        message: '"Healthy Calorie helps you to manage your calorie intake, by eating healthy" <br> Healthy Calorie is the best guide to calories and weight control. <br><br> <u><b>Key Features</b></u><br><br>User body profile is maintained<br><br>BMI Calculator<br><br>Suggest the calorie consumption according to your body profile<br><br>List of total consumption is maintained<br><br>Counts the calorie according to the consumption<br><br>List of healthy food items is provided',

        buttons: ['Okay']
      });
      alert.present();
    }

    otherMealPrompt(){
      return new Promise((resolve,reject) => {
      let alert = this.alertctrl.create({
        subTitle: 'Enter the details of food item',
        inputs: [
          {
            name: 'name',
            placeholder: 'Name'
          },
          {
            name: 'quantity',
            placeholder: 'Quantity',
            type: 'number'
          },
          {
            name: 'calories',
            placeholder: 'Calories (per unit)',
            type: 'number'
          }
        ],
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: data => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Submit',
            handler: data => {
              if(data.name && data.calories && data.quantity)
              resolve(data);
              else
              resolve(0);
            }
          }
        ]
      });
      alert.present();
    })
    }
}
