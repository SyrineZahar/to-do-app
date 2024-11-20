package PI.dsi32.ToDoAppBack.Controllers.Exceptions;

public class UserAlreadyInGroupException extends RuntimeException {
    // exception pour les utilisateur deja membre dans le groupe
    public UserAlreadyInGroupException(String message) {
        super(message);
    }
}

