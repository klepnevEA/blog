import { ThrowStmt } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.services';

@Injectable()
export class AuthGuard implements CanActivate{

  constructor(
    private authServise: AuthService,
    private router: Router
    ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): boolean | Observable<boolean> | Promise<boolean> {
    if(this.authServise.isLogin) {
      return true
    } else {
      this.authServise.logout()
      this.router.navigate(['/admin', 'login'])
      return false
    }
  }

}
