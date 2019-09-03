import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
const urlController = 'http://localhost:3000/subscription'

@Injectable({ providedIn: 'root' })
export class PushNotificationService {
  constructor(
    private http: HttpClient) {
  }
  public sendSubscriptionToTheServer(subscription: PushSubscription) {
    return this.http.post(urlController, subscription)
  }
}
