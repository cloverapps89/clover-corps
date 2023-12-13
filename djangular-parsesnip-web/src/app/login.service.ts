import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

import { User, UserArray } from "./login";




@Injectable({
 providedIn: 'root'
})
export class LoginService {

 constructor(private http: HttpClient) { }

 //get a list of users from Django backend API endpoint. 
 getUser(): Observable<UserArray> {
   console.log("Inside getUser()");
   return this.http.get('http://127.0.0.1:8000/api/v1/users/') as Observable<UserArray>;
 }

 //send payload to Django backend API to PUT a new user into the table.
 createUser(data: any): Observable<any> {
  console.log("Inside createUser()");
  console.log("New username: <" + data["username"] + ">");
  console.log("New password: <" + data["password"] + ">");
  const createUserUrl = 'http://127.0.0.1:8000/users/';

  var jsonData = 
    {
      "username": data["username"],
      "password": data["password"]
    }
  
  //return this.http.get('http://127.0.0.1:8000/api/v1/users/' + data["username"] + '/createUser') as Observable<UserArray>;
  return this.http.post(createUserUrl, jsonData);
 }

 deleteUser(data: any): Observable<any> {
  console.log("Inside deleteUser");
  console.log("The id passed in to delete..." + data["username"]);
  var pk = data["username"];
  const deleteUserUrl = 'http://127.0.0.1:8000/users/' + pk + '/';
  return this.http.delete(deleteUserUrl);
  //return this.http.post(baseUrl, data);
 }
}
