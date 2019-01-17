import { Component } from '@angular/core';
import { NavController, AlertController} from 'ionic-angular';
// import { User } from '../../models/userModel';
// import { DatabaseService } from '../../Services/databaseService';
// import { Observable } from 'rxjs/Observable';
import { LoginPage } from '../login/login';
import { SignUpPage } from '../sign-up/sign-up';
import { AdsService } from '../../Services/adsService';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {


  srcimg : string;
  constructor(public navCtrl: NavController,public ads:AdsService) {

  }

  gotoLogin(){
    this.navCtrl.push(LoginPage);
  }
  gotoSignUp(){
    this.navCtrl.push(SignUpPage);
  }

  ionViewDidLoad() {
    // this.srcimg="https://www.brandcrowd.com/gallery/brands/pictures/picture13626523044082.jpg";
  }

  ionViewWillEnter()
  {
    this.ads.showBanner();
  }

   ionViewWillLeave()
   {
     this.ads.hideBanner();
   }  

//  public user : User = {
//     name : '',
//     email : ''
//   }
//   usersList$: Observable<User[]>;
//   constructor(public navCtrl: NavController, public altCtrl:AlertController, private dbService: DatabaseService) {
//       this.usersList$ = this.dbService
//       .getUsersList()
//       .snapshotChanges()
//       .map(
//         changes => {
//           return changes.map(c => ({
//             key: c.payload.key, ...c.payload.val()
//           }))
//         }
//       )
//   }



}
