import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { userData } from '../interfaces';
import { RegisterService } from './register-service/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  username : string | null | undefined = null;

  userInfo !: userData;
  userSessionId !: string;
  registerForm = this.fb.group({
    name : ''
  })

  constructor(
    private registerService : RegisterService,
    private fb : FormBuilder,
    private router : Router
    ){

  }
  
  

  submitDetails(){
    this.username = this.registerForm.value.name;
    this.registerService.postData(this.username).subscribe(
      (result) => {
        this.userInfo = result as userData;
        this.userSessionId = this.userInfo.sessionId;
        this.registerService.storingSession(this.userSessionId);
        console.log("session is " + this.registerService.getSession())
        this.router.navigate(['/addFriend'])
      }
    )

    
  }


}
