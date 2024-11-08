package PI.dsi32.ToDoAppBack.Controllers;

import PI.dsi32.ToDoAppBack.Entities.Comment;
import PI.dsi32.ToDoAppBack.Services.ICommentSumService;
import PI.dsi32.ToDoAppBack.ServicesImpl.CommentSumServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/commentsSummarization")
public class CommentSumController {

    @Autowired
    private ICommentSumService commentSumService;

    @PostMapping
    public ResponseEntity<String> getCommentsSum(@RequestBody List<Comment> comments){
        try {
            String res = commentSumService.getCommentSum(comments);
            return new ResponseEntity<>(res, HttpStatus.OK);
        }catch (Exception e) {
            return new ResponseEntity<>("the error:"+e, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


}
