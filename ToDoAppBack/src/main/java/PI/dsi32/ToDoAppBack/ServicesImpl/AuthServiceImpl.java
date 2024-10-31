package PI.dsi32.ToDoAppBack.ServicesImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import PI.dsi32.ToDoAppBack.Entities.User;
import PI.dsi32.ToDoAppBack.Repository.UserRepository;
import PI.dsi32.ToDoAppBack.Services.IAuthService;

@Service
public class AuthServiceImpl implements IAuthService{
	
	@Autowired
	private UserRepository userRepository;

	@Override
    public User registerUser(User user) {
        User existingUser = userRepository.findByEmail(user.getEmail());
        if (existingUser != null) {
            throw new RuntimeException("Email already exists.");
        }
        return userRepository.save(user);
    }
	
	
	@Override
	public User loginUser(String email, String password) {
	    password = password.trim();
	    User user = userRepository.findByEmail(email); // Assurez-vous que cette méthode renvoie un seul utilisateur.

	    if (user != null) {
	        String storedPassword = user.getPassword().trim();
	        if (storedPassword.equals(password)) {
	            return user;
	        }
	    }
	    return null; // Retourne null si l'utilisateur n'existe pas ou si le mot de passe est incorrect.
	}

	
}