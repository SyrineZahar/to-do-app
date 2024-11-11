package PI.dsi32.ToDoAppBack.Controllers.Exceptions;

public class UserAlreadyInGroupException extends RuntimeException {
    public UserAlreadyInGroupException(String message) {
        super(message);
    }
}

