import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private httpClient : HttpClient) { 

  }

  postData(name : string | null | undefined){
    return this.httpClient.post("http://localhost:9192/addUser", name);
  }

    storingSession(session : string){
    localStorage.setItem('session', session)
  }

  getSession(){
    return localStorage.getItem('session')
  }

  removeSession(){
    return localStorage.removeItem('session')
  }
}
