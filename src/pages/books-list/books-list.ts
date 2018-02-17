import { Component, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ToastController } from 'ionic-angular';
import { ServicesProvider } from '../../providers/services/services';
import { BookInfoPage } from '../book-info/book-info';
import { Subscription } from 'rxjs/Subscription';
import { Network } from '@ionic-native/network';

@IonicPage()
@Component({
  selector: 'page-books-list',
  templateUrl: 'books-list.html',
})
export class BooksListPage {

  id: any;
  books:any[] = [];
  catergory_name:string;
  scrollContent:any = 800;
  offset:any = 0;
  scrollTop;
  HideLoadIcon = true;
  KindPage:number;
  OpenSearch:boolean = false;
  search_key:string = '';
  time:any;
  shouldShowCancel:boolean = false;
  subscribtion = new Subscription;
  currency:any;
  stars:any[]= [];
  AllStars:any[]= [];
  connected: Subscription;
  disconnected: Subscription;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private services: ServicesProvider,
              public element: ElementRef,
              platform: Platform,
              public network: Network,
              public toastCtrl: ToastController) {

    if(navParams.data.KindPage == 'fav_page'){
      this.catergory_name = "Favorite Books";
      this.KindPage = 0;
    }else if(navParams.data.KindPage == 'bookIistPageCategory'){
      this.id = navParams.data.id;
      this.catergory_name = navParams.data.category_name;
      this.KindPage = 1
    }else{
      this.id = navParams.data.id;
      this.catergory_name = navParams.data.category_name;
      this.KindPage = 2;
    }

  }

  doInfinite(infiniteScroll) {
    // console.log('Begin async operation');

    // return new Promise((resolve) => {
      setTimeout(() => {
        this.offset += 1;
        this.services.Get_category_books(this.id, this.offset, this.search_key ).subscribe(books =>{
          let boo = books;
          
          if(boo.length){
            for (var i = 0; i < boo.length; i++) {
              this.books.push( boo[i] );
            }
          }else{
            this.HideLoadIcon = false;
          }
        });
        // console.log('Async operation has ended');
        // resolve();
        infiniteScroll.complete();
      }, 500);
    // })
  }

  GetCurrency(){
    this.services.Get_Country().subscribe(data =>{
      this.currency = data.country_code;
    });
  }

  ionViewWillEnter() {
    this.get_books();
    this.GetCurrency();
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

  get_books(){
    if(this.KindPage == 0){
      this.services.Get_favouriteBooks().subscribe(books =>{
        this.books = books;
        this.rated();
      });
    }else if(this.KindPage == 1){
      clearTimeout(this.time);
      this.subscribtion.unsubscribe;
      this.time = setTimeout(() => {
        this.subscribtion.add(
            this.services.Get_category_books(this.id, this.offset, this.search_key).subscribe(books =>{
              console.log(books);
            this.books = books;
            this.rated();
          })
        );
      }, 800);
    }else{
      clearTimeout(this.time);
      this.subscribtion.unsubscribe;
      this.time = setTimeout(() => {
        this.subscribtion.add(
            this.services.Get_category_books2(this.id, this.offset, this.search_key).subscribe(books =>{
              console.log(books);
            this.books = books;
            this.rated();
          })
        );
      }, 800);
    }
  }

  rated(){
    for(let book of this.books ){
      this.stars = Array(parseInt(book.rate)).map((x,i)=>i);
      this.AllStars.push(this.stars);
    }
  }

  SearchBooks(){
    this.offset = 0;
    this.get_books();
  }

  PageBookInfo(book_info){
    this.navCtrl.push(BookInfoPage , { book_info: book_info });
  }

  PageSearch(){
    this.search_key = '';
    this.OpenSearch = !this.OpenSearch;
    if(!this.OpenSearch ){
      this.get_books();
    }
  }

}
