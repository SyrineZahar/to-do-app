package PI.dsi32.ToDoAppBack.ServicesImpl;

import PI.dsi32.ToDoAppBack.Entities.Comment;
import PI.dsi32.ToDoAppBack.Repository.CommentRepository;
import PI.dsi32.ToDoAppBack.Services.ICommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentServiceImpl implements ICommentService {

    @Autowired
    private CommentRepository commentRepository;

    @Override
    public Comment addComment(Comment comment) {
        return commentRepository.save(comment);
    }

    @Override
    public Comment updateComment(Comment comment) {
        return commentRepository.save(comment);
    }

    @Override
    public void deleteComment(Comment comment) {
        commentRepository.delete(comment);
    }

    @Override
    public List<Comment> getCommentByTaskId(int taskId) {
        return commentRepository.getCommentByTaskId(taskId);
    }
}
