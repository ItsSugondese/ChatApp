import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { senderReceiver, userData } from 'src/app/interfaces';

@Injectable({
  providedIn: 'root'
})
export class FriendService {

  constructor(private httpClient : HttpClient) { }

  getFriends(user : string | null){
    return this.httpClient.get<userData[]>("http://localhost:9192/getFriends/" + user);
  }

  removeFriend(sentUser: senderReceiver){
    return this.httpClient.post<boolean>("http://localhost:9192/removeFriend", sentUser);
  }
}
