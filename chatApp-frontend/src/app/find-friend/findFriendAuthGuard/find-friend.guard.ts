import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { RegisterService } from '../../register/register-service/register.service';

@Injectable({
  providedIn: 'root'
})
export class FindFriendGuard implements CanActivate {
  constructor(private rs : RegisterService,
    private router : Router,
    private httpClient : HttpClient){


  }



  canActivate(): boolean {
    const session = this.rs.getSession()
    if (session) {
      this.httpClient.post<boolean>("http://localhost:9192/checkSession",  session).subscribe(
        (result) => {
          if (!result) {
            this.router.navigate(['/register'])
          }
        }
      )
      return true;
    } else {
      this.router.navigate(['/register'])
      return false;
    }
  }

  
}
