import { Component, OnDestroy, OnInit } from '@angular/core';
import { RequestNotifierService } from 'src/app/socket-service/request-notifier/request-notifier.service';
import { NavbarService } from './navbar-services/navbar.service';
import { RegisterService } from 'src/app/register/register-service/register.service';
import { userData } from 'src/app/interfaces';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy{
  
  requestNumber : Number = 0;
  friendNumber : Number = 0;
  user : userData = {
    name : '',
    sessionId : ''
  };


  constructor(private navbarService : NavbarService,
    private rs : RegisterService,
    private friendRequestSender : RequestNotifierService) {
      this.friendRequestSender.connect();
    friendRequestSender.addFriendNumber.subscribe(
      (result) => {
        this.requestNumber = result;
      }
    );

    friendRequestSender.friendNumber.subscribe(
      (result) => {
        this.friendNumber = result;
      }
    )

    this.navbarService.getSelfUser(this.rs.getSession()).subscribe(
      (result) => {
        this.user = result;
      }

    )
  }
  
  
  ngOnInit(): void {
    

    // this.navbarService.getSelfUser(this.rs.getSession()).subscribe(
    //   (result) => {
    //     this.user = result;
    //   }

    // )
    this.navbarService.getNoOfRequests(this.rs.getSession()).subscribe(
      (result) => {
        this.requestNumber = result;
      }
    )

    this.navbarService.getNoOfFriends(this.rs.getSession()).subscribe(
      (result) => {
        this.friendNumber = result;
      }
    )

  }

  findFriend = "Find Friends";
  chat = "Chat"
  addFriend = "Add Friends";
  profile = "Profile";
  friends = "Friends"


  ngOnDestroy(): void {
    this.friendRequestSender.disconnect();
  }
}


