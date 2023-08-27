import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from "@angular/common/http";
import {User} from "../user.model";
import {catchError, map, Observable, pipe, shareReplay, throwError} from "rxjs";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService  {

  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser = {};

  constructor(private http: HttpClient, public router: Router) {}

  getToken() {
    console.log(localStorage.getItem('access_token'))
    return localStorage.getItem('access_token');
  }

  getUser():Observable<any> {
    return this.http.get(`http://localhost:3000/users`);
  }

  get isLoggedIn(){
    let authToken = localStorage.getItem('access_token');
    console.log(authToken)
    return authToken !== null ? true : false;
  }

  signUp(user:User){
    return this.http.post('http://localhost:3000/users',user).pipe(
      catchError(this.handleError))
  }

  // login(username:string, password:string ) {
  //
  //     return this.http.post<User>(' http://localhost:3000/login', {username, password}).pipe(
  //       // this is just the HTTP call,
  //       // we still need to handle the reception of the token
  //       shareReplay()
  //     );
  //   }
  signIn(user: User) {
    let loggedUser = user;
     this.getProfile(user.username).subscribe((re) =>{
      re.map((res: User)=>{
        this.currentUser = res;
        return res
      })
    });
    return this.http
      .post<any>(`http://localhost:3000/login`, loggedUser)
      .subscribe((res: any) => {
        localStorage.setItem('access_token', res.token);
          this.router.navigate(['/home']);
      });
  }

  doLogout() {
    let removeToken = localStorage.removeItem('access_token');
    this.getLoggedUser()
    if (removeToken == null) {
      this.router.navigate(['log-in']);
    }
  }

  getProfile(username: string):  Observable<any> {
    const params = new HttpParams().set('username',username)
    let api = `http://localhost:3000/users?`+params.toString();
    return this.http.get(api, { headers: this.headers })
      .pipe(map((res) => {
          return res || {};
        }),
        catchError(this.handleError)
    );
  }

  getLoggedUser():  Observable<any> {
    const params = new HttpParams().set('username',this.currentUser.toString())
    let api = `http://localhost:3000/login?`+ params;
    return this.http.delete(api, { headers: this.headers })
      .pipe(map((res) => {

          return res || {};
        }),
        catchError(this.handleError)
      );
  }


  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }

}
