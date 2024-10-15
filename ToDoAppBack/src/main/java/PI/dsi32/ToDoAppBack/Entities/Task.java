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

@Entity // Annotation indiquant que cette classe est une entité JPA.
public class Task implements Serializable { // La classe implémente Serializable pour la sérialisation.
    private static final long serialVersionUID = 1L; // Version de la classe pour la sérialisation.

    @Id // Annotation indiquant que ce champ est la clé primaire.
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Stratégie de génération de la clé primaire.
    private int id; // Identifiant unique de la tâche.

    private String title; // Titre de la tâche.
    
    private String description; // Description de la tâche.
    
    @Enumerated(EnumType.STRING) // Indique que la valeur de l'énumération sera stockée sous forme de chaîne.
    private TaskStatus status; // Statut de la tâche (TODO, INPROGRESS, DONE).

    private LocalDateTime deadline; // Date limite de la tâche.
    
    private LocalDateTime createdAt; // Date de création de la tâche.
    
    private LocalDateTime updatedAt; // Date de dernière mise à jour de la tâche.

    private boolean isDestactive; // Indique si la tâche est désactivée.

    // Constructeur par défaut
    public Task() {
        super();
    }

    // Constructeur avec paramètres
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

    // Getters et Setters pour chaque attribut

    public int getId() {
        return id; // Retourne l'identifiant de la tâche.
    }

    public void setId(int id) {
        this.id = id; // Définit l'identifiant de la tâche.
    }

    public String getTitle() {
        return title; // Retourne le titre de la tâche.
    }

    public void setTitle(String title) {
        this.title = title; // Définit le titre de la tâche.
    }

    public String getDescription() {
        return description; // Retourne la description de la tâche.
    }

    public void setDescription(String description) {
        this.description = description; // Définit la description de la tâche.
    }

    public TaskStatus getStatus() {
        return status; // Retourne le statut de la tâche.
    }

    public void setStatus(TaskStatus status) {
        this.status = status; // Définit le statut de la tâche.
    }

    public LocalDateTime getDeadline() {
        return deadline; // Retourne la date limite de la tâche.
    }

    public void setDeadline(LocalDateTime deadline) {
        this.deadline = deadline; // Définit la date limite de la tâche.
    }

    public LocalDateTime getCreatedAt() {
        return createdAt; // Retourne la date de création de la tâche.
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt; // Définit la date de création de la tâche.
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt; // Retourne la date de mise à jour de la tâche.
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt; // Définit la date de mise à jour de la tâche.
    }

    public boolean isDestactive() {
        return isDestactive; // Retourne si la tâche est désactivée.
    }

    public void setDestactive(boolean isDestactive) {
        this.isDestactive = isDestactive; // Définit l'état désactivé de la tâche.
    }

    public static long getSerialversionuid() {
        return serialVersionUID; // Retourne la version de sérialisation.
    }
}
