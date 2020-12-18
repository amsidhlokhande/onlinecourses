import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './user';
import { Observable } from 'rxjs';
import { Login } from './login';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl: String = "http://localhost:8181"
  constructor(private httpClient: HttpClient) { }

  createUser(user: User): Observable<User> {
    return this.httpClient.post<User>(this.baseUrl + '/user', user);
  }
  loginUser(login:Login):Observable<any>{
     return this.httpClient.post(this.baseUrl + "/user/login", login);
  }
}
