package PI.dsi32.ToDoAppBack.Controllers;

import java.util.List;
import java.util.Map;
import java.util.Optional;

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

    // recuperation des utilisateurs
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

    // recuperation de nom de l'utilisateur par identifiant
    @GetMapping("/name/{userId}")
    public ResponseEntity<User> getUserNameById(@PathVariable int userId) {
        Optional<User> user = userService.getUserById(userId);
        if (user.isPresent()) {
            return ResponseEntity.ok(user.get());
        } else {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR); 
        }
    }

    // recuperation des utilisateurs par l'identificant du tâche
    @GetMapping("/taskId/{taskId}")
    public ResponseEntity<User> getUserByTaskId(@PathVariable("taskId") Integer taskId) {
        Optional<User> user = userService.getUserByTask(taskId);
        return user.map(ResponseEntity::ok)
                   .orElseGet(() -> ResponseEntity.notFound().build());
    }

    //recuperation des utilisateurs par l'identifiant du group
    @GetMapping("/{groupId}") 
    public ResponseEntity<List<User>> getUsersByGroupId(@PathVariable Integer groupId) {
        List<User> users = userService.getUsersByGroupId(groupId);
        
        if (users.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        
        return ResponseEntity.ok(users);
    }
    
    //recuperation du mot de passe et email de l'utilisateur
    @PostMapping("/getData")
    public ResponseEntity<User> getDataUser(@RequestBody Map<String, String> loginData) {

    	String email = loginData.get("email");

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

    // envoi le nbr des utilisateurs
    @GetMapping("/stat")
    public ResponseEntity<Long> getUserStat() {
        try{
            Long count = userService.countUsers();

            return new ResponseEntity<>(count, HttpStatus.OK);
        }catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);

        }
    }
}
