import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BookInfoPage } from './book-info';

@NgModule({
  declarations: [
    BookInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(BookInfoPage),
  ],
})
export class BookInfoPageModule {}
