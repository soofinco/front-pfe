import { UserInfoService } from './../../services/user-info.service';
import { Router } from '@angular/router';
import { AuthenticationService } from './../../services/authentication.service';
import { Component, ElementRef } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html'
})
export class AppHeader {
  loggedInDisplayName:string;

  constructor(private el: ElementRef, 
  private authenticationService:AuthenticationService,
  private router:Router,
  private userInfoService:UserInfoService) { }

  //wait for the component to render completely
  ngOnInit(): void {
    var nativeElement: HTMLElement = this.el.nativeElement,
      parentElement: HTMLElement = nativeElement.parentElement;
    // move all children out of the element
    while (nativeElement.firstChild) {
      parentElement.insertBefore(nativeElement.firstChild, nativeElement);
    }
    // remove the empty element(the host)
    parentElement.removeChild(nativeElement);

    this.loggedInDisplayName = this.userInfoService.getUserName();
  }

  logout() {
    this.authenticationService.logout();
    console.log('logout');
    this.router.navigate(['/pages/login']);
  }



}
