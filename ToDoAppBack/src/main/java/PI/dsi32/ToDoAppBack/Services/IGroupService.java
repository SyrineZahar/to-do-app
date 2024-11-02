package PI.dsi32.ToDoAppBack.Services; // Déclaration du package pour les services.

import java.util.List; // Importation de la classe List.
import java.util.Optional;

import PI.dsi32.ToDoAppBack.Entities.GroupEntity; // Importation de l'entité Group.
import PI.dsi32.ToDoAppBack.Entities.User; // Importation de l'entité User.

public interface IGroupService { // Interface définissant les opérations de service pour les groupes.
    
    List<GroupEntity> getAllGroups(); // Méthode pour récupérer tous les groupes.
    
    GroupEntity addGroup(GroupEntity group); // Méthode pour ajouter un nouveau groupe.
    
    void addUserToGroup(int groupId, User user); // Méthode pour ajouter un utilisateur à un groupe donné.

	List<GroupEntity> getGroupsForUser(Integer userId);
    
	public Optional<GroupEntity> getGroupById(Integer groupId);
}
