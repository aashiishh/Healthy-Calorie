import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { PHY_Profile } from '../../models/phyProfile';
// import { Observable } from 'rxjs/Observable';
import { DatabaseService } from '../../Services/databaseService';
import { AuthService } from '../../Services/authService';
import { Observable } from 'rxjs/Observable';
import { SelectedFood } from '../../models/selectedFoodModal';
import { TotalCaloriesData } from '../../models/totalCaloriesModel';
import { AdsService } from '../../Services/adsService';


@IonicPage()
@Component({
  selector: 'page-view-calories',
  templateUrl: 'view-calories.html',
})
export class ViewCaloriesPage {

  bodyProfileData : PHY_Profile;
  sCals : number;    // for suggested calories when land from select meal type page
  uid : string;
  food : SelectedFood;
  consumedFoodList$ : Observable<SelectedFood[]>;
  TCal = {} as TotalCaloriesData;
  count = 0;
  length = 1;
  constructor(public ads:AdsService,public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController,private dbServ:DatabaseService,private authServ: AuthService) {
    this.uid = this.authServ.getUID();
    // this.bodyProfileData = this.navParams.get("profileData");
    // console.log(this.bodyProfileData);
    this.sCals = this.navParams.get("sCalories");
    console.log("Suggested Calories are ",this.sCals);

    this.consumedFoodList$ = this.dbServ.getConsumedFoodList(this.uid)
          .snapshotChanges()
          .map(changes => {
          changes.map(c => { 
               this.food = c.payload.val();
               this.count = this.count + this.food.totalCalories
               if(this.length++==changes.length)            
               this.getCaloriesToAdd(this.count);     
           })
        return changes.map(c => ({
        key : c.payload.key, ...c.payload.val()
         })  
        )
      })
     
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewCaloriesPage');
  }

  ionViewWillEnter()
  {
    this.ads.showBanner();
  }
  ionViewWillLeave()
  {
    this.ads.hideBanner();
  }

  close() 
  {
    this.viewCtrl.dismiss();
  }

  getCaloriesToAdd(val : number)
  {
     this.TCal.totalCalories = val;
     console.log('Final Sum : ',this.TCal.totalCalories);
  }

}
