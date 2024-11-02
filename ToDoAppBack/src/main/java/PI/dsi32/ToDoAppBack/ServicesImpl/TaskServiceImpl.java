package PI.dsi32.ToDoAppBack.ServicesImpl; // Déclaration du package pour les implémentations de services.

import java.time.LocalDateTime;
import java.util.List; // Importation de la classe List.

import org.springframework.beans.factory.annotation.Autowired; // Importation de l'annotation Autowired.
import org.springframework.stereotype.Service; // Importation de l'annotation Service.

import PI.dsi32.ToDoAppBack.Entities.Task; // Importation de l'entité Task.
import PI.dsi32.ToDoAppBack.Repository.TaskRepository; // Importation du dépôt TaskRepository.
import PI.dsi32.ToDoAppBack.Services.ITaskService; // Importation de l'interface ITaskService.

@Service // Annotation indiquant que cette classe est un service Spring.
public class TaskServiceImpl implements ITaskService { // Classe implémentant l'interface ITaskService.

    @Autowired // Injection de dépendance pour le dépôt TaskRepository.
    private TaskRepository taskRepo;

    @Override
    public List<Task> getAllTasks() {
        // Récupère toutes les tâches à partir du dépôt.
        return taskRepo.findAll();
    }

    
    public void addTaskWithSQL(Task task, int userId, int groupId) {
        taskRepo.addTaskWithSQL(
            task.getTitle(),
            task.getDescription(),
            task.getStatus().name(),
            task.getDeadline(),
            LocalDateTime.now(),  // createdAt
            LocalDateTime.now(),  // updatedAt
            task.isDestactive(),
            userId,  // user_id passé directement
            groupId  // group_id passé directement
        );
    }



    @Override
    public Task editTask(Task task) {
        // Met à jour une tâche existante dans le dépôt et retourne la tâche mise à jour.
        return taskRepo.save(task);
    }


}
