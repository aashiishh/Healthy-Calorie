import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BreakfastSelectionPage } from './breakfast-selection';

@NgModule({
  declarations: [
    BreakfastSelectionPage,
  ],
  imports: [
    IonicPageModule.forChild(BreakfastSelectionPage),
  ],
})
export class BreakfastSelectionPageModule {}
