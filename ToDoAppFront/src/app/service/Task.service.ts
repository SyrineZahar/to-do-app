// Importation des modules nécessaires
import { HttpClient } from '@angular/common/http'; // Pour effectuer des requêtes HTTP
import { Injectable } from '@angular/core'; // Pour déclarer le service injectable
import { Observable } from 'rxjs'; // Pour gérer les flux de données asynchrones
import { Task } from '../classe/Task'; // Importation de la classe Task

// Déclaration du service avec l'injection dans le root module
@Injectable({
  providedIn: 'root'
})
export class taskService {
    // URL de l'API pour accéder aux tâches
    URL = 'http://localhost:8088/tasks';

    // Injection du HttpClient dans le constructeur
    constructor(private httpClient: HttpClient) { }

    // Méthode pour récupérer toutes les tâches
    getTasks(): Observable<Task[]> {
        return this.httpClient.get<Task[]>(this.URL); // Renvoie un Observable d'un tableau de tâches
    }

    // Méthode pour ajouter une nouvelle tâche
    addTask(task: Task): Observable<Task> {
        console.log(task); // Log l'objet de la tâche pour le débogage
        return this.httpClient.post<Task>(this.URL, task); // Envoie la tâche à l'API et renvoie l'Observable
    }

    // Méthode pour éditer une tâche existante
    editTask(task: Task): Observable<Task> {
        return this.httpClient.put<Task>(`${this.URL}/${task.id}`, task); // Met à jour la tâche en fonction de son ID
    }
}
