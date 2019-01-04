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
  selector: 'page-snacks-selection',
  templateUrl: 'snacks-selection.html',
})
export class SnacksSelectionPage {

  foodListForSnacks$ : Observable<Food_Items[]>;
  foodConsumed = {} as SelectedFood;
  uid : string;
  snCals : number;
  constructor(private authServ: AuthService,private modalCtrl:ModalController,public navCtrl: NavController, public navParams: NavParams,private dbService: DatabaseService) {

    this.uid = this.authServ.getUID();
    this.foodListForSnacks$ = this.dbService.getFoodItemListForSnacks()

    .snapshotChanges()
    .map(
      changes => {
        return changes.map(c => ({
          key: c.payload.key, ...c.payload.val()
        }))
      });

      this.snCals = this.navParams.get("snacksCalories");

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SnacksSelectionPage');
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
