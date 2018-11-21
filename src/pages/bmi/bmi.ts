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
  bpUser : PHY_Profile;
  constructor(private mesServ: MessageService,private BMI_API:APIService,public navCtrl: NavController, public navParams: NavParams,public dbServ:DatabaseService,public authServ:AuthService,public viewCtrl:ViewController) 
  {
    this.bpUser = this.navParams.get("profileData");
    console.log(this.bpUser);
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
