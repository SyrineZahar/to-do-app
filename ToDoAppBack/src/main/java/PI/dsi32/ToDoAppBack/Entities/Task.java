package PI.dsi32.ToDoAppBack.Entities; // Déclaration du package pour les entités.

import java.io.Serializable; // Importation pour permettre la sérialisation.
import java.time.LocalDateTime; // Importation pour gérer les dates et heures.

import PI.dsi32.ToDoAppBack.enums.TaskStatus; // Importation de l'énumération TaskStatus.
import jakarta.persistence.Entity; // Importation pour la définition de l'entité JPA.
import jakarta.persistence.EnumType; // Importation pour spécifier le type d'énumération.
import jakarta.persistence.Enumerated; // Importation pour la gestion des énumérations en JPA.
import jakarta.persistence.GeneratedValue; // Importation pour la génération automatique des valeurs.
import jakarta.persistence.GenerationType; // Importation pour définir le type de stratégie de génération.
import jakarta.persistence.Id; // Importation pour identifier la clé primaire de l'entité.
import jakarta.persistence.JoinColumn; // Importation pour définir une colonne de jointure.
import jakarta.persistence.ManyToOne; // Importation pour définir une relation plusieurs-à-un.

@Entity // Annotation indiquant que cette classe est une entité JPA.
public class Task implements Serializable { // La classe implémente Serializable pour la sérialisation.
    private static final long serialVersionUID = 1L; // Version de la classe pour la sérialisation.

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String title;
    private String description;

    @Enumerated(EnumType.STRING)
    private TaskStatus status;

    private LocalDateTime deadline;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private boolean isDestactive;

    // Chaque tâche a un seul utilisateur
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    // Chaque tâche appartient à un seul groupe
    @ManyToOne
    @JoinColumn(name = "group_id")
    private GroupEntity group;
    
    public Task() {
    	
    }
    
	public Task(int id, String title, String description, TaskStatus status, LocalDateTime deadline,
			LocalDateTime createdAt, LocalDateTime updatedAt, boolean isDestactive, User user, GroupEntity group) {
		super();
		this.id = id;
		this.title = title;
		this.description = description;
		this.status = status;
		this.deadline = deadline;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
		this.isDestactive = isDestactive;
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

	public boolean isDestactive() {
		return isDestactive;
	}

	public void setDestactive(boolean isDestactive) {
		this.isDestactive = isDestactive;
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

 
}
