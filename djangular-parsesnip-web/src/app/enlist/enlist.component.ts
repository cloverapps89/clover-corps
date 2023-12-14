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

@Component({
  selector: 'app-enlist',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule,
    MatCardModule, MatDividerModule, MatButtonModule, MatProgressBarModule],
  templateUrl: './enlist.component.html',
  styleUrl: './enlist.component.css',
  
})
export class EnlistComponent {

  username : UserArray = [];
  usernameSignUpForm: string = "";
  passwordSignUpForm: string = "";

  ngOnInit(): void {
    const tst = document.getElementById("nav",) as HTMLObjectElement;
    tst.style.visibility = 'hidden';
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

  register() {
    
    if(this.usernameSignUpForm === "" || this.passwordSignUpForm === "") {
      console.log("Empty username...<" + this.usernameSignUpForm + ">");
      console.log("Empty password...<" + this.passwordSignUpForm + ">");
      alert("Please enter a username & password");
    }
    else {
    console.log("Checking component data..." + this.usernameSignUpForm);
    console.log("Checking component data..." + this.passwordSignUpForm);
    //build our payload for new user: username, password
    var jsonData = 
    {
      "username": this.usernameSignUpForm,
      "password": this.passwordSignUpForm
    }
      this.loginService.createUser(jsonData).subscribe(
      (payload) => {(jsonData = payload),     alert("Success, welcome to the Corps.")
       window.location.href = "/trivia"
    },
      (error) => {alert('username already exists')}
      
      );      

    }
  }
}

