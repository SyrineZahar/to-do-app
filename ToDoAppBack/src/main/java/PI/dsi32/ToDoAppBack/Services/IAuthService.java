package PI.dsi32.ToDoAppBack.Services;

import PI.dsi32.ToDoAppBack.Entities.User;

public interface IAuthService {
    User registerUser(User user);

	User loginUser(String email, String password);

	

}
