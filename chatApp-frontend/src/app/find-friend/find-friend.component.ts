import { Component, OnInit } from '@angular/core';
import { senderReceiver, userData } from '../interfaces';
import { RequestNotifierService } from '../socket-service/request-notifier/request-notifier.service';
import { RegisterService } from '../register/register-service/register.service';
import { FindFriendService } from './find-friend-services/find-friend.service';

@Component({
  selector: 'app-find-friend',
  templateUrl: './find-friend.component.html',
  styleUrls: ['./find-friend.component.scss']
})
export class FindFriendComponent implements OnInit {
  userList !: userData[];
  isSend!: boolean[];

  sendingRequest : senderReceiver = {
    sender: '',
    receiver : ''
  };



  constructor(private ffs: FindFriendService,
   private friendRequestSender: RequestNotifierService,
   private rs : RegisterService) {

  }
  ngOnInit(): void {
   
    this.ffs.getUsers(this.rs.getSession()).subscribe(
      (result) => {
        this.userList = result;
        this.isSend = new Array(this.userList.length).fill(false);
      }
    );

    
      
    // this.friendRequestSender.connect();


  }

   sendRequest(receiver: string, index : number) {

    this.sendingRequest.sender = this.rs.getSession();

    this.sendingRequest.receiver = receiver;

    const result =   this.ffs.sendRequest(this.sendingRequest).subscribe(
      (result) => {
        this.isSend[index] = result;
        this.friendRequestSender.sendingForRequest(receiver, this.rs.getSession());
      }, (error) => {
        console.log('Error adding request:', error);
      }
    )
    
   
  }



  


  cancelRequest(receiver : string, index : number){
    this.sendingRequest.sender = this.rs.getSession();

    this.sendingRequest.receiver = receiver;

    this.ffs.removeRequest(this.sendingRequest).subscribe(
      (result) => {
        this.isSend[index] = result;
        this.friendRequestSender.sendingForRequest(receiver, this.rs.getSession());
      },(error) => {
        console.log('Error adding request:', error);
      }
    )
  }

}

