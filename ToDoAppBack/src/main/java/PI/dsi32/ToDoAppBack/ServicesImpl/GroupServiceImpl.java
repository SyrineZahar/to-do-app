package PI.dsi32.ToDoAppBack.ServicesImpl; // Déclaration du package pour les implémentations de services.

import java.util.List; // Importation de la classe List.
import java.util.Optional;

import PI.dsi32.ToDoAppBack.ServicesImpl.EmailSender;

import org.springframework.beans.factory.annotation.Autowired; // Importation de l'annotation Autowired.
import org.springframework.stereotype.Service; // Importation de l'annotation Service.
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
//import javax.mail.internet.MimeMessage; // Import MimeMessage

import PI.dsi32.ToDoAppBack.Entities.GroupEntity; // Importation de l'entité Group.
import PI.dsi32.ToDoAppBack.Entities.User; // Importation de l'entité User.
import PI.dsi32.ToDoAppBack.Repository.GroupRepository; // Importation du dépôt GroupRepository.
import PI.dsi32.ToDoAppBack.Repository.UserRepository; // Importation du dépôt UserRepository.
import PI.dsi32.ToDoAppBack.Services.IGroupService; // Importation de l'interface IGroupService.
import jakarta.transaction.Transactional;

@Service // Annotation indiquant que cette classe est un service Spring.
public class GroupServiceImpl implements IGroupService { // Classe implémentant l'interface IGroupService.

    @Autowired // Injection de dépendance pour le dépôt GroupRepository.
    private GroupRepository groupRepo;

    @Autowired // Injection de dépendance pour le dépôt UserRepository.
    private UserRepository userRepo;

    @Autowired
    private EmailSender emailSender;


    @Override
    public List<GroupEntity> getAllGroups() {
        // Récupère tous les groupes à partir du dépôt.
        return groupRepo.findAll();
    }

    @Override
    public GroupEntity addGroup(GroupEntity group) {
        // Ajoute un nouveau groupe au dépôt et retourne le groupe ajouté.
        return groupRepo.save(group);
    }
    
    public Optional<GroupEntity> getGroupById(int groupId) {

        return groupRepo.findById(groupId);
    }

    @Override
    public List<GroupEntity> getGroupsForUser(Integer userId) {

        return groupRepo.findGroupsByUserId(userId);
    }
    
    public Optional<GroupEntity> getGroupById(Integer groupId) {

        return groupRepo.findById(groupId);
	}

    @Override
    public Long countGroups() {
        return groupRepo.count();
    }

    @Override
    @Transactional // Ensure the method is transactional
    public void addUserToGroup(int groupId, User user) {
        // Retrieve the group by ID
        GroupEntity group = groupRepo.findById(groupId)
            .orElseThrow(() -> new RuntimeException("Group not found"));

        // If user is already in the database, load the managed user
        User managedUser = userRepo.findById(user.getId())
            .orElseThrow(() -> new RuntimeException("User not found"));

        // Add the user to the group's list of users
        group.getUsers().add(managedUser);

        // Add the group to the user's list of groups
        managedUser.getGroups().add(group);

        // Save the user or the group
        userRepo.save(managedUser);  // Saving only the user is fine because it's bidirectional

        String emailContent = "Dear " + user.getName() + ",\n\n"
                + "You've been added to a new group in the Work Together application. "
                + "We hope you enjoy collaborating with your team!\n\n"
                + "Best regards,\nThe Work Together Team";
        emailSender.sendSimpleEmail(user,emailContent);

    }





}
