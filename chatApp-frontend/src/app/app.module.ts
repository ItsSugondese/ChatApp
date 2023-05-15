import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import {MatIconModule} from '@angular/material/icon';
import { RegisterComponent } from './register/register.component';
import { AddFriendComponent } from './add-friend/add-friend.component';
import { LoginauthGuard } from './register/loginRegisterAuthGuard/loginauth.guard';
import { AuthGuardGuard } from './add-friend/addFriendAuthGuard/auth-guard.guard';
import { ChatComponent } from './chat/chat.component';
import { RouterModule } from '@angular/router';
import { FindFriendComponent } from './find-friend/find-friend.component';
import { FriendsComponent } from './friends/friends.component';
import { FindFriendGuard } from './find-friend/findFriendAuthGuard/find-friend.guard';
import { ChattingComponent } from './chat/chatting/chatting.component';


// import { SpringBootExportor, SpringbootInterceptor } from './homepage/homepage-service/homepageInterceptor';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    NavbarComponent,
    FooterComponent,
    RegisterComponent,
    AddFriendComponent,
    ChatComponent,
    FindFriendComponent,
    FriendsComponent,
    ChattingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NoopAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    RouterModule
  ],
  providers: [
    AuthGuardGuard,
    LoginauthGuard,
    FindFriendGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
