import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PHY_Profile } from '../../models/phyProfile';
import { DatabaseService } from '../../Services/databaseService';
import { MessageService } from '../../Services/messageService';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../Services/authService';
import { Credentials } from '../../models/userCred';
import { EditbodyprofilePage } from '../editbodyprofile/editbodyprofile';
import { DashboardPage } from '../dashboard/dashboard';


@IonicPage()
@Component({
  selector: 'page-user-body-specification',
  templateUrl: 'user-body-specification.html',
})
export class UserBodySpecificationPage {

  //private userKey : string;
  phyProfileData = {} as PHY_Profile ;
  user : Credentials; 
  
  constructor(private authServ: AuthService,private mesServ: MessageService,public navCtrl: NavController, public navParams: NavParams,private dbServ:DatabaseService) {
  this.user = this.navParams.get('currentUser');  //go get parameters from nav params
   console.log('Got user from dashboard-->',this.user);
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserBodySpecificationPage');
  }

  saveProfile(proData : PHY_Profile)
  {
    this.mesServ.showLoading('saving profile...');
    // proData.bmi = (proData.weight/(proData.height*proData.height));
    this.phyProfileData.authKey = this.authServ.getUID();
    this.dbServ.addPhysicalProfile(proData).then(result => {
        if(result)
        {
          this.phyProfileData.gender = '';
           this.phyProfileData.age = undefined;
           this.phyProfileData.weight = undefined;
           this.phyProfileData.height = undefined; 
           this.user.phyProfileExits = true;
           this.dbServ.editUser(this.user);
          this.mesServ.loading.dismiss();
          this.mesServ.loading.onDidDismiss(() => {
            this.mesServ.showAlert('Thanks','your body profile has been saved!').onDidDismiss(() => {
                this.navCtrl.setRoot(DashboardPage);
            });

          });
        }
    })

  }
  

}
