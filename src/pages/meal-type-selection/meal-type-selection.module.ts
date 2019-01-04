import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MealTypeSelectionPage } from './meal-type-selection';

@NgModule({
  declarations: [
    MealTypeSelectionPage,
  ],
  imports: [
    IonicPageModule.forChild(MealTypeSelectionPage),
  ],
})
export class MealTypeSelectionPageModule {}
