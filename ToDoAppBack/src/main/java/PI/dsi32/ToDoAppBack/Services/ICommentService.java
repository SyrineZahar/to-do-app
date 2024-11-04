package PI.dsi32.ToDoAppBack.Services;

import PI.dsi32.ToDoAppBack.Entities.Comment;

import java.util.List;

public interface ICommentService {
    List<Comment> getAllComments();
    Comment addComment(Comment comment);
    Comment updateComment(Comment comment);
    void deleteComment(Comment comment);
}
