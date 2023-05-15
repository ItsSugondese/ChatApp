import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { senderReceiver, userData } from 'src/app/interfaces';
import { RegisterService } from 'src/app/register/register-service/register.service';

@Injectable({
  providedIn: 'root'
})
export class FindFriendService {

 
  

  constructor(private httpClient : HttpClient,
    private registerService : RegisterService) { }


 

  getUsers(user : string | null){
    return this.httpClient.post<userData[]>("http://localhost:9192/canAddUser", user);
  }

  sendRequest(sentUser: senderReceiver){
    return this.httpClient.post<boolean>("http://localhost:9192/addRequest", sentUser);
  }

  removeRequest(sentUser : senderReceiver){
    return this.httpClient.post<boolean>("http://localhost:9192/removeRequest", sentUser);
  }
}
