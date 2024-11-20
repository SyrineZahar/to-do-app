package PI.dsi32.ToDoAppBack.ServicesImpl;
import java.util.List;
import java.util.Optional;
import PI.dsi32.ToDoAppBack.Controllers.Exceptions.UserAlreadyInGroupException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import PI.dsi32.ToDoAppBack.Entities.GroupEntity;
import PI.dsi32.ToDoAppBack.Entities.User;
import PI.dsi32.ToDoAppBack.Repository.GroupRepository;
import PI.dsi32.ToDoAppBack.Repository.UserRepository;
import PI.dsi32.ToDoAppBack.Services.IGroupService;
import jakarta.transaction.Transactional;

@Service
public class GroupServiceImpl implements IGroupService {

    @Autowired
    private GroupRepository groupRepo;

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private EmailSender emailSender;

    // Récupère tous les groupes
    @Override
    public List<GroupEntity> getAllGroups() {
        return groupRepo.findAll();
    }

    // Ajoute un nouveau groupe et retourne le groupe ajouté.
    @Override
    public GroupEntity addGroup(GroupEntity group) {
        return groupRepo.save(group);
    }

    // recuperation et retourne des groupes pour un utilisateur spécifique
    @Override
    public List<GroupEntity> getGroupsForUser(Integer userId) {
        return groupRepo.findGroupsByUserId(userId);
    }

    //recuperation et retourne d'un groupe spécifique
    @Override
    public Optional<GroupEntity> getGroupById(Integer groupId) {
        return groupRepo.findById(groupId);
	}

    //recuperation et retourne des nbr des groupes
    @Override
    public Long countGroups() {
        return groupRepo.count();
    }
    //suppression d'un groupe spécifique
    @Override
    public void deleteGroupById(Integer groupId) {
        groupRepo.deleteById(groupId);
    }
    //mise à jour et retourne d'un groupe
    @Override
    public GroupEntity updateGroup(GroupEntity group) {
        return groupRepo.save(group);
    }

    //ajout d'un utilisateur a un groupe avec l'envoi du mail comme notif
    @Override
    @Transactional
    public void addUserToGroup(int groupId, User user) {
        GroupEntity group = groupRepo.findById(groupId)
                .orElseThrow(() -> new RuntimeException("Group not found"));

        User managedUser = userRepo.findById(user.getId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!group.getUsers().contains(managedUser)) {
            group.getUsers().add(managedUser);

            managedUser.getGroups().add(group);

            userRepo.save(managedUser);

            String emailContent = "Dear " + user.getName() + ",\n\n"
                    + "You've been added to a new group in the Work Together application. "
                    + "We hope you enjoy collaborating with your team!\n\n"
                    + "Best regards,\nThe Work Together Team";
            emailSender.sendSimpleEmail(user, emailContent);
        } else {
            throw new UserAlreadyInGroupException("User is already in the group");
        }
    }

}
