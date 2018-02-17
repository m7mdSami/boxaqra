import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController , ToastController } from 'ionic-angular';
import { ServicesProvider } from '../../providers/services/services';

@IonicPage()
@Component({
  selector: 'page-my-profile',
  templateUrl: 'my-profile.html',
})
export class MyProfilePage {

  testRadioOpen: boolean;
  testRadioResult;
  language:any;
  currency:any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public alerCtrl: AlertController,
              private services: ServicesProvider,
              public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyProfilePage');
  }

  change_Currency(){
    this.services.currency(this.currency).subscribe(currency => {
      if(currency.code == 0){
        let toast = this.toastCtrl.create({
          message: 'تم تغير العمله ',
          duration: 3000
        });
        toast.present();
        this.services.storage.set('currency', this.currency);
      }
    })
  }

  change_language(){
    console.log(223);
  }

  doRadio() {
    let alert = this.alerCtrl.create();
    alert.setTitle('Choose Language');

    alert.addInput({
      type: 'radio',
      label: 'English',
      value: '1',
      checked: true
    });

    alert.addInput({
      type: 'radio',
      label: 'عربى',
      value: '2'
    });

    alert.addButton('Cancel');
    alert.addButton({
      text: 'Ok',
      handler: data => {
        console.log('Radio data:', data);
        this.testRadioOpen = false;
        this.testRadioResult = data;
      }
    });

    alert.present().then(() => {
      this.testRadioOpen = true;
    });
  }

}
