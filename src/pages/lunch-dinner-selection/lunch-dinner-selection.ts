import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { DatabaseService } from '../../Services/databaseService';
import { AuthService } from '../../Services/authService';
import { Observable } from 'rxjs/Observable';
import { Food_Items } from '../../models/foodModal';
import { SelectedFood } from '../../models/selectedFoodModal';
import { FoodModalPage } from '../food-modal/food-modal';

@IonicPage()
@Component({
  selector: 'page-lunch-dinner-selection',
  templateUrl: 'lunch-dinner-selection.html',
})
export class LunchDinnerSelectionPage {

  foodListForLunchOrDinner$ : Observable<Food_Items[]>;
  foodConsumed = {} as SelectedFood;
  uid : string;
  ldCals :number;
  constructor(private authServ: AuthService,private modalCtrl:ModalController,public navCtrl: NavController, public navParams: NavParams,private dbService: DatabaseService) {

    this.uid = this.authServ.getUID();
    this.foodListForLunchOrDinner$ = this.dbService.getlunchFoodItemList()
    
    .snapshotChanges()
    .map(
      changes => {
        return changes.map(c => ({
          key: c.payload.key, ...c.payload.val()
        }))
      });

      this.ldCals = this.navParams.get("lunchdinnerCalories");

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LunchDinnerSelectionPage');
  }

  itemSelected(item : Food_Items)
  {
    const modal = this.modalCtrl.create(FoodModalPage,{foodInfo : item});
    modal.present();
    modal.onDidDismiss(data  => {
        if(data)
        {
          this.foodConsumed = data;
          // let time = new Date();
          // console.log(time);
            this.dbService.addConsumedFood(data,this.uid).then(result => {
                     if(result)
                     {
                          console.log("Food item added");
                          // this.updateTotalCaloriesToDB();
                     }
            })
        }
    });
  }


}
