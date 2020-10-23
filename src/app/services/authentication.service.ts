import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})

export class AuthenticationService {
  public currentUser: Observable<any>;
  private currentUserSubject: BehaviorSubject<any>;

  constructor(
    public router: Router,
    private http: HttpClient,
  ) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  register(data: any) {
    return this.http.post<any>(`${environment.apiUrl}authentication/register`, data);
  }

  login(email: string, password: string) {
    return this.http.post<any>(`${environment.apiUrl}authentication/login`, {email, password})
      .pipe(map(user => {
        // login successful if there's a jwt token in the response
        if (user.data && user.data.accessToken) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          user.data.avatar = user.data.avatar ? user.data.avatar : environment.avatar;
          localStorage.setItem('currentUser', JSON.stringify(user.data));
          this.currentUserSubject.next(user.data);
        }
        return user.data;
      }));
  }

  requestPassword(email: string) {
    return this.http.post<any>(`${environment.apiUrl}authentication/request-forgot-password`, email);
  }

  resetPassword(data: any) {
    return this.http.post<any>(`${environment.apiUrl}authentication/forgot-password`, data);
  }

  getCurrent() {
    return this.http.get<any>(`${environment.apiUrl}users/current`);
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

}
