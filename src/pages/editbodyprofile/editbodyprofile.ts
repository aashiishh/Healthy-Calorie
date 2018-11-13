import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PHY_Profile } from '../../models/phyProfile';
import { Observable } from 'rxjs/Observable';
import { DatabaseService } from '../../Services/databaseService';
import { AuthService } from '../../Services/authService';
import { DashboardPage } from '../dashboard/dashboard';

@IonicPage()
@Component({
  selector: 'page-editbodyprofile',
  templateUrl: 'editbodyprofile.html',
})
export class EditbodyprofilePage {

  userPhyProfileList$ : Observable<PHY_Profile[]>;
  constructor(public navCtrl: NavController, public navParams: NavParams,public dbServ:DatabaseService,public authServ:AuthService) {
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

  updateProfile(ubp : PHY_Profile)
  {
    if(ubp.gender=='m')
      console.log('ubp-->',ubp)
  }

}
