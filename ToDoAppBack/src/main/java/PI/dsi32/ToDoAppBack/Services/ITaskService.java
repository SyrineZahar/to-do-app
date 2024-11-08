package PI.dsi32.ToDoAppBack.Services; // Déclaration du package pour les services.

import java.time.LocalDateTime;
import java.util.List; // Importation de la classe List.

import PI.dsi32.ToDoAppBack.Entities.Task; // Importation de l'entité Task.

public interface ITaskService { // Interface définissant les opérations de service pour les tâches.
    
    List<Task> getAllTasks(); // Méthode pour récupérer toutes les tâches.
    
    //Task addTask(Task task); // Méthode pour ajouter une nouvelle tâche.
    
    Task editTask(Task task); // Méthode pour modifier une tâche existante.
    

    void addTaskWithSQL(Task task, int userId, int groupId);

    void notifyUsers(List<Task> tasks);

    List<Task> findByUserId(int userId);

    List<Task> findByDeadline(LocalDateTime deadline);

    Long countTasks();

    String getDescriptionSummary(String description);


}
