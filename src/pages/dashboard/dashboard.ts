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
//  bodyProfileData = {} as PHY_Profile;
  constructor(private modalCtrl:ModalController,private mesServ: MessageService,private authServ: AuthService,private dbService: DatabaseService,public navCtrl: NavController, public navParams: NavParams,public viewCtrl:ViewController,public popoverCtrl:PopoverController,public dbServ:DatabaseService) {
    this.currentUser= this.authServ.getCurrentUser();
    this.usersList$ = this.dbService
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
  }

  ionViewDidLoad() {
  
     console.log('ionViewDidLoad Dashboard');
     
   
    }
   
    showNoProfileExist(user : Credentials)
    {
      this.mesServ.showAlert('oops!','Your body profile is not completed, please update your body profile first').onDidDismiss(() => {
        this.navCtrl.push(UserBodySpecificationPage,{currentUser: user});
      })
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
      const modal = this.modalCtrl.create(ViewCaloriesPage,{profileData : bodyProfileData});
      modal.present(); 
    }

}
