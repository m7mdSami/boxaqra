import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ServicesProvider } from '../../providers/services/services';

@IonicPage()
@Component({
  selector: 'page-my-book',
  templateUrl: 'my-book.html',
})
export class MyBookPage {

  order_list:any[];
  offset:any = 0;
  HideLoadIcon = true;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private services: ServicesProvider,
              private loadingController:LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyBookPage');
    this.order_status();
  }

  order_status(){
    let loader = this.loadingController.create({
        content:"",
        duration: 10000
    });
    loader.present().then(() =>{      
      this.services.order_status(this.offset ).subscribe(status => {
        this.order_list = status;
        loader.dismiss();
      })
    });
  }

  doInfinite(infiniteScroll) {
      setTimeout(() => {
        this.offset += 1;
        this.services.order_status(this.offset ).subscribe(orders =>{
          if(orders.length){
            for (var i = 0; i < orders.length; i++) {
              this.order_list.push( orders[i] );
            }
          }else{
            this.HideLoadIcon = false;
          }
        });
        infiniteScroll.complete();
      }, 500);
  }

}
