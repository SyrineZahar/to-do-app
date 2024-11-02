package PI.dsi32.ToDoAppBack.ServicesImpl; // Déclaration du package pour les implémentations de services.

import java.time.LocalDateTime;
import java.util.List; // Importation de la classe List.
import java.util.stream.Collectors;

import PI.dsi32.ToDoAppBack.Entities.User;
import PI.dsi32.ToDoAppBack.enums.TaskStatus;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired; // Importation de l'annotation Autowired.
import org.springframework.stereotype.Service; // Importation de l'annotation Service.

import PI.dsi32.ToDoAppBack.Entities.Task; // Importation de l'entité Task.
import PI.dsi32.ToDoAppBack.Repository.TaskRepository; // Importation du dépôt TaskRepository.
import PI.dsi32.ToDoAppBack.Services.ITaskService; // Importation de l'interface ITaskService.

@Service // Annotation indiquant que cette classe est un service Spring.
public class TaskServiceImpl implements ITaskService {
    private static final Logger log = LoggerFactory.getLogger(TaskServiceImpl.class); // Classe implémentant l'interface ITaskService.

    @Autowired // Injection de dépendance pour le dépôt TaskRepository.
    private TaskRepository taskRepo;

    @Autowired
    private EmailSender emailSender;

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



    @Override
    public void notifyUsers(List<Task> tasks) {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime twoDaysBeforeDeadline = now.plusDays(2);

        List<Task> tasksDueInTwoDays = tasks.stream()
                .filter(task -> task.getDeadline().toLocalDate().equals(twoDaysBeforeDeadline.toLocalDate())
                        && task.getStatus() != TaskStatus.DONE)
                .collect(Collectors.toList());

        if (tasksDueInTwoDays.isEmpty()) {
            System.out.println("No tasks due in 2 days.");
        } else {
            System.out.println("Tasks due in 2 days:");
            for (Task task : tasksDueInTwoDays) {
                System.out.println("Task ID: " + task.getId() +
                        ", Title: " + task.getTitle() +
                        ", Deadline: " + task.getDeadline() +
                        ", Group: " + (task.getGroup() != null ? task.getGroup().getNom() : "No group"));
            }
        }

        for (Task task : tasksDueInTwoDays) {
            System.out.println("before1 "+task.getGroup().getUsers()); // Print user's email

            for (User user : task.getGroup().getUsers()) {
                System.out.println("before2 "); // Print user's email

                System.out.println("Notifying user: " + user.getName()); // Print user's email
                emailSender.sendSimpleEmail(user, "Reminder: Task \"" + task.getTitle() + "\" is due in 2 days.");
            }
        }
    }

}
