import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SubmitOrderPage } from './submit-order';

@NgModule({
  declarations: [
    SubmitOrderPage,
  ],
  imports: [
    IonicPageModule.forChild(SubmitOrderPage),
  ],
})
export class SubmitOrderPageModule {}
