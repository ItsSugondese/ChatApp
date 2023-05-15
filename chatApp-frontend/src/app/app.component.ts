import { HttpClient } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { RegisterService } from './register/register-service/register.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private httpClient : HttpClient,
    private rs : RegisterService){

  }

  // @HostListener('window:unload', ['$event'])
  // unloadHandler(event: Event) {
  //   this.httpClient.get("http://localhost:9192/check").subscribe(
  //     (result) => {
  //       console.log(result)
  //     }
  //   );
  // }

  // @HostListener('window:beforeunload', ['$event'])
  //   unloadHandler(event : Event) {
  //          this.rs.removeSession();

  //       return true;
  //   }

    // @HostListener('window:unload', ['$event'])
    // onUnload(event : Event) {
    //   console.log("before");
    //   alert("sure?")
    //     // alert('leave?');        

    //     return false;
    // }

    
 
 
  title = 'chatApp using websocket';
 
 
}

