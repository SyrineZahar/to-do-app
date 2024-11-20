package PI.dsi32.ToDoAppBack.Controllers; 

import java.util.List; 
import java.util.Optional;

import PI.dsi32.ToDoAppBack.Controllers.Exceptions.UserAlreadyInGroupException;
import org.eclipse.angus.mail.iap.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus; 
import org.springframework.http.ResponseEntity; 
import org.springframework.web.bind.annotation.*; 

import PI.dsi32.ToDoAppBack.Entities.GroupEntity; 
import PI.dsi32.ToDoAppBack.Entities.User; 
import PI.dsi32.ToDoAppBack.Services.IGroupService; 
import PI.dsi32.ToDoAppBack.Services.IUserService;

@CrossOrigin(origins = "*") 
@RestController 
@RequestMapping("/groups") 
public class GroupController {
	
	@Autowired 
    private IGroupService groupService;
	
	@Autowired 
    private IUserService userService;

    // recuperation des groupes
    @GetMapping()
    public ResponseEntity<List<GroupEntity>> getAllGroups() {
        try {
            List<GroupEntity> groups = groupService.getAllGroups();
            return new ResponseEntity<>(groups, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //ajout d'un groupe
    @PostMapping() 
    public ResponseEntity<GroupEntity> addGroup(@RequestBody GroupEntity group) {
        try {
        	GroupEntity newGroup = groupService.addGroup(group);
            return new ResponseEntity<>(newGroup, HttpStatus.CREATED); 
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //ajout utilisateur a group
    @PostMapping("/{groupId}/users")
    public ResponseEntity<String> addUserGroup(@PathVariable int groupId, @RequestBody User user) {
        try {
            groupService.addUserToGroup(groupId, user);
            return ResponseEntity.ok().build();
        } catch (UserAlreadyInGroupException e) {
            return new ResponseEntity<>("Erreur: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (RuntimeException e) {
            return new ResponseEntity<>("Erreur: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //recuperation des groupes par utilisateur
    @GetMapping("/user/{userId}") 
    public ResponseEntity<List<GroupEntity>> getGroupsByUserId(@PathVariable Integer userId) {
        List<GroupEntity> groups = groupService.getGroupsForUser(userId);
        
        if (groups.isEmpty()) {
            return ResponseEntity.notFound().build(); 
        }
        
        return ResponseEntity.ok(groups); 
    }

    // recuperation group par id
    @GetMapping("/{groupId}") 
    public ResponseEntity<GroupEntity> getGroupById(@PathVariable Integer groupId) {
        Optional<GroupEntity> group = groupService.getGroupById(4); 

        if (group.isEmpty()) {
            return ResponseEntity.notFound().build(); 
        }

        return ResponseEntity.ok(group.get());
    }

    //recuperation de nbr de groupe
    @GetMapping("/stat")
    public ResponseEntity<Long> getGroupStat() {
        try{
            Long count = groupService.countGroups();

            return new ResponseEntity<>(count, HttpStatus.OK);
        }catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);

        }
    }

    //suppression du group
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

    // màj d'un groupe
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
