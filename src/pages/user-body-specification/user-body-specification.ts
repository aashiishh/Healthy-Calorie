import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PHY_Profile } from '../../models/phyProfile';
import { DatabaseService } from '../../Services/databaseService';
import { MessageService } from '../../Services/messageService';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../Services/authService';
import { Credentials } from '../../models/userCred';
import { EditbodyprofilePage } from '../editbodyprofile/editbodyprofile';
import { DashboardPage } from '../dashboard/dashboard';
import { APIService } from '../../Services/API-Service';


@IonicPage()
@Component({
  selector: 'page-user-body-specification',
  templateUrl: 'user-body-specification.html',
})
export class UserBodySpecificationPage {

  //private userKey : string;
  phyProfileData = {} as PHY_Profile ;
  user : Credentials; 
  BMIresult : any;
  
  constructor(private BMI_API:APIService,private authServ: AuthService,private mesServ: MessageService,public navCtrl: NavController, public navParams: NavParams,private dbServ:DatabaseService) {
  this.user = this.navParams.get('currentUser');  //go get parameters from nav params
   console.log('Got user from dashboard-->',this.user);
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserBodySpecificationPage');
  }

  async saveProfile(proData : PHY_Profile)
  {
    this.mesServ.showLoading('saving profile...');
    // proData.bmi = (proData.weight/(proData.height*proData.height));
     let result = await this.getValuesFromBMI_API(proData);
     console.log('result from getValuesFromBMI_API() is=>',result);
      if(result == false)
      {
        this.mesServ.loading.dismiss();
        this.mesServ.loading.onDidDismiss(() => {
          this.mesServ.presentToast('something went wrong');
        })
       
      }
      else
      {
        //  console.log(this.BMIresult.bmi.risk);
         this.phyProfileData.authKey = this.authServ.getUID();
         this.dbServ.addPhysicalProfile(this.phyProfileData).then(result1 => {
          if(result1)
          {
              this.user.phyProfileExits = true;
             this.dbServ.editUser(this.user);
            this.mesServ.loading.dismiss();
            this.mesServ.loading.onDidDismiss(() => 
            {
              this.mesServ.showAlert('Thanks','your body profile has been saved!').onDidDismiss(() => {
                  this.navCtrl.setRoot(DashboardPage);
              });
  
            });
          }
      })
      }

  }

  getValuesFromBMI_API(proData : PHY_Profile)
  {
    return new Promise((resolve,reject) => {

       this.BMI_API.getBMIResult(proData).then(result => {
        if(result == 0)
          resolve(false);
        else
        {
          this.BMIresult = result;
          this.phyProfileData.risk=this.BMIresult.bmi.risk
          this.phyProfileData.status = this.BMIresult.bmi.status;
          this.phyProfileData.ideal_weight = this.BMIresult.ideal_weight;
          this.phyProfileData.bmi = this.BMIresult.bmi.value;
          this.phyProfileData.sCalories = ((this.BMIresult.bmr.value)*this.getSLMV(this.phyProfileData.aFactor))+this.getMode(this.phyProfileData.mode);
          console.log('Suggested Calories are =>',this.phyProfileData.sCalories);
          resolve(true);
        }
  
      });

    })
    
  }

  
  getSLMV(slmv : string) : number
  {
      if(slmv == 's')
      return 1.2;
      else if(slmv == 'l')
      return 1.375;
      else if(slmv == 'm')
      return 1.55;
      else
      return 1.725;
  }

  getMode(mode : string) : number
  {
      if(mode == 'lw')
      return -500;
      else if(mode == 'mw')
      return 0;
      else
      return 500;
  }



}
