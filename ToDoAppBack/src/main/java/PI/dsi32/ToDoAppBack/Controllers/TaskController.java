package PI.dsi32.ToDoAppBack.Controllers;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import PI.dsi32.ToDoAppBack.Entities.Task;
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

    @PostMapping()
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



    @PutMapping(value = "/{id}", consumes = "application/json", produces = "application/json")
    public ResponseEntity<Task> updateTask(@RequestBody Task task) {
        try {
            task.setUpdatedAt(LocalDateTime.now());
            Task updatedTask = taskService.editTask(task);
            return new ResponseEntity<>(updatedTask, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity("Erreur lors de la mise à jour de la tâche : " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



    @PostMapping("/notifyUsers")
    public String notifyUsersBeforeTwoDays() {
        // Retrieve the list of all tasks from the service.
        List<Task> allTasks = taskService.getAllTasks();

        // Call the method to notify user groups for tasks that have a deadline in two days.
        taskService.notifyUsers(allTasks);

        return "Notification process completed. Users notified for tasks due in 2 days.";
    }


    @GetMapping("/users/{userId}")
    public List<Task> findByUserId(@PathVariable int userId){
        return taskService.findByUserId(userId);
    }
    
    @GetMapping("/groups/{groupId}")
    public List<Task> findByGrouprId(@PathVariable int groupId){
        return taskService.findByGroupId(groupId);
    }


    @GetMapping("/deadlines/{deadline}")
    public List<Task> findByDeadline(@PathVariable LocalDateTime deadline){
        return taskService.findByDeadline(deadline);
    }

    @GetMapping("/stat")
    public ResponseEntity<Long> getUserStat() {
        try{
            Long count = taskService.countTasks();

            return new ResponseEntity<>(count, HttpStatus.OK);
        }catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);

        }
    }


    @PostMapping("/descriptionSum")
    public ResponseEntity<String> getCommentsSum(@RequestBody String description){
        try {
            String res = taskService.getDescriptionSummary(description);
            return new ResponseEntity<>(res, HttpStatus.OK);
        }catch (Exception e) {
            return new ResponseEntity<>("the error:"+e, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
