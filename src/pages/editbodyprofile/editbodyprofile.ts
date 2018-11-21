import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PHY_Profile } from '../../models/phyProfile';
import { Observable } from 'rxjs/Observable';
import { DatabaseService } from '../../Services/databaseService';
import { AuthService } from '../../Services/authService';
import { DashboardPage } from '../dashboard/dashboard';
import { APIService } from '../../Services/API-Service';
import { MessageService } from '../../Services/messageService';

@IonicPage()
@Component({
  selector: 'page-editbodyprofile',
  templateUrl: 'editbodyprofile.html',
})
export class EditbodyprofilePage {

  userPhyProfileList$ : Observable<PHY_Profile[]>;
  proData = {} as PHY_Profile;
  BMIresult : any;
  currentUser : any;
  constructor(private BMI_API:APIService,public navCtrl: NavController,private mesServ: MessageService, public navParams: NavParams,public dbServ:DatabaseService,public authServ:AuthService) {
    this.currentUser = this.authServ.getCurrentUser();
    this.userPhyProfileList$ = this.dbServ.getUsersProfileList().snapshotChanges().map(changes => {
      return changes.map(c => ({
        key : c.payload.key, ...c.payload.val()
      }))
  })
  console.log('body list-->',this.userPhyProfileList$)

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditbodyprofilePage');
  }

  async editPHYProfile(ubp : PHY_Profile)
  {
     this.mesServ.showLoading('please wait...');
       if(ubp.age!=this.proData.age || ubp.height!=this.proData.height || ubp.weight!=this.proData.weight)
       {
            if(this.proData.age && ubp.age!=this.proData.age)
             ubp.age=this.proData.age;
            if(this.proData.height && ubp.height!=this.proData.height) 
             ubp.height=this.proData.height;
            if(this.proData.weight && ubp.weight!=this.proData.weight) 
             ubp.weight=this.proData.weight;

            let result = await this.getValuesFromBMI_API(ubp);
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
               this.dbServ.editPhysicalProfile(ubp).then(result => {

                if(result)
                {
                this.mesServ.loading.dismiss();
                this.mesServ.loading.onDidDismiss(() => 
                {
                  this.mesServ.showAlert('Thanks','your body profile has been saved!');
                });
                
              }

               })
            }
       }
  }

  getValuesFromBMI_API(pData : PHY_Profile)
  {
    return new Promise((resolve,reject) => {

       this.BMI_API.getBMIResult(pData).then(result => {
        if(result == 0)
          resolve(false);
        else
        {
          this.BMIresult = result;
          pData.risk=this.BMIresult.bmi.risk
          pData.status = this.BMIresult.bmi.status;
          pData.ideal_weight = this.BMIresult.ideal_weight;
          pData.bmi = this.BMIresult.bmi.value;
          pData.sCalories = ((this.BMIresult.bmr.value)*this.getSLMV(pData.aFactor))+this.getMode(pData.mode);
          console.log('Suggested Calories are =>',pData.sCalories);
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
