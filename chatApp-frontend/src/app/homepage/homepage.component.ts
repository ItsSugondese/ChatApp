import { Component, HostListener, OnInit } from '@angular/core';
import { HomepageServiceService } from './add-friend-service/homepage-service.service';
import { FormBuilder } from '@angular/forms';
import {jwtVariable, userData} from '../../app/interfaces';
import { HttpClient, HttpHeaders, HttpRequest, HttpXsrfTokenExtractor } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  userName: string | null | undefined = null;
  username: string = "Rohan";
  userSessionId !: string;

  // serverUrl = 'http://localhost:9192/server';
  // title = 'Chat App';
  // private stompClient = new Stomp.Client();
  userInfo !: userData;

  onlineUser !: userData[];

  checkoutForm = this.formBuilder.group({
    name: '',
    
  })


  forToken !: jwtVariable
  
  constructor(private hpService: HomepageServiceService,
    private formBuilder: FormBuilder,
    private httpClient : HttpClient,
    private cookieService : CookieService,
    private tokenExtractor : HttpXsrfTokenExtractor) {
      // this.initializeWebSocketConnection();
      console.log("username is " + this.userName);
      // setInterval(
      //   () => {
      //     if(this.userName){
          
      //       var currentValue : any;
      //       this.httpClient.post("http://localhost:9192/noOfUsers", this.userSessionId).subscribe(
      //         (val) => {
      //           currentValue = Number(val);  
      //       if(this.onlineUser.length != currentValue){
      //         this.gettingUsers();
      //       }
      //     }
      //       );
      //   }
      // }, 200
      // );
  }

 


  ngOnInit(): void {
    this.gettingUsers();
  }


  onSubmit(): void {
    
    this.userName = this.checkoutForm.value.name;


    this.hpService.postData(this.userName).subscribe(
      (result) => {
        console.log(result);
        this.userInfo = result as userData;
        this.userSessionId = this.userInfo.sessionId;
        this.userName = this.userInfo.name;

  

        
        this.hpService.getLastUser().subscribe(
          (result) => {
            this.onlineUser.push(result);
          }
        )
      }
    )




  }

  gettingUsers(){
    this.hpService.getData().subscribe(
      (result) => {
        this.onlineUser = result;
      }
    );
  }

  boom(){
    this.hpService.getLastUser().subscribe(
      (result) => {
        console.log(this.onlineUser.length)
       this.onlineUser.push(result);
       console.log(this.onlineUser.length)
      }
    )
  }

  fuck(){
          if(this.userName){
            
            var currentValue : any;
            this.httpClient.post("http://localhost:9192/noOfUsers", this.userSessionId).subscribe(
              (val) => {
                currentValue = Number(val); 
                console.log(val); 
            if(this.onlineUser.length != currentValue){
              this.gettingUsers();
            }
          }
            );
        }
      }
  
  
 
  // initializeWebSocketConnection(){
  //   let ws = new SockJS(this.serverUrl);
  //   this.stompClient = Stomp.over(ws);
  //   let that = this;
  //   this.stompClient.connect({}, function(frame){
  //     that.stompClient.subscribe("/topic/greetings", (message) => {
  //       if(message.body){
  //         document.getElementById('hi')!.innerHTML = message.body;
  //       }
  //     })
  //   })
  // }

    } 






















  //   userName: string | null | undefined = null;
  // userSessionId !: string;

  // serverUrl = 'http://localhost:9192/server';
  // title = 'Chat App';
  // private stompClient = new Stomp.Client();
  // userInfo !: userData;

  // onlineUser !: userData[];

  // checkoutForm = this.formBuilder.group({
  //   name: '',
    
  // })


  // forToken !: jwtVariable
  
  // constructor(private hpService: HomepageServiceService,
  //   private formBuilder: FormBuilder,
  //   private httpClient : HttpClient,
  //   private cookieService : CookieService,
  //   private tokenExtractor : HttpXsrfTokenExtractor) {
  //     // this.initializeWebSocketConnection();
  //     console.log("username is " + this.userName);
      // setInterval(
      //   () => {
      //     if(this.userName){
          
      //       var currentValue : any;
      //       this.httpClient.post("http://localhost:9192/noOfUsers", this.userSessionId).subscribe(
      //         (val) => {
      //           currentValue = Number(val);  
      //       if(this.onlineUser.length != currentValue){
      //         this.gettingUsers();
      //       }
      //     }
      //       );
      //   }
      // }, 200
      // );
  // }

 


  // ngOnInit(): void {
    
  // }


  // onSubmit(): void {
    // this.gettingUsers();
    // this.userName = this.checkoutForm.value.name || null;


    // this.hpService.postData(this.userName).subscribe(
    //   (result) => {
    //     console.log(result);
    //     this.userInfo = result as userData;
    //     this.userSessionId = this.userInfo.sessionId;
    //     this.hpService.storingSession(this.userSessionId);
    //     this.userName = this.userInfo.name;
    //     this.cookieService.set('sessionId', this.userSessionId);

    //     this.hpService.generateToken(this.userSessionId).subscribe(
    //       (result) => {
    //         this.forToken = result as jwtVariable;
    //         console.log(result)
    //         this.hpService.storingToken( this.forToken.token);
    //       }
    //     )

        
        // this.hpService.getLastUser().subscribe(
        //   (result) => {
        //     this.onlineUser.push(result);
        //   }
        // )
  //     }
  //   )




  // }

  // gettingUsers(){
  //   this.hpService.getData().subscribe(
  //     (result) => {
  //       this.onlineUser = result;
  //     }
  //   );
  // }

  // boom(){
  //   this.hpService.getLastUser().subscribe(
  //     (result) => {
  //       console.log(this.onlineUser.length)
  //      this.onlineUser.push(result);
  //      console.log(this.onlineUser.length)
  //     }
  //   )
  // }

  // fuck(){
  //         if(this.userName){
            
  //           var currentValue : any;
  //           this.httpClient.post("http://localhost:9192/noOfUsers", this.userSessionId).subscribe(
  //             (val) => {
  //               currentValue = Number(val); 
  //               console.log(val); 
  //           if(this.onlineUser.length != currentValue){
  //             this.gettingUsers();
  //           }
  //         }
  //           );
  //       }
  //     }
  
  
 
  // initializeWebSocketConnection(){
  //   let ws = new SockJS(this.serverUrl);
  //   this.stompClient = Stomp.over(ws);
  //   let that = this;
  //   this.stompClient.connect({}, function(frame){
  //     that.stompClient.subscribe("/topic/greetings", (message) => {
  //       if(message.body){
  //         document.getElementById('hi')!.innerHTML = message.body;
  //       }
  //     })
  //   })
  // }



