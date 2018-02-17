import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { ServicesProvider } from '../../providers/services/services';

import { BookInfoPage } from '../book-info/book-info';
import { SearchPage } from '../search/search';
import { BooksListPage } from '../books-list/books-list';
// import { map } from 'rxjs/operator/map';
import { Network } from '@ionic-native/network';
import { Subscription } from 'rxjs/Subscription';

@IonicPage()
@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
})
export class MainPage {

  categories: any[];
  public options: any;
  currency:any;
  stars:any[]= [];
  AllStars:any[]= [];
  length:any[] = [];
  map:any;
  connected: Subscription;
  disconnected: Subscription;
  

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private services: ServicesProvider,
              private loadingController:LoadingController,
              public network: Network,
              public toastCtrl: ToastController) {

    this.options = {
      slidesPerView: 2
    }
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad MainPage');
    this.GetCategories();
  }

  ionViewDidEnter() {
    this.checkInternet();
  }

  ionViewWillLeave(){
    this.connected.unsubscribe();
    this.disconnected.unsubscribe();
  }

  checkInternet(){
    this.connected = this.network.onConnect().subscribe(data => {
      console.log(data);
      this.toastCtrl.create({
        message: `تم الاتصال بالانترنت`,
        showCloseButton: true,
        closeButtonText: 'Ok'
      }).present();
    }, error => console.error(error));
   
    this.disconnected = this.network.onDisconnect().subscribe(data => {
      console.log(data);
      this.toastCtrl.create({
        message: `تاكد من اتصالك بالانترنت`,
        showCloseButton: true,
        closeButtonText: 'Ok'
      }).present();
    }, error => console.error(error));
  }

  PageBookInfo(book_info){
    this.navCtrl.push(BookInfoPage , { book_info: book_info });
  }
  
  PageSearch(){
    this.navCtrl.push(SearchPage);
  }

  GetCurrency(){
    this.services.Get_Country().subscribe(data =>{
      this.currency = data.country_code;
    });
  }

  GetCategories(){
    let loader = this.loadingController.create({
        content:"",
        duration: 10000
    });
    loader.present().then(() =>{
      this.services.Get_category().subscribe(categories => {
        this.categories = categories;
        this.GetCurrency();
        console.log(this.categories);
        this.map = new Map();
        for (let category of this.categories){
          if(category.is_adv == false){
            for(let rate of category.product){
              this.map.set(rate.p_id , Array(parseInt(rate.rate)).map((x,i)=>i));
            }
          }
        }
        loader.dismiss();
      });
    });
  }

  Go_Category(id, category_name){
    this.navCtrl.push(BooksListPage, { id: id, category_name: category_name });
  }

}
