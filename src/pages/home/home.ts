import { Component } from '@angular/core';
import {AlertController, NavController} from "ionic-angular";
import {ChatPage} from "../chat/chat";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  username: string = '';

  constructor(private alertCtrl: AlertController, private navCtrl: NavController) {

  }

  loginUser() {
    if(/^[a-zA-Z0-9]+$/.test(this.username)) {
      this.navCtrl.push(ChatPage, {
        username: this.username
      })
    } else {
      this.showAlert('Error', 'Invalid Username')
    }
  }

  showAlert(title: string, message: string) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }

}
