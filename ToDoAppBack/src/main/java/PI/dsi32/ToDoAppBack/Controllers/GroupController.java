package PI.dsi32.ToDoAppBack.Controllers; // Déclaration du package pour le contrôleur.

import java.util.List; // Importation de la classe List pour les collections.
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired; // Annotation pour l'injection de dépendances.
import org.springframework.http.HttpStatus; // Importation des statuts HTTP.
import org.springframework.http.ResponseEntity; // Importation de la classe ResponseEntity pour les réponses HTTP.
import org.springframework.web.bind.annotation.*; // Importation des annotations REST.

import PI.dsi32.ToDoAppBack.Entities.GroupEntity; // Importation de l'entité Group.
import PI.dsi32.ToDoAppBack.Entities.User; // Importation de l'entité User.
import PI.dsi32.ToDoAppBack.Services.IGroupService; // Importation de l'interface de service des groupes.
import PI.dsi32.ToDoAppBack.ServicesImpl.EmailSender;

@CrossOrigin(origins = "*") // Permet les requêtes cross-origin depuis n'importe quelle origine.
@RestController // Indique que ce contrôleur gère des requêtes REST.
@RequestMapping("/groups") // Définit le chemin de base pour toutes les méthodes de ce contrôleur.
public class GroupController {
	
	@Autowired // Injection du service des groupes.
    private IGroupService groupService;

    @GetMapping() // Gère les requêtes GET sur le chemin /groups.
    public ResponseEntity<List<GroupEntity>> getAllGroups() {
        try {
            List<GroupEntity> groups = groupService.getAllGroups(); // Récupère tous les groupes via le service.
            return new ResponseEntity<>(groups, HttpStatus.OK); // Retourne les groupes avec un statut HTTP 200.
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR); // Retourne un statut 500 en cas d'erreur.
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
    
    @PostMapping("/{groupId}/users") // Gère les requêtes POST pour ajouter un utilisateur à un groupe.
    public String addUserToGroup(@PathVariable int groupId, @RequestBody User user) {
        try {
            groupService.addUserToGroup(groupId, user);

            return "done";
        } catch (RuntimeException e) {
            return e.toString(); // Retourne un statut 500 en cas d'erreur.
        }
    }
    
    @GetMapping("/{userId}") // Mapping pour récupérer les groupes par ID utilisateur.
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

}
