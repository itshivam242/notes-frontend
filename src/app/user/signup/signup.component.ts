import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { tap, catchError, EMPTY } from 'rxjs';
import { User } from 'src/app/model/User';
import { AppService } from 'src/app/service/app.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.sass']
})
export class SignupComponent implements OnInit {
  user: User = {
    emailId: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword:""
  }
  message = "";
  constructor(private userService: UserService,
     private router: Router,
     private appService:AppService) { }

  ngOnInit(): void {
  }
  //This method is used for userRegistration
  userRegistration() {
    console.log(this.user)
    this.userService.userRegistrationFromRemote(this.user).pipe(tap((data:any) => {
      this.appService.openSnackBar("You have been registered successfully","close");
      this.router.navigate(['/login'])
    }),
     catchError((error:any) => {
        console.log(error)
        this.message = "this email id already exits or internal server error"
        return EMPTY;
      })
    ).subscribe();
  }
}
