package PI.dsi32.ToDoAppBack.ServicesImpl;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import PI.dsi32.ToDoAppBack.Entities.User;
import PI.dsi32.ToDoAppBack.enums.TaskStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import PI.dsi32.ToDoAppBack.Entities.Task;
import PI.dsi32.ToDoAppBack.Repository.TaskRepository;
import PI.dsi32.ToDoAppBack.Services.ITaskService;
import org.springframework.web.client.RestTemplate;

@Service
public class TaskServiceImpl implements ITaskService {
    //URL d'un module Flask pour le résume d'une description
    private final String url="http://127.0.0.1:5000/summarize";

    @Autowired
    private TaskRepository taskRepo;

    @Autowired
    private EmailSender emailSender;

    // Récupère toutes les tâches à partir du dépôt.
    @Override
    public List<Task> getAllTasks() {
        return taskRepo.findAll();
    }

    
    public void addTaskWithSQL(Task task, int userId, int groupId) {
        taskRepo.addTaskWithSQL(
            task.getTitle(),
            task.getDescription(),
            task.getStatus().name(),
            task.getDeadline(),
            LocalDateTime.now(),
            LocalDateTime.now(),
            userId,
            groupId
        );
    }

    //mise à jour et retourne d'une tache
    @Override
    public Task editTask(Task task) {
        Task existingTask = taskRepo.findById(task.getId())
            .orElseThrow(() -> new IllegalArgumentException("Task not found with id: " + task.getId()));
        existingTask.setStatus(task.getStatus());
        return taskRepo.save(existingTask);
    }

    //l'envoi des notification (email) au utilisateur pour les tâches non faites et son dll apres 2j
    @Override
    public void notifyUsers(List<Task> tasks) {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime twoDaysBeforeDeadline = now.plusDays(2);

        List<Task> tasksDueInTwoDays = tasks.stream()
                .filter(task -> task.getDeadline().toLocalDate().equals(twoDaysBeforeDeadline.toLocalDate())
                        && task.getStatus() != TaskStatus.DONE)
                .toList();

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
            for (User user : task.getGroup().getUsers()) {
                System.out.println("Notifying user: " + user.getName());
                emailSender.sendSimpleEmail(user, "Reminder: Task \"" + task.getTitle() + "\" is due in 2 days.");
            }
        }
    }

    //recupere les tâches associées à un utilisateur et à un groupe spécifiques
    @Override
    public List<Task> findByUserIdAndGroupId(int userId, int groupId) {
        return taskRepo.findByUserIdAndGroupId(userId, groupId);
    }

    //recupere les taches associées à un groupe spécifique
    @Override
    public List<Task> findByGroupId(int groupId) {
        return taskRepo.findByGroupId(groupId);
    }

    // recupere le nbr des taches
    @Override
    public Long countTasks() {
        return taskRepo.count();
    }

    // consomme l'api flask pour l'utilisateur d'un ai pour le résumé la description d'une tache
    @Override
    public String getDescriptionSummary(String Description) {
        Map<String, String> requestBody = new HashMap<>();

        requestBody.put("text", Description);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Map<String, String>> request = new HttpEntity<>(requestBody, headers);
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = restTemplate.postForEntity(url, request, String.class);

        return response.getBody();
    }

    //suppression d'une tache
    @Override
    public void deleteTask(int taskId) {
        taskRepo.deleteById(taskId);
    }


}
