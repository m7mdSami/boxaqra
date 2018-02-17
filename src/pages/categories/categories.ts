import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { ServicesProvider } from '../../providers/services/services';
import { BooksListPage } from '../books-list/books-list';
import { SearchPage } from '../search/search';
import { Network } from '@ionic-native/network';
import { Subscription } from 'rxjs/Subscription';

@IonicPage()
@Component({
  selector: 'page-categories',
  templateUrl: 'categories.html',
})
export class CategoriesPage {

  categories:any[];
  connected: Subscription;
  disconnected: Subscription;
  
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private services: ServicesProvider,
              private loadingController:LoadingController,
              public network: Network,
              public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoriesPage');
    this.get_categories();
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
        duration: 3000
      }).present();
    }, error => console.error(error));
   
    this.disconnected = this.network.onDisconnect().subscribe(data => {
      console.log(data);
      this.toastCtrl.create({
        message: `تاكد من اتصالك بالانترنت`,
        duration: 3000
      }).present();
    }, error => console.error(error));
  }

  PageBookList(id, category_name){
    console.log(id);
    this.navCtrl.push(BooksListPage, { id: id, category_name: category_name , KindPage: 'bookIistPageCategory' });
  }

  get_categories(){
    let loader = this.loadingController.create({
        content:"",
        duration: 10000
    });
    loader.present().then(() =>{      
      this.services.get_categories().subscribe(categories => {
        this.categories = categories;
        loader.dismiss();
      })
    });
  }

  PageSearch(){
    this.navCtrl.push(SearchPage);
  }

}
