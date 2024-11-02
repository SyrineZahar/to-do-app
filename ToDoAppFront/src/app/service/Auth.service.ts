import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../classe/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    URL = 'http://localhost:8088/auth';

    constructor(private http: HttpClient) {}

    registerUser(user: User): Observable<User> {
        return this.http.post<User>(`${this.URL}/register`, user);
    }

    login(email: string, password: string): Observable<any> {
        const loginData = { email, password };
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' }); 
        
        return this.http.post<any>(`${this.URL}/login`, loginData, { headers });
    }

    

    setUser(user: User) {
        sessionStorage.setItem('user', JSON.stringify(user));
    }

    getUser(): User | null {
        const user = sessionStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    }

    isLoggedIn(): boolean {
        return this.getUser() !== null;
    }

    logout() {
        sessionStorage.removeItem('user');
    }
}
