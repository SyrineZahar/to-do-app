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
    //ajout et retourne d'un commentaires
    @Override
    public Comment addComment(Comment comment) {
        return commentRepository.save(comment);
    }

    //recuperation et retourne d'un commentaire specifique à une tâche
    @Override
    public List<Comment> getCommentByTaskId(int taskId) {
        return commentRepository.getCommentByTaskId(taskId);
    }

    //suppression des commentaires spécifique à d'un tâche
    @Override
    public void deleteCommentByTaskId(int taskId) {
        commentRepository.deleteByTaskId(taskId);
    }
}
