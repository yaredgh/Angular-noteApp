import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthServiceService} from "../services/auth-service.service";
import {UserService} from "../services/user-service";
import {User} from "../user.model";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  login: FormGroup = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', [Validators.required]]
  });


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthServiceService,
    private userService: UserService
  ) {
    // redirect to home if already logged in
    // if (this.authenticationService.currentUserValue) {
    //   this.router.navigate(['/']);
    // }
  }

  ngOnInit() {
  }

  onSubmit() {
    const val = this.login.value;
    this.userService.getUser().subscribe(r => {
        r.map((user: User) => {
          if (user.username === val.username && user.password === val.password) {
            this.authService.login(val.username, val.password)
              .subscribe(
                () => {
                  console.log("User is logged in");
                  this.router.navigateByUrl('home');
                }
              );
          }
        })

      }
    )

  }

}

