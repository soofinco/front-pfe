import { Injectable } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';
import { UserInfoService } from './services/user-info.service';
import { Router, CanActivate, CanActivateChild,ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class CanActivateAuthGuardService implements CanActivate, CanActivateChild{

  
  constructor(private router: Router,
   private authService: AuthenticationService,
        private userInfoService: UserInfoService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) :boolean{
     let url: string = state.url;
        return this.checkLogin(url);
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.canActivate(route, state);
    }

    checkLogin(url: string): boolean {
        if (this.userInfoService.isLoggedIn()) {
            return true;
        }
        //Store the original url in login service and then redirect to login page
        this.authService.landingPage = url;
        this.router.navigate(['pages/login']);
        return false;
    }

}
