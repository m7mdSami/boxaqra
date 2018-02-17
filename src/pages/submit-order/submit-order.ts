import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, App } from 'ionic-angular';
import { ServicesProvider } from '../../providers/services/services';
import { MyBookPage } from '../my-book/my-book';
import { MyCartPage } from '../my-cart/my-cart';

@IonicPage()
@Component({
  selector: 'page-submit-order',
  templateUrl: 'submit-order.html',
})
export class SubmitOrderPage {

  info_order:any;
  country:any;
  BookID:any[];

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public viewCtrl: ViewController,
              private services: ServicesProvider,
              public app: App) {

    this.info_order = navParams.data.OrderInfo;
    this.country = navParams.data.country;
    this.BookID = navParams.data.BookId;
    console.log(this.BookID);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SubmitOrderPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  submit_order(){
    this.services.submit_order(this.country).subscribe(order => {
      console.log(order);
      if(order.code == 0){
        for(let ID of this.BookID){
          console.log(ID);
          this.services.removeCardBook(ID);
        }
        this.dismiss();
        this.app.getRootNav().setRoot( MyBookPage );
      }else{
        this.navCtrl.push(MyCartPage);        
      }
    })
  }

  cancel_order(){
    this.dismiss();
  }

}
