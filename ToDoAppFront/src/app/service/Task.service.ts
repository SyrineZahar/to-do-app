import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs'; 
import { Task } from '../classe/Task'; 

@Injectable({
  providedIn: 'root'
})
export class taskService {

    // URL de base pour accéder à l'API des tâches
    URL = 'http://localhost:8088/tasks';

    constructor(private httpClient: HttpClient) { }

    // Fonction pour ajouter une tâche
    addTask(task: Task): Observable<string> {

        const payload = {
            title: task.title,
            description: task.description,
            status: task.status, 
            deadline: task.deadline.toISOString().slice(0, 19), 
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
        
    // Fonction pour modifier une tâche existante
    editTask(task: Task): Observable<Task> {
        console.log("service task")
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.httpClient.put<Task>(`${this.URL}/${task.id}`, task)
    }

    // Fonction pour récupérer les tâches d'un utilisateur et d'un groupe
    getTasksByUserIdAndGroupId(userId: number, groupId:number) {
        return this.httpClient.get<Task[]>(`${this.URL}/${userId}/${groupId}`);
    }
    
    // Fonction pour récupérer les tâches d'un groupe
    getTasksByGroupId(groupId: number) {
        return this.httpClient.get<Task[]>(`${this.URL}/groups/${groupId}`);
    }

    // Fonction pour récupérer des statistiques sur les tâches
    getTaskstat(): Observable<number> {
        return this.httpClient.get<number>(`${this.URL}/stat`);
    }

    // Fonction pour résumer la description d'une tâche
    getDescriptionSummary(description: string): Observable<{ summarized_text: string }> {
        return this.httpClient.post<{ summarized_text: string }>(`${this.URL}/descriptionSum`, { description });
    }  

    // Fonction pour supprimer une tâche
    deleteTask(taskId:Number){
        return this.httpClient.delete(`${this.URL}/${taskId}`)
    }
    
    // Fonction pour notifier les utilisateurs
    notifyUsers(){
        return this.httpClient.post(`${this.URL}/notifyUsers`,'')
    }
}
