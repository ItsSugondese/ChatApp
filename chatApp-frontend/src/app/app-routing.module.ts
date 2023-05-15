import { HostListener, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddFriendComponent } from './add-friend/add-friend.component';
import { AuthGuardGuard } from './add-friend/addFriendAuthGuard/auth-guard.guard';

import { HomepageComponent } from './homepage/homepage.component';
import { LoginauthGuard } from './register/loginRegisterAuthGuard/loginauth.guard';
import { RegisterComponent } from './register/register.component';
import { ChatComponent } from './chat/chat.component';
import { FindFriendComponent } from './find-friend/find-friend.component';
import { FriendsComponent } from './friends/friends.component';
import { FindFriendGuard } from './find-friend/findFriendAuthGuard/find-friend.guard';
import { ChattingComponent } from './chat/chatting/chatting.component';

const routes: Routes = [
  {path : 'homepage', component: HomepageComponent},
  {path : 'register', canActivate:[LoginauthGuard], component: RegisterComponent},
  {path : 'addFriend', component: AddFriendComponent},
  {path : 'chat',  component: ChatComponent},
  {path : 'chatting/:userId',  component: ChattingComponent},
  {path : 'findFriend', canActivate:[FindFriendGuard] ,  component: FindFriendComponent},
  {path : 'friends',  component: FriendsComponent},
  {path : '', redirectTo: '/register', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

  constructor(){
   
  }
}
