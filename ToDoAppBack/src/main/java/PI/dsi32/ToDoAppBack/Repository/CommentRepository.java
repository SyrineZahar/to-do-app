package PI.dsi32.ToDoAppBack.Repository;

import PI.dsi32.ToDoAppBack.Entities.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Integer> {
}
