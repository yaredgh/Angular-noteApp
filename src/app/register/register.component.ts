import {Component, OnInit} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {Router} from "@angular/router";
import {catchError, first, map, Observable} from "rxjs";
import {AuthServiceService} from "../services/auth-service.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    private userService: AuthServiceService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) {
    // redirect to home if already logged in
    // if (this.authenticationService.currentUserValue) {
    //   this.router.navigate(['/']);
    // }

  }


  loading = false;
  submitted = false;

  private set username(value: string) {
    this.registerForm.get('username')?.patchValue(value);
  }

  private get username(): string {
    return this.registerForm.get('username')?.value as string;
  }

  private get password(): string {
    return this.registerForm.get('password')?.value as string;
  }

  private set password(value: string) {
    this.registerForm.get('password')?.patchValue(value);
  }

  private get confirmPassword(): string {
    return this.registerForm.get('confirmPassword')?.value as string;
  }

  private set confirmPassword(value: string) {
    this.registerForm.get('confirmPassword')?.patchValue(value);
  }

  public registerForm: FormGroup = this.formBuilder.group({
    username: new FormControl(null, Validators.required),
    password: new FormControl(null, [Validators.required, Validators.minLength(7)]),
    confirmPassword: new FormControl(null, Validators.required)
}, {
  validators: [this.passwordConfirming, this.validateUsername.bind(this)],

});
  passwordConfirming(f: FormControl) {

    let confirm = f.value.confirmPassword
    let pass = f.value.password
    return pass === confirm ? null : {notSame: true}

  }

  ngOnInit() {

  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    } else {
      this.userService.signUp(this.registerForm.value)
        .pipe(first())
        .subscribe(
          data => {
            this.router.navigate(['/login']);
          })
    }
  }

  // checkUsername(control: AbstractControl) {
  //  let inputUser = control.value.username;
  //  console.log(inputUser);
  //  //return this.users.indexOf(inputUser) ? null : {existingUsername: true}
  //   if(this.users.includes(inputUser)){
  //     return {"existingUsername": true};
  //   }
  //   else {
  //     return {"existingUsername": false};
  //   }
  //
  //   // return this.userService.checkUsername(control.value.username)
  //   //   .pipe(
  //   //     map(res => {
  //   //       return res.usernameAvailable ? null : {existingUsername: true};
  //   //     })
  //   //   );
  // }
  userTaken = false;
   validateUsername() {
    this.userService.getUser().subscribe(data =>{
      //console.log(data)
      //console.log(this.username)
      for(let i=0; i < data.length; i++){
        if(this.username === data[i].username) {
          this.userTaken = true;
        }
      }
    });
    return this.userTaken = false;
  }
}
