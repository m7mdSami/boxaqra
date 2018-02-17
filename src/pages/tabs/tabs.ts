import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { MyProfilePage } from '../my-profile/my-profile';
import { MyCartPage } from '../my-cart/my-cart';
import { MyBookPage } from '../my-book/my-book';
import { MainPage } from '../main/main';
import { CategoriesPage } from '../categories/categories';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {

  showTab:boolean = false ;
  
  mainRoot = MainPage
  myBookRoot = MyBookPage
  categoriesRoot = CategoriesPage
  myCartRoot = MyCartPage
  myProfileRoot = MyProfilePage


  constructor(public navCtrl: NavController) {}

}
