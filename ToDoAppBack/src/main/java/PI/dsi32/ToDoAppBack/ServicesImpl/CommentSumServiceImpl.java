package PI.dsi32.ToDoAppBack.ServicesImpl;

import PI.dsi32.ToDoAppBack.Entities.Comment;
import PI.dsi32.ToDoAppBack.Services.ICommentSumService;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpEntity;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

@Service
public class CommentSumServiceImpl implements ICommentSumService {
    private final String url="http://127.0.0.1:5000/summarize";
    @Override
    public String getCommentSum(List<Comment> comments) {
        String commentsDescription= "";
        for (Comment comment : comments) {
            commentsDescription += comment.getDescription() + " ";
        }

        System.out.println(commentsDescription);

        Map<String, String> requestBody = new HashMap<>();
        requestBody.put("text", commentsDescription);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Map<String, String>> request = new HttpEntity<>(requestBody, headers);
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = restTemplate.postForEntity(url, request, String.class);

        return response.getBody();
    }
}
