import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { RegisterService } from '../register-service/register.service';

@Injectable({
  providedIn: 'root'
})
export class LoginauthGuard implements CanActivate {

  constructor(private rs : RegisterService,
    private httpClient : HttpClient,
    private router : Router){

  }
  canActivate(): boolean {
    const session = this.rs.getSession()
    if (session) {
      console.log("sending session to server: " + session);
      this.httpClient.post<boolean>("http://localhost:9192/checkSession",  session).subscribe(
        (result) => {
          console.log(result);
          if (result) {
            this.router.navigate(['/findFriend'])
            return true;
          }else{
            return false;
          }
        }
      );
    } 
    return true;
  }
  
}
