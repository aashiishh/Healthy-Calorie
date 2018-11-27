import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AngularFireModule } from 'angularfire2';
import { firebase_config } from './firebase.credetials';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth} from 'angularfire2/auth';
import { DatabaseService } from '../Services/databaseService';
import { LoginPage } from '../pages/login/login';
import { SignUpPage } from '../pages/sign-up/sign-up';
import { AuthService } from '../Services/authService';
import { MessageService } from '../Services/messageService';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { PopoverPage } from '../pages/popover/popover';
import { ProfilePage } from '../pages/profile/profile';
import { UserBodySpecificationPage } from '../pages/user-body-specification/user-body-specification';
import { EditbodyprofilePage } from '../pages/editbodyprofile/editbodyprofile';
import { BmiPage } from '../pages/bmi/bmi';
import { APIService } from '../Services/API-Service';
import { HttpClientModule } from '@angular/common/http';
import { ViewCaloriesPage } from '../pages/view-calories/view-calories';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    SignUpPage,
    DashboardPage,
    PopoverPage,
    ProfilePage,
    UserBodySpecificationPage,
    EditbodyprofilePage,
    BmiPage,
    ViewCaloriesPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebase_config),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    SignUpPage,
    DashboardPage,
    PopoverPage,
    ProfilePage,
    UserBodySpecificationPage,
    EditbodyprofilePage,
    BmiPage,
    ViewCaloriesPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DatabaseService,
    AuthService,
    MessageService,
    APIService,
  ]
})
export class AppModule {}
