import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { SignUpPage } from '../pages/sign-up/sign-up';
import { SignInPage } from '../pages/sign-in/sign-in';
import { ForgetPasswordPage } from '../pages/forget-password/forget-password';
import { MyProfilePage } from '../pages/my-profile/my-profile';
import { MyCartPage } from '../pages/my-cart/my-cart';
import { MyBookPage } from '../pages/my-book/my-book';
import { MainPage } from '../pages/main/main';
import { CategoriesPage } from '../pages/categories/categories';
import { TabsPage } from '../pages/tabs/tabs';
import { SearchPage } from '../pages/search/search';
import { BooksListPage } from '../pages/books-list/books-list';
import { BookInfoPage } from '../pages/book-info/book-info';
import { SubmitOrderPage } from '../pages/submit-order/submit-order';

import { HideHeaderDirective } from '../directives/hide-header/hide-header';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Camera } from '@ionic-native/camera';
import { ImagePicker } from '@ionic-native/image-picker';
import { File } from '@ionic-native/file';
import { Push } from '@ionic-native/push';
import { Badge } from '@ionic-native/badge';
import { KSSwiperModule } from 'angular2-swiper';
import { Network } from '@ionic-native/network';
/** multiple language **/
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpModule, Http } from '@angular/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
export function createTranslateLoader(http: Http) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

import { ServicesProvider } from '../providers/services/services';

/* Storage */
import { IonicStorageModule } from '@ionic/storage';

@NgModule({
  declarations: [
    MyApp,
    SignUpPage,
    SignInPage,
    ForgetPasswordPage,
    MyProfilePage,
    MyCartPage,
    MyBookPage,
    MainPage,
    TabsPage,
    CategoriesPage,
    BookInfoPage,
    BooksListPage,
    SearchPage,
    SubmitOrderPage,
    HideHeaderDirective
  ],
  imports: [
    BrowserModule,
    HttpModule,
    KSSwiperModule,
    IonicModule.forRoot(MyApp,{tabsPlacement: 'bottom'}),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [Http]
      }
    }),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SignUpPage,
    SignInPage,
    ForgetPasswordPage,
    MyProfilePage,
    MyCartPage,
    MyBookPage,
    MainPage,
    TabsPage,
    BookInfoPage,
    BooksListPage,
    SearchPage,
    SubmitOrderPage,
    CategoriesPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ServicesProvider,
    ImagePicker,
    Camera,
    File,
    Push,
    Badge,
    Network
  ]
})
export class AppModule {}
