import { Injectable } from '@angular/core';
import {User} from "../user.model";
import {catchError, Observable, throwError} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";


// export interface UsernameCheck {
//   info: string;
//   usernameAvailable: boolean;
// }

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient ) { }

  register(user:User): Observable<any>{
    //user.id = new Date().getTime();

    return this.http.post('http://localhost:3000/users',user).pipe(
      catchError(this.handleErrors)
    )

  }
  getUser():Observable<any> {
    return this.http.get(`http://localhost:3000/users`);
  }

  public validateUsername(userName:string):Observable<any> {
    return this.http.get(`http://localhost:3000/users/${userName}`);
  }

  getCurrentUser():Observable<any>{
    return this.http.get(`http://localhost:3000/login`);
  }

  removeUserByUserName(userName:string){
    return this.http.delete(`http://localhost:3000/login/${userName}`);
  }

  handleErrors(error: Error){
    return throwError(error)
  }
  // checkUsername(username: string) {
  //   const params = new HttpParams().set("username", username);
  //
  //   return this.http.get<UsernameCheck>(`http://localhost:3000/users`, {
  //     params
  //   });
  // }


}
