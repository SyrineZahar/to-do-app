package PI.dsi32.ToDoAppBack.Controllers;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.hibernate.boot.archive.scan.spi.ScanParameters;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import PI.dsi32.ToDoAppBack.Entities.Task;
import PI.dsi32.ToDoAppBack.Entities.User;
import PI.dsi32.ToDoAppBack.Repository.GroupRepository;
import PI.dsi32.ToDoAppBack.Repository.UserRepository;
import PI.dsi32.ToDoAppBack.Services.IUserService;
import PI.dsi32.ToDoAppBack.ServicesImpl.TaskServiceImpl;
import PI.dsi32.ToDoAppBack.enums.TaskStatus;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/tasks")
public class TaskController {

    @Autowired
    private TaskServiceImpl taskService;

    @GetMapping()
    public ResponseEntity<List<Task>> getAllTasks() {
        try {
            List<Task> tasks = taskService.getAllTasks();
            return new ResponseEntity<>(tasks, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping
    public ResponseEntity<Map<String, String>> addTask(@RequestBody Map<String, Object> payload) {
        try {
            // Extraire les valeurs du payload
            String title = (String) payload.get("title");
            String description = (String) payload.get("description");
            String statusStr = (String) payload.get("status");
            LocalDateTime deadline = LocalDateTime.parse((String) payload.get("deadline"));
            boolean isDestactive = (boolean) payload.get("isDestactive");
            int userId = (int) payload.get("user_id");
            int groupId = (int) payload.get("group_id");

            // Convertir le statut de la tâche en énumération
            TaskStatus status = TaskStatus.valueOf(statusStr.toUpperCase()); // Assurez-vous que l'énumération correspond à la chaîne

            // Créer une nouvelle tâche

            IUserService userService;
            Task task = new Task();
            task.setTitle(title);
            task.setDescription(description);
            task.setStatus(status);
            task.setDeadline(deadline);
            task.setDestactive(isDestactive);

            // Appeler le service avec userId et groupId
            taskService.addTaskWithSQL(task, userId, groupId);
            Map<String, String> response = new HashMap<>();
            response.put("message", "Task created successfully");
            
            // Retourner une réponse avec le code HTTP 201 (Created)
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
            
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(Map.of("error", "Invalid task status: " + e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of("error", "Error creating task: " + e.getMessage()));
        }
    }



    @PutMapping("/{id}")
    public ResponseEntity<Task> updateTask(@RequestBody Task task) {
        try {
        	System.out.println(task);
        	task.setUpdatedAt(LocalDateTime.now()); 
            Task updatedTask = taskService.editTask(task);
            return new ResponseEntity<>(updatedTask, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity("Error updating task: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
