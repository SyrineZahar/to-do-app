import { HttpClient, HttpHeaders } from '@angular/common/http'; // Pour effectuer des requêtes HTTP
import { Injectable } from '@angular/core'; // Pour déclarer le service injectable
import { catchError, map, Observable, throwError } from 'rxjs'; // Pour gérer les flux de données asynchrones
import { Task } from '../classe/Task'; // Importation de la classe Task

@Injectable({
  providedIn: 'root'
})
export class taskService {
    URL = 'http://localhost:8088/tasks';
  tasks$: any;

    constructor(private httpClient: HttpClient) { }

    getTasks(): Observable<Task[]> {
        return this.httpClient.get<Task[]>(this.URL); 
    }

    addTask(task: Task): Observable<string> {

        const payload = {
            title: task.title,
            description: task.description,
            status: task.status, 
            deadline: task.deadline.toISOString().slice(0, 19), 
            isDestactive: task.isDestactive,
            user_id: Number(task.user_id), 
            group_id: Number(task.group_id)  
        };
        
        return this.httpClient.post<{ message: string }>(this.URL, payload).pipe(
            map(response => response.message), 
            
            catchError(error => {
                console.error('Error:', error);
                return throwError('Error creating task, please try again later.');
            })
        );
    }
        


    editTask(task: Task): Observable<Task> {
        console.log("service task")
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.httpClient.put<Task>(`${this.URL}/${task.id}`, task)
    }


    getTasksByUserIdAndGroupId(userId: number, groupId:number) {
        return this.httpClient.get<Task[]>(`${this.URL}/${userId}/${groupId}`);
    }
    getTasksByGroupId(groupId: number) {
        return this.httpClient.get<Task[]>(`${this.URL}/groups/${groupId}`);
    }

    getTaskstat(): Observable<number> {
        return this.httpClient.get<number>(`${this.URL}/stat`);
    }

    getDescriptionSummary(description: string): Observable<{ summarized_text: string }> {
        return this.httpClient.post<{ summarized_text: string }>(`${this.URL}/descriptionSum`, { description });
    }  
    deleteTask(taskId:Number){
        return this.httpClient.delete(`${this.URL}/${taskId}`)
    }

    updateTask(taskId:Number, task: Task){
        return this.httpClient.put(`${this.URL}/${taskId}`, task)
    }
    notifyUsers(){
        return this.httpClient.post(`${this.URL}/notifyUsers`,'')
    }
}
