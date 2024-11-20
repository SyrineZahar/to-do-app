import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { Injectable } from '@angular/core'; 
import { Observable } from 'rxjs'; 
import { GroupEntity } from '../classe/GroupEntity';
import { User } from '../classe/User';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  // L'URL de base pour accéder à l'API des groupes
  URL = 'http://localhost:8088/groups'; 

  constructor(private httpClient: HttpClient) { }

  // Fonction pour récupérer la liste de tous les groupes
  getGroups(): Observable<GroupEntity[]> {
    return this.httpClient.get<GroupEntity[]>(this.URL); 
  }

  // Fonction pour ajouter un nouveau groupe
  addGroup(group: GroupEntity): Observable<GroupEntity> {
    console.log(group); 
  
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  
    return this.httpClient.post<GroupEntity>(this.URL, group, { headers });
  }

  // Fonction pour modifier un groupe existant
  editGroup(group: GroupEntity): Observable<GroupEntity> {
    return this.httpClient.put<GroupEntity>(`${this.URL}/${group.id}`, group); 
  }

  // Fonction pour récupérer les groupes d'un utilisateur spécifique
  getGroupsByUser(userId: Number): Observable<GroupEntity[]>{
    return this.httpClient.get<GroupEntity[]>(`${this.URL}/user/${userId}`);
  }

  // Fonction pour ajouter un utilisateur à un groupe
  addUserToGroup(groupId: number, user: User) {
    return this.httpClient.post<GroupEntity>(`${this.URL}/${groupId}/users`, user);
  }

  // Fonction pour récupérer des statistiques sur les groupes
  getGroupStat(): Observable<number> {
    return this.httpClient.get<number>(`${this.URL}/stat`);
  }

  // Fonction pour supprimer un groupe
  deleteGroup(groupId:Number){
    return this.httpClient.delete(`${this.URL}/${groupId}`)
  }
  
}
