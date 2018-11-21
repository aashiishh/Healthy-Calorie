import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController } from 'ionic-angular';
import { AuthService } from '../../Services/authService';
import { HomePage } from '../home/home';
import { MessageService } from '../../Services/messageService';
import { ProfilePage } from '../profile/profile';


@IonicPage()
@Component({
  selector: 'page-popover',
  templateUrl: 'popover.html',
})
export class PopoverPage {

  constructor(public modalCtrl:ModalController,public viewCtrl:ViewController,public mesgService:MessageService,public navCtrl: NavController, public navParams: NavParams,private authService:AuthService) {
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PopoverPage');
  }

  close() {

    this.viewCtrl.dismiss();
  }

  goToProfilePage() {
    this.close();
    const modal = this.modalCtrl.create(ProfilePage);
    modal.present();
  }

  async goToLoginPage(){
    
    this.mesgService.showLoading('logging out...');
     this.authService.logout().then(re => {
              if(re == 1)
              {   
              this.navCtrl.setRoot(HomePage);
              }else
              {
              this.mesgService.loading.dismissAll();
              this.mesgService.presentToast('Something went wrong');
              }
     });
    
    }

}
