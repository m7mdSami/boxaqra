import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Subscription } from 'rxjs/Subscription';
import { ServicesProvider } from '../../providers/services/services';
import { BookInfoPage } from '../book-info/book-info';

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

  id: any;
  books:any[] = [];
  offset:any = 0;
  search_key:string = '';
  time:any;
  HideLoadIcon = true;
  subscribtion = new Subscription;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private services: ServicesProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }

  doInfinite(infiniteScroll) {
    // console.log('Begin async operation');

    // return new Promise((resolve) => {
      setTimeout(() => {
        this.offset += 1;
        this.services.search_books( this.offset, this.search_key ).subscribe(books =>{
          let boo = books;
          
          if(boo.length){
            for (var i = 0; i < boo.length; i++) {
              this.books.push( boo[i] );
            }
          }else{
            this.HideLoadIcon = false;
          }
        });
        // console.log('Async operation has ended');
        // resolve();
        infiniteScroll.complete();
      }, 500);
    // })
  }

  get_books(){
    clearTimeout(this.time);
    this.subscribtion.unsubscribe;
    this.time = setTimeout(() => {
      this.subscribtion.add(
          this.services.search_books(this.offset, this.search_key).subscribe(books =>{
          this.books = books;
        })
      );
    }, 800);
  }

  SearchBooks(){
    this.offset = 0;
    this.get_books();
  }

  PageBookInfo(book_info){
    this.navCtrl.push(BookInfoPage , { book_info: book_info });
  }

}
