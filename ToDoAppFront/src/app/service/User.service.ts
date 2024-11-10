import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../classe/User';

@Injectable({
  providedIn: 'root'
})
export class userService {
    getUser(userId: any) {
      throw new Error('Method not implemented.');
    }
    URL='http://localhost:8088/users'

    constructor(private httpClient:HttpClient) { }
    
    getUsers():Observable<User[]>{
        return this.httpClient.get<User[]>(this.URL)
    }
    getUserData(email: string): Observable<any> {
      const Data = { email};
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' }); 
      
      return this.httpClient.post<any>(`${this.URL}/getData`, Data, { headers });
  }

    getUsersbygroup(groupId: number):Observable<User[]>{
      return this.httpClient.get<User[]>(`${this.URL}/${groupId}`)
    }

    getUserstat(): Observable<number> {
      return this.httpClient.get<number>(`${this.URL}/stat`);
  }
}
