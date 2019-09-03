import { Component, OnInit } from '@angular/core';
import { functionsGlobal } from './global/funciontsGlobal';
import { SwPush } from '@angular/service-worker'
import { PushNotificationService } from './global/services/push-notification.service';
const VAPID_PUBLIC = "BLDWt9_UlGh0QU5K564ew415aQVdDl7NhcY-EI2ZwvmTRhOMw8Yt2kSA_CRqkE5dczws2wqzC_ygtkTijlBb3Ag";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'bridge';

  constructor(swPush: SwPush, private pushService: PushNotificationService) {
    if (swPush.isEnabled) {
      swPush.requestSubscription({
        serverPublicKey: VAPID_PUBLIC,

      }).then(subscription => {
        console.log(subscription)
        this.pushService.sendSubscriptionToTheServer(subscription);
      }).catch(console.error)
    }
  }

}
