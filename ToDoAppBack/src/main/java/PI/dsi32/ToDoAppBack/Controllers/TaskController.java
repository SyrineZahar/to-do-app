package PI.dsi32.ToDoAppBack.Controllers;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


import PI.dsi32.ToDoAppBack.ServicesImpl.CommentServiceImpl;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import PI.dsi32.ToDoAppBack.Entities.Task;
import PI.dsi32.ToDoAppBack.ServicesImpl.TaskServiceImpl;
import PI.dsi32.ToDoAppBack.enums.TaskStatus;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/tasks")
public class TaskController {

    @Autowired
    private TaskServiceImpl taskService;

    @Autowired
    private CommentServiceImpl commentService;

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
            String title = (String) payload.get("title");
            System.out.println(title);
            String description = (String) payload.get("description");
            System.out.println(description);

            String statusStr = (String) payload.get("status");
            System.out.println(statusStr);

            LocalDateTime deadline = LocalDateTime.parse((String) payload.get("deadline"));
            System.out.println(deadline);

            boolean isDestactive = (boolean) payload.get("isDestactive");
            System.out.println(isDestactive);

            if (!payload.containsKey("user_id") || payload.get("user_id") == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(Map.of("error", "user_id is missing or null"));
            }
            int userId = ((Number) payload.get("user_id")).intValue();
            System.out.println("userId: " + userId);

            if (!payload.containsKey("group_id") || payload.get("group_id") == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(Map.of("error", "group_id is missing or null"));
            }
            int groupId = ((Number) payload.get("group_id")).intValue();
            System.out.println("groupId: " + groupId);


            //TaskStatus status = TaskStatus.valueOf(statusStr.toUpperCase());

            Task task = new Task();
            task.setTitle(title);
            task.setDescription(description);
            task.setStatus(TaskStatus.valueOf(statusStr));
            task.setDeadline(deadline);
            task.setDestactive(isDestactive);

            taskService.addTaskWithSQL(task, userId, groupId);

            Map<String, String> response = new HashMap<>();
            response.put("message", "Task created successfully");

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
    public ResponseEntity<Task> updateTask(@RequestBody Task task, @PathVariable int id) {
        try {
            task.setUpdatedAt(LocalDateTime.now());
            task.setId(id);
            Task updatedTask = taskService.editTask(task);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return new ResponseEntity("Erreur lors de la mise à jour de la tâche : " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



    @PostMapping("/notifyUsers")
    public ResponseEntity<String> notifyUsersBeforeTwoDays() {
        try {
            List<Task> allTasks = taskService.getAllTasks();
            taskService.notifyUsers(allTasks);

            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);

        }
    }


    @GetMapping("/{userId}/{groupId}")
    public List<Task> findByUserIdAndGroupId(@PathVariable int userId,@PathVariable int groupId){
        return taskService.findByUserIdAndGroupId(userId,groupId);
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
    public ResponseEntity<Long> getTaskStat() {
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
    @Transactional
    @DeleteMapping("/{taskId}")
    public ResponseEntity<String> deleteTask(@PathVariable int taskId){
        try{
            commentService.deleteCommentByTaskId(taskId);
            taskService.deleteTask(taskId);
            return ResponseEntity.ok().build();
        }
        catch (Exception e) {
            return new ResponseEntity<>("the error:"+e, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
