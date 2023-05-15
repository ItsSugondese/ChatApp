import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { userData } from 'src/app/interfaces';
import { RegisterService } from 'src/app/register/register-service/register.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private httpClient : HttpClient,
    private registerService : RegisterService) { }

    getUsers(user : string | null){
      return this.httpClient.get<userData[]>("http://localhost:9192/getFriends/" + user);
    }
    
}
