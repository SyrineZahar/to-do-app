package PI.dsi32.ToDoAppBack.Controllers; // Déclaration du package pour le contrôleur.

import java.util.List; // Importation de la classe List pour les collections.
import java.util.Optional;

import PI.dsi32.ToDoAppBack.Controllers.Exceptions.UserAlreadyInGroupException;
import org.springframework.beans.factory.annotation.Autowired; // Annotation pour l'injection de dépendances.
import org.springframework.http.HttpStatus; // Importation des statuts HTTP.
import org.springframework.http.ResponseEntity; // Importation de la classe ResponseEntity pour les réponses HTTP.
import org.springframework.web.bind.annotation.*; // Importation des annotations REST.

import PI.dsi32.ToDoAppBack.Entities.GroupEntity; // Importation de l'entité Group.
import PI.dsi32.ToDoAppBack.Entities.User; // Importation de l'entité User.
import PI.dsi32.ToDoAppBack.Services.IGroupService; // Importation de l'interface de service des groupes.
import PI.dsi32.ToDoAppBack.Services.IUserService;

@CrossOrigin(origins = "*") // Permet les requêtes cross-origin depuis n'importe quelle origine.
@RestController // Indique que ce contrôleur gère des requêtes REST.
@RequestMapping("/groups") // Définit le chemin de base pour toutes les méthodes de ce contrôleur.
public class GroupController {
	
	@Autowired // Injection du service des groupes.
    private IGroupService groupService;
	
	@Autowired 
    private IUserService userService;

    @GetMapping() // Gère les requêtes GET sur le chemin /groups.
    public ResponseEntity<List<GroupEntity>> getAllGroups() {
        try {
            List<GroupEntity> groups = groupService.getAllGroups(); // Récupère tous les groupes via le service.
            return new ResponseEntity<>(groups, HttpStatus.OK); // Retourne les groupes avec un statut HTTP 200.
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR); // Retourne un statut 500 en cas d'erreur.
        }
    }
    
    @GetMapping("/{userId}")
    public ResponseEntity<User> getUserById(@PathVariable int userId) {
        Optional<User> user = userService.getUserById(userId);
        if (user.isPresent()) {
            return ResponseEntity.ok(user.get());  // Return user if found
        } else {
            return ResponseEntity.notFound().build();  // Return 404 if not found
        }
    }
	
    @PostMapping() // Gère les requêtes POST sur le chemin /groups.
    public ResponseEntity<GroupEntity> addGroup(@RequestBody GroupEntity group) {
        try {
        	GroupEntity newGroup = groupService.addGroup(group); // Ajoute le groupe via le service.
            return new ResponseEntity<>(newGroup, HttpStatus.CREATED); // Retourne le nouveau groupe avec un statut HTTP 201.
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR); // Retourne un statut 500 en cas d'erreur.
        }
    }

    @PostMapping("/{groupId}/users")
    public ResponseEntity<String> addUserToGroup(@PathVariable int groupId, @RequestBody User user) {
        try {
            groupService.addUserToGroup(groupId, user);
            return ResponseEntity.ok().build();
        } catch (UserAlreadyInGroupException e) {
            return new ResponseEntity<>("Error: " + e.getMessage(), HttpStatus.BAD_REQUEST); // 400 Bad Request
        } catch (RuntimeException e) {
            return new ResponseEntity<>("Error: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR); // 500 Internal Server Error
        }
    }

    
    @GetMapping("/user/{userId}") // Mapping pour récupérer les groupes par ID utilisateur.
    public ResponseEntity<List<GroupEntity>> getGroupsByUserId(@PathVariable Integer userId) {
        List<GroupEntity> groups = groupService.getGroupsForUser(userId); // Appel de la méthode dans le repository.
        
        // Vérification si des groupes ont été trouvés.
        if (groups.isEmpty()) {
            return ResponseEntity.notFound().build(); // Retourne un 404 si aucun groupe n'est trouvé.
        }
        
        return ResponseEntity.ok(groups); // Retourne un 200 avec la liste des groupes.
    }
    
    @GetMapping("/{groupId}") // Mapping to retrieve a group by its group ID.
    public ResponseEntity<GroupEntity> getGroupById(@PathVariable Integer groupId) {
        Optional<GroupEntity> group = groupService.getGroupById(4); // Call method in the service to get group by ID.

        // Check if a group is found.
        if (group.isEmpty()) {
            return ResponseEntity.notFound().build(); // Return a 404 if no group is found.
        }

        return ResponseEntity.ok(group.get()); // Return a 200 with the group details.
    }

    @GetMapping("/stat")
    public ResponseEntity<Long> getUserStat() {
        try{
            Long count = groupService.countGroups();

            return new ResponseEntity<>(count, HttpStatus.OK);
        }catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);

        }
    }

    @DeleteMapping("/{groupId}")
    public ResponseEntity<String> deleteGroup(@PathVariable int groupId) {
        try{
            groupService.deleteGroupById(groupId);
            return ResponseEntity.ok().build();

        }
        catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);

        }
    }


    @PutMapping("/{groupId}")
    public ResponseEntity<GroupEntity> updateGroup(
            @PathVariable Integer groupId,
            @RequestBody GroupEntity group) {
        try {
            group.setId(groupId);
            GroupEntity updatedGroup = groupService.updateGroup(group);
            return ResponseEntity.ok(updatedGroup);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
