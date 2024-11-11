package PI.dsi32.ToDoAppBack.Entities;

import java.io.Serializable;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import jakarta.persistence.*;

@Entity
@JsonIdentityInfo(
		generator = ObjectIdGenerators.PropertyGenerator.class,
		property = "id"
)
public class GroupEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String backgroundImage;
    private String profilePicture;
    private String nom;
    private String description;

    @ManyToMany(mappedBy = "groups")
	private List<User> users; // Un groupe peut avoir plusieurs utilisateurs

    @OneToMany(mappedBy = "group", cascade = CascadeType.ALL)
    private List<Task> tasks;

    public GroupEntity() {
		super();
    }


	public GroupEntity(int id, String backgroundImage, String profilePicture, String nom, String description, List<User> users, List<Task> tasks) {
		this.id = id;
		this.backgroundImage = backgroundImage;
		this.profilePicture = profilePicture;
		this.nom = nom;
		this.description = description;
		this.users = users;
		this.tasks = tasks;
	}

	public int getId() {
		return id;
	}

	public String getBackgroundImage() {
		return backgroundImage;
	}

	public String getProfilePicture() {
		return profilePicture;
	}

	public String getNom() {
		return nom;
	}

	public String getDescription() {
		return description;
	}

	public List<User> getUsers() {
		return users;
	}

	public List<Task> getTasks() {
		return tasks;
	}

	public void setId(int id) {
		this.id = id;
	}

	public void setBackgroundImage(String backgroundImage) {
		this.backgroundImage = backgroundImage;
	}

	public void setProfilePicture(String profilePicture) {
		this.profilePicture = profilePicture;
	}

	public void setNom(String nom) {
		this.nom = nom;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public void setUsers(List<User> users) {
		this.users = users;
	}

	public void setTasks(List<Task> tasks) {
		this.tasks = tasks;
	}
}
