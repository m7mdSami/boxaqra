import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { ServicesProvider } from '../../providers/services/services';
import { Subscription } from 'rxjs/Subscription';
import { Network } from '@ionic-native/network';

@IonicPage()
@Component({
  selector: 'page-book-info',
  templateUrl: 'book-info.html',
})
export class BookInfoPage {

  slides: any[];
  public options: any;
  Book_Info:any;
  stars:any;
  similar_books:any[];
  category_id:any;
  product_id:any;
  fav:boolean;
  card:boolean;
  currency:any;
  connected: Subscription;
  disconnected: Subscription;
  subscribtion = new Subscription;
  time:any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private services: ServicesProvider,
              public toastCtrl: ToastController,
              private loadingController:LoadingController,
              public network: Network) {

    this.options = {
      slidesPerView: 2
    }
    this.Book_Info = navParams.data.book_info;
    this.category_id = this.Book_Info.category_id;
    this.product_id = this.Book_Info.p_id;
    console.log(this.Book_Info);
    this.stars = Array(parseInt(this.Book_Info.rate)).map((x,i)=>i);
    // console.log(this.Book_Info);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BookInfoPage');
    this.get_similar_books();
    this.GetCurrency();
    this.services.isFavoriteBook(this.product_id).then(value => this.fav = value);
    this.services.isCardeBook(this.product_id).then(value => {this.card = value});
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

  get_similar_books(){
    let loader = this.loadingController.create({
        content:"",
        duration: 10000
    });
    loader.present().then(() =>{
      this.services.similar_books(this.category_id).subscribe(similar_books =>{
        this.similar_books = similar_books;
        loader.dismiss();
      });
    });
  }

  PageBookInfo(book_info){
    this.navCtrl.push(BookInfoPage , { book_info: book_info });
  }

  GetCurrency(){
    this.services.Get_Country().subscribe(data =>{
      this.currency = data.country_code;
    });
  }

  Add_favourite(){
    this.services.isLoged().then(value => {
      if(value){
        clearTimeout(this.time);
        this.subscribtion.unsubscribe;
        this.time = setTimeout(() => {
          this.subscribtion.add(     
            this.services.Add_favourite(this.product_id).subscribe(fav => {
              console.log(fav);
              if(fav.code == 0){
                this.fav = true;
                this.services.favoriteBook(this.product_id);
                let toast = this.toastCtrl.create({
                  message: 'تم اضافته الى قائمه المفضله',
                  duration: 3000
                });
                toast.present();
              }else{
                this.fav = false;
                this.services.unfavoriteBook(this.product_id);
                let toast = this.toastCtrl.create({
                  message: 'تم حذفه من قائمه المفضله',
                  duration: 3000
                });
                toast.present();
              }
            })
          );
        }, 800);
      }else{
        let toast = this.toastCtrl.create({
          message: 'رجاء قم بتسجيل الدخول',
          duration: 3000
        });
        toast.present();
      }
    })
  }

  Add_Card(){
    this.services.isLoged().then(value => {
      if(value){
        clearTimeout(this.time);
        this.subscribtion.unsubscribe;
        this.time = setTimeout(() => {
          this.subscribtion.add(
            this.services.Add_card(this.product_id).subscribe(card => {
              console.log(card);
              if(card.code == 0 || card.code == 2 ){
                this.card = true;
                this.services.CardBook(this.product_id);
                let toast = this.toastCtrl.create({
                  message: 'تم اضافه المنتج الى السله',
                  duration: 3000
                });
                toast.present();
              }else{
                this.card = false;
                this.services.removeCardBook(this.product_id);
                let toast = this.toastCtrl.create({
                  message: 'تم حذف المنتج من السله',
                  duration: 3000
                });
                toast.present();
              }
            })
          );
        }, 800);
      }else{
        let toast = this.toastCtrl.create({
          message: 'رجاء قم بتسجيل الدخول',
          duration: 3000
        });
        toast.present();
      }
    })
  }

}
