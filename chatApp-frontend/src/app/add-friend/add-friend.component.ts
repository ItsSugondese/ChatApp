import { Component, OnInit } from '@angular/core';
import { senderReceiver, userData } from '../interfaces';
import { AddFriendService } from './add-friend-services/add-friend.service';
import { RequestNotifierService } from '../socket-service/request-notifier/request-notifier.service';
import { RegisterService } from '../register/register-service/register.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-friend',
  templateUrl: './add-friend.component.html',
  styleUrls: ['./add-friend.component.scss']
})
export class AddFriendComponent implements OnInit {

  userList : userData[] = []
  currentUser !: userData;
  isSend!: boolean[];

  sendingRequest: senderReceiver = {
    sender: '',
    receiver: ''
  };



  constructor(private afs: AddFriendService,
    private friendRequestSender: RequestNotifierService,
    private rs: RegisterService,
    private router: Router) {

  }
  ngOnInit(): void {

    this.afs.getUsers(this.rs.getSession()).subscribe(
      (result) => {
        this.userList = result;
        this.isSend = new Array(this.userList.length).fill(false);
      }
    )
  }




  sendRequest(sender: string) {
    this.sendingRequest.sender = sender;

    this.sendingRequest.receiver = this.rs.getSession();

    const result = this.afs.addFriend(this.sendingRequest).subscribe(
      (result) => {

        this.friendRequestSender.sendingForFriend(this.rs.getSession(), sender);
        this.router.navigate(['/addFriend'])
          .then(() => {
            window.location.reload();
          });
      }, (error) => {
        console.log('Error adding request:', error);
      }
    )


  }






  cancelRequest(sender: string) {
    this.sendingRequest.sender = sender;

    this.sendingRequest.receiver = this.rs.getSession();

    this.afs.removeRequest(this.sendingRequest).subscribe(
      (result) => {
        console.log(result)
        this.friendRequestSender.sendingForRequest(this.rs.getSession(), sender);

        this.router.navigate(['/addFriend'])
          .then(() => {
            window.location.reload();
          });
      }, (error) => {
        console.log('Error adding request:', error);
      }
    )
  }





}
