import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { PHY_Profile } from '../../models/phyProfile';
import { Observable } from 'rxjs/Observable';
import { DatabaseService } from '../../Services/databaseService';
import { AuthService } from '../../Services/authService';

@IonicPage()
@Component({
  selector: 'page-bmi',
  templateUrl: 'bmi.html',
})
export class BmiPage {

  userPhyProfileList$ : Observable<PHY_Profile[]>;
  constructor(public navCtrl: NavController, public navParams: NavParams,public dbServ:DatabaseService,public authServ:AuthService,public viewCtrl:ViewController) 
  {
    this.userPhyProfileList$ = this.dbServ.getUsersProfileList().snapshotChanges().map(changes => {
      return changes.map(c => ({
        key : c.payload.key, ...c.payload.val()
      }))
  })
  console.log('body list-->',this.userPhyProfileList$)

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BmiPage');
  }

  close() {

    this.viewCtrl.dismiss();
  }

}
