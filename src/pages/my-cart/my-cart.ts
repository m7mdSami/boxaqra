import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ToastController, LoadingController } from 'ionic-angular';
import { ServicesProvider } from '../../providers/services/services';
import { SubmitOrderPage } from '../submit-order/submit-order';
import { Network } from '@ionic-native/network';
import { Subscription } from 'rxjs/Subscription';

@IonicPage()
@Component({
  selector: 'page-my-cart',
  templateUrl: 'my-cart.html',
})
export class MyCartPage {

  cardBooks:any[];
  num:number[] = [];
  product_id:any;
  countries:any[];
  country:any;
  CountyName:any;
  BooksID:any[] =[];
  whatsapp:any;
  connected: Subscription;
  disconnected: Subscription;
  subscribtion = new Subscription;
  time:any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private services: ServicesProvider,
              public modalCtrl: ModalController,
              public toastCtrl: ToastController,
              private loadingController:LoadingController,
              public network: Network) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyCartPage');
    this.GetCardBooks();
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

  GetCardBooks(){
    let loader = this.loadingController.create({
        content:"",
        duration: 10000
    });
    loader.present().then(() =>{
      this.services.Get_cardBooks().subscribe(cardBooks => {
        if(cardBooks.length == 0){
          console.log(0);
        }else{
          this.GetCountry();
          this.GetCountryName();
          console.log(2);
        }
        this.cardBooks = cardBooks;
        for (let book of this.cardBooks){
          this.num.push(parseInt(book.cart_quantity));
          this.BooksID.push(parseInt(book.p_id));
        }
        loader.dismiss();
      });
    });

  }

  GetCountry(){
    this.services.Get_Countrylist().subscribe(country => {
      console.log(country);
      this.countries = country;
      // console.log(this.countries);
    })
  }

  GetCountryName(){
    this.services.Get_Country().subscribe(data =>{
      this.CountyName = data.country_name;
    });
  }

  increase(i , P_id){
    clearTimeout(this.time);
    this.subscribtion.unsubscribe;
    this.time = setTimeout(() => {
      this.num[i] += 1 ;
      this.subscribtion.add(     
        this.services.Add_card(P_id , this.num[i]).subscribe(card => {})
      );
    }, 800);
  }

  decrease(i , P_id){
    if(this.num[i] == 1){
      return false;
    }else{
      clearTimeout(this.time);
      this.subscribtion.unsubscribe;
      this.time = setTimeout(() => {
        this.num[i] -= 1 ;
        this.subscribtion.add(     
          this.services.Add_card(P_id , this.num[i]).subscribe(card => {})
        );
      }, 800);
    }
  }

  deleted_book(P_id){
    clearTimeout(this.time);
    this.subscribtion.unsubscribe;
    this.time = setTimeout(() => {
      this.subscribtion.add(     
        
        this.services.Add_card(P_id).subscribe(card => {
          if(card.code == 0 || card.code == 2 ){
            this.services.CardBook(P_id)
          }else{
            this.services.removeCardBook(P_id)
          }
          this.GetCardBooks();
        })
      );
    }, 800);
  }

  order(){
    if(this.country == undefined){
      let toast = this.toastCtrl.create({
        message: 'برجاء قم باختيار الدوله',
        duration: 3000
      });
      toast.present();
    }else if(this.whatsapp == undefined || this.whatsapp == ''){
      let toast = this.toastCtrl.create({
        message: 'برجاء قم بادخال رقم الواتس ',
        duration: 3000
      });
      toast.present();
    }
    else{
      clearTimeout(this.time);
      this.subscribtion.unsubscribe;
      this.time = setTimeout(() => {
        this.subscribtion.add(    
          
          this.services.check_order(this.country, this.whatsapp).subscribe(
            order => {
              console.log(order);
              if(order.code == 0){
                let modal = this.modalCtrl.create(SubmitOrderPage, { OrderInfo: order , country: this.country, BookId: this.BooksID });
                modal.present();
              }else{
                let toast = this.toastCtrl.create({
                  message: 'ناسف , الشحن غير متوفر لتلك الدوله',
                  duration: 3000
                });
                toast.present();
              }
            },
            error => {
              let toast = this.toastCtrl.create({
                message: 'ناسف , الشحن غير متوفر لتلك الدوله',
                duration: 3000
              });
              toast.present();
            }
          )
        );
      }, 800);
    }
  }

}
