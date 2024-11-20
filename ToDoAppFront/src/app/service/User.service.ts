import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../classe/User';

@Injectable({
  providedIn: 'root'
})
export class userService {

    // URL de base pour accéder à l'API des utilisateurs
    URL='http://localhost:8088/users'

    constructor(private httpClient:HttpClient) { }
    
    // Fonction pour récupérer la liste de tous les utilisateurs
    getUsers():Observable<User[]>{
        return this.httpClient.get<User[]>(this.URL)
    }
    // Fonction pour récupérer les données d'un utilisateur basé sur son email
    getUserData(email: string): Observable<any> {
      const Data = { email};
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' }); 
      
      return this.httpClient.post<any>(`${this.URL}/getData`, Data, { headers });
    }

    // Fonction pour récupérer un utilisateur en utilisant son ID
    getUserById(userId: number): Observable<User> {
      return this.httpClient.get<User>(`${this.URL}/name/${userId}`);
    }

    // Fonction pour récupérer les utilisateurs d'un groupe spécifique
    getUsersbygroup(groupId: number):Observable<User[]>{
      return this.httpClient.get<User[]>(`${this.URL}/${groupId}`)
    }

    // Fonction pour récupérer des statistiques sur les utilisateurs
    getUserstat(): Observable<number> {
      return this.httpClient.get<number>(`${this.URL}/stat`);
    }

    // Fonction pour récupérer un utilisateur par l'ID d'une tâche spécifique
    getUserByTaskId(taskId: number): Observable<User> {
      return this.httpClient.get<User>(`${this.URL}/taskId/${taskId}`);
    }
}
