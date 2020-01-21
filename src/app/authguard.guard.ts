import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { MsAdalAngular6Service } from 'microsoft-adal-angular6';

@Injectable({
  providedIn: 'root'
})
export class AuthguardGuard implements CanActivate {

  constructor(private user: UserService, private adal: MsAdalAngular6Service) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    //return this.user.getUserLoggedIn();;
    if(this.adal.userInfo){
      return true;
    }
    this.adal.login();
    return false;
  }
  
}
