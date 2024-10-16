// Importation des modules nécessaires
import { HttpClient, HttpHeaders } from '@angular/common/http'; // Pour effectuer des requêtes HTTP
import { Injectable } from '@angular/core'; // Pour déclarer le service injectable
import { Observable } from 'rxjs'; // Pour gérer les flux de données asynchrones
import { User } from '../classe/User';

// Déclaration du service avec l'injection dans le root module
@Injectable({
  providedIn: 'root'
})
export class AuthService {
    // URL de l'API pour accéder aux tâches
    URL = 'http://localhost:8088/auth';

    constructor(private http: HttpClient) {}

    registerUser(user: User): Observable<User> {
        return this.http.post<User>(`${this.URL}/register`, user);
    }

    login(email: string, password: string): Observable<any> {
      const loginData = { email: email, password: password };  
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' }); 
      

      
      return this.http.post<any>(`${this.URL}/login`, loginData, { headers: headers });
    }
}
