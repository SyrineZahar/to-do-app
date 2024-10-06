package PI.dsi32.ToDoAppBack.Entities;

import java.io.Serializable;
// Permet de sérialiser la classe
import java.time.LocalDate;
import java.time.LocalDateTime;
// Utilisé pour représenter une date et une heure
import PI.dsi32.ToDoAppBack.enums.TaskStatus;// Importation de l'énumération TaskStatus
import jakarta.persistence.Entity;// Annotation pour définir une entité JPA
import jakarta.persistence.EnumType;// Type d'énumération pour la persistance
import jakarta.persistence.Enumerated;// Annotation pour indiquer que le champ est une énumération
import jakarta.persistence.GeneratedValue;// Annotation pour la génération automatique de valeur
import jakarta.persistence.GenerationType;// Enumération pour le type de génération
import jakarta.persistence.Id;// Annotation pour définir la clé primaire



@Entity
public class Task implements Serializable{
	private static final long serialVersionUID = 1L;
	//UID pour la sérialisation. Permet de garantir la compatibilité entre les versions.

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)// Génération automatique de l'ID
    private int id;
// Identifiant unique de la tâche
    private String title;
    // Titre de la tâche
    private String description;
    // Description de la tâche
	@Enumerated(EnumType.STRING)// Stocke le statut sous forme de chaîne
    private TaskStatus status;
// État actuel de la tâche
    private LocalDateTime deadline;
    // Date et heure limite pour la tâche
    private LocalDateTime createdAt;
    // Date et heure de création
    private LocalDateTime updatedAt;
// Date et heure de mise à jour
    private boolean isDestactive;
// Indique si la tâche est désactivée


    public Task() {
		super();
	}
// Constructeur paramétré
	public Task(int id, String title, String description, TaskStatus status, LocalDateTime deadline,
			LocalDateTime createdAt, LocalDateTime updatedAt, boolean isDestactive) {
		super();
		this.id = id;
		this.title = title;
		this.description = description;
		this.status = status;
		this.deadline = deadline;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
		this.isDestactive = isDestactive;
	}
// Getters et Setters
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

	public static long getSerialversionuid() {
		return serialVersionUID;
		// Retourne le numéro de version pour la sérialisation
	}



}
/**Cette classe est essentielle pour la gestion des tâches dans une application 
 Elle permet de stocker des informations importantes et d'interagir avec une base de données
  de manière structurée.  */
