import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { Injectable } from '@angular/core'; 
import { Observable } from 'rxjs'; 
import { GroupEntity } from '../classe/GroupEntity';
import { User } from '../classe/User';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  URL = 'http://localhost:8088/groups'; 

  constructor(private httpClient: HttpClient) { }

  getGroups(): Observable<GroupEntity[]> {
    return this.httpClient.get<GroupEntity[]>(this.URL); 
  }

  addGroup(group: GroupEntity): Observable<GroupEntity> {
    console.log(group); 
  
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  
    return this.httpClient.post<GroupEntity>(this.URL, group, { headers });
  }

  editGroup(group: GroupEntity): Observable<GroupEntity> {
    return this.httpClient.put<GroupEntity>(`${this.URL}/${group.id}`, group); 
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
  getGroupStat(): Observable<number> {
    return this.httpClient.get<number>(`${this.URL}/stat`);
  }

  deleteGroup(groupId:Number){
    return this.httpClient.delete(`${this.URL}/${groupId}`)
  }
  
}
