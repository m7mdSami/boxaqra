import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { ServicesProvider } from '../../providers/services/services';
import { SignInPage } from '../sign-in/sign-in';

@IonicPage()
@Component({
  selector: 'page-forget-password',
  templateUrl: 'forget-password.html',
})
export class ForgetPasswordPage {

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public alertCtrl: AlertController,
              private services: ServicesProvider,
              public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgetPasswordPage');
  }

  onSubmitResetPass(form: NgForm){
    let email = form.value.email;
    this.services.forgetPassword(email).subscribe(email => {
      console.log(email);
      if(email.code == 0){
        this.sendCode();
      }else{
        let toast = this.toastCtrl.create({
          message: 'الايميل غير صحيح !!',
          duration: 3000
        });
        toast.present();
        // console.log('الايميل غير صحيح');
      }
    })
  }

  sendCode(){
      let prompt = this.alertCtrl.create({
      title: 'Reset Password',
      message: "Please enter your code to send on your email",
      inputs: [
        {
          name: 'code',
          type: 'text',
          placeholder: 'Enter Code'
        },
        {
          name: 'Password',
          type: 'number',
          placeholder: 'Enter New Password'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            console.log(data);
            let Data = {
              code : data.code,
              pass: data.Password
            }
            console.log(Data);
            this.services.resetPassword(Data).subscribe(code => {
              console.log(code);
              if(Data.code == "" && Data.pass == ""){
                let toast = this.toastCtrl.create({
                  message: 'رجاء ادخل البيانات !!',
                  duration: 3000
                });
                toast.present();
              }else{
                if(code.code == 0){
                  let toast = this.toastCtrl.create({
                    message: 'تم تغيير الباسوورد',
                    duration: 3000
                  });
                  toast.present();
                  this.navCtrl.push(SignInPage);
                }else{
                  let toast = this.toastCtrl.create({
                    message: 'تاكد من صحة البيانات !!',
                    duration: 3000
                  });
                  toast.present();
                }
              }
            })
          }
        }
      ]
    });
    prompt.present();
  }

}
