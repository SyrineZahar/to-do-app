package PI.dsi32.ToDoAppBack.Services;

import java.util.List;
import java.util.Optional;

import PI.dsi32.ToDoAppBack.Entities.GroupEntity;
import PI.dsi32.ToDoAppBack.Entities.User;

public interface IGroupService {
    
    List<GroupEntity> getAllGroups();
    
    GroupEntity addGroup(GroupEntity group);
    
    void addUserToGroup(int groupId, User user);

	List<GroupEntity> getGroupsForUser(Integer userId);
    
	Optional<GroupEntity> getGroupById(Integer groupId);

    Long countGroups();

    void deleteGroupById(Integer groupId);

    GroupEntity updateGroup(GroupEntity group);
}
