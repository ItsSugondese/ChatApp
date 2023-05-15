import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { userData } from 'src/app/interfaces';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  constructor(private httpClient : HttpClient) { }

  getSelfUser(sessionId : string | null){
    return this.httpClient.get<userData>("http://localhost:9192/user/" + sessionId );
  }

  getNoOfRequests(sessionId : string | null){
    return this.httpClient.get<Number>("http://localhost:9192/getNumberOfRequests/" + sessionId );
  }

  getNoOfFriends(sessionId : string | null){
    return this.httpClient.get<Number>("http://localhost:9192/getNumberOfFriends/" + sessionId );
  }
}
