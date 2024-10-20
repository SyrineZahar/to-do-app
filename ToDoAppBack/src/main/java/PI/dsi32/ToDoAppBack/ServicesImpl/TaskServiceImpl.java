package PI.dsi32.ToDoAppBack.ServicesImpl; // Déclaration du package pour les implémentations de services.

import java.util.List; // Importation de la classe List.

import org.springframework.beans.factory.annotation.Autowired; // Importation de l'annotation Autowired.
import org.springframework.stereotype.Service; // Importation de l'annotation Service.

import PI.dsi32.ToDoAppBack.Entities.GroupEntity;
import PI.dsi32.ToDoAppBack.Entities.Task; // Importation de l'entité Task.
import PI.dsi32.ToDoAppBack.Entities.User;
import PI.dsi32.ToDoAppBack.Repository.GroupRepository;
import PI.dsi32.ToDoAppBack.Repository.TaskRepository; // Importation du dépôt TaskRepository.
import PI.dsi32.ToDoAppBack.Repository.UserRepository;
import PI.dsi32.ToDoAppBack.Services.ITaskService; // Importation de l'interface ITaskService.

@Service // Annotation indiquant que cette classe est un service Spring.
public class TaskServiceImpl implements ITaskService { // Classe implémentant l'interface ITaskService.

    @Autowired // Injection de dépendance pour le dépôt TaskRepository.
    private TaskRepository taskRepo;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private GroupRepository groupRepository;

    @Override
    public List<Task> getAllTasks() {
        // Récupère toutes les tâches à partir du dépôt.
        return taskRepo.findAll();
    }

    @Override
    public Task addTask(Task task) {
        User user = userRepository.findById(task.getUser().getId())
                .orElseThrow(() -> new RuntimeException("User not found with id: " + task.getUser()));

        GroupEntity group = groupRepository.findById(task.getGroup().getId())
                .orElseThrow(() -> new RuntimeException("Group not found with id: " + task.getGroup().getId()));


        task.setUser(user);
        task.setGroup(group);

        // Save the task and return the saved entity
        return taskRepo.save(task);
    }


    @Override
    public Task editTask(Task task) {
        // Met à jour une tâche existante dans le dépôt et retourne la tâche mise à jour.
        return taskRepo.save(task);
    }
}
