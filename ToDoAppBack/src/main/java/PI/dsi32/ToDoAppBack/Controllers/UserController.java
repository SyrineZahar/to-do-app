package PI.dsi32.ToDoAppBack.Controllers;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import PI.dsi32.ToDoAppBack.Entities.User;
import PI.dsi32.ToDoAppBack.ServicesImpl.UserServiceImpl;

@CrossOrigin("*")
@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    private UserServiceImpl userService;
    
    @GetMapping()
    public ResponseEntity<List<User>> getAll() {
        try {
            List<User> users = userService.getAllUsers(); 
            if (users.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT); 
            }
            
            return new ResponseEntity<>(users, HttpStatus.OK); 
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR); 
        }
    }
    
    @GetMapping("/{groupId}") 
    public ResponseEntity<List<User>> getUsersByGroupId(@PathVariable Integer groupId) {
        List<User> users = userService.getUsersByGroupId(groupId); // Appel de la méthode dans le UserService.
        
        // Vérification si des utilisateurs ont été trouvés.
        if (users.isEmpty()) {
            return ResponseEntity.notFound().build(); // Retourne un 404 si aucun utilisateur n'est trouvé.
        }
        
        return ResponseEntity.ok(users); // Retourne un 200 avec la liste des utilisateurs.
    }
    
    
    
    @PostMapping("/getData")
    public ResponseEntity<User> getDataUser(@RequestBody Map<String, String> loginData) {

    	String email = loginData.get("email");
        String password = loginData.get("password");

        try {
            User user = userService.getDataUser(email);
            if (user != null) {
                return new ResponseEntity<>(user, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
            }
        } catch (RuntimeException e) {
            System.out.println("Error: " + e.getMessage());
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        }
    }

}
