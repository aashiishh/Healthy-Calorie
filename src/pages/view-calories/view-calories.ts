import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { PHY_Profile } from '../../models/phyProfile';
// import { Observable } from 'rxjs/Observable';
import { DatabaseService } from '../../Services/databaseService';
import { AuthService } from '../../Services/authService';


@IonicPage()
@Component({
  selector: 'page-view-calories',
  templateUrl: 'view-calories.html',
})
export class ViewCaloriesPage {

  bodyProfileData : PHY_Profile;
  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController) {

    this.bodyProfileData = this.navParams.get("profileData");
    console.log(this.bodyProfileData);
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewCaloriesPage');
  }

  close() 
  {
    this.viewCtrl.dismiss();
  }

}
