package PI.dsi32.ToDoAppBack.ServicesImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

import PI.dsi32.ToDoAppBack.Entities.User;
import PI.dsi32.ToDoAppBack.Repository.UserRepository;
import PI.dsi32.ToDoAppBack.Services.IAuthService;

@Service
public class AuthServiceImpl implements IAuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RestTemplate restTemplate;

    private final String NODE_API_URL = "http://localhost:3001"; // URL de l'API Node.js

    // enregistrement de l'utilisateur avec hashage du mot de passe à l'aide d'un module externe node
    @Override
    public User registerUser(User user) {
        User existingUser = userRepository.findByEmail(user.getEmail());
        if (existingUser != null) {
            throw new RuntimeException("Email already exists.");
        }

        String hashEndpoint = NODE_API_URL + "/hash";
        Map<String, String> request = new HashMap<>();
        request.put("password", user.getPassword());

        Map<String, String> response = restTemplate.postForObject(hashEndpoint, request, Map.class);
        String hashedPassword = response.get("hashedPassword");

        user.setPassword(hashedPassword);
        return userRepository.save(user);
    }

    // login d'un utilisateur avec un module externe node pour la partie hashage
    @Override
    public User loginUser(String email, String password) {
        User user = userRepository.findByEmail(email);
        if (user != null) {
            String verifyEndpoint = NODE_API_URL + "/verify";

            Map<String, String> request = new HashMap<>();
            request.put("password", password);
            request.put("hashedPassword", user.getPassword());

            Map<String, Boolean> response = restTemplate.postForObject(verifyEndpoint, request, Map.class);
            Boolean isMatch = response.get("isMatch");

            if (isMatch != null && isMatch) {
                return user;
            }
        }
        return null; 
    }
}
