import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import { LoginService } from '../login.service';
import {  UserArray } from '../login';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatCardModule} from '@angular/material/card';


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


  login(){

    var bool_stopper = false;
    console.log("Inside [login()" + "]");
    console.log("Input from form...username[" + this.usernameInput + "]");
    console.log("Input from form...password[" + this.passwordInput + "]");
    
    for(var i = 0; i < this.username.length; i++) {
      if(this.username[i].username === this.usernameInput
        && this.username[i].password === this.passwordInput) {
          bool_stopper = true;
          break;
        }

    }

    if(bool_stopper) {
      console.log("Welcome back " + this.username[i].username);
      window.location.href = "/dash";
    }else {
          alert("Username & password incorrect.");
                }
  }

  enlist() {
    window.location.href = "/enlist";
  }


  deleteUser() {
   
    var jsonData = 
    {
      "username": this.usernameInput,
   
    }
      this.loginService.deleteUser(jsonData).subscribe(
      (payload) => {(jsonData = payload),     alert("Success, welcome to the Corps.")
     
    },
      (error) => {alert('username already exists')}
      
      );      

    }
  }
