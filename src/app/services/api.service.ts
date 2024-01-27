import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  usersUrl: string = 'https://reqres.in/api/users?page=';
  userDetailsUrl: string = 'https://reqres.in/api/users/';  
  
  constructor(private http: HttpClient) {}

  getUsers(page: number): Observable<any> {
    return this.http.get(this.usersUrl + page);
  }

  getUserDetails(userId: number): Observable<any> {
    return this.http.get(this.userDetailsUrl + userId);
  }
}
