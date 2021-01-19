import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { AuthService } from "./auth.services";
import { Router } from '@angular/router';
import { catchError, tap } from "rxjs/operators";
import { ThrowStmt } from "@angular/compiler";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(this.authService.isLogin) {
      req = req.clone({
        setParams: {
          auth: this.authService.token
        }
      })
    }
    return next.handle(req)
    .pipe(
      tap(()=> {
        console.log('Intercept')
      }),
      catchError(((err: HttpErrorResponse) => {
        console.log('[Interceptor Error]: ', err)
        if(err.status == 401) {
          this.authService.logout()
          this.router.navigate(['/admin', 'login'], {
            queryParams: {
              authFailed: true
            }
          })
        }
        return throwError(err)
      }))
    )
  }
}
