import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { message, userData } from 'src/app/interfaces';
import { RegisterService } from 'src/app/register/register-service/register.service';
import { RequestNotifierService } from 'src/app/socket-service/request-notifier/request-notifier.service';
import { Subscription } from 'rxjs';
import { ChatService } from '../chat-service/chat.service';

@Component({
  selector: 'app-chatting',
  templateUrl: './chatting.component.html',
  styleUrls: ['./chatting.component.scss']
})
export class ChattingComponent implements OnInit, OnDestroy, AfterViewInit {

  @Input() userData !: userData;

  @Output() parentFunction : EventEmitter<boolean> = new EventEmitter();

  messages: message[] = []

  messageMapping : Map<string, message[]> = new Map();
 

  messageSubscription !: Subscription

  messageNotificationSubscription !: Subscription

  messageTypingSubscription !: Subscription

  userId !: string | null;

  isTyping : Map<string, boolean> = new Map();

  constructor(private router: ActivatedRoute,
    private socket: RequestNotifierService,
    private rs: RegisterService,
    private cs : ChatService) {

    this.userId = rs.getSession();

    
    
  }
  ngAfterViewInit(): void {
   

    this.socket.sendingMessage(this.userId, this.userData.sessionId, '');
    this.socket.sendingMessageNotification(this.userId, this.userData.sessionId, "");

    this.messageSubscription = this.socket.messages.subscribe(
      
      (result) => {
        console.log("I'm here hai ta")
        if (result.from === this.userData.sessionId || result.to === this.userData.sessionId) {

          const addMessages = this.messageMapping.get(this.userData.sessionId) || [];
          if(result.content){
          addMessages.push(result);
          }
          this.messageMapping.set(this.userData.sessionId, (addMessages.length>4)? addMessages.splice(1,addMessages.length-1) : addMessages);
      
    
        }else{
          
          const getUser = (result.from===this.rs.getSession())? result.to || "" : result.from || "";
          if(!this.messageMapping.has(getUser)){
            this.messageMapping.set(getUser, []);
          }
          const addMessages = this.messageMapping.get(getUser) || [];
          if(result.content){
            addMessages.push(result);
            }
          
          this.messageMapping.set(getUser, (addMessages.length>4)? addMessages.splice(addMessages.length,addMessages.length-1) : addMessages);
        }
        console.log("message size is " + this.messages.length)
      }
      
    )

    this.messageNotificationSubscription = this.socket.messageNotification.subscribe(
      (result) => {
        this.parentFunction.emit(result)
      }
    );
  }

  ngOnInit(): void {
   


  

    
  }

  id: Number = 0;

  sendValue(val: string) {
    if(val.trim() === ''){
      return;
    }
    this.socket.sendingMessage(this.userId, this.userData.sessionId, val);
    this.socket.sendingMessageNotification(this.userId, this.userData.sessionId, "");
    

    if(this.messageSubscription){
      this.messageSubscription.unsubscribe()
    }

    this.messageSubscription = this.socket.messages.subscribe(
      
      (result) => {
        console.log("I'm here hai ta")
        if (result.from === this.userData.sessionId || result.to === this.userData.sessionId) {

          const addMessages = this.messageMapping.get(this.userData.sessionId) || [];
          addMessages.push(result);
          
          this.messageMapping.set(this.userData.sessionId, (addMessages.length>4)? addMessages.splice(1,addMessages.length-1) : addMessages);
      
    
        }else{
          
          const getUser = (result.from===this.rs.getSession())? result.to || "" : result.from || "";
          if(!this.messageMapping.has(getUser)){
            this.messageMapping.set(getUser, []);
          }
          const addMessages = this.messageMapping.get(getUser) || [];
          addMessages.push(result);
          
          this.messageMapping.set(getUser, (addMessages.length>4)? addMessages.splice(addMessages.length,addMessages.length-1) : addMessages);
        }
        console.log("message size is " + this.messages.length)
      }
      
    )



    this.messageNotificationSubscription = this.socket.messageNotification.subscribe(
      (result) => {
        this.parentFunction.emit(result)
      }
    );

    (document.getElementById('input-field') as HTMLInputElement).value = '';
    this.socket.removingTypingNotification(this.userId, this.userData.sessionId, "");
  
  }



  onInput(event: Event) {
    this.messageTypingSubscription = this.socket.messageTyping.subscribe(
      (result) => {
        const bro = {
          userId : result.userId,
          booleanValue : result.booleanValue
        }

        this.isTyping.set(bro.userId, bro.booleanValue);


      }
    )
    const inputElement = event.target as HTMLInputElement;
    const value = inputElement.value;
    if (value.trim() === '') {
      this.socket.removingTypingNotification(this.userId, this.userData.sessionId, "");
      return;
    }
    this.socket.sendingTypingNotification(this.userId, this.userData.sessionId, "");
    // Do something with the value, such as send it to a server or update a local variable
  }
  

  ngOnDestroy(): void {
    
    if(this.messageSubscription){
      this.messageSubscription.unsubscribe();
    }

    if(this.messageTypingSubscription){
      this.messageTypingSubscription.unsubscribe();
    }
  }


}
