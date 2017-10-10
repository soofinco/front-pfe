import { AuthenticationService } from './../../services/authentication.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: 'login.component.html',
  providers : [AuthenticationService]
})
export class LoginComponent implements OnInit {

  

   model: any = {};
  errMsg:string = "";
  constructor(
      private router: Router,
      private authenticationService: AuthenticationService) { }

  ngOnInit() {
      // reset login status
      this.authenticationService.logout(false);
  }

  login() {
      this.authenticationService.getToken(this.model.username, this.model.password)
          .subscribe(resp => {
                  if (resp.user === undefined || resp.user.token === undefined || resp.user.token === "INVALID" ){
                      this.errMsg = 'L\'identifiant ou le mot de passe est incorrect';
                      return;
                  }
                  console.log('redirect to home');
                  
                  this.router.navigateByUrl('/dashboard');
              },
              errResponse => {
                switch(errResponse.status){
                  case 401:
                    this.errMsg = 'L\'identifiant ou le mot de passe est incorrect';
                    break;
                  case 404:
                    this.errMsg = 'Service not found';
                  case 408:
                    this.errMsg = 'Request Timedout';
                  case 500:
                    this.errMsg = 'Internal Server Error';
                  default:
                    this.errMsg = 'Server Error';
                }
              }
          );
  }

}
