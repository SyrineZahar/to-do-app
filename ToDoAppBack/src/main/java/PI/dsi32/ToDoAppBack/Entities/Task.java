package PI.dsi32.ToDoAppBack.Entities; // Déclaration du package pour les entités.

import java.io.Serializable; // Importation pour permettre la sérialisation.
import java.time.LocalDateTime; // Importation pour gérer les dates et heures.

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

import PI.dsi32.ToDoAppBack.enums.TaskStatus; // Importation de l'énumération TaskStatus.
import jakarta.persistence.*;

@Entity // Annotation indiquant que cette classe est une entité JPA.
public class Task implements Serializable { // La classe implémente Serializable pour la sérialisation.
    private static final long serialVersionUID = 1L; // Version de la classe pour la sérialisation.

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String title;
	@Column(length = 2000)
    private String description;

    @Enumerated(EnumType.STRING)
    private TaskStatus status;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime deadline;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime createdAt;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime updatedAt;


    // Plusieurs tâches a un seul utilisateur
    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User user;

    // Plusieurs tâches appartient à un seul groupe
    @ManyToOne
    @JoinColumn(name = "group_id")
    @JsonIgnore
    private GroupEntity group;
    
    public Task() {
    	
    }
    
	public Task(int id, String title, String description, TaskStatus status, LocalDateTime deadline,
			LocalDateTime createdAt, LocalDateTime updatedAt, User user, GroupEntity group) {
		super();
		this.id = id;
		this.title = title;
		this.description = description;
		this.status = status;
		this.deadline = deadline;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
		this.user = user;
		this.group = group;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public TaskStatus getStatus() {
		return status;
	}

	public void setStatus(TaskStatus status) {
		this.status = status;
	}

	public LocalDateTime getDeadline() {
		return deadline;
	}

	public void setDeadline(LocalDateTime deadline) {
		this.deadline = deadline;
	}

	public LocalDateTime getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}

	public LocalDateTime getUpdatedAt() {
		return updatedAt;
	}

	public void setUpdatedAt(LocalDateTime updatedAt) {
		this.updatedAt = updatedAt;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public GroupEntity getGroup() {
		return group;
	}

	public void setGroup(GroupEntity group) {
		this.group = group;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	@Override
	public String toString() {
		return "Task [user=" + user + ", group=" + group + "]";
	}

	
	
 
}
