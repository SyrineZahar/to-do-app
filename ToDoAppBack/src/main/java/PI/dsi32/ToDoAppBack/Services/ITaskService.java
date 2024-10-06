package PI.dsi32.ToDoAppBack.Services;

import java.util.List;
// Importation de la classe List
import PI.dsi32.ToDoAppBack.Entities.Task;
// Importation de la classe Task
public interface ITaskService {
    List<Task> getAllTasks();
    //Cette méthode est utilisée pour récupérer toutes les tâches présentes dans le système. Elle retourne une liste d'objets Task.
    Task addTask(Task task);
//Ajoute une nouvelle tâche.

}
/**
 * Interface représentant les services liés à la gestion des tâches.
 * Fournit des méthodes pour récupérer toutes les tâches et ajouter une nouvelle tâche.
 */
