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
		// TODO Auto-generated method stub
		return userRepository.save(user);
	}
	
	
}
