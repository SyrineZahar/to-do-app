package PI.dsi32.ToDoAppBack.ServicesImpl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import PI.dsi32.ToDoAppBack.Entities.User;
import PI.dsi32.ToDoAppBack.Repository.UserRepository;
import PI.dsi32.ToDoAppBack.Services.IUserService;

@Service
public class UserServiceImpl implements IUserService{

	@Autowired
	private UserRepository userRepository;

	@Override
	public List<User> getAllUsers() {
		// TODO Auto-generated method stub
		return userRepository.findAll();
	}
	
	
	
	public Optional<User> getUserById(int userId) {
        return userRepository.findById(userId);
    }
	
	@Override
	public List<User> getUsersByGroupId(Integer groupId) {
        return userRepository.findUsersByGroupId(groupId); // Appelle le repository pour récupérer les utilisateurs du groupe.
    }

	
	@Override
	public User getDataUser(String email) {
	    User user = userRepository.findByEmail(email); // Assurez-vous que cette méthode renvoie un seul utilisateur.

	    if (user != null) {
	        return user;
	    }
	    return null; // Retourne null si l'utilisateur n'existe pas ou si le mot de passe est incorrect.
	}

	@Override
	public Long countUsers() {
		return userRepository.count();
	}
}
