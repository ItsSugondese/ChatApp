import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from '@auth0/auth0-angular';
import { Observable, throwError } from "rxjs";
import { catchError, filter, switchMap, take } from 'rxjs/operators';
import { jwtVariable } from "src/app/interfaces";
import { HomepageComponent } from "../homepage.component";
import { HomepageServiceService } from "./homepage-service.service";

// @Injectable()
// export class SpringbootInterceptor implements HttpInterceptor {
  // constructor(private hs : HomepageServiceService){

  // }
  
  //     intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

  //       let authReq=req;
  //       const token = this.hs.getToken();

  //       if(token != null){
  //         authReq = authReq.clone({
  //           setHeaders:{Authorization: `Bearer ${token}`},
  //         });
  //       }
  //       return next.handle(authReq);
 
        // return next.handle(authReq).pipe(catchError((error : HttpErrorResponse) => {

        //   if (error instanceof HttpErrorResponse && !authReq.url.includes('auth/signin') && error.status === 401) {
        //     return this.hs.generateToken(this.hc.userSessionId).subscribe(
        //       (result) => {
        //         this.hc.forToken = result as jwtVariable;
        //         console.log(result)
        //         this.hs.storingToken( this.hc.forToken.token);
        //       }
        //     )
        //   }
    
        // }));
  
      //   return next.handle(authReq).pipe(
      //     catchError((error: HttpErrorResponse ) => {
      //       console.log("I'm here")
      //       // Handle error here
      //             this.hs.generateToken(this.hs.getSession()).subscribe(
      //         (result) => {
                
      //           const forToken  = result as jwtVariable;
      //           console.log(result)
      //           this.hs.storingToken( forToken.token);
      //         }
      //       )
      //       return throwError(error);
      //     })
      //   );
      // }
// }


// export const SpringBootExportor= [
//   {
//     provide:HTTP_INTERCEPTORS,
//     userClass : SpringbootInterceptor,
//     useValue:undefined,
//     multi : true
//   }
// ]