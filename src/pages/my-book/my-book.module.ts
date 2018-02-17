import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyBookPage } from './my-book';

@NgModule({
  declarations: [
    MyBookPage,
  ],
  imports: [
    IonicPageModule.forChild(MyBookPage),
  ],
})
export class MyBookPageModule {}
