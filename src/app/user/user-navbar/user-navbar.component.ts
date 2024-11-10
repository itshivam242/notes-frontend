import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-navbar',
  templateUrl: './user-navbar.component.html',
  styleUrls: ['./user-navbar.component.sass']
})
export class UserNavbarComponent implements OnInit {
  constructor(private service: UserService,  
    private router: Router,
    private route: ActivatedRoute) { }
  firstName: string = "";
  ngOnInit(): void {
    if (this.service.getloginFirstName() == '') {
      this.router.navigate(['/login'])
    }
    if (this.service.getloginFirstName() != null) {
      this.firstName = this.service.getloginFirstName()
    }
  }
  
  search(){
    setTimeout(()=>{
      window.location.reload();},5)
    this.router.navigate(["/dashboard"])
  }

  //This method is used for logout user
  logOutLogin() {
    if(confirm("Are you sure to Logout ?")) { 
    this.service.logOut();
    
    this.router.navigate(["/home"])
    }
  }
  addn(){
    this.router.navigate(["/add"])
  }
}
