// Importation des modules nécessaires
import { HttpClient, HttpHeaders } from '@angular/common/http'; // Pour effectuer des requêtes HTTP
import { Injectable } from '@angular/core'; // Pour déclarer le service injectable
import { catchError, map, Observable, throwError } from 'rxjs'; // Pour gérer les flux de données asynchrones
import { Task } from '../classe/Task'; // Importation de la classe Task

// Déclaration du service avec l'injection dans le root module
@Injectable({
  providedIn: 'root'
})
export class taskService {
    // URL de l'API pour accéder aux tâches
    URL = 'http://localhost:8088/tasks';
  tasks$: any;

    // Injection du HttpClient dans le constructeur
    constructor(private httpClient: HttpClient) { }

    // Méthode pour récupérer toutes les tâches
    getTasks(): Observable<Task[]> {
        return this.httpClient.get<Task[]>(this.URL); // Renvoie un Observable d'un tableau de tâches
    }

    // Méthode pour ajouter une nouvelle tâche
    addTask(task: Task): Observable<string> {

        // Créer un payload conforme au format attendu par le backend
        const payload = {
            title: task.title,
            description: task.description,
            status: task.status, // Assurez-vous que `status` est une chaîne et correspond à la valeur attendue
            deadline: task.deadline.toISOString().slice(0, 19), // Convertir en format ISO si nécessaire
            isDestactive: task.isDestactive,
            user_id: Number(task.user_id), // Assurez-vous que `userId` est correctement défini dans votre objet `task`
            group_id: Number(task.group_id)  // Assurez-vous que `groupId` est correctement défini dans votre objet `task`
        };
        
        return this.httpClient.post<{ message: string }>(this.URL, payload).pipe(
            map(response => response.message), // Extraire le message de la réponse
            
            catchError(error => {
                console.error('Error:', error);
                return throwError('Error creating task, please try again later.');
            })
        );
    }
        


    // Méthode pour éditer une tâche existante
    editTask(task: Task): Observable<Task> {
        console.log("service task")
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.httpClient.put<Task>(`${this.URL}/${task.id}`, task)// Met à jour la tâche en fonction de son ID
    }


    getTasksByUserId(userId: number) {
        return this.httpClient.get<Task[]>(`${this.URL}/${userId}`); // Correctly constructs the URL with userId
    }
    getTasksByGroupId(groupId: number) {
        return this.httpClient.get<Task[]>(`${this.URL}/groups/${groupId}`);
    }


    getTaskstat(): Observable<number> {
        return this.httpClient.get<number>(`${this.URL}/stat`);
    }
      
}
