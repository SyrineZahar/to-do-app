package PI.dsi32.ToDoAppBack.Repository;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import PI.dsi32.ToDoAppBack.Entities.Task;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface TaskRepository extends JpaRepository<Task, Integer> {

    @Modifying
    @Transactional
    @Query(value = "INSERT INTO task (title, description, status, deadline, created_at, updated_at, is_destactive, user_id, group_id) " +
                   "VALUES (:title, :description, :status, :deadline, :createdAt, :updatedAt, :isDestactive, :userId, :groupId)", nativeQuery = true)
    void addTaskWithSQL(
            @Param("title") String title,
            @Param("description") String description,
            @Param("status") String string,
            @Param("deadline") LocalDateTime deadline,
            @Param("createdAt") LocalDateTime createdAt,
            @Param("updatedAt") LocalDateTime updatedAt,
            @Param("isDestactive") boolean isDestactive,
            @Param("userId") int userId,
            @Param("groupId") int groupId
    );

    List<Task> findByUserIdAndGroupId(int userId, int groupId);
    
    List<Task> findByGroupId(int groupId);
    
    List<Task> findByDeadline(LocalDateTime deadline);

}
