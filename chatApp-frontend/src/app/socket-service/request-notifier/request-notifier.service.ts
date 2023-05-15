import { Injectable } from '@angular/core';
import { Message, Stomp } from '@stomp/stompjs';
import { Subject } from 'rxjs';
import * as SockJS from 'sockjs-client';
import { message } from 'src/app/interfaces';
import { RegisterService } from 'src/app/register/register-service/register.service';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestNotifierService {


  connection: boolean = false;

  stompClient: any

  addFriendTopic: string = "/user/topic/updateRequestNumber";
  friendsTopic : string = "/user/topic/updateFriendNumber";
  getMessageTopic : string = "/user/topic/newMessage";

  getMessageNotificationTopic : string = "/user/topic/messageNotification";
  getTypingNotificationTopic : string = "/user/topic/typingNotification";



  addFriendNumber = new Subject<Number>();
  friendNumber = new Subject<Number>();
  messages = new Subject<message>();
  messageSubscription !: Subscription;

  messageNotification = new Subject<any>();
  messageTyping = new Subject<any>();

  webSocketEndPoint: string = 'http://localhost:9192/ws?sessionId=' + this.registerService.getSession();

  constructor(private registerService : RegisterService){

  }

  connect() {
    console.log("initalize  websocket connection");
    let ws = SockJS(this.webSocketEndPoint);
    this.stompClient = Stomp.over(ws);
    const _this = this;
    _this.stompClient.connect({}, function (frames: any) {
      _this.stompClient.subscribe(_this.addFriendTopic, function (greetingResponse: any) {
        _this.onAddFriendMessageReceived(greetingResponse);
        
        console.log(greetingResponse);
      });

      _this.stompClient.subscribe(_this.friendsTopic, function (greetingResponse: any) {
        _this.onFriendMessageReceived(greetingResponse);
        
        console.log(greetingResponse);
      });

    _this.messageSubscription =  _this.stompClient.subscribe(_this.getMessageTopic, function (greetingResponse: any) {
        _this.onChatMessageReceived(greetingResponse);
        console.log(greetingResponse);
      });

      _this.stompClient.subscribe(_this.getMessageNotificationTopic, function (greetingResponse: any) {
        _this.onMessageNotificationReceived(greetingResponse);
        // console.log(greetingResponse);
      });

      _this.stompClient.subscribe(_this.getTypingNotificationTopic, function (greetingResponse: any) {
        _this.onTypingNotificationReceived(greetingResponse);
        // console.log(greetingResponse);
      });

  

    }, this.errorCallBack);
    if (SockJS.OPEN) {
      this.connection = true;
    }
  };




  disconnect() {
    if (this.stompClient != null) {
      this.stompClient.disconnect();
    }
    console.log("Disconnected");
  }

  errorCallBack(error: any) {
    console.log("error ma xu hai ta")
    console.log("errorCallBack -> " + error)
    setTimeout(() => {
      this.connect();
    }, 5000);
  }



  //sending for getting request notification
  sendingForRequest(receiver: string | null, sender: string | null) {


    if (this.stompClient && this.stompClient.connected) {
      console.log("Its here though")
      this.stompClient.send('/app/getNoOfRequests',{}, receiver);
    } else {
      console.log("STOMP connection not established yet.");
    }
  }

  //sending for getting request notification
  sendingForFriend(acceptor: string | null, sender: string | null) {

    const headers = { 'acceptor': acceptor };

    if (this.stompClient && this.stompClient.connected) {
      this.stompClient.send('/app/getNoOfFriends',headers, sender);
    } else {
      console.log("STOMP connection not established yet.");
    }
  }

   //sending for getting request notification
   sendingMessage(sendBy: string | null, sendTo: string | null, content: string) {
    const sendingMessageToUser : message = {
      from : sendBy,
      to: sendTo,
      content : content
    };  

    if (this.stompClient && this.stompClient.connected) {
      this.stompClient.send('/app/getMessage',{}, JSON.stringify(sendingMessageToUser));
    } else {
      console.log("STOMP connection not established yet.");
    }
  }

   //sending for getting message notification
   sendingMessageNotification(sendBy: string | null, sendTo: string | null, content: string) {
    const sendingMessageToUser : message = {
      from : sendBy,
      to: sendTo,
      content : content
    };  

    if (this.stompClient && this.stompClient.connected) {
      this.stompClient.send('/app/getNewMessage',{}, JSON.stringify(sendingMessageToUser));
    } else {
      console.log("STOMP connection not established yet.");
    }
  }


  //sending for getting message notification
  sendingFirstMessageNotification(sendBy: string | null, sendTo: string | null, content: string) {
    const sendingMessageToUser : message = {
      from : sendBy,
      to: sendTo,
      content : content
    };  

    if (this.stompClient && this.stompClient.connected) {
      this.stompClient.send('/app/firstMessage',{}, JSON.stringify(sendingMessageToUser));
    } else {
      console.log("STOMP connection not established yet.");
    }
  }

   //sending for getting typing notification
   sendingTypingNotification(sendBy: string | null, sendTo: string | null, content: string) {
    const sendingMessageToUser : message = {
      from : sendBy,
      to: sendTo,
      content : content
    };  

    if (this.stompClient && this.stompClient.connected) {
      this.stompClient.send('/app/getTyping',{}, JSON.stringify(sendingMessageToUser));
    } else {
      console.log("STOMP connection not established yet.");
    }
  }

  //removing typing notification
  removingTypingNotification(sendBy: string | null, sendTo: string | null, content: string) {
    const sendingMessageToUser : message = {
      from : sendBy,
      to: sendTo,
      content : content
    };  

    if (this.stompClient && this.stompClient.connected) {
      this.stompClient.send('/app/removeTyping',{}, JSON.stringify(sendingMessageToUser));
    } else {
      console.log("STOMP connection not established yet.");
    }
  }


  onAddFriendMessageReceived(message: any) {
    // console.log("Message Received from Server :: " + message.body);
    const obj = JSON.parse(message.body) as Number
    console.log(obj);
    this.addFriendNumber.next(obj);
  }

  onFriendMessageReceived(message: any) {
    // console.log("Message Received from Server :: " + message.body);
    const obj = JSON.parse(message.body) as Number
    console.log(obj);
    this.friendNumber.next(obj);
  }

  onChatMessageReceived(message: any) {
    // console.log("Message Received from Server :: " + message.body);
    const obj = JSON.parse(message.body) as message
    // console.log("chatting here : " +obj);
    this.messages.next(obj);
    
  }

  onMessageNotificationReceived(message : any){
    const obj = JSON.parse(message.body)
    this.messageNotification.next(obj);
  }

  onTypingNotificationReceived(message : any){
    const obj = JSON.parse(message.body)
    console.log("the object is ");
    console.log(obj);
    this.messageTyping.next(obj);
  }


}
