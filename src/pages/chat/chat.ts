import {Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {Content, IonicPage, NavParams} from 'ionic-angular';
import {AngularFirestore, AngularFirestoreCollection} from "angularfire2/firestore";
import {Observable} from "rxjs/Observable";

/**
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage implements OnInit, AfterViewInit {
  username: string = '';
  sendingMessage: string = '';
  chatCollection: AngularFirestoreCollection<any>;
  chat: Observable<any>;
  messages: object[] = [];
  @ViewChild(Content) content: Content;

  constructor(private db: AngularFirestore, private navParams: NavParams) {
  }

  ngOnInit() {
    this.username = this.navParams.get('username');
    this.chatCollection = this.db.collection('chat', ref => {
      return ref.orderBy('sendedTime');
    });
    this.chat = this.chatCollection.valueChanges();
    this.chat.subscribe(res => {
      this.messages = res;
      setTimeout(() => {
        this.content.scrollToBottom();
      });
    });
  }

  ngAfterViewInit() {
  }

  sendMessage() {
    this.db.collection('chat').add({
      username: this.username,
      message: this.sendingMessage,
      sendedTime: Date.now()
    }).then(() => {

    }).catch(() => {
      // some
    });
    this.sendingMessage = '';
  }

  ionViewDidLoad() {
    this.db.collection('chat').add({
      specialMessage: true,
      message: `${this.username} has joined the room`,
      sendedTime: Date.now()
    });
  }

  ionViewWillLeave() {
    this.db.collection('chat').add({
      specialMessage: true,
      message: `${this.username} has left the room`,
      sendingTime: Date.now()
    });
  }
}
