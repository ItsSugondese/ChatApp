import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { senderReceiver, userData } from 'src/app/interfaces';
import { RegisterService } from 'src/app/register/register-service/register.service';

@Injectable({
  providedIn: 'root'
})
export class AddFriendService {

 
  constructor(private httpClient : HttpClient,
    private registerService : RegisterService) { }

    getUsers(user : string | null){
      return this.httpClient.get<userData[]>("http://localhost:9192/whoSend/" + user);
    }

    addFriend(sentUser: senderReceiver){
      return this.httpClient.post<boolean>("http://localhost:9192/becomeFriend", sentUser);
    }

    removeFriend(sentUser: senderReceiver){
      return this.httpClient.post<boolean>("http://localhost:9192/removeFriend", sentUser);
    }

    removeRequest(sentUser : senderReceiver){
      return this.httpClient.post<boolean>("http://localhost:9192/removeRequest", sentUser);
    }

  
  
}
