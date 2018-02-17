import { Component, ViewChild, ElementRef } from '@angular/core';
import { 
  IonicPage, 
  NavController, 
  NavParams, 
  MenuController, 
  ToastController,
  AlertController,
  LoadingController
} from 'ionic-angular';

import { NgForm } from '@angular/forms';
import { Events } from 'ionic-angular';
import { ServicesProvider } from '../../providers/services/services';


@IonicPage()
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {
  @ViewChild('countr') countr: ElementRef;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public menuCtrl: MenuController,
              public toastCtrl: ToastController,
              private alertCtrl: AlertController,
              private loadingCtrl: LoadingController,
              private events: Events,
              private services: ServicesProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignUpPage');
  }

  changeLang(){
    this.services.changeLang();
  }
  onSubmit(form: NgForm){
    
  }

}
