package PI.dsi32.ToDoAppBack.Services;

import PI.dsi32.ToDoAppBack.Entities.Comment;

import java.util.List;

public interface ICommentService {
    Comment addComment(Comment comment);
    List<Comment> getCommentByTaskId(int taskId);
    void deleteCommentByTaskId(int taskId);
}
