import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SnacksSelectionPage } from './snacks-selection';

@NgModule({
  declarations: [
    SnacksSelectionPage,
  ],
  imports: [
    IonicPageModule.forChild(SnacksSelectionPage),
  ],
})
export class SnacksSelectionPageModule {}
