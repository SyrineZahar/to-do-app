// Importation des modules nécessaires
import { HttpClient } from '@angular/common/http'; // Pour effectuer des requêtes HTTP
import { Injectable } from '@angular/core'; // Pour déclarer le service injectable
import { Observable } from 'rxjs'; // Pour gérer les flux de données asynchrones
import { GroupEntity } from '../classe/GroupEntity'; // Importation de la classe GroupEntity
import { User } from '../classe/User';

// Déclaration du service avec l'injection dans le root module
@Injectable({
  providedIn: 'root'
})
export class GroupService {
  // URL de l'API pour accéder aux groupes
  URL = 'http://localhost:8088/groups'; // Adaptez cette URL à votre API

  // Injection du HttpClient dans le constructeur
  constructor(private httpClient: HttpClient) { }

  // Méthode pour récupérer tous les groupes
  getGroups(): Observable<GroupEntity[]> {
    return this.httpClient.get<GroupEntity[]>(this.URL); // Renvoie un Observable d'un tableau de groupes
  }

  // Méthode pour ajouter un nouveau groupe
  addGroup(group: GroupEntity): Observable<GroupEntity> {
    console.log(group); // Log l'objet du groupe pour le débogage
    return this.httpClient.post<GroupEntity>(this.URL, group); // Envoie le groupe à l'API et renvoie l'Observable
  }

  // Méthode pour éditer un groupe existant
  editGroup(group: GroupEntity): Observable<GroupEntity> {
    return this.httpClient.put<GroupEntity>(`${this.URL}/${group.id}`, group); // Met à jour le groupe en fonction de son ID
  }

  getGroupsByUser(userId: Number): Observable<GroupEntity[]>{
    return this.httpClient.get<GroupEntity[]>(`${this.URL}/user/${userId}`);
  }

  getGroupsById(groupId: Number): Observable<GroupEntity>{
    return this.httpClient.get<GroupEntity>(`${this.URL}/${groupId}`);
  }

  addUserToGroup(groupId: number, user: User) {
    return this.httpClient.post<GroupEntity>(`${this.URL}/${groupId}/users`, user);
  }
  
  
}
