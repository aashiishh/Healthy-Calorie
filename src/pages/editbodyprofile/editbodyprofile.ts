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
     let count = false;
     let flag =  false;
     console.log(ubp);
     this.mesServ.showLoading('please wait...');
       if(this.proData.age || this.proData.height || this.proData.weight || this.proData.mode || this.proData.aFactor)
          {
            if(this.proData.age && ubp.age!=this.proData.age)
            { 
              ubp.age=this.proData.age;
              count = true;
             } 
            if(this.proData.height && ubp.height!=this.proData.height)   
             {
              ubp.height=this.proData.height;
              count = true;
             }
             if( this.proData.weight && ubp.weight!=this.proData.weight)  
             {
               ubp.weight=this.proData.weight;
               count = true;
             }

            // changes in weight or height or age

             if(count)
             {
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

          else if(this.proData.aFactor || this.proData.mode)
          {
            if(this.proData.aFactor && ubp.aFactor!=this.proData.aFactor)
            {
              ubp.aFactor=this.proData.aFactor
              flag = true;
            }
              
            if(this.proData.mode && ubp.mode!=this.proData.mode)
             {
                ubp.mode=this.proData.mode;
                flag=true;
             }   
               
            if(flag)
            {

                ubp.sCalories=((ubp.bmr)*this.getSLMV(ubp.aFactor))+this.getMode(ubp.mode);
                console.log('Only Suggested Calories changed =>',ubp.sCalories);
                       this.dbServ.editPhysicalProfile(ubp).then(result => {

                if(result)
                {
                this.mesServ.loading.dismiss();
                this.mesServ.loading.onDidDismiss(() => 
                {
                  this.mesServ.showAlert('Thanks!','Your body profile has been saved.');
                });
                
              }

               });

            }   

            else
            {
              this.mesServ.loading.dismiss();
              this.mesServ.loading.onDidDismiss(() => 
              {
                this.mesServ.presentToast('no changes were made!');
              });
              
            }
          } 

          else
          {
            this.mesServ.loading.dismiss();
            this.mesServ.loading.onDidDismiss(() => 
            {
              this.mesServ.presentToast('no changes were made!');
            });
            
          }

          } 
          else
          {
            this.mesServ.loading.dismiss();
            this.mesServ.loading.onDidDismiss(() => 
            {
              this.mesServ.presentToast('no changes were made!');
            });
            
          }
  }

  getValuesFromBMI_API(pData : PHY_Profile)
  {
    return new Promise((resolve,reject) => {

       this.BMI_API.sendPostRequest(pData).then(result => {
        if(!result)
          resolve(false);
        else
        {
          this.BMIresult = result;
          pData.risk=this.BMIresult.bmi.risk
          pData.bmr = this.BMIresult.bmr.value;
          pData.status = this.BMIresult.bmi.status;
          pData.ideal_weight = this.BMIresult.ideal_weight;
          pData.bmi = this.BMIresult.bmi.value;
          pData.sCalories = ((pData.bmr)*this.getSLMV(pData.aFactor))+this.getMode(pData.mode);
          console.log('Suggested Calories are =>',pData.sCalories);
          resolve(true);
        }
  
      });

    })
    
  }

  
  getSLMV(slmv : string) : number
  {
      if(slmv == 'sedentary')
      return 1.2;
      else if(slmv == 'light')
      return 1.375;
      else if(slmv == 'moderate')
      return 1.55;
      else
      return 1.725;
  }

  getMode(mode : string) : number
  {
      if(mode == 'loose weight')
      return -500;
      else if(mode == 'maintain weight')
      return 0;
      else
      return 500;
  }


}
