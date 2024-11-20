import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comment } from '../classe/Comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  // L'URL de base pour accéder à l'API des commentaires
  private URL = 'http://localhost:8088/comments';

  constructor(private httpClient: HttpClient) {}

  // Fonction pour ajouter un commentaire
  addComment(comment: Comment): Observable<Comment> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.post<Comment>(`${this.URL}`, comment, { headers });
  }

  // Fonction pour récupérer les commentaires par ID de tâche
  getCommentsByTaskId(taskId: number): Observable<Comment[]> {
    return this.httpClient.get<Comment[]>(`${this.URL}/${taskId}`);
  }
}
