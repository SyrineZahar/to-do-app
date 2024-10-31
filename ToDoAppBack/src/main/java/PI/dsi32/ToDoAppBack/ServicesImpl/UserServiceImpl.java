package PI.dsi32.ToDoAppBack.ServicesImpl;

import java.util.List;

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
	public List<User> getUsersByGroupId(Integer groupId) {
        return userRepository.findUsersByGroupId(groupId); // Appelle le repository pour récupérer les utilisateurs du groupe.
    }

}
