import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, PopoverController, ModalController } from 'ionic-angular';
import { PopoverPage } from '../popover/popover';
import { DatabaseService } from '../../Services/databaseService';
import { Observable } from 'rxjs/Observable';
import { Credentials } from '../../models/userCred';
import { AuthService } from '../../Services/authService';
import { UserBodySpecificationPage } from '../user-body-specification/user-body-specification';
import { MessageService } from '../../Services/messageService';
import { EditbodyprofilePage } from '../editbodyprofile/editbodyprofile';
import { BmiPage } from '../bmi/bmi';
import { PHY_Profile } from '../../models/phyProfile';
import { ViewCaloriesPage } from '../view-calories/view-calories';
import { CosumedMealListPage } from '../cosumed-meal-list/cosumed-meal-list';
import { MealTypeSelectionPage } from '../meal-type-selection/meal-type-selection';
import { AdsService } from '../../Services/adsService';


@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {
 myUser : Credentials = 
 {
    name : '',
    email : '',
    password : '',
    phoneNo : undefined,
    photoURL : '',
    phyProfileExits : false
 }
 currentUser : any;
 userPhyProfileList$ : Observable<PHY_Profile[]>;
 usersList$: Observable<Credentials[]>; 
 uList : Observable<any[]>;
//  hr : number;
//  min : number;
//  sec : number;
//  miliSec : number;
//  time : number;
//  bodyProfileData = {} as PHY_Profile;
  constructor(public ads: AdsService,private modalCtrl:ModalController,private mesServ: MessageService,private authServ: AuthService,public navCtrl: NavController, public navParams: NavParams,public viewCtrl:ViewController,public popoverCtrl:PopoverController,public dbServ:DatabaseService) {
    this.currentUser= this.authServ.getCurrentUser();
    this.usersList$ = this.dbServ
          .getUsersList()
          .snapshotChanges()
          .map(
            changes => {
              return changes.map(c => ({
                key: c.payload.key, ...c.payload.val()
              }))
            }
          )
          this.userPhyProfileList$ = this.dbServ.getUsersProfileList().snapshotChanges().map(changes => {
            return changes.map(c => ({
              key : c.payload.key, ...c.payload.val()
            }))
        })
        console.log('body list-->',this.userPhyProfileList$)
        // this.time = new Date().getTime();
        // console.log(new Date().getUTCHours(),new Date().getUTCMinutes())
        // this.hr = new Date().getHours();
        // this.min = new Date().getMinutes();
        // this.sec = new Date().getSeconds();
        // this.miliSec = new Date().getMilliseconds();
        // console.log(this.hr,' ',this.min,' ',this.sec,' ',this.miliSec)
    //  this.uList = this.dbServ.getUsersList().snapshotChanges(); 
    //  this.uList.forEach( user => {
    //   user.forEach( userData =>{
    //     let data = userData.payload.val();
    //     let key = userData.payload.key;
    //     if(data.name == 'Janya')
    //     console.log( "Key: ", id, " Data: " , data );
    //     });
    // });
    
  }

  /*ionViewWillEnter()
  {
    this.ads.showBanner();
  } */

  /*ionViewWillLeave()   to stop banner while leaving the page
  {
    this.ads.hideBanner();
  }*/
   
    showNoProfileExist(user : Credentials)
    {
      this.mesServ.showAlert('oops!','Please complete your body profile first').onDidDismiss(() => {
        this.navCtrl.push(UserBodySpecificationPage,{currentUser: user});
      })
    }

    gotoMealSelection(bodyProfileData : PHY_Profile)
    {
      // this.navCtrl.push(SelectMealPage);
      this.navCtrl.push(MealTypeSelectionPage,{suggestedCals : bodyProfileData.sCalories});   // sending number to MealTypeSelectionPage 
    }

    presentPopover(myEvent) {
      let popover = this.popoverCtrl.create(PopoverPage);
      popover.present({
        ev: myEvent
      });
    }

    gotoBodySpecAdd(user : Credentials)
    {
      this.navCtrl.push(UserBodySpecificationPage,{currentUser: user});  //to send parameter with push function
      // this.navCtrl.push(UserBodySpecificationPage);
    }

    gotoBodySpecEdit(){
      // this.navCtrl.push(UserBodySpecificationPage, this.usersList$);  //to send parameter with push function
      this.navCtrl.push(EditbodyprofilePage);
    }

    showBMI(bpUser : PHY_Profile)
    {
      const modal = this.modalCtrl.create(BmiPage,{profileData : bpUser});
      modal.present();
    }
  
    viewCalories(bodyProfileData : PHY_Profile )
    {
      // const modal = this.modalCtrl.create(ViewCaloriesPage,{profileData : bodyProfileData});  // for sending object to a page
      // modal.present(); 
      const modal = this.modalCtrl.create(ViewCaloriesPage,{sCalories : bodyProfileData.sCalories});  // sending only single variable
      modal.present(); 
    }

    viewConsumption()
    {
      this.navCtrl.push(CosumedMealListPage);
    }

    gotoAbout(){
      this.mesServ.aboutPrompt();
    }

}
