package PI.dsi32.ToDoAppBack.Services; // Déclaration du package pour les services.

import java.util.List; // Importation de la classe List.

import PI.dsi32.ToDoAppBack.Entities.Task; // Importation de l'entité Task.

public interface ITaskService { // Interface définissant les opérations de service pour les tâches.
    
    List<Task> getAllTasks(); // Méthode pour récupérer toutes les tâches.
    
    Task addTask(Task task); // Méthode pour ajouter une nouvelle tâche.
    
    Task editTask(Task task); // Méthode pour modifier une tâche existante.
}
