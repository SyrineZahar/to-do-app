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
	
	
	@Override
	public Optional<User> getUserById(int userId) {
        return userRepository.findById(userId);
    }
	
	@Override
	public Optional<User> getUserByTask(Integer taskId) {
        return userRepository.findUserByTaskId(taskId);
    }

	// récupération les utilisateurs du groupe.
	@Override
	public List<User> getUsersByGroupId(Integer groupId) {
        return userRepository.findUsersByGroupId(groupId);
    }

	//recuperation d'un utilisateur par son email sinon retourne null
	@Override
	public User getDataUser(String email) {
	    User user = userRepository.findByEmail(email);

	    if (user != null) {
	        return user;
	    }
	    return null;
	}

	//recupere le nbr des utilisateurs enregistré
	@Override
	public Long countUsers() {
		return userRepository.count();
	}
}
