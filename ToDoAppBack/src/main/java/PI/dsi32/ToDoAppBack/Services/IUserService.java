package PI.dsi32.ToDoAppBack.Services;

import java.util.List;
import java.util.Optional;

import PI.dsi32.ToDoAppBack.Entities.User;

public interface IUserService {
	List<User> getAllUsers();
	Optional<User> getUserById(int userId);
	List<User> getUsersByGroupId(Integer groupId);
	User getDataUser(String email);
}
