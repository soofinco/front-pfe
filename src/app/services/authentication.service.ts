import { ApiRequestService } from './api-request.service';
import { UserInfoService, LoginInfoInStorage } from './user-info.service';
import { Injectable, Inject } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { Observable,Subject } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


export interface LoginRequestParam{
    username:string;
    password:string;
}

@Injectable()
export class AuthenticationService {

  private authUrl = '/auth';
    public landingPage:string = "/home/dashboard/order";
    constructor(
        private router:Router,
        private http: Http,
        private userInfoService: UserInfoService,
        private apiRequest: ApiRequestService
    ) {}


    getToken(username:string, password:string): Observable<any> {
        let me = this;

        let bodyData:LoginRequestParam = {
            "username": username,
            "password": password,
        }
        let loginDataSubject:Subject<any> = new Subject<any>(); // Will use this subject to emit data that we want after ajax login attempt
        let loginInfoReturn:LoginInfoInStorage; // Object that we want to send back to Login Page

        this.apiRequest.post(this.authUrl, bodyData)
            .subscribe(jsonResp => {
                if (jsonResp !== undefined && jsonResp !== null && jsonResp.operationStatus === "SUCCESS"){
                    //Create a success object that we want to send back to login page
                    loginInfoReturn = {
                        "success"    : true,
                        "landingPage": this.landingPage,
                        "user"       : {
                            "userId"     : jsonResp.jwtUser.id,
                            "email"      : jsonResp.jwtUser.email,
                            "displayName": jsonResp.jwtUser.firstname + " " + jsonResp.jwtUser.lastname,
                            "token"      : jsonResp.token,
                            "role"      : jsonResp.jwtUser.authorities[0],
                        }
                    };

                    // store username and jwt token in session storage to keep user logged in between page refreshes
                    this.userInfoService.storeUserInfo(JSON.stringify(loginInfoReturn.user));
                }
                else {
                    //Create a faliure object that we want to send back to login page
                    loginInfoReturn = {
                        "success":false,
                        "landingPage":"/login"
                    };
                }
                loginDataSubject.next(loginInfoReturn);
            });

            return loginDataSubject;
    }

    logout(navigatetoLogout=true): void {
        // clear token remove user from local storage to log user out
        this.userInfoService.removeUserInfo();
        if(navigatetoLogout){
            this.router.navigate(["logout"]);
        }
    }
}