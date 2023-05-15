import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { userData } from 'src/app/interfaces';

@Injectable({
  providedIn: 'root'
})
export class HomepageServiceService {

  url : string  = ""
  hi : String = "Hi";
  
  constructor(private httpClient : HttpClient) {
    
   }


  postData(name : string | null | undefined){
    return this.httpClient.post("http://localhost:9192/addUser", name);
  }

  getData(){
    return this.httpClient.get<userData[]>("http://localhost:9192/getUsers");
  }

  getLastUser(){
    return this.httpClient.get<userData>("http://localhost:9192/recentUser");
  }

  // generateToken(session : string | null | undefined){
  //   return this.httpClient.post("http://localhost:9192/token-generator", session);
  // }

  // storingToken(token: string){
  //    localStorage.setItem('token', token);
  // }

  // getToken(){
  //   return localStorage.getItem('token');
  // }

  // storingSession(session : string){
  //   localStorage.setItem('session', session)
  // }

  // getSession(){
  //   return localStorage.getItem('session')
  // }

}


