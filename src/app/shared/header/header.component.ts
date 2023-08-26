import { Component } from '@angular/core';
import {UserService} from "../../services/user-service";
import {User} from "../../user.model";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private userService: UserService) {
  }

  logout(){
   let currentUser ;
   console.log('called ')
    this.userService.getCurrentUser().subscribe(data=>{
       data.map((user : User)=>{
         currentUser = user.username;
     })
    })
    if(currentUser){
      this.userService.removeUserByUserName(currentUser);
    }
  }
}
