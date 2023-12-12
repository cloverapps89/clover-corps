export interface User {
    username: string,
    password: string;
  }
  
  export interface UserArray extends Array<User> { }
  