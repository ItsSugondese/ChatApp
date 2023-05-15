import { Component, OnInit } from '@angular/core';
import { FriendService } from './friend-service/friend.service';
import { RequestNotifierService } from '../socket-service/request-notifier/request-notifier.service';
import { RegisterService } from '../register/register-service/register.service';
import { Router } from '@angular/router';
import { senderReceiver, userData } from '../interfaces';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})
export class FriendsComponent implements OnInit {
  userList : userData[] = []

 
  constructor(private fs: FriendService,
    private friendRequestSender: RequestNotifierService,
    private rs: RegisterService,
    private router : Router) {

  }

  ngOnInit(): void {    
    this.fs.getFriends(this.rs.getSession()).subscribe(
      (result) => {
        this.userList = result;
        console.log(result);
        console.log("size of friend sis " + this.userList.length)
      }
    );  
  }

  removeFriend(sender : string){
    const sr : senderReceiver = {
      sender : sender,
      receiver : this.rs.getSession()
    }
    this.fs.removeFriend(sr).subscribe(
      (result) => {
        this.friendRequestSender.sendingForFriend(this.rs.getSession(), sender);
        this.router.navigate(['/friends'])
          .then(() => {
            window.location.reload();
          });
      }
    )
  }



}
