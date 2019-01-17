import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { DatabaseService } from '../../Services/databaseService';
import { AuthService } from '../../Services/authService';
import { SelectedFood } from '../../models/selectedFoodModal';
import { Observable } from 'rxjs/Observable';
import { MessageService } from '../../Services/messageService';
import { AdsService } from '../../Services/adsService';


@Component({
  selector: 'page-cosumed-meal-list',
  templateUrl: 'cosumed-meal-list.html',
})
export class CosumedMealListPage {

   ConsumedFoodList$ : Observable<SelectedFood[]>;
   uid : string;
   length = false;
  constructor(public ads:AdsService,public mesServ:MessageService,public alertCtrl:AlertController,private authServ:AuthService,public navCtrl: NavController, public navParams: NavParams,private dbServ:DatabaseService)
   {
     
  this.uid = this.authServ.getUID();
   
  this.ConsumedFoodList$ = this.dbServ.getConsumedFoodList(this.uid)
  .snapshotChanges()
  .map(changes => { 
        if(changes.length == 0)
        this.getLength();
        console.log(changes.length)
   return changes.map(c =>    
    ({
   key : c.payload.key, ...c.payload.val()
          })  
        )
      })
    
    }


 /* ionViewDidEnter()
  {
    this.ads.showInterstitial();
  } */

  getLength()
  {
     this.length = true;
  }

  deleteFood(item : SelectedFood)
  {
    this.dbServ.deleteConsumedFood(item,this.uid).then(()=>{
    });
  }

  resetConsumption() {
    if(!this.length)
    {
    let alert = this.alertCtrl.create({
      title: 'Reset Consumption',
      message: 'Are you sure, you want to delete all your consumed meal?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Reset',
          handler: () => {
                  this.dbServ.removeConsumedFoodList(this.uid).then(result => {
                            if(result)
                            this.mesServ.presentToast("All cosumed food has been removed!!");
                  })
          }
        }
      ]
    });
    alert.present();
  }
  else
   this.mesServ.presentToast("oops!, you didn't consume anything yet");

  }



}
