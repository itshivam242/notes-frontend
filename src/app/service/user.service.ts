import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/User';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }
  readonly url = "http://localhost:8095";

  //This method is used for login by using post request on api 
  public loginUserFromRemote(user: any): Observable<any> {
    return this.http.post(this.url + '/login', user);
  }

  //This method is used  for userRegistration  by using  post request on api
  public userRegistrationFromRemote(user: User): Observable<any> {
    return this.http.post(this.url + '/signup', user);
  }

  //This method is used to save the userName and token into sessionStorage
  loginUser(token: string, firstName: string, userName: string, id:any) {
    sessionStorage.setItem("token", token);
    sessionStorage.setItem("firstName", firstName);
    sessionStorage.setItem("userName", userName);
    sessionStorage.setItem("id", id);
  }

  //This method is used to check the user login or logout
  isLoggedIn() {
    let token = sessionStorage.getItem("token");
    if (token == undefined || token === '' || token == null) {
      return false;
    } else {
      return true;
    }
  }

  //This method is used to remove the  userName and token  into sessionStorage
  logOut() {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("firstName");
    sessionStorage.removeItem("userName");
    sessionStorage.removeItem("id");
    return true;
  }

//This method is used to get token
  getToken() {
    let token = sessionStorage.getItem("token");
    console.log(token);
    if (token == undefined || token === '' || token == null) {
      return null;
    } else {
      return token;
    }

  }
 
  //This method is used to get loginUserName
  getloginUserName() {
    let userName = sessionStorage.getItem('userName');
    if (userName == undefined || userName === '' || userName == null) {
      return "please!login";
    } else {
      return userName;
    }
  }
  getloginFirstName() {
    let firstName = sessionStorage.getItem('firstName');
    if (firstName == undefined || firstName === '' || firstName == null) {
      return '';
    } else {
      return firstName;
    }
  }
  getloginId() {
    let id = sessionStorage.getItem('id');
    if (id == undefined || id === '' || id == null) {
      return "please!login";
    } else {
      return id;
    }
  }
}
