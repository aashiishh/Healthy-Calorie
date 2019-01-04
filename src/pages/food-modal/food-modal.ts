import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Food_Items } from '../../models/foodModal';
import { MessageService } from '../../Services/messageService';
import { SelectedFood } from '../../models/selectedFoodModal';
import { AuthService } from '../../Services/authService';


@IonicPage()
@Component({
  selector: 'page-food-modal',
  templateUrl: 'food-modal.html',
})
export class FoodModalPage {

   foodDetails : Food_Items; 
   foodForSelectedFoodList = {} as SelectedFood;
   caloriesConsumed : number;
   selectedFoodCalories : number;
   image : string;
  constructor(private authServ: AuthService,public mesServ:MessageService,public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {

    this.foodDetails = this.navParams.get("foodInfo");
    console.log(this.foodDetails);
    this.selectedFoodCalories = this.foodDetails.calories;  // for value to be saved

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FoodModalPage');
    // this.image = this.foodDetails.image;
  }

  add()
  {
    this.foodDetails.quantity++;
    this.foodDetails.calories=this.selectedFoodCalories * this.foodDetails.quantity;
  }

  add_Add_On()
  {
    this.foodDetails.add_on_quantity++;
    this.foodDetails.calories=this.selectedFoodCalories * this.foodDetails.add_on_quantity;
  }

  remove()
  {
    if(this.foodDetails.quantity>1)
    {
    this.foodDetails.quantity--;
    this.foodDetails.calories=this.foodDetails.calories - this.selectedFoodCalories;
    }
    else
    {
      this.mesServ.presentToast('sorry, quantity cannot be less than 1');
    }
  }

  remove_Add_On()
  {
    if(this.foodDetails.add_on_quantity>1)
    {
    this.foodDetails.add_on_quantity--;
    this.foodDetails.calories=this.foodDetails.calories - this.selectedFoodCalories;
    }
    else
    {
      this.mesServ.presentToast('sorry, quantity cannot be less than 1');
    }
  }

  addFoodItem()
  {
    //  this.foodForSelectedFoodList.uid = this.authServ.getUID();
     this.foodForSelectedFoodList.quantity = this.foodDetails.quantity;
     this.foodForSelectedFoodList.name = this.foodDetails.name;
     this.foodForSelectedFoodList.totalCalories = this.foodDetails.calories;
     this.foodForSelectedFoodList.calories = this.selectedFoodCalories;
     this.foodForSelectedFoodList.measure_in = this.foodDetails.measure_in;
    //  this.foodForSelectedFoodList.image = this.foodDetails.image; 
     if(this.foodDetails.add_on_name)
     {
       this.foodForSelectedFoodList.add_on_name = this.foodDetails.add_on_name;
       this.foodForSelectedFoodList.add_on_quantity = this.foodDetails.add_on_quantity;
     }

     this.closeOnAddButton(this.foodForSelectedFoodList);
  }

  closeOnCloseButton() 
  {
    this.viewCtrl.dismiss();
  }
  closeOnAddButton(data : SelectedFood)
  {
    this.viewCtrl.dismiss(data);
  }

}
