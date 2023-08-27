import { Component } from '@angular/core';
import {User} from "../../user.model";
import {AuthServiceService} from "../../services/auth-service.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private authServiceService:AuthServiceService) {
  }

  logOff(){
    this.authServiceService.doLogout();
  }

  isLogin(){
    this.authServiceService.isLoggedIn;
  }

}
