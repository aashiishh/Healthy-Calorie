import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { AuthService } from '../Services/authService';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { MessageService } from '../Services/messageService';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;

  constructor(private mesServ: MessageService,platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,private authServ:AuthService) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.authServ.afauth.authState.subscribe(user => {
        if(user)
        {
         if(user.emailVerified)
         {
          this.rootPage = DashboardPage;
          console.log('Current User is ',user.email)
          //this.mesServ.showAlert('Email Not Verified!!','Hey,\nplease verify your email first');
          //this.authServ.emailverification();
         }
         else
         {
          console.log('Current User is ',user.email,' but email not verified');
           this.rootPage = HomePage
         }
      }
        else
        {
          console.log('No user logged in')
          this.rootPage = HomePage;
        }  
      });
      splashScreen.hide();
    });
  }
}

