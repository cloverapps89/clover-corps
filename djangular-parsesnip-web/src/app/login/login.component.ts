import {Component, OnInit} from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import { LoginService } from '../login.service';
import {  UserArray } from '../login';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatCardModule} from '@angular/material/card';
import { HttpErrorResponse } from '@angular/common/http';

/**
 * @title Inputs in a form
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule,
    MatCardModule, MatDividerModule, MatButtonModule, MatProgressBarModule],
})
export class LoginComponent implements OnInit {

    username : UserArray = [];
    usernameInput: string = "";
    passwordInput: string = "";
    usernameSignUpForm: string = "";
    passwordSignUpForm: string = "";

  ngOnInit(): void {
    this.getUser();
  }

  constructor(private loginService: LoginService) {}

  getUser() {
    this.loginService.getUser().subscribe({
        next: (data) => {
          console.log(data);
          this.username = data;
        },
        error: (error) => {
          console.log(error);
        }
      }
    )
  }

  login(){
    console.log("Inside [login()" + "]");
    console.log("DB - Creds...username[" + this.username[0].username + "]");
    console.log("DB - Creds...password[" + this.username[0].password + "]");

    console.log("Input from form...username[" + this.usernameInput + "]");
    console.log("Input from form...password[" + this.passwordInput + "]");
    
    for(var i = 0; i < this.username.length; i++) {
      if(this.username[i].username === this.usernameInput
        && this.username[i].password === this.passwordInput) {
          console.log("Welcome back " + this.username[i].username);
          window.location.href = "/trivia";
          break;
        }
        else {
          alert("Username & password incorrect.");
          break;
        }
    }
  }

  signUp() {

    if(this.usernameInput === "" || this.passwordInput === "") {
      console.log("Empty username...<" + this.usernameInput + ">");
      console.log("Empty password...<" + this.passwordInput + ">");
      alert("Please enter a username & password");
    }
    else {
    console.log("Checking component data..." + this.usernameInput);
    console.log("Checking component data..." + this.passwordInput);
    //build our payload for new user: username, password
    var jsonData = 
    {
      "username": this.usernameInput,
      "password": this.passwordInput
    }
      this.loginService.createUser(jsonData).subscribe(
      (payload) => {(jsonData = payload)},
      (error) => {alert('username already exists')}
      
      );      
    
    }
    //window.location.href = "/signUp";
  }
}