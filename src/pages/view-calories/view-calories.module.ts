import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViewCaloriesPage } from './view-calories';

@NgModule({
  declarations: [
    ViewCaloriesPage,
  ],
  imports: [
    IonicPageModule.forChild(ViewCaloriesPage),
  ],
})
export class ViewCaloriesPageModule {}
