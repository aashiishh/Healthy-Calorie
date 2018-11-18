import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { PHY_Profile } from '../../models/phyProfile';
// import { Observable } from 'rxjs/Observable';
import { DatabaseService } from '../../Services/databaseService';
import { AuthService } from '../../Services/authService';
import { APIService } from '../../Services/API-Service';
import { MessageService } from '../../Services/messageService';
import { BMIData } from '../../models/bmiModel';

@IonicPage()
@Component({
  selector: 'page-bmi',
  templateUrl: 'bmi.html',
})
export class BmiPage {

  // userPhyProfileList$ : Observable<PHY_Profile[]>;
  pData : PHY_Profile;
  dataOfBMI = {} as BMIData;
  BMIresult : any;
  constructor(private mesServ: MessageService,private BMI_API:APIService,public navCtrl: NavController, public navParams: NavParams,public dbServ:DatabaseService,public authServ:AuthService,public viewCtrl:ViewController) 
  {
    this.mesServ.showLoading('calcutating BMI...');
    this.pData = this.navParams.get("profileData");
    console.log(this.pData);
    console.log(this.BMI_API.getBMIResult(this.pData));
    this.BMI_API.getBMIResult(this.pData).then(result => {
        if(result == 0)
        {
          this.mesServ.loading.dismiss();
          this.mesServ.loading.onDidDismiss(() => {
            this.mesServ.presentToast('something went wrong');
            this.close();
          })
         
        }
        else
        {
           this.BMIresult = result;
           console.log(this.BMIresult.bmi.risk);
           this.dataOfBMI.value = this.BMIresult.bmi.value;
           this.dataOfBMI.risk = this.BMIresult.bmi.risk;
           this.dataOfBMI.status = this.BMIresult.bmi.status;
           this.dataOfBMI.ideal_weight = this.BMIresult.ideal_weight;
           this.mesServ.loading.dismiss();
        }
    })
  //   this.userPhyProfileList$ = this.dbServ.getUsersProfileList().snapshotChanges().map(changes => {
  //     return changes.map(c => ({
  //       key : c.payload.key, ...c.payload.val()
  //     }))
  // })
  // console.log('body list-->',this.userPhyProfileList$)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BmiPage');
  }

  close() {

    this.viewCtrl.dismiss();
  }

}
