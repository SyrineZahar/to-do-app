import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../classe/User';

@Injectable({
  providedIn: 'root'
})
export class userService {
    URL='http://localhost:8088/users'

    constructor(private httpClient:HttpClient) { }
    
    getUsers():Observable<User[]>{
        return this.httpClient.get<User[]>(this.URL)
    }

    getUsersbygroup(groupId: number):Observable<User[]>{
      return this.httpClient.get<User[]>(`${this.URL}/${groupId}`)
    }
}
