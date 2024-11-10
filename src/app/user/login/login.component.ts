import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EMPTY, catchError, tap } from 'rxjs';
import { AppService } from 'src/app/service/app.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  user = {
    emailId: "",
    password: ""
  }
  message = "";
  constructor(private service: UserService, 
    private appService: AppService,
    private router: Router) { }

  ngOnInit(): void {
    console.log(this.service.isLoggedIn());
  }

  //This method is used for user login
  loginUser() {
    console.log(this.user);
    this.service.loginUserFromRemote(this.user).pipe(tap((data:any) => {
      console.log(data);
      this.service.loginUser(data.token, data.firstName, data.userName,data.id);
      this.router.navigate(["dashboard"]);
      this.appService.openSnackBar("Login Successfully","close");
    }),
      catchError((error:any) => {
        console.log("exception occur")
        console.log(error);
        this.message = "Invalid Credential"
        return EMPTY;
      })
    ).subscribe();
  }
}

