import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comment } from '../classe/Comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private URL = 'http://localhost:8088/comments';

  constructor(private httpClient: HttpClient) {}

  addComment(comment: Comment): Observable<Comment> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.post<Comment>(`${this.URL}`, comment, { headers });
  }

  getCommentsByTaskId(taskId: number): Observable<Comment[]> {
    return this.httpClient.get<Comment[]>(`${this.URL}/${taskId}`);
  }
}
