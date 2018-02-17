import { Component } from '@angular/core';
import {  
  IonicPage, 
  NavController, 
  NavParams, 
  ToastController, 
  MenuController,
  Events,
  AlertController,
  App,
  LoadingController
} from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { MainPage } from '../main/main';
import { ForgetPasswordPage } from '../forget-password/forget-password';
import { ServicesProvider } from '../../providers/services/services';


@IonicPage()
@Component({
  selector: 'page-sign-in',
  templateUrl: 'sign-in.html',
})
export class SignInPage {

  lang:any ;
  loginForm:boolean = true;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public menuCtrl: MenuController,
              public toastCtrl: ToastController,
              private events: Events,
              private services: ServicesProvider,
              public storage: Storage,
              public alertCtrl: AlertController,
              public app: App,
              private loadingController:LoadingController) {

  }

  ionViewWillEnter() {

  }

  onSubmitLogin(form: NgForm){
    let data ={
      email: form.value.email,
      password: form.value.password
    }
    let loader = this.loadingController.create({
        content:"",
        duration: 10000
    });
    loader.present().then(() =>{
      this.services.login(data).subscribe(login => {
        console.log(login);
        if(login.code == 0){
          this.services.loged(login.data);
          if (this.storage.get('user_info') !== null) {
            this.goHome();
            this.events.publish('logout:changed');
            
          }
          // this.services.isLoged().then(value => {
          //   if(value){
          //     this.goHome();
          //     this.events.publish('logout:changed');
          //     loader.dismiss();
          //   }else{
          //     return false;
          //   }
          // })
        }else{
          let toast = this.toastCtrl.create({
            message: 'تاكد من صحه البيانات !!',
            duration: 3000
          });
          toast.present();
        }
        loader.dismiss();
      })
    });
  }

  onSubmitRegister(form: NgForm){
    let data ={
      email: form.value.email,
      password: form.value.password,
      phone: form.value.phone,
      address : form.value.address,
      name: form.value.name
    }
    let loader = this.loadingController.create({
        content:"",
        duration: 10000
    });
    loader.present().then(() =>{
      this.services.resigter(data).subscribe(resigter => {
        console.log(resigter);
        if(resigter.code == 0){
          let toast = this.toastCtrl.create({
            message: 'تم التسجيل بنجاح , قم بتسجيل الدخول الان',
            duration: 3000
          });
          toast.present();
          this.goSignUpPage();
          
        }else {
          let toast = this.toastCtrl.create({
            message: 'هذه البيانات تم التسجيل بها مسبقاً',
            duration: 3000
          });
          toast.present();
        }
        loader.dismiss();
      })
    });
  }

  goSignUpPage(){
    this.loginForm = !this.loginForm
  }

  goHome(){
    // this.nav.setRoot(MainPage);
    this.app.getRootNav().setRoot( MainPage );
  }

  goForgetPasswordPage(){
    this.navCtrl.push(ForgetPasswordPage);
    // let prompt = this.alertCtrl.create({
    //   title: 'Forget Password',
    //   message: "Please enter your email address and we'll send you an email to reset your Password",
    //   inputs: [
    //     {
    //       name: 'email',
    //       type: 'email',
    //       placeholder: 'Your Email'
    //     },
    //   ],
    //   buttons: [
    //     {
    //       text: 'Cancel',
    //       handler: data => {
    //         console.log('Cancel clicked');
    //       }
    //     },
    //     {
    //       text: 'Save',
    //       handler: data => {
    //         console.log('Saved clicked');
    //       }
    //     }
    //   ]
    // });
    // prompt.present();
  }


}
