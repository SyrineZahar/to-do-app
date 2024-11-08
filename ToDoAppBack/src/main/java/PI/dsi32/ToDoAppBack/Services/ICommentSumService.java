package PI.dsi32.ToDoAppBack.Services;

import PI.dsi32.ToDoAppBack.Entities.Comment;

import java.util.List;

public interface ICommentSumService {
    String getCommentSum(List<Comment> comments);
}
