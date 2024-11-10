import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comment } from '../models/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private URL = 'http://localhost:8088/comments';

  constructor(private httpClient: HttpClient) {}

  // Ajouter un commentaire
  addComment(comment: Comment): Observable<Comment> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.post<Comment>(`${this.URL}`, comment, { headers });
  }

  // Récupérer les commentaires par ID de tâche
  getCommentsByTaskId(taskId: number): Observable<Comment[]> {
    return this.httpClient.get<Comment[]>(`${this.URL}/${taskId}`);
  }

  // Mettre à jour un commentaire par ID
  updateComment(id: number, comment: Comment): Observable<Comment> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.put<Comment>(`${this.URL}/${id}`, comment, { headers });
  }
}
