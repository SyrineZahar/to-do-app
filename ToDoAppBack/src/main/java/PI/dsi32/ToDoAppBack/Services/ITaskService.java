package PI.dsi32.ToDoAppBack.Services;

import java.time.LocalDateTime;
import java.util.List;

import PI.dsi32.ToDoAppBack.Entities.Task;

public interface ITaskService {
    
    List<Task> getAllTasks();
    

    Task editTask(Task task);


    void addTaskWithSQL(Task task, int userId, int groupId);

    void notifyUsers(List<Task> tasks);

    List<Task> findByUserIdAndGroupId(int userId, int groupId);
    
    List<Task> findByGroupId(int groupId);

    Long countTasks();

    String getDescriptionSummary(String description);

    void deleteTask(int taskId);
}
