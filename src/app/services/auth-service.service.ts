import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../user.model";
import {shareReplay} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http: HttpClient) {
  }

  login(username:string, password:string ) {
    return this.http.post<User>(' http://localhost:3000/login', {username, password}).pipe(
      // this is just the HTTP call,
      // we still need to handle the reception of the token
      shareReplay()
    );
  }
}
