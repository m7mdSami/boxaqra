import { Component, ViewChild } from '@angular/core';
import {IonicPage, Nav, Platform, MenuController, AlertController, ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Push, PushObject, PushOptions} from '@ionic-native/push';
import { Badge } from '@ionic-native/badge';

import { SignInPage } from '../pages/sign-in/sign-in';
import { MyCartPage } from '../pages/my-cart/my-cart';
import { MyBookPage } from '../pages/my-book/my-book';
import { MainPage } from '../pages/main/main';
import { CategoriesPage } from '../pages/categories/categories';
import { BooksListPage } from '../pages/books-list/books-list';
import { MyProfilePage } from '../pages/my-profile/my-profile';

import { ServicesProvider } from '../providers/services/services';

/** multiple language **/
import { TranslateService } from '@ngx-translate/core';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  isLogin: boolean = false;
  languages: boolean = false;
  testRadioOpen: boolean;
  testRadioResult;
  UserName:any = this.services.UserName;
  UserEmail:any = this.services.UserEmail;

  loginPage:any = SignInPage;
  mainRoot:any = MainPage
  myBookRoot:any = MyBookPage
  categoriesRoot:any = CategoriesPage
  myCartRoot:any = MyCartPage
  ProfilePage:any = MyProfilePage

  constructor(public platform: Platform, 
              public statusBar: StatusBar, 
              public splashScreen: SplashScreen,
              public translate: TranslateService,
              private services: ServicesProvider,
              private events: Events,
              private menuCtrl: MenuController,
              public storage: Storage,
              public push: Push, 
              public alerCtrl: AlertController,
              private badge: Badge,
              public toastCtrl: ToastController) {

    this.initializeApp();

  }

  initializeApp() {
    this.translate.setDefaultLang('en');
    this.translate.use('en');

    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      //this.statusBar.styleDefault();
      this.statusBar.overlaysWebView(true);
      
      // set status bar to white
      this.statusBar.backgroundColorByHexString('#423f3e');

      setTimeout(() => {
        this.splashScreen.hide();
      },100)

      this.services.languages();
      
      this.GetInfo();
      this.IsLogin();

      this.events.subscribe('logout:changed', () => setTimeout(() => { this.IsLogin() }, 1500) );
      
      this.handleBtnBack();
    });
  }

  GetInfo(){
    this.storage.get('user_info').then(value => {
      if(value){
        this.UserName = JSON.parse(value).name;
        this.UserEmail = JSON.parse(value).email;
      }else{
        return false;
      }
    });
  }

  handleBtnBack(){

    var lastTimeBackPress = 0;
    var timePeriodToExit  = 2000;

    this.platform.registerBackButtonAction(() => {
        // get current active page
        let view = this.nav.getActive();
        if (view.component.name == "TabsPage") {
            //Double check to exit app
            if (new Date().getTime() - lastTimeBackPress < timePeriodToExit) {
                this.platform.exitApp(); //Exit from app
            } else {
                  const alert = this.alerCtrl.create({
                    message: 'Do you want to close the app?',
                    buttons: [{
                        text: 'Cancel',
                        role: 'cancel',
                        handler: () => {
                            console.log('Application exit prevented!');
                        }
                    },{
                        text: 'Close App',
                        handler: () => {
                            this.platform.exitApp(); // Close this application
                        }
                    }]
                });
                alert.present();
                lastTimeBackPress = new Date().getTime();
            }
        } else if ( view.component.name == "MyBookPage" || 
                    view.component.name == "CategoriesPage" || 
                    view.component.name == "MyCartPage" || 
                    view.component.name == "BooksListPage" ||
                    view.component.name == "MyProfilePage") {
          this.nav.setRoot(this.mainRoot);
        } else {
            // go to previous page
            this.nav.pop();
        }
    });

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

  onLoad(page: any) {
    this.nav.setRoot(page);
    this.menuCtrl.close();
  }

  Fav_page(){
    this.nav.push(BooksListPage, { KindPage: "fav_page" });
  }

  IsLogin(){
    this.services.isLoged().then(value => {
      if(value){
        this.isLogin = true;
      }else{
        this.isLogin = false;
      }
    })
  }

  onLogout() {
    this.storage.remove('user_info');
    this.nav.setRoot(MainPage);
    this.events.publish('logout:changed');
  }

}
