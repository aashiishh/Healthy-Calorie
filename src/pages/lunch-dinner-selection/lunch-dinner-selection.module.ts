import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LunchDinnerSelectionPage } from './lunch-dinner-selection';

@NgModule({
  declarations: [
    LunchDinnerSelectionPage,
  ],
  imports: [
    IonicPageModule.forChild(LunchDinnerSelectionPage),
  ],
})
export class LunchDinnerSelectionPageModule {}
