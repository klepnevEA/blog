import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { IAuthResponse, IContentPopup, IUser } from '../interfaces';
import { environment } from '../../../environments/environment';


@Injectable()
export class AuthService {
  constructor(private http: HttpClient) { }

  public submitetd: boolean = false
  public isLogin: string | null = localStorage.getItem('isLogin')

  get token(): any {
    const expDate = new Date(
      JSON.parse(localStorage.getItem('firebase-token-exp') || '{}')
    );
    if (new Date() > expDate) {
      this.logout();
      return null;
    }
    return localStorage.getItem('firebase-token');
  }

  public showPopup$: Subject<IContentPopup> = new Subject<IContentPopup>();

  private setToken(response: IAuthResponse | any) {
    if (response) {
      const expDate = new Date(
        new Date().getTime() + +response.expiresIn * 1000
      );
      localStorage.setItem('firebase-token', response.idToken);
      localStorage.setItem('firebase-token-exp', expDate.toString());
      localStorage.setItem('isLogin', 'true');
    } else {
      localStorage.clear();
    }
  }

  private showError(err: HttpErrorResponse) {
    let message = err.error.error.message;
    switch (message) {
      case 'INVALID_EMAIL':
        this.showPopup$.next({ title: 'Ошибочка', text: 'Невентый email' });
        break;
      case 'INVALID_PASSWORD':
        this.showPopup$.next({ title: 'Ошибочка', text: 'Невентый пароль' });
        break;
      case 'EMAIL_NOT_FOUND':
        this.showPopup$.next({ title: 'Ошибочка', text: 'Email не найден' });
        break;
      case 'TOO_MANY_ATTEMPTS_TRY_LATER : Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.':
        this.showPopup$.next({ title: 'Ошибочка', text: 'Слишком много неудачных попыток входа.' });
        break;
    }
    return throwError(err);
  }

  login(user: IUser): Observable<any> {
    user.returnSecureToken = true;
    return this.http
      .post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`,
        user
      )
      .pipe(
        tap(this.setToken),
        catchError((err) => {
          return this.showError(err);
        }),
        tap(() => this.isLogin = localStorage.getItem('isLogin'))
      );
  }

  logout() {
    this.setToken(null);
    this.isLogin = localStorage.getItem('isLogin')
  }

  isAuth(): boolean {
    return !!this.token;
  }
}
