import { Component, OnInit } from '@angular/core';
import { ChatService } from './chat-service/chat.service';
import { RequestNotifierService } from '../socket-service/request-notifier/request-notifier.service';
import { RegisterService } from '../register/register-service/register.service';
import { userData } from '../interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  userList : userData[] = []

  selectedUser !:userData;

  num : number = 0;
  newMessage : Map<string, boolean> = new Map();

  constructor(private cs: ChatService,
    private friendRequestSender: RequestNotifierService,
    private rs: RegisterService,
    private router : Router) {

      console.log( "Number value is " + ++this.num);
  }

  ngOnInit(): void {

    this.cs.getUsers(this.rs.getSession()).subscribe(
      (result) => {
        this.userList = result;
        this.userList.forEach(user => {
          // Set the corresponding key-value pair in the newMessage map
          this.newMessage.set(user.sessionId, false);
        });
        
       
        console.log(result);
        console.log("size of friend sis " + this.newMessage.size)
      }
    );

  
  }


  redirectToChat(user : userData){
    this.selectedUser = user;
  }

  getMessageStatus(data : any){
    console.log("IN parent obejct is ");
    console.log(data);
    const bro = {
      userId : data.userId,
      booleanValue : data.booleanValue
    }
    console.log("before " + this.newMessage.get(bro.userId));
    this.newMessage.set(bro.userId, bro.booleanValue);
    console.log("after " + this.newMessage.get(bro.userId))
  }
}
