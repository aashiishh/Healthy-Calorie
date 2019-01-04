import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { CosumedMealListPage } from '../cosumed-meal-list/cosumed-meal-list';
import { BreakfastSelectionPage } from '../breakfast-selection/breakfast-selection';
import { DashboardPage } from '../dashboard/dashboard';
import { LunchDinnerSelectionPage } from '../lunch-dinner-selection/lunch-dinner-selection';
import { SnacksSelectionPage } from '../snacks-selection/snacks-selection';
import { PHY_Profile } from '../../models/phyProfile';
import { ViewCaloriesPage } from '../view-calories/view-calories';
import { MessageService } from '../../Services/messageService';
import { AuthService } from '../../Services/authService';
import { DatabaseService } from '../../Services/databaseService';
import { SelectedFood } from '../../models/selectedFoodModal';


@IonicPage()
@Component({
  selector: 'page-meal-type-selection',
  templateUrl: 'meal-type-selection.html',
})
export class MealTypeSelectionPage {

  sCals : number;
  bCals : number;
  ldCals : number;
  snCals  : number;
  uid : string;
  oMeal = {} as any;
  otherMeal = {} as SelectedFood;
  constructor(public dbService: DatabaseService, public authServ: AuthService, public mesServ: MessageService,public navCtrl: NavController, public navParams: NavParams, private modalCtrl:ModalController) {
      this.uid = this.authServ.getUID();
      this.sCals = this.navParams.get("suggestedCals");
      this.bCals = this.sCals/5;
      this.snCals = 400;
      this.ldCals = (this.sCals - this.bCals - this.snCals)/2;  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MealTypeSelectionPage');
  }


  viewList()
  {
    this.navCtrl.push(CosumedMealListPage);
  }

  gotoBreakfast()
  {
    this.navCtrl.push(BreakfastSelectionPage,{breakfastCalories : this.bCals});
  }

  viewCalories()
  {
    const modal = this.modalCtrl.create(ViewCaloriesPage,{sCalories : this.sCals});
    modal.present(); 
  }

  gotoLunchDinner()
  {
    this.navCtrl.push(LunchDinnerSelectionPage,{lunchdinnerCalories : this.ldCals});
  }

  gotoSnacks()
  {
    this.navCtrl.push(SnacksSelectionPage, {snacksCalories : this.snCals});
  }

  gotoOther()
  {
    this.mesServ.otherMealPrompt().then(result => {
        if(!result)
        this.mesServ.presentToast("Oops! All fields are mandatory to add a meal");
        else{
          this.oMeal=result;
          this.otherMeal.name=this.oMeal.name;
          this.otherMeal.calories=this.oMeal.calories;
          this.otherMeal.quantity=this.oMeal.quantity;
          this.otherMeal.measure_in ='unit(s)';
          this.otherMeal.totalCalories = this.oMeal.quantity * this.oMeal.calories;
          this.dbService.addConsumedFood(this.otherMeal,this.uid).then(result => {
            if(result)
            {
                 this.mesServ.presentToast("Your food item is successfully added!")
                 // this.updateTotalCaloriesToDB();
            }
        });
      }
      });
    }

}
